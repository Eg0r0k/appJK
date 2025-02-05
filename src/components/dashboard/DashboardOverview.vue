<template>
    <div class="w-full">
        <BarChart :data="data" :categories="['total']" :index="'name'" :rounded-corners="4" />
    </div>
</template>
<script setup lang="ts">
import BarChart from '../ui/chart-bar/BarChart.vue';


const data = [
    { name: 'Янв', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: 'Фев', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: 'Мар', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: 'Апр', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: 'Май', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: 'Июн', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: 'Июл', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: 'Авг', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: 'Сеп', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: 'Окт', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: 'Ноя', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: 'Дек', total: Math.floor(Math.random() * 5000) + 1000 },
]
</script>
