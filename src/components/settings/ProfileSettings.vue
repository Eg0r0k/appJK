<template>
  <div>
    <h3 class="text-lg font-medium">
      Профиль
    </h3>
    <p class="text-sm text-muted-foreground">
      Основные настройки профиля.
    </p>
  </div>
  <Separator />
  <form class="space-y-8" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="username">
      <FormItem>
        <FormLabel>
          Username
        </FormLabel>
        <FormControl>
          <Input type="text" placeholder="username" v-bind="componentField" />
        </FormControl>
        <FormDescription>
          Имя пользователя отображаемое в системе.
        </FormDescription>
        <FormMessage />

      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input type="text" placeholder="email" v-bind="componentField" />
        </FormControl>
        <FormDescription>
          Введите основную почту на которую будут приходить письма.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <div class="flex gap-2 justify-start ">
      <Button type="submit">
        Применить
      </Button>
      <AlertDialog>
        <AlertDialogTrigger> <Button type="button" variant="destructive">
            Сбросить
          </Button></AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
            <AlertDialogDescription>
              После сброса формы, данные нельзя будет вернуть.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction @click="resetForm">Продолжить</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  </form>
</template>

<script setup lang="ts">
import { Separator } from '@/components/ui/separator';
import { FormField } from '../ui/form';
import FormItem from '../ui/form/FormItem.vue';
import FormLabel from '../ui/form/FormLabel.vue';
import FormControl from '../ui/form/FormControl.vue';
import Input from '../ui/input/Input.vue';
import FormDescription from '../ui/form/FormDescription.vue';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import { useForm } from 'vee-validate';

import Button from '../ui/button/Button.vue';
import FormMessage from '../ui/form/FormMessage.vue';
import AlertDialog from '../ui/alert-dialog/AlertDialog.vue';
import AlertDialogTrigger from '../ui/alert-dialog/AlertDialogTrigger.vue';
import AlertDialogContent from '../ui/alert-dialog/AlertDialogContent.vue';
import AlertDialogHeader from '../ui/alert-dialog/AlertDialogHeader.vue';
import AlertDialogTitle from '../ui/alert-dialog/AlertDialogTitle.vue';
import AlertDialogFooter from '../ui/alert-dialog/AlertDialogFooter.vue';
import AlertDialogAction from '../ui/alert-dialog/AlertDialogAction.vue';
import AlertDialogCancel from '../ui/alert-dialog/AlertDialogCancel.vue';
import AlertDialogDescription from '../ui/alert-dialog/AlertDialogDescription.vue';
import { useAuthStore } from '@/stores/authStore/auth';
const profileFormSchema = toTypedSchema(z.object({
  username: z.string()

    .min(2, {
      message: "Имя пользователя должно быть длинее 2 символов"
    })
    .max(16, {
      message: "Имя пользователя не должно быть длинее 16 символов"
    }),
  email: z.string()
    .email({ message: "Не правильная почта" })
}))
const authStore = useAuthStore()

const { handleSubmit, resetForm } = useForm({
  validationSchema: profileFormSchema,
  initialValues: {
    username: authStore.username,
    email: authStore.email
  }
})
const onSubmit = handleSubmit((values) => {
  console.log(values)

})

</script>