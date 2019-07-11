export const apiURL = new URL(process.env.REACT_APP_API_URL);

export const handleApiResponse = function (response, on_ok, on_error) {
  if (response.ok) {
    return response.json().then((json) => on_ok(json));
  }
  else {
    return response.json().then((json) => on_error(json));
  }
};
