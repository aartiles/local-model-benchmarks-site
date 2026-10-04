(() => {
  const prompt = document.querySelector("#prompt-text");
  const button = document.querySelector("#copy-prompt");
  const status = document.querySelector("#copy-status");

  if (!prompt || !button || !status) return;

  fetch("./prompt.txt")
    .then((response) => {
      if (!response.ok) throw new Error("Prompt text could not be loaded.");
      return response.text();
    })
    .then((text) => {
      prompt.textContent = text;
      button.disabled = false;
      button.textContent = "Copy prompt";
      status.textContent = "Prompt ready.";
    })
    .catch(() => {
      button.textContent = "Prompt unavailable";
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
    try {
      await copyWithFallback(prompt.textContent ?? "");
      button.textContent = "Copied";
      status.textContent = "Prompt copied to the clipboard.";
      window.setTimeout(() => {
        button.textContent = "Copy prompt";
      }, 1800);
    } catch {
      status.textContent = "Copy failed. Select the prompt text and copy it manually.";
    }
  });
})();
