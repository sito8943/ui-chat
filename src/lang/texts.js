import ui from "./ui.json";

/**
 *
 * @param {string} lang
 * @param {string} window
 * @returns
 */
export const GetTexts = (lang, window) => {
  return ui[lang][window];
};
