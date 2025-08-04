import { Rect, Ellipse, Line, Polygon, Star, Path, Pen, Image, Text } from 'leafer-ui';
import type {
  IRectInputData,
  IEllipseInputData,
  ILineInputData,
  IPolygonInputData,
  IStarInputData,
  IPathInputData,
  // IPenInputData,
  IImageInputData,
  ITextInputData,
} from 'leafer-ui';

//矩形
const defaultRectProps: IRectInputData = {
  width: 100,
  height: 100,
  fill: 'red',
};

const createRect = (props: IRectInputData) => {
  const p = Object.assign({}, defaultRectProps, props);
  const r = new Rect(p);
  return r;
};

//Ellipse，圆、圆环、扇形圆环、扇形、弧线、椭圆
const defaultEllipseProps: IEllipseInputData = {
  width: 100,
  height: 100,
  fill: 'red',
};
const createEllipse = (props: IEllipseInputData) => {
  const p = Object.assign({}, defaultEllipseProps, props);
  const e = new Ellipse(p);
  return e;
};
const createRing = (props: IEllipseInputData) => {
  const p = Object.assign({ innerRadius: 0.5 }, defaultEllipseProps, props);
  const e = new Ellipse(p);
  return e;
};

const defaultLineProps: ILineInputData = {
  width: 100,
  strokeWidth: 5,
  fill: 'red',
};

const createLine = (props: ILineInputData) => {
  const p = Object.assign({}, defaultLineProps, props);
  const l = new Line(p);
  return l;
};

//多边形
const defaultPolygonProps: IPolygonInputData = {
  width: 100,
  height: 100,
  sides: 3,
  fill: 'red',
};

const createPolygon = (props: IPolygonInputData) => {
  const p = Object.assign({}, defaultPolygonProps, props);
  const l = new Polygon(p);
  return l;
};

//星形
const defaultStarProps: IStarInputData = {
  width: 100,
  height: 100,
  corners: 5,
  fill: 'red',
};

const createStar = (props: IStarInputData) => {
  const p = Object.assign({}, defaultStarProps, props);
  const s = new Star(p);
  return s;
};

//路径
const defaultPathProps: IPathInputData = {
  scale: 0.1,
  path: 'M945.344 586.304c-13.056-93.44-132.48-98.048-132.48-98.048 0-29.888-39.808-47.424-39.808-47.424L201.664 440.832c-36.736 0-42.112 51.264-42.112 51.264 7.68 288 181.44 382.976 181.44 382.976l299.456 0c42.88-31.36 101.888-122.56 101.888-122.56 9.216 3.072 72.768-0.832 97.984-6.144C865.6 740.992 958.336 679.68 945.344 586.304zM365.568 825.28c-145.472-105.664-130.944-328.576-130.944-328.576l80.448 0c-44.416 126.4 43.648 285.696 55.872 307.904C383.232 826.816 365.568 825.28 365.568 825.28zM833.472 694.272c-37.568 22.272-65.152 7.68-65.152 7.68 39.04-54.4 42.112-159.296 42.112-159.296 6.848 2.304 12.288-26.048 61.312 23.744C920.768 616.128 871.04 672.064 833.472 694.272z M351.68 129.856c0 0-119.424 72.832-44.416 140.928 75.008 68.16 68.16 93.44 24.512 153.216 0 0 81.92-41.344 71.168-104.192s-89.6-94.208-72.768-137.792C347.136 138.304 351.68 129.856 351.68 129.856z M615.232 91.648c0 0-119.488 72.832-44.352 140.928 74.944 68.16 68.032 93.44 24.448 153.216 0 0 81.984-41.344 71.232-104.192-10.688-62.784-89.6-94.208-72.832-137.792C610.624 100.032 615.232 91.648 615.232 91.648z M491.136 64c0 0-74.304 6.144-88.128 78.144C389.248 214.144 435.968 240.96 471.936 276.992 507.904 312.96 492.608 380.352 452.032 427.904c0 0 72.768-25.344 89.6-94.976 16.832-69.76-17.344-94.272-52.8-134.784C453.312 157.504 456.64 83.968 491.136 64z',
  fill: '#32cd79',
};

const createPath = (props: IPathInputData) => {
  const p = Object.assign({}, defaultPathProps, props);
  const path = new Path(p);
  return path;
};

//笔
// const defaultPenProps: IPenInputData = {

// };

const createPen = () => {
  const pen = new Pen();
  pen.setStyle({
    fill: {
      type: 'radial',
      stops: [
        { offset: 0, color: '#FF4B4B' },
        { offset: 1, color: '#FEB027' },
      ],
    },
  });
  pen.roundRect(0, 0, 100, 100, 30);

  pen.setStyle({ y: -5, fill: 'white' });
  pen
    .moveTo(40, 30)
    .bezierCurveTo(70, 30, 90, 60, 63, 80)
    .quadraticCurveTo(50, 88, 40, 80)
    .bezierCurveTo(10, 60, 50, 40, 40, 30);

  return pen;
};

//图片
const defaultImageProps: IImageInputData = {
  url: 'https://cdn.leafer-ui.com/images/logo.png',
  width: 200,
  // height: 100,
  lazy: false,
  pixelRatio: 1,
  placeholderColor: '#999',
};

const createImage = (props: IImageInputData) => {
  const p = Object.assign({}, defaultImageProps, props);
  const image = new Image(p);
  return image;
};

//文本
const defaultTextProps: ITextInputData = {
  // text: 'Hello World',
  placeholder: '(点击输入文本)',
  placeholderColor: '#999',
  fill: 'red',
  // fontSize: 100,
  fontFamily: '',
  fontWeight: 'normal',
  italic: false, //斜体
  textDecoration: 'none', //下划线
  letterSpacing: 0, //字距
  // lineHeight: 1.5, //行高
  textWrap: 'none', //换行
  textOverflow: '...', //溢出
  textAlign: 'left',
  verticalAlign: 'middle',
  autoSizeAlign: true, //当文本没有宽高且有对齐属性时，是否对齐起点坐标
  padding: [],
  // resizeFontSize: true, //自动宽高的文本是否通过修改字体大小进行 resize
  boxStyle: {},
  hoverStyle: {},
};

const createText = (props: ITextInputData) => {
  const p = Object.assign({}, defaultTextProps, props);
  const text = new Text(p);
  return text;
};

export {
  createRect,
  createEllipse,
  createRing,
  createLine,
  createPolygon,
  createStar,
  createPath,
  createPen,
  createImage,
  createText,
};
