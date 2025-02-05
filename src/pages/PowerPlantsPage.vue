<template>
    <div>
        <div class="mb-8">
            <h2 class="text-3xl font-bold tracking-tight mb-4">Электростанции</h2>
            <StationFilters v-model:searchQuery="searchQuery" v-model:sortOrder="sortOrder"
                v-model:selectedStatuses="selectedStatuses" @reset-filters="resetFilters" />
        </div>

        <div v-if="isLoading" class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
            <Skeleton class="w-full h-[203px]" v-for="i in 12" :key="`skeleton-${i}`" />
        </div>

        <div v-else>

            <div v-auto-animate class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
                <StationCard v-for="station in filteredStations" :key="station.id" :station="station"
                    @edit="openSheet" />
                <div v-if="filteredStations.length === 0" class="text-center text-muted-foreground py-12 col-span-4">
                    Не найдено электростанций по заданным фильтрам
                </div>

            </div>
        </div>

        <StationSheet v-model:open="isSheetOpen" :station="selectedStation" @save="saveChanges" />
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Station, StationStatus } from '@/types/station';
import StationFilters from '@/components/stantions/StationFilters.vue';
import StationCard from '@/components/stantions/StationCard.vue';
import StationSheet from '@/components/stantions/StationSheet.vue';
import Skeleton from '@/components/ui/skeleton/Skeleton.vue';
import { toast } from 'vue-sonner';

const stations = ref<Station[]>([]);
const isLoading = ref(true);
const isSheetOpen = ref(false);
const selectedStation = ref<Station | null>(null);

const searchQuery = ref('');
const sortOrder = ref<'asc' | 'desc' | 'none'>('none');
const selectedStatuses = ref<Set<string>>(new Set());

const loadStations = async () => {
    isLoading.value = true;
    setTimeout(() => {
        stations.value = [
            { id: '1', name: 'Электростанция 1', address: 'ул. Ленина, д. 10', power: 100, output: 50, generators: 3, status: StationStatus.Active },
            { id: '2', name: 'Электростанция 2', address: 'ул. Пушкина, д. 20', power: 200, output: 100, generators: 4, status: StationStatus.NotUsed },
            { id: '3', name: 'Электростанция 3', address: 'ул. Гагарина, д. 30', power: 300, output: 150, generators: 5, status: StationStatus.Unknown },
            { id: '4', name: 'Электростанция 4', address: 'ул. Гагарина, д. 31', power: 300, output: 150, generators: 5, status: StationStatus.Active },
            { id: '5', name: 'Электростанция 5', address: 'ул. Гагарина, д. 31', power: 300, output: 150, generators: 5, status: StationStatus.Inactive },
        ];
        isLoading.value = false;
    }, 1000);
};

const filteredStations = computed(() => {
    const normalize = (str: string) => str.replace(/[.,]/g, '').toLowerCase().trim();
    const query = normalize(searchQuery.value);

    let filtered = stations.value.filter(station => {
        const normalizedName = normalize(station.name);
        const normalizedAddress = normalize(station.address);
        return normalizedName.includes(query) || normalizedAddress.includes(query);
    });

    if (selectedStatuses.value.size > 0) {
        filtered = filtered.filter(station => selectedStatuses.value.has(station.status));
    }

    if (sortOrder.value === 'asc') {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder.value === 'desc') {
        filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    return filtered;
});

const openSheet = (station: Station) => {
    selectedStation.value = { ...station };
    isSheetOpen.value = true;
};

const saveChanges = (updatedStation: Station) => {
    const index = stations.value.findIndex(s => s.id === updatedStation.id);
    if (index !== -1) {
        stations.value[index] = updatedStation;
    }
    toast.success('Успешно сохранено');
    isSheetOpen.value = false;
};

const resetFilters = () => {
    searchQuery.value = '';
    sortOrder.value = 'none';
    selectedStatuses.value.clear();
};

loadStations();
</script>