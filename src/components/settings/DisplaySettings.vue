<template>
    <div>
        <h3 class="text-lg font-medium">
            Отображение
        </h3>
        <p class="text-sm text-muted-foreground">
            Настройте отображение в приложение под себя.
        </p>
    </div>
    <Separator />
    <form class="space-y-8" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="font">
            <FormItem>
                <FormLabel>Шрифт</FormLabel>
                <div class="w-[200px]">
                    <FormControl>
                        <Select v-bind="componentField">
                            <SelectTrigger>
                                <SelectValue placeholder="Select a verified email to display" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="inter">
                                        Inter
                                    </SelectItem>
                                    <SelectItem value="manrope">
                                        Manrope
                                    </SelectItem>
                                    <SelectItem value="system">
                                        System
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </FormControl>
                    <ChevronDownIcon class="pointer-events-none absolute right-3 top-2.5 h-4 w-4 opacity-50" />
                </div>
                <FormDescription>
                    Выберете шрифт в приложении.
                </FormDescription>
                <FormMessage />
            </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" type="radio" name="theme">
            <FormItem class="space-y-1">
                <FormLabel>Theme</FormLabel>
                <FormDescription>
                    Выберете тему в приложении.
                </FormDescription>
                <FormMessage />

                <RadioGroup class="grid max-w-md grid-cols-2 gap-8 pt-2" v-bind="componentField">
                    <FormItem>
                        <FormLabel class="[&:has([data-state=checked])>div]:border-primary">
                            <FormControl>
                                <RadioGroupItem value="light" class="sr-only" />
                            </FormControl>
                            <div class="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                                <div class="space-y-2 rounded-sm bg-[#f9fbfc] p-2">
                                    <div class="space-y-2 rounded-md bg-white p-2 shadow-sm">
                                        <div class="h-2 w-20 rounded-lg bg-[#f1f5f9]" />
                                        <div class="h-2 w-[100px] rounded-lg bg-[#f1f5f9]" />
                                    </div>
                                    <div class="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                                        <div class="h-4 w-4 rounded-full bg-[#3972ec]" />
                                        <div class="h-2 w-[100px] rounded-lg bg-[#f1f5f9]" />
                                    </div>
                                    <div class="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                                        <div class="h-4 w-4 rounded-full bg-[#3972ec]" />
                                        <div class="h-2 w-[100px] rounded-lg bg-[#f1f5f9]" />
                                    </div>
                                </div>
                            </div>
                            <span class="block w-full p-2 text-center font-normal">
                                Light
                            </span>
                        </FormLabel>
                    </FormItem>
                    <FormItem>
                        <FormLabel class="[&:has([data-state=checked])>div]:border-primary">
                            <FormControl>
                                <RadioGroupItem value="dark" class="sr-only" />
                            </FormControl>
                            <div
                                class="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                                <div class="space-y-2 rounded-sm bg-[#0a0a0a] p-2">
                                    <div class="space-y-2 rounded-md bg-[#262626] p-2 shadow-sm">
                                        <div class="h-2 w-20 rounded-lg bg-[#fafafa]" />
                                        <div class="h-2 w-[100px] rounded-lg bg-[#fafafa]" />
                                    </div>
                                    <div class="flex items-center space-x-2 rounded-md bg-[#262626] p-2 shadow-sm">
                                        <div class="h-4 w-4 rounded-full bg-[#fafafa]" />
                                        <div class="h-2 w-[100px] rounded-lg bg-[#fafafa]" />
                                    </div>
                                    <div class="flex items-center space-x-2 rounded-md bg-[#262626] p-2 shadow-sm">
                                        <div class="h-4 w-4 rounded-full bg-[#fafafa]" />
                                        <div class="h-2 w-[100px] rounded-lg bg-[#fafafa]" />
                                    </div>
                                </div>
                            </div>
                            <span class="block w-full p-2 text-center font-normal">
                                Dark
                            </span>
                        </FormLabel>
                    </FormItem>
                </RadioGroup>
            </FormItem>
        </FormField>

        <div class="flex justify-start">
            <Button type="submit">
                Применить
            </Button>
        </div>
    </form>
</template>
<script setup lang="ts">
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Separator } from '@/components/ui/separator';

import { ChevronDownIcon } from '@radix-icons/vue'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'
import Select from '../ui/select/Select.vue'
import SelectTrigger from '../ui/select/SelectTrigger.vue'
import SelectContent from '../ui/select/SelectContent.vue'
import SelectValue from '../ui/select/SelectValue.vue'
import SelectItem from '../ui/select/SelectItem.vue'
import { Theme, useConfigStore } from '@/stores/configStore/config'
import SelectGroup from '../ui/select/SelectGroup.vue'


const configStore = useConfigStore();



const appearanceFormSchema = toTypedSchema(z.object({
    theme: z.enum([Theme.Dark, Theme.Light], {
        required_error: 'Пожалуйста выберете тему.',
    }),
    font: z.enum(['inter', 'manrope', 'system'], {
        invalid_type_error: 'Выберете шрифт',
        required_error: 'Пожалуйста выберете шрифт.',
    }),
}));

const { handleSubmit } = useForm({
    validationSchema: appearanceFormSchema,
    initialValues: {
        theme: configStore.config.theme,
        font: configStore.config.font,
    },
});


const onSubmit = handleSubmit((values) => {

    configStore.setTheme(values.theme);
    configStore.setFont(values.font);
});
</script>