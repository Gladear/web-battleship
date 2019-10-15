const searchParams = new URLSearchParams(location.search.slice(1));

/**
 * @param {string} key
 * @returns {string}
 */
export function getParam(key) {
  return searchParams.get(key);
}
