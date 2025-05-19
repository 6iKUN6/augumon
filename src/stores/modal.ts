import { defineStore } from "pinia";

export enum ModalState {
  login = "login", //登录
  register = "register", //注册
}

const useModalStore = defineStore("modal", () => {
  const visibleState = reactive<Record<ModalState, boolean>>({
    login: false,
    register: false,
  });

  const activeModalCount = ref(0);

  const openWhichModel = (name: ModalState) => {
    visibleState[name] = true;
  };

  const closeWhichModel = (name: ModalState) => {
    visibleState[name] = false;
  };

  const closeAllModel = () => {
    Object.keys(visibleState).forEach((key) => {
      visibleState[key as ModalState] = false;
    });
  };

  const beOnlyOneModel = (keepName: ModalState) => {
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
