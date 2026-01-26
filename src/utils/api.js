// A helper function to make authenticated requests
export const authFetch = async (url, options = {}) => {
    const token = localStorage.getItem("token");
    
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Token ${token}`;
    }

    const response = await fetch(url, {
        ...options,
        headers,
    });

    if (response.status === 401) {
        // If token is invalid (401), force logout
        localStorage.removeItem("token");
        window.location.href = "/";
    }

    return response;
};