import { defineStore } from 'pinia';

export interface UserInfo {
  id: string;
  username: string;
  email?: string;
  avatar?: string;
}

export const useAuthStore = defineStore('auth', () => {
  // 状态
  const token = ref<string | null>(null);
  const userInfo = ref<UserInfo | null>(null);

  // 计算属性
  const isLoggedIn = computed(() => !!token.value);

  // 初始化 - 从本地存储加载数据
  const initialize = () => {
    if (import.meta.client) {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (storedToken) {
        token.value = storedToken;
      }

      if (storedUser) {
        try {
          userInfo.value = JSON.parse(storedUser);
        } catch {
          console.error('Failed to parse user data from localStorage');
        }
      }
    }
  };

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

    // 更新状态
    token.value = newToken;
    userInfo.value = newUser;

    // 保存到本地存储
    if (import.meta.client) {
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(newUser));
    }

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

    // 更新状态
    token.value = newToken;
    userInfo.value = newUser;

    // 保存到本地存储
    if (import.meta.client) {
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(newUser));
    }

    return true;
  };

  // 登出
  const logout = () => {
    token.value = null;
    userInfo.value = null;

    // 清除本地存储
    if (import.meta.client) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  };

  return {
    token,
    userInfo,
    isLoggedIn,
    initialize,
    login,
    register,
    logout,
  };
});
