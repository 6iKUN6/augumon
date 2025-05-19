import { defineStore } from 'pinia';

export enum ModalState {
  login = 'login', //登录
  register = 'register', //注册
}

type ModelType = keyof typeof ModalState;

const useModalStore = defineStore('modal', () => {
  const visibleState = reactive<Record<ModelType, boolean>>({
    login: false,
    register: false,
  });

  const activeModalCount = ref(0);

  const openWhichModel = (name: ModelType) => {
    visibleState[name] = true;
  };

  const closeWhichModel = (name: ModelType) => {
    visibleState[name] = false;
  };

  const closeAllModel = () => {
    Object.keys(visibleState).forEach((key) => {
      visibleState[key as ModalState] = false;
    });
  };

  const beOnlyOneModel = (keepName: ModelType) => {
    Object.keys(visibleState).forEach((key) => {
      if (key !== keepName) {
        visibleState[key as ModalState] = false;
      }
      visibleState[keepName] = true;
    });
  };

  return {
    ...toRefs(visibleState),
    activeModalCount,

    openWhichModel,
    closeWhichModel,
    closeAllModel,
    beOnlyOneModel,
  };
});

export default useModalStore;
