import { useAuthStore } from '@/stores';

export const fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
};

function request(method) {

    return (url, body) => {
               
        const requestOptions = {
            method,
            headers: authHeader(url)
        };
        if (body) {
            
            // 28-12-2025 - Gets the username + password from login view
            const myJSON = JSON.stringify(body);
            let obj = JSON.parse(myJSON);
            let u = obj.username;
            let p = obj.password;

            //console.log( 'fetch-wrapper.js - Username ' + u + ' Password: ' + p );

            // 28-12-2025 - Gets the username + password from login view
            requestOptions.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            requestOptions.body = 'grant_type=password&username=' + u + '&password=' + p + '&scope=&client_id=string&client_secret=********'
        }
        return fetch(url, requestOptions).then(handleResponse);
    }
}

// helper functions

function authHeader(url) {

    // return auth header with jwt if user is logged in and request is to the api url
    const { user } = useAuthStore();

    const isLoggedIn = !!user?.jwtToken;

    const isApiUrl = url.startsWith(import.meta.env.VITE_API_URL);
    if (isLoggedIn && isApiUrl) {
        return { Authorization: `Bearer ${user.jwtToken}` };
    } else {
        return {};
    }
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        
        // 29-12-2025 - Log status code for debugging
        console.log('fetch-wrapper.js - Status code by response.status: ' + response.status);

        if (!response.ok) {
            const { user, logout } = useAuthStore();
            if ([401, 403].includes(response.status) && user) {
                
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                // Logout message for debugging
                console.log('fetch-wrapper.js - Auto logout due to 401/403 response');
                logout();
            }
            
            // 28-12-2025 - Modified error handling to show status code if User Credentials are wrong
            //const error = (data && data.message) || response.statusText;
            //const error = (data && data.message) || response.statusText || response.status;
            
            let error = "";
            
            // 27-12-2025 - Get the error message           
            error = (data && data.message) || response.statusText || response.status;
            
            // 27-12-2025 - Custom error message for 401 status 
            if( response.status === 401 )
                error = "Access Denied! Try to enter Username and Password again...";

            // Debugging logs for error status
            console.log('fetch-wrapper.js - Status code by response.statusText: ' + response.statusText);
                        
            return Promise.reject(error);
        }

        return data;
    });
}    
