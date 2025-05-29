<template>
  <div class="w-full p-6">
    <div class="mb-6">
      <h1 class="text-2xl font-medium mb-4">Support Center</h1>

      <!-- 搜索框 -->
      <div class="max-w-xl mx-auto mb-8">
        <a-input-search
          placeholder="搜索常见问题或支持内容..."
          search-button
          class="w-full"
          allow-clear
        />
        <div class="mt-2 text-sm text-gray-500 text-center">
          常见搜索: 安装问题, 账户设置, 文件导出, 支付问题
        </div>
      </div>

      <!-- 支持卡片 -->
      <div class="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 rounded-full bg-blue-50 flex-center mr-3">
              <icon-file class="text-[#165DFF] text-xl" />
            </div>
            <h3 class="text-lg font-medium">文档与教程</h3>
          </div>
          <p class="text-sm text-gray-600 mb-4">查阅全面的使用文档和教程，快速掌握XTool</p>
          <a-button type="text" long>浏览文档 <icon-right /></a-button>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 rounded-full bg-green-50 flex-center mr-3">
              <icon-message class="text-[#00B42A] text-xl" />
            </div>
            <h3 class="text-lg font-medium">社区与论坛</h3>
          </div>
          <p class="text-sm text-gray-600 mb-4">加入用户社区，分享经验，获取帮助和灵感</p>
          <a-button type="text" long>进入社区 <icon-right /></a-button>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 rounded-full bg-purple-50 flex-center mr-3">
              <icon-question-circle class="text-[#722ED1] text-xl" />
            </div>
            <h3 class="text-lg font-medium">FAQ</h3>
          </div>
          <p class="text-sm text-gray-600 mb-4">浏览常见问题解答，快速解决您的疑问</p>
          <a-button type="text" long>查看FAQ <icon-right /></a-button>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 rounded-full bg-orange-50 flex-center mr-3">
              <icon-robot class="text-[#F7BA1E] text-xl" />
            </div>
            <h3 class="text-lg font-medium">智能助手</h3>
          </div>
          <p class="text-sm text-gray-600 mb-4">AI支持助手，实时解答您的问题</p>
          <a-button type="text" long>启动助手 <icon-right /></a-button>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 rounded-full bg-red-50 flex-center mr-3">
              <icon-video-camera class="text-[#F5319D] text-xl" />
            </div>
            <h3 class="text-lg font-medium">视频教程</h3>
          </div>
          <p class="text-sm text-gray-600 mb-4">通过视频直观学习如何使用XTool的各项功能</p>
          <a-button type="text" long>观看视频 <icon-right /></a-button>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 rounded-full bg-cyan-50 flex-center mr-3">
              <icon-user class="text-[#0FC6C2] text-xl" />
            </div>
            <h3 class="text-lg font-medium">联系我们</h3>
          </div>
          <p class="text-sm text-gray-600 mb-4">有更复杂的问题？直接联系我们的支持团队</p>
          <a-button type="text" long>联系支持 <icon-right /></a-button>
        </div>
      </div>

      <!-- 版本信息 -->
      <div class="bg-gray-50 rounded-lg p-4 text-center text-sm text-gray-500">
        当前版本: XTool v1.5.2 | 更新日期: 2023-12-15 |
        <a class="text-blue-500 hover:underline">查看更新日志</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 为了使阴影更加明显 */
.shadow-sm {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}
.shadow-md {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
