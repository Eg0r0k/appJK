<template>
    <div class="p-6">
        <h2 class="text-2xl font-bold mb-4">Детали подключения #{{ $route.params.id }}</h2>
        <div v-if="isLoading" class="space-y-4">
            <Skeleton class="h-4 w-[200px]" />
            <Skeleton class="h-4 w-[300px]" />
            <Skeleton class="h-4 w-[250px]" />
        </div>
        <div v-else-if="connection" class="space-y-2">
            <p>ID: {{ connection.id }}</p>
            <p>Статус: {{ connection.status }}</p>
            <p>Название: {{ connection.name }}</p>
            <p>Дата: {{ connection.date }}</p>
            <p>Адрес: {{ connection.address }}</p>
        </div>
        <div v-else class="text-red-500">
            Подключение не найдено
        </div>
        <Button class="mt-4" @click="$router.go(-1)">Назад</Button>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

interface Connection {
    id: number;
    address: string;
    status: string;
    name: string;
    date: string;
}

const route = useRoute();
const connection = ref<Connection | null>(null);
const isLoading = ref(true);

const fetchConnection = async (id: number) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
        id,
        address: `ул. Примерная, ${id}`,
        status: id % 2 === 0 ? 'Активен' : 'Неактивен',
        name: `Подключение ${id}`,
        date: `2023-10-${String(id).padStart(2, '0')}`
    };
};

onMounted(async () => {
    try {
        const id = Number(route.params.id);
        connection.value = await fetchConnection(id);
    } catch (error) {
        console.error('Ошибка загрузки:', error);
    } finally {
        isLoading.value = false;
    }
});
</script>