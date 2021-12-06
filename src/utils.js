export const readFile = (raw, setCallback) =>
  fetch(raw)
    .then((r) => r.text())
    .then((text) => {
      setCallback(text.split(/\r?\n/));
    });
