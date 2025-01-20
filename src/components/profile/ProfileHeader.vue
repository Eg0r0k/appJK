<template>
    <div class="mb-4 flex items-center gap-2">
        <Avatar class="h-14 w-14">
            <AvatarImage src="/avatars/01.png" alt="@shadcn" />
            <AvatarFallback>SC</AvatarFallback>
        </Avatar>
        <div>
            <h3 class="text-2xl">Антон Антонович
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
                                {{ id }}
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
import { ref } from 'vue';
const id = ref('asdas-asdsdsd-sdsdasdasdasdasdasasdsa')

const copy = async () => await useClipBoard(id.value)
</script>