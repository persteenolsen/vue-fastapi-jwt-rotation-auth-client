import { defineStore } from 'pinia';

import { fetchWrapper, fetchWrapperRefreshToken, router } from '@/helpers';

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        user: null,
        refreshTokenTimeout: null,
        rToken: null
    }),
    actions: {
        async login(username, password) {
            this.user = await fetchWrapper.post(`${baseUrl}/tokens-spa`, { username, password }, { credentials: 'include' });

            // 26-01-2026 - Store Refresh token received from the API
            this.rToken = this.user.refreshToken;
            
            // 26-01-2026 - Debugging
            console.log( 'Auth.store.js - Login - RefreshToken: ' + this.rToken );
            
            // 27-01-2026 - Call the timer to request for JWT Access Token and Refresh Token
            // just before they will expire
            this.startRefreshTokenTimer();

        },
       
        async logout() {

            try {

                if (this.rToken) {

                    await fetch(
                        `${baseUrl}/logout`,
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(this.rToken)
                        }
                    );

                    console.log(
                        'Auth.store.js - Logout - Refresh token revoked by API'
                    );
                }

            } catch (error) {

                console.log(
                    'Auth.store.js - Logout API call failed:',
                    error
                );

            } finally {

                this.stopRefreshTokenTimer();

                this.user = null;
                this.rToken = null;

                router.push('/login');

            }
        },
        
        async refreshToken() {
            
            // 26-01-2026 - Calling a modified fectWrapper for RefreshToken
            this.user = await fetchWrapperRefreshToken.post(`${baseUrl}/refresh-token-spa`, {  }, { credentials: 'include' });
            
            // 26-01-2026 - Store the Refresh token received from the API 
            this.rToken = this.user.refreshToken;

            this.startRefreshTokenTimer();
        },
        startRefreshTokenTimer() {
            
            // parse json object from base64 encoded jwt token
            const jwtBase64 = this.user.jwtToken.split('.')[1];
            const jwtToken = JSON.parse(atob(jwtBase64));
    
            // set a timeout to refresh the token a minute before it expires
            const expires = new Date(jwtToken.exp * 1000);
            const timeout = expires.getTime() - Date.now() - (60 * 1000);

            // 26-01-2026 - Debugging
            console.log( 'Auth.store.js - Refresh Token will expire: ' + expires );
                        
            this.refreshTokenTimeout = setTimeout(this.refreshToken, timeout);
        },    
        stopRefreshTokenTimer() {

            clearTimeout(this.refreshTokenTimeout);

        }
    }
});
