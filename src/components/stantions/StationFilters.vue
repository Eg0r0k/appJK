<template>
    <div class="flex flex-col gap-2 mb-4 sm:flex-row items-start ">
        <Input v-model="localSearchQuery" placeholder="Поиск..." class="h-8 w-[250px]" />

        <Popover>
            <PopoverTrigger as-child>
                <Button variant="outline" size="sm" class="h-8 border-dashed">
                    Сортировка
                    <template v-if="sortOrder !== 'none'">
                        <Separator orientation="vertical" class="mx-2 h-4" />
                        <Badge variant="secondary" class="rounded-sm px-1 font-normal">
                            {{ sortOrder === 'asc' ? 'По возрастанию' : 'По убыванию' }}
                        </Badge>
                    </template>
                </Button>
            </PopoverTrigger>
            <PopoverContent class="w-[200px] p-0" align="start">
                <Command>
                    <CommandList>
                        <CommandGroup>
                            <CommandItem value="asc" @select="emit('update:sortOrder', 'asc')">
                                <div :class="cn(
                                    'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                                    sortOrder === 'asc'
                                        ? 'bg-primary text-primary-foreground'
                                        : 'opacity-50 [&_svg]:invisible'
                                )">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round">
                                        <path d="M20 6 9 17l-5-5"></path>
                                    </svg>
                                </div>
                                <span>По возрастанию</span>
                            </CommandItem>
                            <CommandItem value="desc" @select="emit('update:sortOrder', 'desc')">
                                <div :class="cn(
                                    'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                                    sortOrder === 'desc'
                                        ? 'bg-primary text-primary-foreground'
                                        : 'opacity-50 [&_svg]:invisible'
                                )">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round">
                                        <path d="M20 6 9 17l-5-5"></path>
                                    </svg>
                                </div>
                                <span>По убыванию</span>
                            </CommandItem>
                        </CommandGroup>
                        <template v-if="sortOrder !== 'none'">
                            <CommandSeparator />
                            <CommandGroup>
                                <CommandItem value="none" class="justify-center text-center"
                                    @select="emit('update:sortOrder', 'none')">
                                    Сбросить сортировку
                                </CommandItem>
                            </CommandGroup>
                        </template>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>

        <Popover>
            <PopoverTrigger as-child>
                <Button variant="outline" size="sm" class="h-8 border-dashed">
                    Статус
                    <template v-if="selectedStatuses.size > 0">
                        <Separator orientation="vertical" class="mx-2 h-4" />
                        <Badge variant="secondary" class="rounded-sm px-1 font-normal lg:hidden">
                            {{ selectedStatuses.size }}
                        </Badge>
                        <div class="hidden space-x-1 lg:flex">
                            <Badge v-if="selectedStatuses.size > 2" variant="secondary"
                                class="rounded-sm px-1 font-normal">
                                {{ selectedStatuses.size }} выбрано
                            </Badge>
                            <template v-else>
                                <Badge v-for="status in statusOptions.filter((option) =>
                                    selectedStatuses.has(option.value)
                                )" :key="status.value" variant="secondary" class="rounded-sm px-1 font-normal">
                                    {{ status.label }}
                                </Badge>
                            </template>
                        </div>
                    </template>
                </Button>
            </PopoverTrigger>
            <PopoverContent class="w-[200px] p-0" align="start">
                <Command>
                    <CommandList>
                        <CommandEmpty>Ничего не найдено.</CommandEmpty>
                        <CommandGroup>
                            <CommandItem v-for="status in statusOptions" :key="status.value" :value="status"
                                @select="toggleStatus(status.value)">
                                <div :class="cn(
                                    'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                                    selectedStatuses.has(status.value)
                                        ? 'bg-primary text-primary-foreground'
                                        : 'opacity-50 [&_svg]:invisible'
                                )">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round">
                                        <path d="M20 6 9 17l-5-5" />
                                    </svg>
                                </div>
                                <span>{{ status.label }}</span>
                            </CommandItem>
                        </CommandGroup>
                        <template v-if="selectedStatuses.size > 0">
                            <CommandSeparator />
                            <CommandGroup>
                                <CommandItem value="reset" class="justify-center text-center"
                                    @select="emit('update:selectedStatuses', new Set())">
                                    Сбросить фильтры
                                </CommandItem>
                            </CommandGroup>
                        </template>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>

        <Button v-if="isAnyFilterActive" variant="outline" size="sm" class="h-8" @click="$emit('reset-filters')">
            Сбросить
        </Button>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
    CommandSeparator,
} from '@/components/ui/command';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { StationStatus } from '@/types/station';

const props = defineProps<{
    searchQuery: string;
    sortOrder: 'asc' | 'desc' | 'none';
    selectedStatuses: Set<string>;
}>();

const emit = defineEmits<{
    (e: 'update:searchQuery', value: string): void;
    (e: 'update:sortOrder', value: 'asc' | 'desc' | 'none'): void;
    (e: 'update:selectedStatuses', value: Set<string>): void;
    (e: 'reset-filters'): void;
}>();


const localSearchQuery = ref(props.searchQuery);

watch(localSearchQuery, (newValue) => {
    emit('update:searchQuery', newValue);
});

watch(
    () => props.searchQuery,
    (newValue) => {
        localSearchQuery.value = newValue;
    }
);

const statusOptions = Object.values(StationStatus).map((status) => ({
    label: status,
    value: status,
}));
const isAnyFilterActive = computed(() => {
    return props.searchQuery !== '' || props.sortOrder !== 'none' || props.selectedStatuses.size > 0;
});

const toggleStatus = (status: string) => {
    const newStatuses = new Set(props.selectedStatuses);
    if (newStatuses.has(status)) {
        newStatuses.delete(status);
    } else {
        newStatuses.add(status);
    }
    emit('update:selectedStatuses', newStatuses);
};
</script>