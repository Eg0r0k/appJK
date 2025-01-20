<template>
    <div class="w-full lg:grid lg:grid-cols-2 bg-background">
        <div class="flex items-center justify-center h-full py-12">
            <div class="mx-auto grid w-full min-w-[250px] max-w-[350px] px-2 gap-6">
                <div class="grid gap-2 text-center">
                    <h1 class="text-3xl font-bold">Регистрация</h1>
                    <p class="text-balance text-muted-foreground">
                        Заполните все поля, чтобы зарегистрироваться.
                    </p>
                </div>

                <form @submit="onSubmit">
                    <div class="grid gap-4">
                        <FormField v-slot="{ componentField }" name="email">
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="m@example.com" v-bind="componentField" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>

                        <FormField v-slot="{ componentField }" name="password">
                            <FormItem>
                                <FormLabel>Пароль</FormLabel>
                                <FormControl>
                                    <Input type="password" v-bind="componentField" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>

                        <Button type="submit" class="w-full"> Зарегистрироваться </Button>
                    </div>
                </form>

                <div class="mt-4 text-center text-sm">
                    Есть аккаунт?
                    <RouterLink to="/login" class="underline"> Войти </RouterLink>
                </div>
            </div>
        </div>

        <div class="hidden bg-muted lg:block">
            <img src="/img/bg-signup.png" alt="Bg-image" width="1920" height="1080"
                class="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import * as z from 'zod';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RouterLink } from 'vue-router';

const formSchema = toTypedSchema(
    z.object({
        email: z.string().email('Введите корректный email'),
        password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
    })
);

const { handleSubmit } = useForm({
    validationSchema: formSchema,
});

const onSubmit = handleSubmit((values) => {
    console.log('Форма отправлена:', values);
});
</script>