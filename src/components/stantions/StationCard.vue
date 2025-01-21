<template>
    <button @click="$emit('edit', station)"
        :class="cn('flex  flex-col items-start gap-3 rounded-lg border select-none p-4 text-left transition-all hover:bg-accent/60 bg-white dark:bg-transparent ')">

        <div class="flex items-center justify-between w-full">
            <div class="flex items-center gap-2">
                <div class="font-semibold truncate max-w-[240px] lg:max-w-[140px]">{{ station.name }}</div>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-battery-charging">
                    <path d="M15 7h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2" />
                    <path d="M6 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h1" />
                    <path d="m11 7-3 5h4l-3 5" />
                    <line x1="22" x2="22" y1="11" y2="13" />
                </svg>
            </div>
            <div class="text-xs px-2 py-1 rounded-full text-nowrap" :class="{
                'bg-red-200 text-red-800': station.status === StationStatus.Inactive,
                'bg-green-200 text-green-800': station.status === StationStatus.Active,
                'bg-yellow-200 text-yellow-800': station.status === StationStatus.Unknown,
                'bg-transparent border': station.status === StationStatus.NotUsed
            }">
                {{ station.status }}
            </div>
        </div>
        <div class="w-full border-t my-2"></div>
        <div class="w-full space-y-2">
            <div class="flex items-start justify-between">
                <span class="text-sm text-muted-foreground">Адрес:</span>
                <span class="text-sm font-medium text-right">{{ station.address }}</span>
            </div>
            <div class="flex items-center justify-between">
                <span class="text-sm text-muted-foreground">Мощность:</span>
                <span class="text-sm font-medium">{{ station.power }} МВт</span>
            </div>
            <div class="flex items-center justify-between">
                <span class="text-sm text-muted-foreground">Выработка:</span>
                <span class="text-sm font-medium">{{ station.output }} МВт/ч</span>
            </div>
            <div class="flex items-center justify-between">
                <span class="text-sm text-muted-foreground">Генераторы:</span>
                <span class="text-sm font-medium">{{ station.generators }}/5</span>
            </div>
        </div>
    </button>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils';
import { Station, StationStatus } from '@/types/station';

defineProps<{
    station: Station;
}>();

defineEmits<{
    (e: 'edit', station: Station): void;
}>();
</script>