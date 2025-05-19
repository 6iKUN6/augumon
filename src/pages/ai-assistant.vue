<template>
  <div class="flex h-[calc(100vh-60px)] bg-[var(--color-bg-1)]">
    <div
      class="w-280px bg-[var(--color-bg-2)] border-r border-[var(--color-border)] flex flex-col"
    >
      <div class="flex-between p-16px border-b border-[var(--color-border)]">
        <h2 class="m-0 text-lg">AI助手</h2>
        <a-button type="outline" shape="circle">
          <template #icon><icon-plus /></template>
        </a-button>
      </div>
      <div class="flex-1 overflow-y-auto p-8px">
        <div
          v-for="(chat, index) in chatHistory"
          :key="index"
          class="flex items-center p-12px rounded-4px cursor-pointer relative hover:bg-[var(--color-fill-2)]"
          :class="{
            'bg-[var(--color-primary-light-1)]': currentChat === index,
          }"
          @click="selectChat(index)"
        >
          <a-avatar :style="{ backgroundColor: getRandomColor(index) }">
            {{ chat.title.charAt(0) }}
          </a-avatar>
          <div class="ml-12px flex-1 overflow-hidden">
            <div
              class="font-500 whitespace-nowrap overflow-hidden text-ellipsis"
            >
              {{ chat.title }}
            </div>
            <div class="text-xs text-[var(--color-text-3)] mt-4px">
              {{ chat.time }}
            </div>
          </div>
          <a-button
            type="text"
            shape="circle"
            class="opacity-0 transition-opacity duration-200 hover:opacity-100"
          >
            <template #icon><icon-delete /></template>
          </a-button>
        </div>
      </div>
    </div>

    <div class="flex-1 flex flex-col bg-[var(--color-bg-1)]">
      <div class="flex-between p-16px border-b border-[var(--color-border)]">
        <h2 class="m-0 text-lg">{{ currentChatTitle }}</h2>
        <div>
          <a-button type="primary">
            <template #icon><icon-download /></template>
            导出对话
          </a-button>
        </div>
      </div>

      <div ref="chatContainer" class="flex-1 p-16px overflow-y-auto">
        <div
          v-if="currentMessages.length === 0"
          class="text-center p-40px-20px max-w-600px mx-auto"
        >
          <div class="text-48px text-[var(--color-primary)] mb-16px">
            <icon-robot />
          </div>
          <h2>AI设计助手</h2>
          <p>我可以帮您生成设计创意、改进设计、推荐颜色搭配和布局方案。</p>
          <div class="flex flex-wrap gap-12px justify-center mt-24px">
            <a-button
              class="max-w-full"
              @click="insertSuggestion('帮我生成一个简约风格的海报设计')"
            >
              帮我生成一个简约风格的海报设计
            </a-button>
            <a-button
              class="max-w-full"
              @click="insertSuggestion('如何改进我的配色方案？')"
            >
              如何改进我的配色方案？
            </a-button>
            <a-button
              class="max-w-full"
              @click="insertSuggestion('推荐几款适合科技公司的字体')"
            >
              推荐几款适合科技公司的字体
            </a-button>
            <a-button
              class="max-w-full"
              @click="insertSuggestion('给我的设计提供一些创意建议')"
            >
              给我的设计提供一些创意建议
            </a-button>
          </div>
        </div>

        <template v-else>
          <div
            v-for="(message, index) in currentMessages"
            :key="index"
            class="flex mb-16px max-w-80%"
            :class="{
              'ml-auto flex-row-reverse': message.isUser,
            }"
          >
            <a-avatar
              :style="
                message.isUser
                  ? { backgroundColor: '#165DFF' }
                  : { backgroundColor: '#00B42A' }
              "
            >
              {{ message.isUser ? "U" : "A" }}
            </a-avatar>
            <div class="mx-12px overflow-hidden">
              <div
                class="p-12px-16px rounded-8px mb-4px"
                :class="
                  message.isUser
                    ? 'bg-[var(--color-primary-light-1)] text-[var(--color-text-1)] rounded-tr-0'
                    : 'bg-[var(--color-fill-2)] text-[var(--color-text-1)] rounded-tl-0'
                "
              >
                {{ message.text }}
              </div>
              <div
                class="text-xs text-[var(--color-text-3)]"
                :class="message.isUser ? 'text-left' : 'text-right'"
              >
                {{ message.time }}
              </div>
            </div>
          </div>
        </template>
      </div>

      <div class="p-16px border-t border-[var(--color-border)]">
        <a-input-search
          v-model="inputMessage"
          placeholder="输入您的问题或描述..."
          search-button
          @search="sendMessage"
        >
          <template #button-icon>
            <icon-send />
          </template>
        </a-input-search>
        <div class="flex justify-start mt-8px gap-8px">
          <a-button type="text" shape="circle">
            <template #icon><icon-image /></template>
          </a-button>
          <a-button type="text" shape="circle">
            <template #icon><icon-attachment /></template>
          </a-button>
          <a-button type="text" shape="circle">
            <template #icon><icon-voice /></template>
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

const inputMessage = ref("");
const currentChat = ref(0);
const chatContainer = ref<HTMLElement | null>(null);

const chatHistory = ref([
  {
    title: "设计海报创意",
    time: "今天 14:30",
    messages: [
      { isUser: true, text: "帮我设计一个现代风格的活动海报", time: "14:30" },
      {
        isUser: false,
        text: "好的，请告诉我更多关于活动的信息，比如活动主题、目标受众、关键信息等，这样我可以为您提供更符合需求的设计方案。",
        time: "14:31",
      },
    ],
  },
  {
    title: "配色方案建议",
    time: "昨天 18:45",
    messages: [],
  },
  {
    title: "布局优化",
    time: "3天前",
    messages: [],
  },
]);

const colors = [
  "#165DFF",
  "#0FC6C2",
  "#722ED1",
  "#F7BA1E",
  "#FF5722",
  "#EB0AA4",
  "#7BC616",
];

const getRandomColor = (index: number) => {
  return colors[index % colors.length];
};

const currentChatTitle = computed(() => {
  return chatHistory.value[currentChat.value]?.title || "新对话";
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
      hour: "2-digit",
      minute: "2-digit",
    }),
  });

  // 模拟AI回复
  setTimeout(() => {
    chatHistory.value[currentChat.value].messages.push({
      isUser: false,
      text: getAIResponse(inputMessage.value),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    });

    // 滚动到底部
    scrollToBottom();
  }, 1000);

  inputMessage.value = "";
};

const insertSuggestion = (text: string) => {
  inputMessage.value = text;
};

const getAIResponse = (message: string) => {
  // 简单的回复逻辑，实际项目中会用真实的AI接口
  if (message.includes("海报")) {
    return "我可以帮您设计海报。根据您的需求，我建议使用简约现代的布局，突出关键信息，使用对比鲜明的配色方案来吸引注意力。需要我提供一些具体的设计示例吗？";
  } else if (message.includes("配色")) {
    return "配色方案对设计至关重要。我推荐您考虑使用互补色或类似色方案，确保足够的对比度以提高可读性。流行的配色组合包括：深蓝配浅金、黑白配亮红、柔和的绿色与灰色等。";
  } else if (message.includes("字体")) {
    return "对于科技公司，我推荐使用现代无衬线字体，如Roboto、Montserrat、Poppins或SF Pro。这些字体传达出专业、创新的形象，且具有良好的可读性。";
  } else {
    return "感谢您的问题。我可以帮助您解决设计相关的疑问，提供创意建议，生成设计方案，或者分析改进现有设计。请告诉我更多关于您的需求。";
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
