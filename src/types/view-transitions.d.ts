// View Transitions API 类型声明
declare global {
  interface Document {
    startViewTransition?: (callback: () => void | Promise<void>) => {
      ready: Promise<void>;
      updateCallbackDone: Promise<void>;
      finished: Promise<void>;
      skipTransition(): void;
    };
  }
}

export {};
