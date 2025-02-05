<template>
    <nav :class="cn('flex items-center space-x-4 lg:space-x-6', $attrs.class ?? '')">
        <router-link to="/" class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                <path fill="currentColor" d="M9.5 6.5L10 0H9L2 9.5h4.5L6 16h1l7-9.5z" />
            </svg>
            <h1 class="text-xl font-bold tracking-tight">
                ЖКХ
            </h1>
        </router-link>

        <router-link v-for="link in links" :key="link.to" :to="link.to" :class="cn(
            'text-sm font-medium   transition-colors hover:text-primary',
            { 'text-primary dark:text-muted-foreground': isActive(link.to) }
        )">
            {{ link.label }}
        </router-link>
    </nav>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils';
import { useRoute } from 'vue-router';

const route = useRoute();

const links = [
    { to: '/', label: 'Обзор' },
    { to: '/connections', label: 'Подключения' },
    { to: '/power-plants', label: 'Электростанции' },
    { to: '/settings', label: 'Настройки' },
];

const isActive = (path: string) => {
    if (path === '/') {
        return route.path === path;
    }
    return route.path.startsWith(path);
};
</script>