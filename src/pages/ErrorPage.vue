<template>
    <div class=" flex flex-col items-center justify-center ">
        <div class="text-6xl mb-4 animate-bounce">
            ❌
        </div>

        <h1 class="text-4xl font-bold mb-2 text-center">
            Упс! Что-то пошло не так.
        </h1>

        <p class="text-m text-gray-300 mb-8 text-center max-w-md">
            К сожалению, произошла ошибка. Пожалуйста, попробуйте обновить страницу или вернитесь позже.
        </p>

        <Button as-child>
            <RouterLink to="/">
                На главную
            </RouterLink>
        </Button>

    </div>
</template>


<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';

</script>