<template>
  <Sheet :open="open" @update:open="$emit('update:open', $event)">
    <SheetContent class=" overflow-auto">
      <SheetHeader>
        <SheetTitle>Редактирование электростанции</SheetTitle>
        <SheetDescription>Измените данные о выбранной электростанции.</SheetDescription>
      </SheetHeader>
      <div class="space-y-4 mt-4">
        <AspectRatio :ratio="16 / 9" class="bg-muted">
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/c0/Photo_by_Mosenergo_GES-1.jpg"
            alt="Photo by Drew Beamer" width="300" height="200" class="rounded-md object-cover w-full h-full" />
        </AspectRatio>
        <div>
          <Label for="name" class="text-sm text-muted-foreground">Название:</Label>
          <Input id="name" v-model="localStation.name" class="mt-1" />
        </div>
        <div>
          <Label for="address" class="text-sm text-muted-foreground">Адрес:</Label>
          <Input id="address" v-model="localStation.address" class="mt-1" />
        </div>
        <div>
          <Label for="status" class="text-sm text-muted-foreground">Статус:</Label>
          <Select v-model="localStation.status">
            <SelectTrigger id="status" class="mt-1">
              <SelectValue placeholder="Выберите статус" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="status in statusOptions" :key="status.value" :value="status.value">
                {{ status.label }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label for="generators" class="text-sm text-muted-foreground">Генераторы:</Label>
          <Input id="generators" v-model="localStation.generators" type="number" class="mt-1" min="0" max="10" />
        </div>
      </div>
      <div class="mt-6 flex gap-2">
        <Button @click="$emit('update:open', false)" variant="outline">Закрыть</Button>
        <Button @click="save">Сохранить</Button>
      </div>
    </SheetContent>
  </Sheet>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Station, StationStatus } from '@/types/station';
import AspectRatio from '../ui/aspect-ratio/AspectRatio.vue';

const props = defineProps<{
  open: boolean;
  station: Station | null;
}>();

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void;
  (e: 'save', station: Station): void;
}>();

const localStation = ref<Station>({
  id: '',
  name: '',
  address: '',
  power: 0,
  output: 0,
  generators: 0,
  status: StationStatus.Unknown,
});

const statusOptions = Object.values(StationStatus).map((status) => ({
  label: status,
  value: status,
}));

watch(
  () => props.station,
  (newStation) => {
    if (newStation) {
      localStation.value = { ...newStation };
    }
  },
  { immediate: true }
);

const save = () => {
  emit('save', localStation.value);
  emit('update:open', false);
};
</script>