<template>
	<div class="particle-clock-container">
		<canvas ref="canvas"></canvas>
	</div>
</template>

<script setup lang="ts" name="ParticleClock">
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useGlobalStore } from "@/stores/modules/global";

const globalStore = useGlobalStore();
const primary = computed(() => globalStore.primary);

onMounted(() => {
	// 当组件挂载时
	ctx = canvas.value.getContext("2d", {
		// 获取 2D 上下文
		willReadFrequently: true
	});

	initCanvasSize(); // 初始化画布尺寸
	draw(); // 开始绘制
});

onUnmounted(() => {
	// 当组件卸载时
	cancelAnimationFrame(animationFrameId); // 取消动画帧
});

/* 创建一个画布引用 */
const canvas = ref();
/* 定义画布上下文变量 */
let ctx: any;
/* 定义动画帧 ID 变量 */
let animationFrameId: any;
/* 初始化画布尺寸函数 */
const initCanvasSize = () => {
	// 设置画布宽度
	canvas.value.width = window.innerWidth * devicePixelRatio;
	// 设置画布高度
	canvas.value.height = window.innerHeight * devicePixelRatio;
};
/* 获取 [min, max] 范围内的随机整数 */
const getRandom = (min: number, max: number) => {
	// 返回随机整数
	return Math.floor(Math.random() * (max + 1 - min) + min);
};
/* 粒子类 */
class Particle {
	x: number;
	y: number;
	size: number;
	// 构造函数
	constructor() {
		const r = Math.min(canvas.value.width, canvas.value.height) / 2; // 计算半径
		const cx = canvas.value.width / 2; // 计算中心点 X 坐标
		const cy = canvas.value.height / 2; // 计算中心点 Y 坐标
		const rad = (getRandom(0, 360) * Math.PI) / 180; // 计算随机弧度
		this.x = cx + r * Math.cos(rad); // 设置粒子 X 坐标
		this.y = cy + r * Math.sin(rad); // 设置粒子 Y 坐标
		this.size = 12; // 设置粒子大小
	}
	// 绘制粒子方法
	draw() {
		ctx.beginPath(); // 开始路径
		ctx.fillStyle = primary.value; // 设置填充样式
		ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); // 绘制圆形
		ctx.fill(); // 填充路径
	}
	// 移动粒子方法
	moveTo(tx: number, ty: number) {
		const duration = 500; // 500ms的运动时间
		const sx = this.x, // 起始 X 坐标
			sy = this.y; // 起始 Y 坐标
		const xSpeed = (tx - sx) / duration; // 计算 X 方向速度
		const ySpeed = (ty - sy) / duration; // 计算 Y 方向速度
		const startTime = Date.now(); // 记录开始时间
		const _move = () => {
			// 移动函数
			const t = Date.now() - startTime; // 计算已过时间
			const x = sx + xSpeed * t; // 计算当前 X 坐标
			const y = sy + ySpeed * t; // 计算当前 Y 坐标
			this.x = x; // 更新粒子 X 坐标
			this.y = y; // 更新粒子 Y 坐标
			if (t >= duration) {
				// 如果已达到运动时间
				this.x = tx; // 设置粒子 X 坐标为目标 X 坐标
				this.y = ty; // 设置粒子 Y 坐标为目标 Y 坐标
				return; // 结束函数
			}
			// x，y改动一点
			requestAnimationFrame(_move); // 请求下一帧动画
		};
		_move(); // 开始移动
	}
}
/* 粒子数组 */
const partciles: any[] = [];
/* 文本变量 */
let text: any = null;
/* 清除画布函数 */
const clear = () => {
	ctx.clearRect(0, 0, canvas.value.width, canvas.value.height); // 清除画布内容
};
/* 绘制函数 */
const draw = () => {
	clear(); // 清除画布
	update(); // 更新状态
	partciles.forEach(p => p.draw()); // 绘制每个粒子
	animationFrameId = requestAnimationFrame(draw); // 请求下一帧动画
};
/* 获取文本函数 */
const getText = () => {
	// 返回当前时间字符串
	return new Date().toTimeString().substring(0, 8);
};
/* 更新状态函数 */
const update = () => {
	const newText = getText(); // 获取新文本
	if (newText === text) {
		// 如果文本没有变化
		return; // 结束函数
	}
	clear(); // 清除画布
	text = newText; // 更新文本
	// 画文本
	const { width, height } = canvas.value; // 获取画布宽高
	ctx.fillStyle = "#000"; // 设置填充样式
	ctx.textBaseline = "middle"; // 设置文本基线
	ctx.font = `${240 * devicePixelRatio}px 'DS-Digital', sans-serif`; // 设置字体样式
	ctx.fillText(text, (width - ctx.measureText(text).width) / 2, height / 2); // 绘制文本
	const points = getPoints(); // 获取点集
	clear(); // 清除画布
	for (let i = 0; i < points.length; i++) {
		// 遍历点集
		let p = partciles[i]; // 获取粒子
		if (!p) {
			// 如果粒子不存在
			p = new Particle(); // 创建新粒子
			partciles.push(p); // 将粒子添加到数组
		}
		const [x, y] = points[i]; // 获取点坐标
		p.moveTo(x, y); // 移动粒子到目标位置
	}
	if (points.length < partciles.length) {
		// 如果点集数量小于粒子数量
		partciles.splice(points.length); // 删除多余粒子
	}
};
/* 获取点集函数 */
const getPoints = () => {
	const { width, height, data } = ctx.getImageData(
		// 获取画布图像数据
		0,
		0,
		canvas.value.width,
		canvas.value.height
	);
	const points = []; // 点集数组
	const gap = 6; // 间隔
	for (let i = 0; i < width; i += gap) {
		// 遍历宽度
		for (let j = 0; j < height; j += gap) {
			// 遍历高度
			const index = (i + j * width) * 4; // 计算像素索引
			const r = data[index]; // 获取红色通道值
			const g = data[index + 1]; // 获取绿色通道值
			const b = data[index + 2]; // 获取蓝色通道值
			const a = data[index + 3]; // 获取透明度通道值
			if (r === 0 && g === 0 && b === 0 && a === 255) {
				// 如果像素为黑色
				points.push([i, j]); // 将坐标添加到点集
			}
		}
	}
	return points; // 返回点集
};
</script>

<style scoped lang="less">
.particle-clock-container {
	width: 120px;
	height: 50px;
	margin-top: 4px;
	margin-right: 6px;
	canvas {
		display: block;
		width: 100%;
		height: 100%;
		background: #ffffff;
	}
}
</style>
