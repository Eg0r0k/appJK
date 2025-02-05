<template>
    <div class="mb-4 flex justify-between  items-center ">


        <div class=" flex items-center gap-2">
            <Avatar class="h-14 w-14">
                <AvatarImage src="/avatars/01.png" :alt="authStore.username" />
                <AvatarFallback>{{ authStore.initials }}</AvatarFallback>
            </Avatar>
            <div class=" space-y-2">
                <h3 class="text-2xl">
                    {{ authStore.fullName }}
                    <span class="text-muted-foreground">
                        (Оператор)
                    </span>
                </h3>
                <p class="text-xs flex items-center">
                    User ID:
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger as-child>
                                <span @click="copy"
                                    class="text-muted-foreground cursor-pointer max-w-[140px] truncate ml-1 block">
                                    {{ authStore.authData!.id }}
                                </span>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Скопировать ID</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </p>
            </div>

        </div>
        <Dialog>
            <DialogTrigger as-child>

                <Button variant="ghost" class="p-5 h-5 w-5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="2"
                            d="M13.5 10.5L21 3m-5 0h5v5m0 6v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
                    </svg>
                </Button>
            </DialogTrigger>

            <DialogContent class="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>QR код профиля</DialogTitle>
                </DialogHeader>
                <div class="w-full flex items-center justify-center">
                    <vue-qrcode class=" rounded-sm" value="https://www.youtube.com/watch?v=dQw4w9WgXcQ" :options="{
                        errorCorrectionLevel: 'Q',
                        width: 200,
                    }"></vue-qrcode>
                </div>
            </DialogContent>
        </Dialog>

    </div>
</template>

<script setup lang="ts">
import Avatar from '@/components/ui/avatar/Avatar.vue';
import AvatarFallback from '@/components/ui/avatar/AvatarFallback.vue';
import AvatarImage from '@/components/ui/avatar/AvatarImage.vue';
import Tooltip from '@/components/ui/tooltip/Tooltip.vue';
import TooltipContent from '@/components/ui/tooltip/TooltipContent.vue';
import TooltipProvider from '@/components/ui/tooltip/TooltipProvider.vue';
import TooltipTrigger from '@/components/ui/tooltip/TooltipTrigger.vue';
import { useClipBoard } from '@/lib/useClipboard';
import { useAuthStore } from '@/stores/authStore/auth';
import Button from '../ui/button/Button.vue';
import Dialog from '../ui/dialog/Dialog.vue';
import DialogTrigger from '../ui/dialog/DialogTrigger.vue';
import DialogContent from '../ui/dialog/DialogContent.vue';
import DialogHeader from '../ui/dialog/DialogHeader.vue';
import DialogTitle from '../ui/dialog/DialogTitle.vue';
import DialogDescription from '../ui/dialog/DialogDescription.vue';


const authStore = useAuthStore()

const copy = async () => await useClipBoard(authStore.authData!.id)

</script>