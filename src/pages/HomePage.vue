<template>
    <div id="step1">
        <div class="flex justify-between mb-4">
            <h2 class="text-3xl font-bold tracking-tight">Обзор</h2>

            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger as-child>
                        <Button id="step3" @click="downloadExcel">Скачать</Button>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                        <p>Сформировать отчет в формате Excel</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
        <DashboardStats ref="dashboardStats" id="step2" />
        <div id="step4" class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 mt-4">
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
                <DashboardConsumption :data="consumptionData" :colors="CHART_COLORS" type="pie" />
            </Card>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue';
import ExcelJS from 'exceljs';
import DashboardOverview from '@/components/dashboard/DashboardOverview.vue';
import DashboardStats from '@/components/dashboard/DashboardStats.vue';
import Button from '@/components/ui/button/Button.vue';
import Card from '@/components/ui/card/Card.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import CardHeader from '@/components/ui/card/CardHeader.vue';
import CardTitle from '@/components/ui/card/CardTitle.vue';
import { useFileSaver } from '@/lib/useFileSaver';
import Tooltip from '@/components/ui/tooltip/Tooltip.vue';
import TooltipContent from '@/components/ui/tooltip/TooltipContent.vue';
import TooltipProvider from '@/components/ui/tooltip/TooltipProvider.vue';
import TooltipTrigger from '@/components/ui/tooltip/TooltipTrigger.vue';
import DashboardConsumption from '@/components/dashboard/DashboardConsumption.vue';
import { driver } from "driver.js";
import router from '@/router';

const { saveFile } = useFileSaver();


const driverObj = driver({
    showProgress: true,
    steps: [
        {
            element: '#step1',
            popover: { title: 'Привет!', description: 'Это приложение в котором вы будете у нас работать' },
        },
        {
            element: '#step2',
            popover: { title: '', description: 'Здесь вы можете отслеживать статистику по электростанциям за выбранный период' },
        },
        {
            element: '#step3',
            popover: { title: 'Скачивание отчетов', description: "Нажав на эту кнопку вы можете сформировать отчет за выбранный период в формате Excel " }
        },
        {
            element: '#step4',
            popover: {
                title: 'Графики', description: "Здесь вы можете удобно просмотреть статистику", onNextClick: () => {
                    driverObj.moveNext();
                    router.push("/profile")
                }
            }
        }
        
    ]
});



interface ConsumptionData {
    name: string
    total: number
}

const CHART_COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#6366F1']

const consumptionData: Ref<ConsumptionData[]> = ref([
    { name: 'Оборудование', total: 2450 },
    { name: 'Освещение', total: 1425 },
    { name: 'Отопление', total: 1890 },
    { name: 'Кондиционирование', total: 980 }
])



const downloadExcel = async (): Promise<void> => {
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
        fileName: "stat",
        fileType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        filters: [{ name: "Excel Files", extensions: ["xlsx"] }]
    });
};

onMounted(() => {
    driverObj.drive()
})

</script>