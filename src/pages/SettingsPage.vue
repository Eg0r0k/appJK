<template>
    <div>
        <h2 class="text-3xl font-bold tracking-tight">
            Настройки
        </h2>
        <p class="text-muted-foreground">
            Здесь вы можете установить настройки для приложения и личную информацию.
        </p>
        <Separator class="my-6" />
        <div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside class="-mx-4 lg:w-1/5">
                <nav class="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 px-4 lg:pl-4">
                    <Button v-for="item in sidebarNavItems" :key="item.title" variant="ghost" as-child :class="cn(
                        'w-full justify-center lg:justify-start text-center lg:text-left',
                        {
                            'bg-muted hover:bg-muted': isActive(item.href),
                        }
                    )
                        ">
                        <router-link :to="item.href">
                            {{ item.title }}
                        </router-link>
                    </Button>
                </nav>
            </aside>
            <div class="flex-1 lg:max-w-2xl">
                <div class="space-y-6">
                    <router-view />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useRoute } from 'vue-router';

interface Item {
    title: string;
    href: string;
}

const sidebarNavItems: Item[] = [
    {
        title: 'Профиль',
        href: '/settings/profile',
    },
    {
        title: 'Аккаунт',
        href: '/settings/account',
    },
    {
        title: 'Отображение',
        href: '/settings/display',
    },
];
const route = useRoute();

const isActive = (href: string) => {
    return route.path === href;
};

</script>