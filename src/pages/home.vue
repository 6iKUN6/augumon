<template>
  <div class="w-full">
    <!-- 英雄区 -->
    <div class="flex-between p-[60px_80px] bg-bg-2">
      <div class="flex-1 max-w-500px">
        <h1 class="text-5xl font-bold mb-4 text-text-1">AI驱动的设计新体验</h1>
        <p class="text-lg mb-8 text-text-2 leading-1.6">
          轻松创建精美海报、图片和设计作品，AI助手让设计更简单、更智能
        </p>
        <div class="flex gap-4">
          <a-button type="primary" size="large">开始设计</a-button>
          <a-button size="large">查看教程</a-button>
        </div>
      </div>
      <div class="flex-1 flex-center">
        <img
          src="https://cdn.pixabay.com/photo/2023/04/11/18/31/ai-generated-7919298_1280.jpg"
          alt="设计示例"
          class="max-w-full max-h-[400px] rounded-lg object-cover"
        />
      </div>
    </div>

    <!-- 特性介绍 -->
    <div class="p-[80px] bg-bg-1">
      <h2 class="text-center text-4xl font-bold mb-10 text-text-1">
        强大功能，简单操作
      </h2>
      <div class="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8">
        <div class="card-base card-hover p-6 text-center">
          <div class="text-[36px] mb-4 text-primary">
            <a-icon-experiment />
          </div>
          <h3 class="text-title text-xl mb-3">AI生成设计</h3>
          <p class="text-desc leading-1.5">
            通过简单的文字描述，AI即可生成符合您需求的设计元素和布局
          </p>
        </div>
        <div class="card-base card-hover p-6 text-center">
          <div class="text-[36px] mb-4 text-primary">
            <a-icon-apps />
          </div>
          <h3 class="text-title text-xl mb-3">丰富素材库</h3>
          <p class="text-desc leading-1.5">
            上千种模板和设计元素，满足您各种场景的设计需求
          </p>
        </div>
        <div class="card-base card-hover p-6 text-center">
          <div class="text-[36px] mb-4 text-primary">
            <a-icon-robot />
          </div>
          <h3 class="text-title text-xl mb-3">智能助手</h3>
          <p class="text-desc leading-1.5">
            AI助手提供设计建议和自动调整，让您的作品更专业
          </p>
        </div>
        <div class="card-base card-hover p-6 text-center">
          <div class="text-[36px] mb-4 text-primary">
            <a-icon-share-alt />
          </div>
          <h3 class="text-title text-xl mb-3">社区分享</h3>
          <p class="text-desc leading-1.5">
            与设计社区分享您的作品，获取灵感和反馈
          </p>
        </div>
      </div>
    </div>

    <!-- 设计案例展示 -->
    <div class="p-[80px] bg-bg-2">
      <h2 class="text-center text-4xl font-bold mb-10 text-text-1">
        优秀作品展示
      </h2>
      <div
        class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 justify-items-center"
      >
        <a-card v-for="i in 6" :key="i" :style="{ width: '300px' }" hoverable>
          <template #cover>
            <img
              alt="设计作品"
              :src="`https://picsum.photos/300/200?random=${i}`"
              class="h-[200px] object-cover"
            />
          </template>
          <a-card-meta title="设计作品标题">
            <template #description>精美的设计作品描述</template>
          </a-card-meta>
        </a-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
