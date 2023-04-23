<template>
	<div ref="echartsRef" class="card content-box"></div>
</template>

<script setup lang="ts" name="radarChart">
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
import { useEcharts } from "@/hooks/useEcharts";
const echartsRef = ref<HTMLElement>();
onMounted(() => {
	let myChart: echarts.ECharts = echarts.init(echartsRef.value as HTMLElement);
	let option: echarts.EChartsOption = {
		title: {
			text: "基础雷达图"
		},
		tooltip: {},
		legend: {
			data: ["预算分配(Allocated Budget)", "实际开销(Actual Spending)"]
		},
		radar: {
			indicator: [
				{ name: "销售(sales)", max: 6500 },
				{ name: "管理(Administration)", max: 16000 },
				{ name: "信息技术(Information Techology)", max: 30000 },
				{ name: "客服(Customer Support)", max: 38000 },
				{ name: "研发(Development)", max: 52000 },
				{ name: "市场(Marketing)", max: 25000 }
			]
		},
		series: [
			{
				name: "预算 vs 开销(Budget vs spending)",
				type: "radar",
				// areaStyle: {normal: {}},
				data: [
					{
						value: [4300, 10000, 28000, 35000, 50000, 19000],
						name: "预算分配(Allocated Budget)"
					},
					{
						value: [5000, 14000, 28000, 31000, 42000, 21000],
						name: "实际开销(Actual Spending)"
					}
				]
			}
		]
	};
	useEcharts(myChart, option);
});
</script>

<style scoped lang="less"></style>
