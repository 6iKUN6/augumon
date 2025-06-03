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
        <div class="flex gap-2">
          <Button class="flex-1">
            <Save class="w-4 h-4 mr-2" />
            保存
          </Button>
          <Button variant="outline">
            <Eye class="w-4 h-4 mr-2" />
            预览
          </Button>
        </div>
      </template>
    </LayoutSider>

    <!-- 主编辑区域 -->
    <div class="flex-1 flex flex-col bg-muted/30 relative">
      <!-- 顶部操作区 -->
      <div class="h-12 flex items-center justify-between border-b px-4">
        <div class="flex items-center gap-4">
          <div class="flex gap-1">
            <Button variant="outline" size="sm">
              <Undo class="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Redo class="w-4 h-4" />
            </Button>
          </div>
          <Separator orientation="vertical" className="h-6" />
          <div class="flex gap-1">
            <Button variant="outline" size="sm">
              <ZoomIn class="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <ZoomOut class="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div class="flex gap-2">
          <Button>
            <Bot class="w-4 h-4 mr-2" />
            AI优化
          </Button>
          <Button>
            <Download class="w-4 h-4 mr-2" />
            导出
          </Button>
        </div>
      </div>

      <!-- 设计画布区域 -->
      <div class="flex-1 overflow-auto p-4 flex items-center justify-center bg-muted/50">
        <div
          class="bg-white rounded-lg shadow-lg w-[800px] h-[600px] border"
          style="resize: both; overflow: auto"
        >
          <!-- 画布内容 -->
          <div class="w-full h-full flex items-center justify-center">
            <span class="text-muted-foreground text-xl">画布区域</span>
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
        <Tabs default-value="style" class="w-full">
          <TabsList class="grid w-full grid-cols-3">
            <TabsTrigger value="style">样式</TabsTrigger>
            <TabsTrigger value="text">文本</TabsTrigger>
            <TabsTrigger value="arrange">排列</TabsTrigger>
          </TabsList>

          <TabsContent value="style" class="p-4 space-y-4">
            <div class="space-y-2">
              <label class="text-sm font-medium">宽度</label>
              <Input v-model="styleForm.width" type="number" :min="0" />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium">高度</label>
              <Input v-model="styleForm.height" type="number" :min="0" />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium">背景颜色</label>
              <Input v-model="styleForm.background" type="color" />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium">边框</label>
              <Input v-model="styleForm.border" placeholder="1px solid #000" />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium">圆角</label>
              <Input v-model="styleForm.borderRadius" type="number" :min="0" />
            </div>
          </TabsContent>

          <TabsContent value="text" class="p-4 space-y-4">
            <div class="space-y-2">
              <label class="text-sm font-medium">内容</label>
              <Textarea v-model="textForm.content" placeholder="请输入文本内容" />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium">字体大小</label>
              <Input v-model="textForm.fontSize" type="number" :min="12" :max="72" />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium">字体粗细</label>
              <Select v-model="textForm.fontWeight">
                <SelectTrigger>
                  <SelectValue placeholder="选择字体粗细" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">正常</SelectItem>
                  <SelectItem value="bold">粗体</SelectItem>
                  <SelectItem value="lighter">细体</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium">字体颜色</label>
              <Input v-model="textForm.fontColor" type="color" />
            </div>
          </TabsContent>

          <TabsContent value="arrange" class="p-4 space-y-4">
            <div class="space-y-3">
              <div class="flex gap-2">
                <Button variant="outline" size="sm" class="flex-1">上移一层</Button>
                <Button variant="outline" size="sm" class="flex-1">下移一层</Button>
              </div>
              <div class="flex gap-2">
                <Button variant="outline" size="sm" class="flex-1">置于顶层</Button>
                <Button variant="outline" size="sm" class="flex-1">置于底层</Button>
              </div>
              <div class="flex gap-2">
                <Button variant="outline" size="sm" class="flex-1">左对齐</Button>
                <Button variant="outline" size="sm" class="flex-1">居中</Button>
                <Button variant="outline" size="sm" class="flex-1">右对齐</Button>
              </div>
              <div class="flex gap-2">
                <Button variant="outline" size="sm" class="flex-1">顶部对齐</Button>
                <Button variant="outline" size="sm" class="flex-1">垂直居中</Button>
                <Button variant="outline" size="sm" class="flex-1">底部对齐</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </template>
    </LayoutSider>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  Save,
  Eye,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  Bot,
  Download,
  MousePointer,
  Type,
  Shapes,
  Image,
  Copy,
} from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import LayoutSider from '../layouts/sider.vue';

// 工具栏状态
const toolbarCollapsed = ref(false);
const activeToolIndex = ref(0);
const toolItems = ref([
  { title: '选择工具', icon: MousePointer },
  { title: '文本工具', icon: Type },
  { title: '形状工具', icon: Shapes },
  { title: '图片工具', icon: Image },
  { title: '设计模板', icon: Copy },
  { title: '智能生成', icon: Bot },
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
