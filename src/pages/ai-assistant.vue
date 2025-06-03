<template>
  <div class="flex h-[calc(100vh-60px)] bg-background">
    <div class="w-80 bg-muted/30 border-r flex flex-col">
      <div class="flex items-center justify-between p-4 border-b">
        <h2 class="text-lg font-semibold">AI助手</h2>
        <Button variant="outline" size="sm">
          <Plus class="w-4 h-4" />
        </Button>
      </div>
      <div class="flex-1 overflow-y-auto p-2">
        <div
          v-for="(chat, index) in chatHistory"
          :key="index"
          class="flex items-center p-3 rounded-md cursor-pointer relative hover:bg-muted/50 transition-colors"
          :class="{
            'bg-muted': currentChat === index,
          }"
          @click="selectChat(index)"
        >
          <Avatar class="w-8 h-8">
            <AvatarFallback :style="{ backgroundColor: getRandomColor(index) }" class="text-white">
              {{ chat.title.charAt(0) }}
            </AvatarFallback>
          </Avatar>
          <div class="ml-3 flex-1 overflow-hidden">
            <div class="font-medium text-sm whitespace-nowrap overflow-hidden text-ellipsis">
              {{ chat.title }}
            </div>
            <div class="text-xs text-muted-foreground mt-1">
              {{ chat.time }}
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            class="opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8 p-0"
          >
            <Trash2 class="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>

    <div class="flex-1 flex flex-col bg-background">
      <div class="flex items-center justify-between p-4 border-b">
        <h2 class="text-lg font-semibold">{{ currentChatTitle }}</h2>
        <div>
          <Button>
            <Download class="w-4 h-4 mr-2" />
            导出对话
          </Button>
        </div>
      </div>

      <div ref="chatContainer" class="flex-1 p-4 overflow-y-auto">
        <div v-if="currentMessages.length === 0" class="text-center p-8 max-w-2xl mx-auto">
          <div class="text-5xl text-primary mb-4 flex justify-center">
            <Bot />
          </div>
          <h2 class="text-2xl font-bold mb-2">AI设计助手</h2>
          <p class="text-muted-foreground mb-6">
            我可以帮您生成设计创意、改进设计、推荐颜色搭配和布局方案。
          </p>
          <div class="flex flex-wrap gap-3 justify-center">
            <Button
              variant="outline"
              class="max-w-full"
              @click="insertSuggestion('帮我生成一个简约风格的海报设计')"
            >
              帮我生成一个简约风格的海报设计
            </Button>
            <Button
              variant="outline"
              class="max-w-full"
              @click="insertSuggestion('如何改进我的配色方案？')"
            >
              如何改进我的配色方案？
            </Button>
            <Button
              variant="outline"
              class="max-w-full"
              @click="insertSuggestion('推荐几款适合科技公司的字体')"
            >
              推荐几款适合科技公司的字体
            </Button>
            <Button
              variant="outline"
              class="max-w-full"
              @click="insertSuggestion('给我的设计提供一些创意建议')"
            >
              给我的设计提供一些创意建议
            </Button>
          </div>
        </div>

        <template v-else>
          <div
            v-for="(message, index) in currentMessages"
            :key="index"
            class="flex mb-4 max-w-[80%]"
            :class="{
              'ml-auto flex-row-reverse': message.isUser,
            }"
          >
            <Avatar class="w-8 h-8">
              <AvatarFallback
                :style="
                  message.isUser ? { backgroundColor: '#3b82f6' } : { backgroundColor: '#10b981' }
                "
                class="text-white"
              >
                {{ message.isUser ? 'U' : 'A' }}
              </AvatarFallback>
            </Avatar>
            <div class="mx-3 overflow-hidden">
              <div
                class="p-3 rounded-lg mb-1"
                :class="
                  message.isUser
                    ? 'bg-primary text-primary-foreground rounded-tr-none'
                    : 'bg-muted text-muted-foreground rounded-tl-none'
                "
              >
                {{ message.text }}
              </div>
              <div
                class="text-xs text-muted-foreground"
                :class="message.isUser ? 'text-right' : 'text-left'"
              >
                {{ message.time }}
              </div>
            </div>
          </div>
        </template>
      </div>

      <div class="p-4 border-t">
        <div class="flex gap-2">
          <Input
            v-model="inputMessage"
            placeholder="输入您的问题或描述..."
            class="flex-1"
            @keyup.enter="sendMessage"
          />
          <Button @click="sendMessage">
            <Send class="w-4 h-4" />
          </Button>
        </div>
        <div class="flex justify-start mt-2 gap-2">
          <Button variant="ghost" size="sm">
            <Image class="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Paperclip class="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Mic class="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { Plus, Trash2, Download, Bot, Send, Image, Paperclip, Mic } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const inputMessage = ref('');
const currentChat = ref(0);
const chatContainer = ref<HTMLElement | null>(null);

const chatHistory = ref([
  {
    title: '设计海报创意',
    time: '今天 14:30',
    messages: [
      { isUser: true, text: '帮我设计一个现代风格的活动海报', time: '14:30' },
      {
        isUser: false,
        text: '好的，请告诉我更多关于活动的信息，比如活动主题、目标受众、关键信息等，这样我可以为您提供更符合需求的设计方案。',
        time: '14:31',
      },
    ],
  },
  {
    title: '配色方案建议',
    time: '昨天 18:45',
    messages: [],
  },
  {
    title: '布局优化',
    time: '3天前',
    messages: [],
  },
]);

const colors = ['#165DFF', '#0FC6C2', '#722ED1', '#F7BA1E', '#FF5722', '#EB0AA4', '#7BC616'];

const getRandomColor = (index: number) => {
  return colors[index % colors.length];
};

const currentChatTitle = computed(() => {
  return chatHistory.value[currentChat.value]?.title || '新对话';
});

const currentMessages = computed(() => {
  return chatHistory.value[currentChat.value]?.messages || [];
});

const selectChat = (index: number) => {
  currentChat.value = index;
};

const sendMessage = () => {
  if (!inputMessage.value.trim()) return;

  // 添加用户消息
  chatHistory.value[currentChat.value].messages.push({
    isUser: true,
    text: inputMessage.value,
    time: new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }),
  });

  // 模拟AI回复
  setTimeout(() => {
    chatHistory.value[currentChat.value].messages.push({
      isUser: false,
      text: getAIResponse(inputMessage.value),
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    });

    // 滚动到底部
    scrollToBottom();
  }, 1000);

  inputMessage.value = '';
};

const insertSuggestion = (text: string) => {
  inputMessage.value = text;
};

const getAIResponse = (message: string) => {
  // 简单的回复逻辑，实际项目中会用真实的AI接口
  if (message.includes('海报')) {
    return '我可以帮您设计海报。根据您的需求，我建议使用简约现代的布局，突出关键信息，使用对比鲜明的配色方案来吸引注意力。需要我提供一些具体的设计示例吗？';
  } else if (message.includes('配色')) {
    return '配色方案对设计至关重要。我推荐您考虑使用互补色或类似色方案，确保足够的对比度以提高可读性。流行的配色组合包括：深蓝配浅金、黑白配亮红、柔和的绿色与灰色等。';
  } else if (message.includes('字体')) {
    return '对于科技公司，我推荐使用现代无衬线字体，如Roboto、Montserrat、Poppins或SF Pro。这些字体传达出专业、创新的形象，且具有良好的可读性。';
  } else {
    return '感谢您的问题。我可以帮助您解决设计相关的疑问，提供创意建议，生成设计方案，或者分析改进现有设计。请告诉我更多关于您的需求。';
  }
};

const scrollToBottom = () => {
  if (chatContainer.value) {
    setTimeout(() => {
      chatContainer.value!.scrollTop = chatContainer.value!.scrollHeight;
    }, 100);
  }
};

onMounted(() => {
  scrollToBottom();
});
</script>
