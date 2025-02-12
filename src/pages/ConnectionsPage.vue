<template>
    <div>
        <h2 class="text-3xl font-bold tracking-tight mb-4" id="step1">
            Подключения
        </h2>
        <div class="flex gap-2 items-center mb-4">
            <Input v-model="searchQuery" placeholder="Поиск по названию..." class="h-8 w-[150px] lg:w-[250px]" />

            <Popover>
                <PopoverTrigger as-child>
                    <Button variant="outline" size="sm" class="h-8 border-dashed">
                        Сортировка по статусу
                        <template v-if="sortOrder !== 'none'">
                            <Separator orientation="vertical" class="mx-2 h-4" />
                            <Badge variant="secondary" class="rounded-sm px-1 font-normal">
                                {{ sortOrder === 'asc' ? 'А-Я' : 'Я-А' }}
                            </Badge>
                        </template>
                    </Button>
                </PopoverTrigger>
                <PopoverContent class="w-[200px] p-0" align="start">
                    <Command>
                        <CommandList>
                            <CommandGroup>
                                <CommandItem value="asc" @select="sortOrder = 'asc'">
                                    По возрастанию
                                </CommandItem>
                                <CommandItem value="desc" @select="sortOrder = 'desc'">
                                    По убыванию
                                </CommandItem>
                            </CommandGroup>
                            <CommandSeparator />
                            <CommandGroup>
                                <CommandItem value="none" @select="sortOrder = 'none'">
                                    Сбросить сортировку
                                </CommandItem>
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
        <div class="rounded border min-h-[400px] relative ">
            <div class="absolute inset-0 bg-background/50 backdrop-blur-[1px] z-10 transition-opacity duration-300"
                :class="isLoading ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'" />

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            <Checkbox :checked="isAllSelected" @update:checked="toggleSelectAll" />
                        </TableHead>
                        <TableHead>
                            ID
                            <!-- <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Button variant="ghost" size="sm" class=" h-8 data-[state=open]:bg-accent">
                                        <span> ID </span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start">
                                    <DropdownMenuItem>
                                        <ArrowUpIcon class="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                                        Asc
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <ArrowDownIcon class="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                                        Desc
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <EyeNoneIcon class="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                                        Hide
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu> -->
                        </TableHead>
                        <TableHead>Статус</TableHead>
                        <TableHead>Название</TableHead>
                        <TableHead>Дата</TableHead>
                        <TableHead>Адрес</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    <template v-if="isLoading">
                        <TableRow v-for="i in itemsPerPage" :key="`skeleton-${i}`" class="h-[40px]">
                            <TableCell v-for="(_, index) in 6" :key="index">
                                <Skeleton class="h-4 w-full" />
                            </TableCell>
                        </TableRow>
                    </template>

                    <template v-else>
                        <TableRow v-for="item in filteredData" :key="item.id"
                            class="cursor-pointer hover:bg-muted/50 transition-colors h-[40px]"
                            @click="goToDetail(item.id)">
                            <TableCell @click.stop>
                                <Checkbox :checked="selectedItems.includes(item.id)" />
                            </TableCell>
                            <TableCell>{{ item.id }}</TableCell>
                            <TableCell>
                                <Badge :variant="item.status === 'Активен' ? 'outline' : 'secondary'">
                                    {{ item.status }}
                                </Badge>
                            </TableCell>
                            <TableCell class="max-w-[400px]">
                                <div class="flex items-center gap-2  truncate font-medium">
                                    <Badge variant="outline" class="shrink-0">
                                        {{ item.type }}
                                    </Badge>
                                    <span class="truncate">
                                        {{ item.description }}
                                    </span>
                                </div>
                            </TableCell>
                            <TableCell>{{ item.date }}</TableCell>
                            <TableCell>{{ item.address }}</TableCell>
                            <TableCell class="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger as-child>
                                        <Button variant="ghost" class="h-8 w-8 p-0" @click.stop>
                                            ...
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem class="text-destructive" @click="deleteItem(item.id)">
                                            Удалить
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    </template>
                </TableBody>
            </Table>
        </div>

        <div class="flex items-center justify-between mt-4">
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

            <Pagination v-slot="{ page }" :total="totalItems" :sibling-count="1" show-edges :default-page="currentPage"
                @update:page="handlePageChange">
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
import { ref, computed, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
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
import Popover from '@/components/ui/popover/Popover.vue';
import Input from '@/components/ui/input/Input.vue';
import PopoverTrigger from '@/components/ui/popover/PopoverTrigger.vue';
import Button from '@/components/ui/button/Button.vue';
import Separator from '@/components/ui/separator/Separator.vue';
import PopoverContent from '@/components/ui/popover/PopoverContent.vue';
import Command from '@/components/ui/command/Command.vue';
import CommandList from '@/components/ui/command/CommandList.vue';
import CommandGroup from '@/components/ui/command/CommandGroup.vue';
import CommandItem from '@/components/ui/command/CommandItem.vue';
import CommandSeparator from '@/components/ui/command/CommandSeparator.vue';

// Моковые данные с обновленной структурой
const mockDatabase = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    address: `ул. Примерная, ${i + 1}`,
    status: i % 2 === 0 ? 'Активен' : 'Неактивен',
    type: ['Авария', 'Техработы', 'Подключение'][i % 3],
    description: `Очень длинное описание задачи ${i + 1}, которое должно быть обрезано при превышении максимальной ширины контейнера. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    date: `2023-10-${String(i + 1).padStart(2, '0')}`
}));

const data = ref<typeof mockDatabase>([]);
const totalItems = ref(0);
const isLoading = ref(false);
const itemsPerPage = ref(10);
const currentPage = ref(1);
const selectedItems = ref<number[]>([]);
const cachedData = ref<Record<number, typeof mockDatabase>>({});

const searchQuery = ref('');
const sortOrder = ref<'asc' | 'desc' | 'none'>('none');

const filteredData = computed(() => {
    let result = [...data.value];

    // Фильтрация по поиску
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        result = result.filter(item =>
            item.description.toLowerCase().includes(query)
        );
    }

    // Сортировка по статусу
    if (sortOrder.value !== 'none') {
        result.sort((a, b) => {
            const compare = a.status.localeCompare(b.status);
            return sortOrder.value === 'asc' ? compare : -compare;
        });
    }

    return result;
});




// Загрузка данных с кэшированием
const fetchMockData = async (page: number, perPage: number) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const start = (page - 1) * perPage;
    const end = start + perPage;
    return mockDatabase.slice(start, end);
};

const loadData = async () => {
    try {
        isLoading.value = true;

        // Корректировка номера страницы
        const maxPage = Math.ceil(mockDatabase.length / itemsPerPage.value);
        currentPage.value = Math.min(Math.max(currentPage.value, 1), maxPage);

        if (!cachedData.value[currentPage.value]) {
            const response = await fetchMockData(currentPage.value, itemsPerPage.value);
            cachedData.value[currentPage.value] = response;
            data.value = response;
        } else {
            data.value = cachedData.value[currentPage.value];
        }

        totalItems.value = mockDatabase.length;
    } catch (error) {
        console.error('Ошибка загрузки:', error);
    } finally {
        isLoading.value = false;
    }
};
const deleteItem = (id: number) => {
    data.value = data.value.filter(item => item.id !== id);
};

const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage.value));
const paginatedData = computed(() => data.value);

// Навигация
const router = useRouter();
const goToDetail = (id: number) => {
    router.push({ name: 'ConnectionDetail', params: { id } });
};

// Управление пагинацией
const handlePageChange = (newPage: number) => currentPage.value = newPage;
const goToFirstPage = () => currentPage.value = 1;
const goToLastPage = () => currentPage.value = totalPages.value;
const previousPage = () => currentPage.value > 1 && currentPage.value--;
const nextPage = () => currentPage.value < totalPages.value && currentPage.value++;

const setItemsPerPage = (value: number) => {
    itemsPerPage.value = value;
    const maxPage = Math.ceil(mockDatabase.length / value);
    currentPage.value = Math.min(currentPage.value, maxPage);
    cachedData.value = {};
};

// Выделение элементов
const isAllSelected = computed(() =>
    paginatedData.value.every(item => selectedItems.value.includes(item.id))
);
const toggleSelectAll = (checked: boolean) => {
    selectedItems.value = checked ? paginatedData.value.map(item => item.id) : [];
};

// Инициализация
onMounted(loadData);
watch([currentPage, itemsPerPage], loadData);
</script>
