<template>
    <Breadcrumb>
        <BreadcrumbList>
            <BreadcrumbItem v-if="isHome">
                <BreadcrumbPage>{{ ROUTE_NAMES.HOME }}</BreadcrumbPage>
            </BreadcrumbItem>

            <template v-else>
                <BreadcrumbItem>
                    <BreadcrumbLink as-child>
                        <RouterLink to="/">{{ ROUTE_NAMES.HOME }}</RouterLink>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />

                <BreadcrumbItem v-for="(crumb, index) in crumbs" :key="index">
                    <BreadcrumbLink v-if="index < crumbs.length - 1" as-child>
                        <RouterLink :to="crumb.path">{{ crumb.name }}</RouterLink>
                    </BreadcrumbLink>
                    <BreadcrumbPage v-else>
                        {{ crumb.name }}
                    </BreadcrumbPage>
                    <BreadcrumbSeparator v-if="index < crumbs.length - 1" />
                </BreadcrumbItem>
            </template>
        </BreadcrumbList>
    </Breadcrumb>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { ROUTE_NAMES } from '@/router';

const route = useRoute();

const isHome = computed(() => route.path === '/');

const crumbs = computed(() => {
    const matchedRoutes = route.matched;

    return matchedRoutes.map((matchedRoute) => {
        return {
            name: matchedRoute.meta?.breadcrumbName || matchedRoute.name || matchedRoute.path,
            path: matchedRoute.path,
        };
    });
});
</script>