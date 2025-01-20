<template>
  <div>
    <h3 class="text-lg font-medium">Аккаунт</h3>
    <p class="text-sm text-muted-foreground">Обновите данные своего аккаунта, установите имя и дату рождения</p>
  </div>
  <Separator />
  <Form v-slot="{ setFieldValue }" :validation-schema="accountFormSchema" class="space-y-8">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Имя</FormLabel>
        <FormControl>
          <Input type="text" placeholder="Имя" v-bind="componentField" />
        </FormControl>
        <FormDescription>Имя пользователя.</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="fname">
      <FormItem>
        <FormLabel>Фамилия</FormLabel>
        <FormControl>
          <Input type="text" placeholder="Фамилия" v-bind="componentField" />
        </FormControl>
        <FormDescription>Фамилия пользователя.</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ field, value }" name="dob">
      <FormItem class="flex flex-col">
        <FormLabel>Дата рождения</FormLabel>
        <Popover>
          <PopoverTrigger as-child>
            <FormControl>
              <Button variant="outline" :class="cn(
                'w-[240px] justify-start text-left font-normal',
                !value && 'text-muted-foreground',
              )">
                <span>{{ value ? df.format(toDate(dateValue, getLocalTimeZone())) : "Выберите дату" }}</span>
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent class="p-0" side="top">
            <div class="p-3">
              <div class="flex gap-2">
                <Select :default-value="placeholder.month.toString()" @update:model-value="(v) => {
                  if (!v || !placeholder) return;
                  if (Number(v) === placeholder?.month) return;
                  placeholder = placeholder.set({
                    month: Number(v),
                  })
                }">
                  <SelectTrigger aria-label="Выберите месяц" class="w-[60%]">
                    <SelectValue placeholder="Выберите месяц" />
                  </SelectTrigger>
                  <SelectContent class="max-h-[200px]">
                    <SelectItem v-for="month in createYear({ dateObj: placeholder })" :key="month.toString()"
                      :value="month.month.toString()">
                      {{ formatter.custom(toDate(month), { month: 'long' }) }}
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Select :default-value="placeholder.year.toString()" @update:model-value="(v) => {
                  if (!v || !placeholder) return;
                  if (Number(v) === placeholder?.year) return;
                  placeholder = placeholder.set({
                    year: Number(v),
                  })
                }">
                  <SelectTrigger aria-label="Выберите год" class="w-[40%]">
                    <SelectValue placeholder="Выберите год" />
                  </SelectTrigger>
                  <SelectContent class="max-h-[200px]">
                    <SelectItem v-for="yearValue in years" :key="yearValue.toString()" :value="yearValue.toString()">
                      {{ yearValue }}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Calendar v-model:placeholder="placeholder" v-model="dateValue" calendar-label="Дата рождения" initial-focus
              :min-value="new CalendarDate(1900, 1, 1)" :max-value="today(getLocalTimeZone())" @update:model-value="(v: any) => {
                if (v) {
                  dateValue = v
                  setFieldValue('dob', toDate(v).toISOString())
                }
                else {
                  dateValue = undefined
                  setFieldValue('dob', undefined)
                }
              }" />
          </PopoverContent>
        </Popover>
        <FormDescription>Ваша дата рождения используется для расчета возраста.</FormDescription>
        <FormMessage />
      </FormItem>
      <input type="hidden" v-bind="field">
    </FormField>
    <div class="flex justify-start">
      <Button type="submit">
        Применить
      </Button>
    </div>
  </Form>
</template>

<script setup lang="ts">
import { Separator } from '@/components/ui/separator';
import FormItem from '../ui/form/FormItem.vue';
import FormLabel from '../ui/form/FormLabel.vue';
import FormControl from '../ui/form/FormControl.vue';
import Input from '../ui/input/Input.vue';
import { Form, FormField } from '../ui/form';
import FormDescription from '../ui/form/FormDescription.vue';
import FormMessage from '../ui/form/FormMessage.vue';
import Popover from '../ui/popover/Popover.vue';
import PopoverTrigger from '../ui/popover/PopoverTrigger.vue';
import Button from '../ui/button/Button.vue';
import { cn } from '@/lib/utils';
import { CalendarDate, DateFormatter, getLocalTimeZone, today } from '@internationalized/date';
import { toDate } from 'radix-vue/date';
import { ref, computed } from 'vue';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import PopoverContent from '../ui/popover/PopoverContent.vue';
import Calendar from '../ui/calendar/Calendar.vue';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { createYear } from 'radix-vue/date';
import { useDateFormatter } from 'radix-vue';

const df = new DateFormatter('ru-Ru', {
  dateStyle: 'long',
});
const dateValue = ref();
const placeholder = ref(today(getLocalTimeZone()));

const years = computed(() => {
  const startYear = 2025;
  const endYear = 1999;
  const yearsList = [];
  for (let year = startYear; year >= endYear; year--) {
    yearsList.push(year);
  }
  return yearsList;
});

const accountFormSchema = toTypedSchema(z.object({
  name: z.string({
    required_error: 'Обязятельное поле.',
  })
    .min(2, {
      message: 'Имя должно быть дленее 2 символов.'
    })
    .max(30, {
      message: 'Имя не должно быть дленее 30 символов.'
    }),
  fname: z.string({
    required_error: 'Обязятельное поле.',
  })
    .min(2, {
      message: 'Фамилия должна быть дленее 2 символов.'
    })
    .max(30, {
      message: 'Фамилия не должна быть дленее 30 символов.'
    }),
  dob: z.string().datetime().optional().refine(date => date !== undefined, 'Выберете действительную дату.'),
}));

const formatter = useDateFormatter('ru');
</script>