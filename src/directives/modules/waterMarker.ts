/*
  需求：给整个页面添加背景水印。

  思路：
    1、使用 canvas 特性生成 base64 格式的图片文件，设置其字体大小，颜色等。
    2、将其设置为背景图片，从而实现页面或组件水印效果
  
  使用：设置水印文案，颜色，字体大小即可
  <div v-waterMarker="{text:'版权所有',textColor:'rgba(180, 180, 180, 0.4)'}"></div>
*/
import type { Directive, DirectiveBinding } from "vue";
// 水印文字，父元素，字体，文字颜色
const addWaterMarker: Directive = (str: string, parentNode: any, font: any, textColor: string) => {
	// 创建一个canvas元素
	let can: HTMLCanvasElement = document.createElement("canvas");
	// 将canvas元素添加到父元素中
	parentNode.appendChild(can);
	// 设置canvas元素的宽高
	can.width = 205;
	can.height = 140;
	// 隐藏canvas元素
	can.style.display = "none";
	// 获取canvas元素的2d上下文
	let cans = can.getContext("2d") as CanvasRenderingContext2D;
	// 旋转canvas元素
	cans.rotate((-20 * Math.PI) / 180);
	// 设置canvas元素的字体和文字颜色
	cans.font = font || "16px Microsoft JhengHei";
	cans.fillStyle = textColor || "rgba(180, 180, 180, 0.3)";
	// 设置canvas元素的文本对齐方式和基线
	cans.textAlign = "left";
	cans.textBaseline = "Middle" as CanvasTextBaseline;
	// 在canvas元素上绘制文本
	cans.fillText(str, can.width / 10, can.height / 2);
	// 将父元素的背景图片设置为canvas元素的dataURL
	parentNode.style.backgroundImage = "url(" + can.toDataURL("image/png") + ")";
};

const waterMarker = {
	mounted(el: DirectiveBinding, binding: DirectiveBinding) {
		// 调用addWaterMarker函数，给元素添加水印
		addWaterMarker(binding.value.text, el, binding.value.font, binding.value.textColor);
	}
};

export default waterMarker;
