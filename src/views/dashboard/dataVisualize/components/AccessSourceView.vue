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
		color: ["#59A2FE", "#FFB717", "#FC8F6B", "#70E07B", "#FBDA3D", "#11E5F1", "#E3A0FF"],
		title: {
			text: "访问来源",
			subtext: "全站来源统计",
			left: "center"
		},
		tooltip: {
			trigger: "item",
			backgroundColor: "#ffffff",
			formatter: function (params: any) {
				let str =
					"访问来源" +
					"</br>" +
					params.marker +
					"" +
					params.name +
					"</br>" +
					"数量：" +
					params.data.value +
					"</br>" +
					"占比：" +
					params.percent +
					"%";
				return str;
			}
		},
		legend: {
			orient: "vertical",
			itemWidth: 25,
			itemHeight: 15,
			left: "2%",
			align: "left",
			top: "2%",
			textStyle: {
				fontSize: 12,
				fontFamily: "PingFangSC-Regular, PingFang SC",
				fontWeight: 400,
				color: "#0D1134",
				lineHeight: 17
			}
		},
		series: [
			{
				type: "pie",
				radius: [0, 100],
				labelLine: {
					length: 20,
					length2: 30
				},

				label: {
					formatter: "{a|{b}}\n{per|{d}%}",
					rich: {
						a: {
							fontSize: 12,
							lineHeight: 16,
							align: "center"
						},
						per: {
							color: "#545454",
							align: "center",
							fontSize: 12,
							lineHeight: 16
						}
					}
				},

				data: [
					{ value: 5920, name: "抖音" },
					{ value: 2640, name: "快手" },
					{ value: 2125, name: "微博" },
					{ value: 1925, name: "虎牙" },
					{ value: 1220, name: "斗鱼" },
					{ value: 635, name: "人民日报" },
					{ value: 4638, name: "微信" }
				]
			}
		]
	};
	useEcharts(myChart, option);
});
</script>

<style scoped lang="less"></style>
