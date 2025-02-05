<template>
    <CardContent class="flex flex-col gap-6">
        <div class="h-48 mb-4">
            <DonutChart index="name" category="total" :data="data" :type="type" :colors="colors" class="mt-4" />
        </div>

        <div class="space-y-4">
            <div v-for="item in data" :key="item.name"
                class="flex items-center justify-between cursor-default  hover:bg-accent/50 transition-all rounded-lg p-2">
                <div class="flex items-center gap-3">
                    <div class="h-3 w-3 rounded-full" :style="{ backgroundColor: getColor(item.name) }" />
                    <span class="text-sm font-medium">{{ item.name }}</span>
                </div>
                <div class="flex items-center gap-4">
                    <span class="text-sm text-muted-foreground">
                        {{ item.total }} кВт·ч
                    </span>
                    <span class="text-sm w-12 text-right font-semibold">
                        {{ ((item.total / totalConsumption) * 100).toFixed(1) }}%
                    </span>
                </div>
            </div>
        </div>
    </CardContent>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import CardContent from '../ui/card/CardContent.vue'
import DonutChart from '../ui/chart-donut/DonutChart.vue'

interface ConsumptionData {
    name: string
    total: number
}

export type ConsumptionCategory =
    | 'Оборудование'
    | 'Освещение'
    | 'Отопление'
    | 'Кондиционирование'
interface Props {
    data: ConsumptionData[]
    colors: string[]
    type: 'pie' | 'donut'
}
const props = withDefaults(defineProps<Props>(), {
    type: 'pie',
    color: ['#3B82F6', '#10B981', '#F59E0B', '#6366F1']
})


const totalConsumption = computed<number>(() =>
    props.data.reduce((sum, item) => sum + item.total, 0)
)
const isConsumptionCategory = (category: string): category is ConsumptionCategory => {
    return ['Оборудование', 'Освещение', 'Отопление', 'Кондиционирование'].includes(category)
}

const getColor = (category: string): string => {
    if (!isConsumptionCategory(category)) return '#94A3B8'

    const colorMap: Record<ConsumptionCategory, string> = {
        'Оборудование': props.colors[0],
        'Освещение': props.colors[1],
        'Отопление': props.colors[2],
        'Кондиционирование': props.colors[3]
    }

    return colorMap[category]
}

</script>