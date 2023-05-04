<template>
	<div ref="echartsRef" class="w-100" style="height: 350px"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
import { useEcharts } from "@/hooks/useEcharts";

const echartsRef = ref<HTMLElement>();
onMounted(() => {
	let myChart: echarts.ECharts = echarts.init(echartsRef.value as HTMLElement);
	let option: echarts.EChartsOption = {
		title: {},
		tooltip: {
			trigger: "axis",
			axisPointer: {
				type: "cross",
				label: {
					backgroundColor: "#6a7985"
				}
			}
		},
		legend: {
			right: "6%",
			top: "8%",
			data: ["当月销售额", "月均销售额"]
		},
		grid: {
			left: "3%",
			right: "4%",
			bottom: "3%",
			containLabel: true
		},
		xAxis: [
			{
				type: "category",
				boundaryGap: true, //坐标轴两边留白
				data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
			}
		],
		yAxis: [
			{
				name: "单位：元",
				type: "value",
				max: 1500, //最大值
				min: 0, //最小值
				interval: 300 //间隔
			}
		],
		series: [
			{
				name: "月均销售额",
				type: "line",
				areaStyle: {
					color: "#77c9ff"
				},
				emphasis: {
					focus: "series"
				},
				data: [720, 832, 801, 934, 890, 930, 1260, 1176, 1232, 1261, 1304, 1353]
			},
			{
				name: "当月销售额",
				type: "line",
				areaStyle: {
					color: "#78d8d8"
				},
				emphasis: {
					focus: "series"
				},
				data: [620, 632, 701, 634, 790, 830, 860, 876, 932, 951, 1104, 1135]
			}
		]
	};
	useEcharts(myChart, option);
});
</script>

<style scoped lang="less"></style>
