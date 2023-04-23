/*
	需求：实现一个拖拽指令，可在父元素区域任意拖拽元素。

	思路：
		1、设置需要拖拽的元素为absolute，其父元素为relative。
		2、鼠标按下(onmousedown)时记录目标元素当前的 left 和 top 值。
		3、鼠标移动(onmousemove)时计算每次移动的横向距离和纵向距离的变化值，并改变元素的 left 和 top 值
		4、鼠标松开(onmouseup)时完成一次拖拽

	使用：在 Dom 上加上 v-draggable 即可
	<div class="dialog-model" v-draggable></div>
*/
import type { Directive } from "vue";
interface ELType extends HTMLElement {
	parentNode: any;
}

const draggable: Directive = {
	mounted(el: ELType) {
		// 将光标设置为“move”，将位置设置为“absolute”
		el.style.cursor = "move";
		el.style.position = "absolute";
		// 当元素被点击时
		el.onmousedown = function (e) {
			// 计算鼠标点击位置与元素左上角之间的距离
			let disX = e.pageX - el.offsetLeft;
			let disY = e.pageY - el.offsetTop;

			// 当鼠标移动时
			document.onmousemove = function (e) {
				// 计算元素的新位置
				let x = e.pageX - disX;
				let y = e.pageY - disY;

				// 计算元素可以移动到的最大位置
				let maxX = el.parentNode.offsetWidth - el.offsetWidth;
				let maxY = el.parentNode.offsetHeight - el.offsetHeight;

				// 确保元素不会超出其父元素的边界
				if (x < 0) {
					x = 0;
				} else if (x > maxX) {
					x = maxX;
				}

				if (y < 0) {
					y = 0;
				} else if (y > maxY) {
					y = maxY;
				}

				// 设置元素的新位置
				el.style.left = x + "px";
				el.style.top = y + "px";
			};

			// 当鼠标释放时
			document.onmouseup = function () {
				// 停止跟踪鼠标移动
				document.onmousemove = document.onmouseup = null;
			};
		};
	}
};

export default draggable;
