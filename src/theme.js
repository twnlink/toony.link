import { atom } from "nanostores";

export const theme = atom(window.location.hash == "#thepipeline");

document.addEventListener("visibilitychange", () => {
  if (document.hidden) theme.set(!theme.get());
});

theme.subscribe((newVal) => {
  const className = "furry-mode";

  if (newVal) {
    document.body.classList.add(className);
  } else {
    document.body.classList.remove(className);
  }
});
