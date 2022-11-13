export const getIntersectionObserverSettings = <TRoot extends HTMLElement>(
  root: TRoot
) => ({
  root,
  rootMargin: "0px 0px -80% 0px",
  threshold: 0,
});
