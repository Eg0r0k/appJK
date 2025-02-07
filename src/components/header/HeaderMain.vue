<template>
    <header class="sticky select-none z-40 top-0 bg-background/80 backdrop-blur-lg border-b border-border">
        <div class="container flex h-14 max-w-screen-2xl items-center">
            <HeaderNav />
            <div class="ml-auto flex items-center space-x-4">
                <HeaderUser />
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import HeaderNav from './HeaderNav.vue';
import HeaderUser from './HeaderUser.vue';
</script>
