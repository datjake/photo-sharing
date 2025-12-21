/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url  The URL to issue the GET request.
 * @returns {Promise<object>} JSON data returned from backend
 */
function fetchModel(url, options = {}) {
  return fetch(url, {
    credentials: "include",
    ...options,
  }).then((res) => {
    if (!res.ok) throw new Error("Fetch failed");
    return res.json();
  });
}

export default fetchModel;
