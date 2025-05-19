<template>
  <div class="flex h-[calc(100vh-60px)]">
    <!-- 左侧工具栏 -->
    <LayoutSider
      title="设计工具"
      :menu-items="toolItems"
      :active-index="activeToolIndex"
      :collapsed="toolbarCollapsed"
      :show-add-button="false"
      @select-item="selectTool"
      @update:collapsed="toolbarCollapsed = $event"
    >
      <template #footer>
        <div class="flex-between">
          <a-button type="primary" class="flex-1">
            <template #icon><icon-save /></template>
            保存
          </a-button>
          <a-button class="ml-2">
            <template #icon><icon-eye /></template>
            预览
          </a-button>
        </div>
      </template>
    </LayoutSider>

    <!-- 主编辑区域 -->
    <div class="flex-1 flex flex-col bg-bg-1 relative">
      <!-- 顶部操作区 -->
      <div class="h-50px flex-between border-b border-[var(--color-border)] p-16px">
        <div class="flex items-center">
          <a-button-group>
            <a-button>
              <template #icon><icon-undo /></template>
            </a-button>
            <a-button>
              <template #icon><icon-redo /></template>
            </a-button>
          </a-button-group>
          <a-divider direction="vertical" />
          <a-button-group class="ml-4">
            <a-button>
              <template #icon><icon-zoom-in /></template>
            </a-button>
            <a-button>
              <template #icon><icon-zoom-out /></template>
            </a-button>
          </a-button-group>
        </div>

        <div>
          <a-button-group>
            <a-button type="primary">
              <template #icon><icon-robot /></template>
              AI优化
            </a-button>
            <a-button type="primary">
              <template #icon><icon-export /></template>
              导出
            </a-button>
          </a-button-group>
        </div>
      </div>

      <!-- 设计画布区域 -->
      <div class="flex-1 overflow-auto p-16px flex-center bg-[#f2f3f5]">
        <div class="card-base w-800px h-600px" style="resize: both; overflow: auto">
          <!-- 画布内容 -->
          <div class="w-full h-full flex-center">
            <span class="text-text-3 text-xl">画布区域</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 右侧属性面板 -->
    <LayoutSider
      title="属性设置"
      width="320"
      position="right"
      :collapsed="propsPanelCollapsed"
      @update:collapsed="propsPanelCollapsed = $event"
    >
      <template #menu>
        <a-tabs type="card-gutter">
          <a-tab-pane key="style" title="样式">
            <div class="p-16px">
              <a-form :model="styleForm" layout="vertical">
                <a-form-item field="width" label="宽度">
                  <a-input-number v-model="styleForm.width" mode="button" min="0" />
                </a-form-item>
                <a-form-item field="height" label="高度">
                  <a-input-number v-model="styleForm.height" mode="button" min="0" />
                </a-form-item>
                <a-form-item field="background" label="背景颜色">
                  <a-color-picker v-model="styleForm.background" />
                </a-form-item>
                <a-form-item field="border" label="边框">
                  <a-input v-model="styleForm.border" placeholder="1px solid #000" />
                </a-form-item>
                <a-form-item field="borderRadius" label="圆角">
                  <a-input-number v-model="styleForm.borderRadius" mode="button" min="0" />
                </a-form-item>
              </a-form>
            </div>
          </a-tab-pane>
          <a-tab-pane key="text" title="文本">
            <div class="p-16px">
              <a-form :model="textForm" layout="vertical">
                <a-form-item field="content" label="内容">
                  <a-textarea v-model="textForm.content" placeholder="请输入文本内容" />
                </a-form-item>
                <a-form-item field="fontSize" label="字体大小">
                  <a-input-number v-model="textForm.fontSize" mode="button" min="12" max="72" />
                </a-form-item>
                <a-form-item field="fontWeight" label="字体粗细">
                  <a-select v-model="textForm.fontWeight">
                    <a-option value="normal">正常</a-option>
                    <a-option value="bold">粗体</a-option>
                    <a-option value="lighter">细体</a-option>
                  </a-select>
                </a-form-item>
                <a-form-item field="fontColor" label="字体颜色">
                  <a-color-picker v-model="textForm.fontColor" />
                </a-form-item>
              </a-form>
            </div>
          </a-tab-pane>
          <a-tab-pane key="arrange" title="排列">
            <div class="p-16px">
              <a-space direction="vertical" size="large" fill>
                <a-button-group>
                  <a-button>上移一层</a-button>
                  <a-button>下移一层</a-button>
                </a-button-group>
                <a-button-group>
                  <a-button>置于顶层</a-button>
                  <a-button>置于底层</a-button>
                </a-button-group>
                <a-button-group>
                  <a-button>左对齐</a-button>
                  <a-button>居中对齐</a-button>
                  <a-button>右对齐</a-button>
                </a-button-group>
                <a-button-group>
                  <a-button>顶部对齐</a-button>
                  <a-button>垂直居中</a-button>
                  <a-button>底部对齐</a-button>
                </a-button-group>
              </a-space>
            </div>
          </a-tab-pane>
        </a-tabs>
      </template>
    </LayoutSider>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import LayoutSider from '../layouts/sider.vue';

// 工具栏状态
const toolbarCollapsed = ref(false);
const activeToolIndex = ref(0);
const toolItems = ref([
  { title: '选择工具', icon: 'icon-select-all' },
  { title: '文本工具', icon: 'icon-font-colors' },
  { title: '形状工具', icon: 'icon-bg-colors' },
  { title: '图片工具', icon: 'icon-image' },
  { title: '设计模板', icon: 'icon-copy' },
  { title: '智能生成', icon: 'icon-robot' },
]);

// 右侧属性面板状态
const propsPanelCollapsed = ref(false);

// 样式表单
const styleForm = ref({
  width: 300,
  height: 200,
  background: '#ffffff',
  border: '1px solid #d9d9d9',
  borderRadius: 4,
});

// 文本表单
const textForm = ref({
  content: '示例文本',
  fontSize: 16,
  fontWeight: 'normal',
  fontColor: '#333333',
});

const selectTool = (index: number) => {
  activeToolIndex.value = index;
};
</script>
