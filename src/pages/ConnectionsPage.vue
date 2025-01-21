<template>
    <div>
        <h2 class="text-3xl font-bold tracking-tight mb-4">
            Подключения
        </h2>

        <!-- Таблица -->
        <div class="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            <Checkbox :checked="isAllSelected" @update:checked="toggleSelectAll" />
                        </TableHead>
                        <TableHead>
                            <Input v-model="filters.address" placeholder="Фильтр по адресу" />
                        </TableHead>
                        <TableHead>
                            <Input v-model="filters.status" placeholder="Фильтр по статусу" />
                        </TableHead>
                        <TableHead>
                            <Input v-model="filters.name" placeholder="Фильтр по названию" />
                        </TableHead>
                        <TableHead>
                            <Input v-model="filters.date" placeholder="Фильтр по дате" />
                        </TableHead>
                        <TableHead>
                            <Input v-model="filters.id" placeholder="Фильтр по ID" />
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="item in paginatedData" :key="item.id">
                        <TableCell>
                            <Checkbox :checked="selectedItems.includes(item.id)"
                                @update:checked="(checked) => toggleSelectItem(item.id, checked)" />
                        </TableCell>
                        <TableCell>{{ item.address }}</TableCell>
                        <TableCell>{{ item.status }}</TableCell>
                        <TableCell>{{ item.name }}</TableCell>
                        <TableCell>{{ item.date }}</TableCell>
                        <TableCell>{{ item.id }}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>

        <!-- Пагинация и управление строками -->
        <div class="flex items-center justify-between mt-4">
            <!-- Dropdown для выбора количества строк на странице -->
            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <Button variant="outline">
                        {{ itemsPerPage }} строк на странице
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem @click="setItemsPerPage(10)">10</DropdownMenuItem>
                    <DropdownMenuItem @click="setItemsPerPage(20)">20</DropdownMenuItem>
                    <DropdownMenuItem @click="setItemsPerPage(30)">30</DropdownMenuItem>
                    <DropdownMenuItem @click="setItemsPerPage(40)">40</DropdownMenuItem>
                    <DropdownMenuItem @click="setItemsPerPage(50)">50</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>



            <!-- Пагинация -->
            <Pagination v-slot="{ page }" :total="filteredData.length" :sibling-count="1" show-edges
                :default-page="currentPage" @update:page="handlePageChange">
                <PaginationList v-slot="{ items }" class="flex items-center gap-1">
                    <PaginationFirst @click="goToFirstPage" />
                    <PaginationPrev @click="previousPage" />
                    <PaginationNext @click="nextPage" />
                    <PaginationLast @click="goToLastPage" />
                </PaginationList>
            </Pagination>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Pagination,
    PaginationFirst,
    PaginationLast,
    PaginationList,
    PaginationNext,
    PaginationPrev,
} from '@/components/ui/pagination';
import DropdownMenu from '@/components/ui/dropdown-menu/DropdownMenu.vue';
import DropdownMenuTrigger from '@/components/ui/dropdown-menu/DropdownMenuTrigger.vue';
import DropdownMenuContent from '@/components/ui/dropdown-menu/DropdownMenuContent.vue';
import DropdownMenuItem from '@/components/ui/dropdown-menu/DropdownMenuItem.vue';

// Пример данных
const data = ref([
    { id: 1, address: 'ул. Ленина, 10', status: 'Активен', name: 'Подключение 1', date: '2023-10-01' },
    { id: 2, address: 'ул. Пушкина, 5', status: 'Неактивен', name: 'Подключение 2', date: '2023-10-02' },
    { id: 3, address: 'ул. Гагарина, 15', status: 'Активен', name: 'Подключение 3', date: '2023-10-03' },
    { id: 4, address: 'ул. Садовая, 20', status: 'Неактивен', name: 'Подключение 4', date: '2023-10-04' },
    { id: 5, address: 'ул. Мира, 30', status: 'Активен', name: 'Подключение 5', date: '2023-10-05' },
    { id: 6, address: 'ул. Лесная, 40', status: 'Неактивен', name: 'Подключение 6', date: '2023-10-06' },
    { id: 7, address: 'ул. Центральная, 50', status: 'Активен', name: 'Подключение 7', date: '2023-10-07' },
    { id: 8, address: 'ул. Молодежная, 60', status: 'Неактивен', name: 'Подключение 8', date: '2023-10-08' },
    { id: 9, address: 'ул. Школьная, 70', status: 'Активен', name: 'Подключение 9', date: '2023-10-09' },
    { id: 10, address: 'ул. Заречная, 80', status: 'Неактивен', name: 'Подключение 10', date: '2023-10-10' },
]);

const filters = ref({
    address: '',
    status: '',
    name: '',
    date: '',
    id: '',
});

const filteredData = computed(() => {
    return data.value.filter(item => {
        return (
            item.address.toLowerCase().includes(filters.value.address.toLowerCase()) &&
            item.status.toLowerCase().includes(filters.value.status.toLowerCase()) &&
            item.name.toLowerCase().includes(filters.value.name.toLowerCase()) &&
            item.date.toLowerCase().includes(filters.value.date.toLowerCase()) &&
            item.id.toString().includes(filters.value.id.toLowerCase())
        );
    });
});

const itemsPerPage = ref(10 );
const currentPage = ref(1);
const pageInput = ref(currentPage.value);

const totalPages = computed(() => Math.ceil(filteredData.value.length / itemsPerPage.value));

const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return filteredData.value.slice(start, end);
});

const handlePageChange = (newPage: number) => {
    currentPage.value = newPage;
    pageInput.value = newPage;
};

const goToFirstPage = () => {
    currentPage.value = 1;
    pageInput.value = 1;
};

const goToLastPage = () => {
    currentPage.value = totalPages.value;
    pageInput.value = totalPages.value;
};

const previousPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
        pageInput.value = currentPage.value;
    }
};

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
        pageInput.value = currentPage.value;
    }
};

const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
        pageInput.value = page;
    }
};

// Установка количества строк на странице
const setItemsPerPage = (value: number) => {
    itemsPerPage.value = value;
    currentPage.value = 1; // Сброс на первую страницу
};

// Выбор элементов
const selectedItems = ref<number[]>([]);

const toggleSelectItem = (id: number, checked: boolean) => {
    if (checked) {
        selectedItems.value.push(id);
    } else {
        selectedItems.value = selectedItems.value.filter(item => item !== id);
    }
};

const isAllSelected = computed(() => {
    return paginatedData.value.every(item => selectedItems.value.includes(item.id));
});

const toggleSelectAll = (checked: boolean) => {
    if (checked) {
        selectedItems.value = paginatedData.value.map(item => item.id);
    } else {
        selectedItems.value = [];
    }
};

// Следим за изменением страницы и обновляем pageInput
watch(currentPage, (newPage) => {
    pageInput.value = newPage;
});
</script>

<style lang="scss" scoped></style>