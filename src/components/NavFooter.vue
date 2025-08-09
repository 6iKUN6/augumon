<script setup lang="ts">
import { BadgeCheck, Bell, ChevronsUpDown, CreditCard, LogOut, Sparkles } from 'lucide-vue-next';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import defaultAvatar from '@/assets/images/shadcn-avatar.jpg';

interface Props {
  collapsed?: boolean;
  user?: {
    name: string;
    email: string;
    avatar: string;
  };
}

withDefaults(defineProps<Props>(), {
  collapsed: false,
  user: () => ({
    name: 'jyu-yrc',
    email: '91yrc.@jyu.com',
    avatar: defaultAvatar,
  }),
});
</script>
<template>
  <div class="p-3">
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button
          variant="ghost"
          :class="[
            'w-full justify-start gap-3 h-auto p-3',
            'hover:bg-accent hover:text-accent-foreground',
            'data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
          ]"
        >
          <Avatar class="h-8 w-8 rounded-lg shrink-0">
            <AvatarImage :src="user.avatar" :alt="user.name" />
            <AvatarFallback class="rounded-lg"> CN </AvatarFallback>
          </Avatar>
          <div v-if="!collapsed" class="grid flex-1 text-left text-sm leading-tight min-w-0">
            <span class="truncate font-semibold">{{ user.name }}</span>
            <span class="truncate text-xs text-muted-foreground">{{ user.email }}</span>
          </div>
          <ChevronsUpDown v-if="!collapsed" class="ml-auto size-4 shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent class="min-w-56 rounded-lg" side="right" align="end" :side-offset="4">
        <DropdownMenuLabel class="p-0 font-normal">
          <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar class="h-8 w-8 rounded-lg">
              <AvatarImage :src="user.avatar" :alt="user.name" />
              <AvatarFallback class="rounded-lg"> CN </AvatarFallback>
            </Avatar>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-semibold">{{ user.name }}</span>
              <span class="truncate text-xs">{{ user.email }}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Sparkles />
            Upgrade to Pro
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <BadgeCheck />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard />
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Bell />
            Notifications
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
