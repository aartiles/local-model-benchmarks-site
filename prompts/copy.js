(() => {
  const prompt = document.querySelector("#prompt-text");
  const button = document.querySelector("#copy-prompt");
  const status = document.querySelector("#copy-status");

  if (!prompt || !button || !status) return;
  button.dataset.state = "loading";
  let feedbackTimer;

  fetch("./prompt.txt")
    .then((response) => {
      if (!response.ok) throw new Error("Prompt text could not be loaded.");
      return response.text();
    })
    .then((text) => {
      prompt.textContent = text;
      button.disabled = false;
      button.textContent = "Copy prompt";
      button.dataset.state = "ready";
      status.textContent = "Prompt ready.";
    })
    .catch(() => {
      button.textContent = "Prompt unavailable";
      button.dataset.state = "error";
      status.textContent = "The prompt could not be loaded. Reload the page and try again.";
    });

  async function copyWithFallback(text) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      const selection = document.createElement("textarea");
      selection.value = text;
      selection.setAttribute("readonly", "");
      selection.style.position = "fixed";
      selection.style.insetInlineStart = "-9999px";
      document.body.append(selection);
      selection.select();
      const copied = document.execCommand("copy");
      selection.remove();
      if (!copied) throw new Error("Clipboard copy failed.");
    }
  }

  button.addEventListener("click", async () => {
    window.clearTimeout(feedbackTimer);
    button.disabled = true;
    button.dataset.state = "loading";
    try {
      await copyWithFallback(prompt.textContent ?? "");
      button.textContent = "Copied";
      button.dataset.state = "success";
      status.textContent = "Prompt copied to the clipboard.";
      feedbackTimer = window.setTimeout(() => {
        button.textContent = "Copy prompt";
        button.dataset.state = "ready";
      }, 1800);
    } catch {
      button.dataset.state = "error";
      button.textContent = "Copy prompt";
      status.textContent = "Copy failed. Select the prompt text and copy it manually.";
    } finally {
      button.disabled = false;
    }
  });
})();
