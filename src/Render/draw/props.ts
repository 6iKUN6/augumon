// import type { App } from 'leafer-ui';
import type { ILeaferType } from 'leafer-ui';

export interface BaseProps {
  type?: ILeaferType;
  width?: number;
  height?: number;
  view?: Element | HTMLElement | object | string; //元素和选择器，id选择器不用加#
  fill?: string;
}
