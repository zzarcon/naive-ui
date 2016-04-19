export const $ = (selector, element) => {
  return (element || document).querySelector(selector);
}