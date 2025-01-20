<template>
  <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    <Card v-for="(card, index) in cards" :key="index">
      <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-sm font-medium">
          {{ card.title }}
        </CardTitle>
        <component :is="card.icon" class="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">
          {{ card.value }}
        </div>
        <p class="text-xs text-muted-foreground">
          {{ card.description }}
        </p>
      </CardContent>
    </Card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
const cards = ref([
  {
    title: 'Общее энергопотребление',
    value: '12 345 кВт·ч',
    description: '+5% за последний месяц',
    icon: 'svg-path-icon-1',
  },
  {
    title: 'Экономия энергии',
    value: '1 234 кВт·ч',
    description: 'Сэкономлено за последний месяц',
    icon: 'svg-path-icon-2',
  },
  {
    title: 'Пиковое потребление',
    value: '2 345 кВт·ч',
    description: 'Зафиксировано сегодня',
    icon: 'svg-path-icon-3',
  },
  {
    title: 'Снижение выбросов CO₂',
    value: '123 тонны',
    description: 'За последний год',
    icon: 'svg-path-icon-4',
  },
]);
</script>