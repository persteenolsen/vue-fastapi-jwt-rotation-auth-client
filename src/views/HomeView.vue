<script setup>
import { storeToRefs } from 'pinia';

import { useAuthStore, useUsersStore } from '@/stores';

const authStore = useAuthStore();
const { user: authUser } = storeToRefs(authStore);

const usersStore = useUsersStore();
const { users } = storeToRefs(usersStore);

usersStore.getAll();
</script>

<template>
    <div>
        <h1>Hi {{authUser?.username}}!</h1>
        <p>You're logged in by Vue 3 using JWT with Refresh Token Rotation</p>
        <h3>Users served from a secure api endpoint:</h3>
        <ul v-if="users.length">
            <li v-for="user in users" :key="user.id">{{user.username}} - {{user.name}}</li>
        </ul>
        <div v-if="users.loading" class="spinner-border spinner-border-sm"></div>
        <div v-if="users.error" class="text-danger">Error loading users: {{users.error}}</div>
    </div>
</template>
