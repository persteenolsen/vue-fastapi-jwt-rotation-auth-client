import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import { router } from './helpers';
import { useAuthStore } from './stores';

// setup fake backend
import { fakeBackend } from './helpers';

// 13-01-2026 - disable fake backend
// fakeBackend();

startApp();

// async start function to enable waiting for refresh token call
async function startApp () {
    const app = createApp(App);

    app.use(createPinia());
    app.use(router);

    // attempt to auto refresh token before startup
    try {
        const authStore = useAuthStore();

        // 27-01-2026 - Disable auto refresh token before User Authentication
        // The User will manually login to get both access and refresh tokens
        // await authStore.refreshToken();

    } catch {
        // catch error to start app on success or failure
    }

    app.mount('#app');
}