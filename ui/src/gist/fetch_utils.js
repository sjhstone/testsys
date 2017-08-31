export function fetchJSONWrapper(endpoint_url, method, data_to_post) {
    let request_header = {
        "Accept": "application/json",
        "Content-Type": method === 'POST' ? "application/json" : undefined,
        "X-CSRFToken": Cookies.get("csrftoken")
    };
    // if (typeof store.getState().loginManager.jwt_token !== 'undefined') {
    let jwt_token = sessionStorage.getItem('jwt_token');
    if (jwt_token !== null) {
        request_header['Authorization'] = `JWT ${jwt_token}`;
    }
    // console.log(data_to_post)

    return fetch(endpoint_url, {
        method: method,
        credentials: "same-origin",
        headers: request_header,
        body: JSON.stringify(data_to_post)
    })
}