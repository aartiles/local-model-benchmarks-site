// src/placeholder.js — retired scaffolding, kept as an empty stub on purpose.
//
// Everything that used to stand in here has been replaced by the real modules, so
// this file has no code and no exports, and src/main.js no longer imports it:
//
//   road surface      src/road.js   buildRoadMesh()            (T005, R4)
//   dusk lighting     src/sky.js    buildSky()                 (T006, R9)
//   spruce forest     src/scenery.js buildScenery()            (T007, R5)
//   mountains/chalets src/scenery.js buildScenery()            (T008, R6, R7)
//   avalanche gallery src/scenery.js buildScenery()            (T009, R8)
//   the car body      src/car.js    loadCoupe()                (T010, R21)
//   the camera path   src/camera.js chaseCamera()/readyCamera() (T011, R21)
//
// The file stays because a DONE check (T007.forest-both-sides) reads it to confirm
// the placeholder trees are gone. Delete it only together with that check.
