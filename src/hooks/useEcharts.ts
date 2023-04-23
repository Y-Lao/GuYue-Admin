import { onDeactivated, onBeforeUnmount } from "vue";
import * as echarts from "echarts";

/**
 * @description 使用 Echarts (只是为了添加图表响应式)
 * @param {Element} myChart Echarts实例 (必传)
 * @param {Object} options 绘制Echarts的参数 (必传)
 * */
// 定义一个函数 useEcharts，接收两个参数 myChart 和 options
export const useEcharts = (myChart: echarts.ECharts, options: echarts.EChartsCoreOption) => {
	if (options && typeof options === "object") {
		// 调用 myChart 的 setOption 方法，将 options 作为参数传入
		myChart.setOption(options);
	}
	// 定义一个函数 echartsResize，用于调整图表大小
	const echartsResize = () => {
		myChart && myChart.resize();
	};
	// 监听窗口大小变化事件，调用 echartsResize 函数
	window.addEventListener("resize", echartsResize);

	// 防止 echarts 页面 keepAlive 时，还在继续监听页面
	onDeactivated(() => {
		// 当页面失去焦点时，移除 resize 事件监听
		window.removeEventListener("resize", echartsResize);
	});

	onBeforeUnmount(() => {
		// 当页面卸载时，移除 resize 事件监听
		window.removeEventListener("resize", echartsResize);
	});
};
