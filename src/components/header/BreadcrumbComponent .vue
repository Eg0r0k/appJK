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
                    <template v-if="crumb.meta?.breadcrumbName">
                        <BreadcrumbLink v-if="index < crumbs.length - 1" as-child>
                            <RouterLink :to="crumb.path">
                                {{ typeof crumb.meta.breadcrumbName === 'function'
                                    ? crumb.meta.breadcrumbName(route)
                                    : crumb.meta.breadcrumbName }}
                            </RouterLink>
                        </BreadcrumbLink>
                        <BreadcrumbPage v-else>
                            {{ typeof crumb.meta.breadcrumbName === 'function'
                                ? crumb.meta.breadcrumbName(route)
                                : crumb.meta.breadcrumbName }}
                        </BreadcrumbPage>
                    </template>
                    <template v-else>
                        <BreadcrumbLink v-if="index < crumbs.length - 1" as-child>
                            <RouterLink :to="crumb.path">{{ crumb.name }}</RouterLink>
                        </BreadcrumbLink>
                        <BreadcrumbPage v-else>
                            {{ crumb.name }}
                        </BreadcrumbPage>
                    </template>
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
    return route.matched
        .filter(record => record.meta?.breadcrumbName || record.name)
        .map(record => ({
            ...record,
            path: record.path.includes(':')
                ? route.path
                : record.path,
            name: typeof record.meta?.breadcrumbName === 'function'
                ? record.meta.breadcrumbName(route)
                : record.meta?.breadcrumbName || record.name?.toString()
        }));
});
</script>