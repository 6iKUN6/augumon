import { defineStore } from "pinia";

const useTestStore = defineStore("test", () => {
  const count = ref(0);
  return {
    count,
    add: () => {
      count.value++;
    },
  };
});

export default useTestStore;
