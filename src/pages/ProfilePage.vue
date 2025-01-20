<template>
    <div>
        <h2 class="text-3xl font-bold tracking-tight mb-4">Профиль</h2>

        <ProfileHeader />
        <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 mt-4">
            <Card class="col-span-1 sm:col-span-2 lg:col-span-4">
                <CardHeader>
                    <CardTitle>Статистика</CardTitle>
                </CardHeader>
                <CardContent class="pl-2">
                    <LineChart :data="activityData" :options="chartOptions" :categories="['tasks']" index="day" />
                </CardContent>
            </Card>
            <Card class="col-span-1 sm:col-span-2 lg:col-span-3">
                <CardHeader>
                    <CardTitle>Заявки</CardTitle>
                </CardHeader>
                <CardContent>
                    Хз что тут сделать
                </CardContent>
            </Card>
        </div>
    </div>
</template>

<script setup lang="ts">

import ProfileHeader from '@/components/profile/ProfileHeader.vue';
import Card from '@/components/ui/card/Card.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import CardHeader from '@/components/ui/card/CardHeader.vue';
import CardTitle from '@/components/ui/card/CardTitle.vue';
import LineChart from '@/components/ui/chart-line/LineChart.vue';
import { ref } from 'vue';


const activityData = ref([
    { day: 'Пн', tasks: 12, requests: 8 },
    { day: 'Вт', tasks: 15, requests: 10 },
    { day: 'Ср', tasks: 8, requests: 5 },
    { day: 'Чт', tasks: 20, requests: 15 },
    { day: 'Пт', tasks: 18, requests: 12 },
    { day: 'Сб', tasks: 10, requests: 7 },
    { day: 'Вс', tasks: 5, requests: 3 },
]);


const chartOptions = ref({
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },

    },
});
</script>