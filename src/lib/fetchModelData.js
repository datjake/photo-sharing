/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url  The URL to issue the GET request.
 * @returns {Promise<object>} JSON data returned from backend
 */
function fetchModel(url) {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch model data");
      }
      return response.json();
    })
    .catch((err) => {
      console.error("fetchModel error:", err);
      throw err;
    });
}

export default fetchModel;
