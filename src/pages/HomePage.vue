<template>
    <div>
        <div class="flex justify-between mb-4">
            <h2 class="text-3xl font-bold tracking-tight">Дашборд</h2>
            <Button @click="downloadExcel">Скачать</Button>
        </div>
        <DashboardStats ref="dashboardStats" />
        <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 mt-4">
            <Card class="col-span-1 sm:col-span-2 lg:col-span-4">
                <CardHeader>
                    <CardTitle>Статистика</CardTitle>
                </CardHeader>
                <CardContent class="pl-2">
                    <DashboardOverview />
                </CardContent>
            </Card>
            <Card class="col-span-1 sm:col-span-2 lg:col-span-3">
                <CardHeader>
                    <CardTitle>Потребление</CardTitle>
                </CardHeader>
                <CardContent>
                    123
                </CardContent>
            </Card>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import ExcelJS from 'exceljs';
import DashboardOverview from '@/components/dashboard/DashboardOverview.vue';
import DashboardStats from '@/components/dashboard/DashboardStats.vue';
import Button from '@/components/ui/button/Button.vue';
import Card from '@/components/ui/card/Card.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import CardHeader from '@/components/ui/card/CardHeader.vue';
import CardTitle from '@/components/ui/card/CardTitle.vue';
import { isTauri } from '@tauri-apps/api/core';
import { useFileSaver } from '@/lib/useFileSaver';
const { saveFile } = useFileSaver();

const downloadExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Статистика');

    worksheet.addRow(['Показатель', 'Значение', 'Описание']);

    const cards = [
        { title: 'Общее энергопотребление', value: '12 345 кВт·ч', description: '+5% за последний месяц' },
        { title: 'Экономия энергии', value: '1 234 кВт·ч', description: 'Сэкономлено за последний месяц' },
    ];

    cards.forEach(card => {
        worksheet.addRow([card.title, card.value, card.description]);
    });

    const buffer = await workbook.xlsx.writeBuffer();
    await saveFile(buffer, {
        fileName: 'статистика.xlsx',
        fileType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        filters: [{ name: 'Excel Files', extensions: ['xlsx'] }],
    });
};
</script>