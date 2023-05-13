import { Component, h, render } from "vue";

interface Instance {
	id: number;
	destroy: () => void;
}

// 定义一个变量，用于记录当前菜单实例
let curInstance: Instance | null = null;
// 定义一个变量，用于记录菜单的id
let seed = 1;
// 定义一个函数，用于展示右键菜单
const contextMenu = (e: MouseEvent, data: any, component: Component) => {
	// 如果当前已经存在菜单实例，就销毁它
	if (curInstance) {
		curInstance.destroy();
	}
	// 将当前菜单实例置为null
	curInstance = null;
	// 生成一个新的菜单id
	let id = seed++;
	// 创建一个临时的div，用于挂载我们的菜单
	const container = document.createElement("div");
	// 获取body标签，用于挂载整个菜单
	const appendTo = document.body;
	// 传给menu组件的props
	const props = {
		data,
		onClose: () => {
			if (curInstance) {
				curInstance.destroy();
			}
		}
	};
	// 渲染虚拟节点
	const vnode = h(component, props);
	// vnode为需要渲染的虚拟节点，container为渲染的容器
	render(vnode, container);
	// 首先需要先把菜单真正渲染到页面，才能拿到它的宽度和高度
	appendTo.appendChild(container.firstElementChild as HTMLElement);
	// 当前真正的菜单节点，上面输出的vnode中可以看到，el就是我们的菜单节点
	const curMenu = vnode.el as HTMLElement;
	// 获取curMenu的高度和宽度，用于临界的计算
	const { offsetWidth, offsetHeight } = curMenu;
	// 获取body的可视区域的宽度
	const { clientWidth } = appendTo;
	// 取出右键点击时的坐标，clientX是距离左侧的位置，clientY是距离顶部的位置
	const { clientX, clientY } = e;

	// 当前可视区域的宽度 - 当前鼠标距离浏览器左边的距离
	// 如果 大于菜单的宽度，说明正常设置菜单距离左边界的距离,即设置style.left
	// 否则菜单需要在鼠标左侧展示，即需要设置style.right组件距离可视区域右侧的距离
	const leftOrRight = clientWidth - clientX > offsetWidth ? "left" : "right";

	// 当前浏览器的高度(不包含滚动条) - 当前鼠标距离浏览器上边的距离
	// 如果 大于菜单的高度，说明可以正常设置菜单距离上边界的距离,即设置style.top
	// 否则需要设置菜单距离底部边界的位置，即style.bottom
	const topOrBottom = window.innerHeight - clientY > offsetHeight ? "top" : "bottom";
	const offsetLeft = Math.abs(clientWidth - clientX);
	// 设置left或者right的style
	curMenu.style[leftOrRight] = leftOrRight === "left" ? `${clientX + 20}px` : `${offsetLeft}px`;
	// 设置top或者bottom的style
	curMenu.style[topOrBottom] = topOrBottom === "bottom" ? "2px" : `${clientY}px`;

	// 定义一个对象，用于记录当前菜单实例的id和销毁函数
	const instance: Instance = {
		id,
		destroy: () => {
			curInstance = null;
			render(null, container);
		}
	};
	// 将当前菜单实例置为instance
	curInstance = instance;
	// 返回当前菜单实例
	return instance;
};

export default contextMenu;
