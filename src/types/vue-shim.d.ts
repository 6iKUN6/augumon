declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>;
  export default component;
}

// declare module '@vue/runtime-core' {
//   // eslint-disable-next-line @typescript-eslint/no-empty-object-type
//   export interface GlobalProperties {
//     // 可以在这里添加全局属性的类型声明
//     // 例如: $t: (key: string) => string
//   }
// }
