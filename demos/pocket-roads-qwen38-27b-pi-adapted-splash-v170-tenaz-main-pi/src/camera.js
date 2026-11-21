// Camera modes for Midnight Pass — pure math, no DOM, no three.js.
//
// ChaseCamera: virtual mode. Sits behind/above the car, looks forward along
// the route tangent with smooth-follow (positional lag).
//
// AnchorCamera: physical mode. Keeps the road contact point projected at a
// fixed normalized screen anchor (ax, ay) regardless of steer, heading,
// camera turn, or viewport aspect. The car mesh is hidden in this mode
// (handled by main.js).
//
// Both are plain objects created by their factory functions; call .update(vehicleState, route)
// each frame to refresh position/orientation. They expose:
//   position  {x,y,z}  camera world position
//   lookAt    {x,y,z}  the point the camera faces
//   aspect    number   (AnchorCamera: used for projection; set via .setAspect)
//   fov       number   vertical FOV in radians

const DEG2RAD = Math.PI / 180;

// --- helpers ---------------------------------------------------------------
function v3(x = 0, y = 0, z = 0) { return { x, y, z }; }
function vAdd(a, b) { return v3(a.x + b.x, a.y + b.y, a.z + b.z); }
function vSub(a, b) { return v3(a.x - b.x, a.y - b.y, a.z - b.z); }
function vScale(v, s) { return v3(v.x * s, v.y * s, v.z * s); }
function vLen(v) { return Math.hypot(v.x, v.y, v.z); }
function vNorm(v) { const l = vLen(v) || 1; return vScale(v, 1 / l); }
function vDot(a, b) { return a.x * b.x + a.y * b.y + a.z * b.z; }

/**
 * Compute the road contact point (world position of the car's tires on the road).
 * @param {object} v  vehicle state {distance, lateral, heading, ...}
 * @param {object} route  {at(d) -> {position, tangent, up, left, right, ...}}
 * @returns {{x,y,z}}
 */
export function contactPoint(v, route) {
  const r = route.at(v.distance);
  // Lateral offset along the road's right vector
  return v3(
    r.position.x + r.right.x * v.lateral,
    r.position.y + r.right.y * v.lateral,
    r.position.z + r.right.z * v.lateral,
  );
}

// --- ChaseCamera (virtual mode) ---------------------------------------------
/**
 * Chase camera: behind and above the car, looking forward along the tangent.
 * Smooth-follow with exponential lag on position.
 *
 * @param {object} [opts]
 * @param {number} [opts.distance=6]   meters behind the car
 * @param {number} [opts.height=3]     meters above the road
 * @param {number} [opts.fov=62]       vertical FOV in degrees
 * @param {number} [opts.smoothing=0.12]  0=instant, 1=very laggy (per-frame factor at 60 fps)
 */
export function ChaseCamera(opts = {}) {
  const distance = opts.distance ?? 6;
  const height = opts.height ?? 3;
  const fov = (opts.fov ?? 62) * DEG2RAD;
  const smoothing = opts.smoothing ?? 0.12;

  let pos = v3();
  let look = v3();
  let initialized = false;

  return {
    get position() { return pos; },
    get lookAt() { return look; },
    fov,
    aspect: 16 / 9,

    setAspect(a) { this.aspect = a; },

    /**
     * Update camera for the current vehicle state.
     * @param {object} v  vehicle state
     * @param {object} route  route object
     * @param {number} dt  frame delta in seconds
     */
    update(v, route, dt = 1 / 60) {
      const r = route.at(v.distance);
      const cp = contactPoint(v, route);

      // Target: behind the contact point along the tangent, raised by height.
      // Use the route's up for height (accounts for road slope).
      const target = v3(
        cp.x - r.tangent.x * distance + r.up.x * height,
        cp.y - r.tangent.y * distance + r.up.y * height,
        cp.z - r.tangent.z * distance + r.up.z * height,
      );

      // Look-ahead: slightly ahead of the contact point along the tangent.
      const lookTarget = v3(
        cp.x + r.tangent.x * 2,
        cp.y + r.tangent.y * 2,
        cp.z + r.tangent.z * 2,
      );

      if (!initialized) {
        pos = { ...target };
        look = { ...lookTarget };
        initialized = true;
      } else {
        // Exponential smoothing: factor = 1 - exp(-smoothing * dt * 60)
        const f = 1 - Math.exp(-smoothing * dt * 60);
        pos.x += (target.x - pos.x) * f;
        pos.y += (target.y - pos.y) * f;
        pos.z += (target.z - pos.z) * f;
        look.x += (lookTarget.x - look.x) * f;
        look.y += (lookTarget.y - look.y) * f;
        look.z += (lookTarget.z - look.z) * f;
      }
    },

    reset() { initialized = false; },
  };
}

// --- AnchorCamera (physical mode) -------------------------------------------
/**
 * Anchor camera: the road contact point is always projected at the normalized
 * screen anchor (ax, ay). ax, ay ∈ [0,1], origin top-left.
 *
 * Implementation: the camera sits at a fixed distance behind and height above
 * the contact point (in the route frame), then its position is shifted in the
 * camera's screen plane so the contact point lands at the anchor. It always
 * looks at the contact point.
 *
 * @param {object} [opts]
 * @param {number} [opts.distance=8]   meters behind the contact point
 * @param {number} [opts.height=4]     meters above the road
 * @param {number} [opts.fov=62]       vertical FOV in degrees
 * @param {number} [opts.anchorX=0.5]  normalized screen x (0=left, 1=right)
 * @param {number} [opts.anchorY=0.4]  normalized screen y (0=top, 1=bottom)
 */
export function AnchorCamera(opts = {}) {
  const distance = opts.distance ?? 8;
  const height = opts.height ?? 4;
  const fov = (opts.fov ?? 62) * DEG2RAD;
  let anchorX = opts.anchorX ?? 0.5;
  let anchorY = opts.anchorY ?? 0.4;
  let aspect = opts.aspect ?? 16 / 9;

  let pos = v3();
  let look = v3();

  return {
    get position() { return pos; },
    get lookAt() { return look; },
    fov,
    get anchor() { return { x: anchorX, y: anchorY }; },
    get aspect() { return aspect; },

    setAnchor(ax, ay) { anchorX = ax; anchorY = ay; },
    setAspect(a) { aspect = a; },

    /**
     * Update camera. The contact point will project to (anchorX, anchorY)
     * in normalized screen coords for the current aspect.
     */
    update(v, route) {
      const r = route.at(v.distance);
      const cp = contactPoint(v, route);

      // NDC coords of the anchor: x ∈ [-1,1] left→right, y ∈ [-1,1] bottom→top.
      const nx = 2 * anchorX - 1;
      const ny = 1 - 2 * anchorY;

      const f = Math.tan(fov / 2);

      // Camera position: behind the contact point along tangent, raised by up.
      const C = v3(
        cp.x - r.tangent.x * distance + r.up.x * height,
        cp.y - r.tangent.y * distance + r.up.y * height,
        cp.z - r.tangent.z * distance + r.up.z * height,
      );

      // Vector from camera to contact point.
      const V = vSub(cp, C);
      const Vlen = vLen(V);

      // We want the camera forward F such that V projects to NDC (nx, ny).
      // In the camera frame (F, R, U), V should be at (nx*f*a*s, ny*f*s, s).
      // So: F = V/s - nx*f*a*R - ny*f*U, where s = Vlen/sqrt(1+nx²f²a²+ny²f²).
      // R and U depend on F, so we iterate (converges in 2-3 steps).
      const scale = Vlen / Math.sqrt(1 + nx * nx * f * f * aspect * aspect + ny * ny * f * f);

      // Initial guess: F ≈ V/|V|
      let F = vScale(V, 1 / Vlen);
      for (let iter = 0; iter < 4; iter++) {
        // Compute R, U from F
        const W = v3(0, 1, 0);
        let R = v3(-F.z, 0, F.x); // cross(F, W) = (-Fz, 0, Fx)
        const Rlen = vLen(R);
        if (Rlen < 1e-6) R = v3(1, 0, 0);
        else R = vScale(R, 1 / Rlen);
        const U = v3(
          R.y * F.z - R.z * F.y,
          R.z * F.x - R.x * F.z,
          R.x * F.y - R.y * F.x,
        );
        // Refine F
        F = vSub(vScale(V, 1 / scale), vAdd(vScale(R, nx * f * aspect), vScale(U, ny * f)));
        F = vNorm(F);
      }

      // Look target: along F from C
      const lookDist = 20; // arbitrary distance along forward for the lookAt point
      pos = { ...C };
      look = v3(C.x + F.x * lookDist, C.y + F.y * lookDist, C.z + F.z * lookDist);
    },

    /**
     * Project a world point to normalized screen coords [0,1]×[0,1] (origin top-left)
     * using this camera's current position/orientation. Useful for verification.
     */
    project(worldPt) {
      // Camera basis: forward = normalize(look - pos)
      const fwd = vNorm(vSub(look, pos));
      // right = normalize(cross(fwd, worldUp)), up = cross(right, fwd)
      const worldUp = v3(0, 1, 0);
      let right = v3(fwd.y * worldUp.z - fwd.z * worldUp.y,
                      fwd.z * worldUp.x - fwd.x * worldUp.z,
                      fwd.x * worldUp.y - fwd.y * worldUp.x);
      if (vLen(right) < 1e-6) right = v3(1, 0, 0); // degenerate: looking straight up/down
      right = vNorm(right);
      const up = v3(
        right.y * fwd.z - right.z * fwd.y,
        right.z * fwd.x - right.x * fwd.z,
        right.x * fwd.y - right.y * fwd.x,
      );

      const toPt = vSub(worldPt, pos);
      const zCam = vDot(toPt, fwd);
      if (zCam <= 0) return null; // behind camera
      const xCam = vDot(toPt, right);
      const yCam = vDot(toPt, up);

      const f = Math.tan(this.fov / 2);
      const ndcX = xCam / (zCam * f * this.aspect);
      const ndcY = yCam / (zCam * f);

      // NDC → screen: x: [-1,1]→[0,1], y: [-1,1]→[0,1] (flip y)
      return { x: (ndcX + 1) / 2, y: (1 - ndcY) / 2 };
    },

    reset() {},
  };
}

export default { ChaseCamera, AnchorCamera, contactPoint };
