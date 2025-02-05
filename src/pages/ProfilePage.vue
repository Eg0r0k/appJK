<template>
    <div>
        <h2 class="text-3xl font-bold tracking-tight mb-4">Профиль</h2>

        <ProfileHeader />
        <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 mt-4">
            <Card class="col-span-1 sm:col-span-2 lg:col-span-4">
                <CardHeader>
                    <CardTitle>Статистика</CardTitle>
                </CardHeader>
                <CardContent class="pl-2 ">
                    <LineChart :data="activityData" :options="chartOptions" :categories="['tasks', 'requests']"
                        index="day" />
                </CardContent>
            </Card>
            <Card class="col-span-1 sm:col-span-2 lg:col-span-3">
                <Tabs default-value="contacts">
                    <CardHeader>
                        <TabsList class="grid w-full grid-cols-2">
                            <TabsTrigger value="contacts">Контакты</TabsTrigger>
                            <TabsTrigger value="sessions">Сессии</TabsTrigger>
                        </TabsList>
                    </CardHeader>
                    <CardContent>
                        <TabsContent value="contacts">
                            <div class="space-y-4">
                                <div class="flex items-center gap-4">
                                    <Avatar>
                                        <AvatarImage src="/avatars/01.png" :alt="authStore.username" />
                                        <AvatarFallback>{{ authStore.initials }}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p class="font-medium"> {{ authStore.fullName }}</p>
                                        <p class="text-sm text-muted-foreground">Оператор</p>
                                    </div>
                                </div>
                                <div class="space-y-2">
                                    <div class="flex items-center justify-between">
                                        <span class="text-sm text-muted-foreground">Отдел:</span>
                                        <Badge variant="outline">Энергонадзор</Badge>
                                    </div>
                                    <div class="flex items-center justify-between">
                                        <span class="text-sm text-muted-foreground">Телефон:</span>
                                        <a href="tel:+79991234567" class="text-sm hover:underline">+7 999 123-45-67</a>
                                    </div>

                                </div>
                            </div>

                        </TabsContent>

                        <TabsContent value="sessions">
                            <ScrollArea class="h-48">
                                <div class="space-y-2">
                                    <div v-for="session in activeSessions" :key="session.id"
                                        class="flex items-center justify-between  hover:bg-accent/50 transition-all rounded-lg  p-2">
                                        <div class="flex items-center gap-2">

                                            <div>
                                                <p class="text-sm font-medium">{{ session.location }}</p>
                                                <p class="text-xs text-muted-foreground">{{ session.ip }}</p>
                                            </div>
                                        </div>
                                        <Badge>{{ session.active ? 'Активна' : 'Завершена' }}</Badge>
                                    </div>
                                </div>
                            </ScrollArea>
                        </TabsContent>
                    </CardContent>
                </Tabs>
            </Card>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import ProfileHeader from '@/components/profile/ProfileHeader.vue';
import Card from '@/components/ui/card/Card.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import CardHeader from '@/components/ui/card/CardHeader.vue';
import CardTitle from '@/components/ui/card/CardTitle.vue';
import LineChart from '@/components/ui/chart-line/LineChart.vue';
import { ref } from 'vue';
import TabsTrigger from '@/components/ui/tabs/TabsTrigger.vue';
import TabsList from '@/components/ui/tabs/TabsList.vue';
import TabsContent from '@/components/ui/tabs/TabsContent.vue';
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue';
import Tabs from '@/components/ui/tabs/Tabs.vue';
import { useAuthStore } from '@/stores/authStore/auth';


const authStore = useAuthStore()

const activityData = ref([
    { day: 'Пн', tasks: 12, requests: 8 },
    { day: 'Вт', tasks: 15, requests: 10 },
    { day: 'Ср', tasks: 8, requests: 5 },
    { day: 'Чт', tasks: 20, requests: 15 },
    { day: 'Пт', tasks: 18, requests: 12 },
    { day: 'Сб', tasks: 10, requests: 7 },
    { day: 'Вс', tasks: 5, requests: 3 },
]);
const activeSessions = ref([
    { id: 1, device: 'Desktop', location: 'Москва', ip: '192.168.1.1', active: true },
    { id: 2, device: 'Mobile', location: 'Санкт-Петербург', ip: '192.168.1.2', active: false },
])


const chartOptions = ref({
    responsive: true,
    plugins: {

        tooltip: {
            enabled: true,
        },
    },
    scales: {
        y: {
            beginAtZero: true,
        },
        x: {

        }
    },

});
</script>