import { defineStore } from 'pinia';

export interface UserInfo {
  id: string;
  username: string;
  email?: string;
  avatar?: string;
}

export const useAuthStore = defineStore(
  'auth',
  () => {
    // 状态
    const token = ref<string | null>(null);
    const userInfo = ref<UserInfo | null>(null);

    // 计算属性
    const isLoggedIn = computed(() => !!token.value);

    // 登录
    const login = (userData: { username: string; password: string; remember: boolean }) => {
      // 这里是模拟请求，实际项目中应调用 API
      console.log('Login data:', userData);

      // 模拟获取token和用户信息
      const newToken = 'mock-token-' + Math.random().toString(36).substr(2);
      const newUser: UserInfo = {
        id: '1',
        username: userData.username,
        email: `${userData.username}@example.com`,
      };

      // 更新状态 - 持久化插件会自动保存到localStorage
      token.value = newToken;
      userInfo.value = newUser;

      return true;
    };

    // 注册
    const register = (userData: {
      username: string;
      email: string;
      password: string;
      confirmPassword: string;
      agreement: boolean;
    }) => {
      // 这里是模拟请求，实际项目中应调用 API
      console.log('Register data:', userData);

      // 模拟获取token和用户信息
      const newToken = 'mock-token-' + Math.random().toString(36).substr(2);
      const newUser: UserInfo = {
        id: '1',
        username: userData.username,
        email: userData.email,
      };

      // 更新状态 - 持久化插件会自动保存到localStorage
      token.value = newToken;
      userInfo.value = newUser;

      return true;
    };

    // 登出
    const logout = () => {
      // 清空状态 - 持久化插件会自动清除localStorage
      token.value = null;
      userInfo.value = null;
    };

    return {
      token,
      userInfo,
      isLoggedIn,
      login,
      register,
      logout,
    };
  },
  {
    persist: true, // 启用持久化，自动保存所有状态到localStorage
  }
);
