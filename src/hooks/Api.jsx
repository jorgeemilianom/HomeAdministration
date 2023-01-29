

// Fetch functions
function getHeader() {
    return {
        // "Authorization": `Bearer ${localStorage.getItem("tokenUser")}`
    };
}

const buildDateSend = (data) => {
    let dataSend = new FormData();
    for (let key in data) { dataSend.append(key, data[key]); }
    return dataSend;
}

export const API = {
    _post: function _post(url, params, token = true) {
        let formData = buildDateSend(params);
        const config = token ? { mode: "cors", method: 'POST', body: formData, headers: getHeader() } : { mode: "cors", method: 'POST', body: formData };
        return fetch(url, config).then(function (response) {
            return response.json();
        });
    },

    _get: function _get(url, params, token = true) {
        const query = new URLSearchParams(params);
        const newUrl = params ? new URL(`${url}${query ? `?${query.toString()}` : ''}`) : url;
        const config = token ? { mode: "cors", method: 'GET', headers: getHeader() } : {  mode: "cors", method: 'GET' };
        return fetch(newUrl, config).then(function (response) {
            return response.json(); y
        });
    },

    _put: function _put(url, params, token = true) {
        let formData = buildDateSend(params);
        formData.append('_method', 'PUT');
        const config = token ? { mode: "cors", method: 'PUT', body: formData, headers: getHeader() } : { mode: "cors", method: 'PUT', body: formData };
        return fetch(url, config).then(function (response) {
            return response.json();
        });
    },

    _delete: function _delete(url, token = true) {
        const config = token ? { mode: "cors", method: 'DELETE', headers: getHeader() } : { mode: "cors", method: 'DELETE' };
        return fetch(url, config).then(function (response) {
            return response.json();
        });
    }
} 
