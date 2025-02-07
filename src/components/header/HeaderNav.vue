<template>
    <nav class="flex items-center">
        <div class="hidden lg:flex items-center space-x-4 lg:space-x-6">
            <router-link v-for="link in LINKS" :key="link.to" :to="link.to" :class="cn('text-sm font-medium transition-colors hover:text-primary',
                { 'text-primary dark:text-muted-foreground': isActive(link.to) })">
                {{ link.label }}
            </router-link>
        </div>

        <Drawer>

            <DrawerTrigger>
                <Button variant="ghost" class="p-5 h-5 w-5 lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 20 20">
                        <path fill="currentColor" fill-rule="evenodd"
                            d="M3 5a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1m0 5a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1m0 5a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1"
                            clip-rule="evenodd" />
                    </svg>
                </Button>
            </DrawerTrigger>

            <DrawerContent class="min-h-[60%]">
                <DrawerHeader>
                    <DrawerTitle>Меню</DrawerTitle>
                </DrawerHeader>
                <div class="p-4 flex flex-col space-y-4">

                    <router-link v-for="link in LINKS" :key="link.to" :to="link.to"
                        class="text-sm font-medium transition-colors hover:text-primary">
                        {{ link.label }}
                    </router-link>
                </div>
            </DrawerContent>
        </Drawer>
    </nav>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { Drawer, DrawerTrigger, DrawerContent } from '@/components/ui/drawer';
import { cn } from '@/lib/utils';
import Button from '../ui/button/Button.vue';
import DrawerHeader from '../ui/drawer/DrawerHeader.vue';
import DrawerTitle from '../ui/drawer/DrawerTitle.vue';

const route = useRoute();

const LINKS: readonly { to: string; label: string }[] = [
    { to: '/', label: 'Обзор' },
    { to: '/connections', label: 'Подключения' },
    { to: '/power-plants', label: 'Электростанции' },
    { to: '/settings', label: 'Настройки' },
];

const isActive = (path: string) => route.path === path || route.path.startsWith(path);

</script>
