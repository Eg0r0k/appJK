<template>

    <DropdownMenu :modal="false">
        <DropdownMenuTrigger as-child>
            <Button variant="ghost" class="relative h-8 w-8 rounded-full">
                <Avatar class="h-8 w-8">
                    <AvatarImage src="/avatars/01.png" alt="@shadcn" />
                    <AvatarFallback>SC</AvatarFallback>
                </Avatar>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-56" align="end">
            <DropdownMenuLabel class="font-normal flex">
                <div class="flex flex-col space-y-1">
                    <p class="text-sm font-medium leading-none">
                        shadcn
                    </p>
                    <p class="text-xs leading-none text-muted-foreground">
                        m@example.com
                    </p>
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem as-child>
                    <RouterLink to="/profile">
                        Профиль
                    </RouterLink>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    Счета
                </DropdownMenuItem>
                <DropdownMenuItem as-child>
                    <RouterLink to="/settings">
                        Настройки
                    </RouterLink>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem class="text-red-600 ">
                Выход
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>

</template>

<script setup lang="ts">
import Avatar from '../ui/avatar/Avatar.vue';
import AvatarFallback from '../ui/avatar/AvatarFallback.vue';
import AvatarImage from '../ui/avatar/AvatarImage.vue';
import Button from '../ui/button/Button.vue';
import DropdownMenu from '../ui/dropdown-menu/DropdownMenu.vue';
import DropdownMenuContent from '../ui/dropdown-menu/DropdownMenuContent.vue';
import DropdownMenuGroup from '../ui/dropdown-menu/DropdownMenuGroup.vue';
import DropdownMenuItem from '../ui/dropdown-menu/DropdownMenuItem.vue';
import DropdownMenuLabel from '../ui/dropdown-menu/DropdownMenuLabel.vue';
import DropdownMenuSeparator from '../ui/dropdown-menu/DropdownMenuSeparator.vue';
import DropdownMenuTrigger from '../ui/dropdown-menu/DropdownMenuTrigger.vue';



</script>