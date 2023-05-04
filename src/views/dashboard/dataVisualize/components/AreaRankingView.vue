<template>
	<div ref="echartsRef" class="w-100" style="height: 350px"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import * as echarts from "echarts";
import { useEcharts } from "@/hooks/useEcharts";

const echartsRef = ref<HTMLElement>();
/* 定义定时器 */
const timeInter = ref<NodeJS.Timer | null>(null);
onMounted(() => {
	let myChart: echarts.ECharts = echarts.init(echartsRef.value as HTMLElement);
	/* 数据 */
	let nameList = ["广东省", "湖南省", "江西省", "广西省", "浙江省", "福建省", "湖北省", "重庆省", "云南省", "河南省"]; // 订单区域
	let valueList = [94, 92, 88, 77, 76, 65, 44, 43, 32, 21]; // 对应数值

	// 需要展示几条
	const showNum = 7;

	/* 函数 */
	// 获取当前数据
	let currentIndex = showNum; // 当前添加数据下标
	let currentValueList = valueList.slice(0, showNum); // 当前数值列表
	let currentNameList = nameList.slice(0, showNum); // 当前类型列表
	// 改变当前数据
	const getCurrentData = () => {
		// 添加数据
		currentValueList.push(valueList[currentIndex]);
		currentNameList.push(nameList[currentIndex]);
		// 重新切割
		currentValueList = currentValueList.slice(1, showNum + 1);
		currentNameList = currentNameList.slice(1, showNum + 1);
		// 判断当前下标是否超过最大值
		if (currentIndex < nameList.length - 1) {
			currentIndex++;
		} else {
			currentIndex = 0;
		}
	};
	// 调用设置默认
	//getCurrentData()
	let option: echarts.EChartsOption = {
		legend: {
			show: false
		},
		grid: {
			left: "60",
			right: "80",
			bottom: "18",
			top: "18",
			containLabel: true
		},
		xAxis: [
			{
				splitLine: {
					show: false
				},
				type: "value",
				show: false
			}
		],
		yAxis: [
			{
				splitLine: {
					show: false
				},
				axisLine: {
					//y轴
					show: false
				},
				type: "category",
				id: "yAxis1",
				axisTick: {
					show: false
				},
				inverse: true, // 倒序
				boundaryGap: false, // 留白政策
				data: currentNameList,
				axisLabel: {
					color: "rgba(0, 0, 0, 0.65)",
					align: "left",
					padding: [-10, 0, 0, -120],
					verticalAlign: "top",
					formatter: value => {
						let i = nameList.indexOf(value);
						if (i == 0) {
							return [`{lg1|${i + 1}} ` + "{title|" + value + "} "].join("\n");
						} else if (i == 1) {
							return [`{lg2|${i + 1}} ` + "{title|" + value + "} "].join("\n");
						} else if (i == 2) {
							return [`{lg3|${i + 1}} ` + "{title|" + value + "} "].join("\n");
						} else {
							return [`{lg|${i + 1}} ` + "{title|" + value + "} "].join("\n");
						}
					},
					rich: {
						lg1: {
							backgroundColor: "rgba(240, 106, 57, 0.1)",
							color: "rgba(240, 106, 57, 1)",
							borderRadius: [5, 5, 0, 0],
							padding: 5,
							align: "center",
							width: 18,
							height: 18,
							lineHeight: 18,
							fontSize: 14,
							fontFamily: "Source Han Sans CN-Regular"
						},
						lg2: {
							backgroundColor: "rgba(255, 176, 38, 0.1)",
							color: "rgba(255, 176, 38, 1)",
							borderRadius: 5,
							padding: 5,
							align: "center",
							width: 18,
							height: 18,
							lineHeight: 18,
							fontSize: 14,
							fontFamily: "Source Han Sans CN-Regular"
						},
						lg3: {
							backgroundColor: "rgba(51, 207, 201, 0.1)",
							color: "rgba(51, 207, 201, 1)",
							borderRadius: 5,
							padding: 5,
							align: "center",
							width: 18,
							height: 18,
							lineHeight: 18,
							fontSize: 14,
							fontFamily: "Source Han Sans CN-Regular"
						},
						lg: {
							backgroundColor: "rgba(57, 126, 240, 0.1)",
							color: "rgba(57, 126, 240, 1)",
							borderRadius: 5,
							padding: 5,
							align: "center",
							width: 18,
							height: 18,
							lineHeight: 18,
							fontSize: 14,
							fontFamily: "Source Han Sans CN-Regular"
						},
						title: {
							color: "rgba(0,0,0,0.65)",
							align: "right",
							fontSize: 14,
							fontFamily: "Source Han Sans CN-Regular",
							padding: [0, 0, 0, 16]
						}
					}
				}
			}
		],
		series: [
			{
				name: "转化率",
				type: "bar",
				id: "bar",
				barWidth: 8, // 柱子宽度
				showBackground: true,
				backgroundStyle: {
					color: "rgba(57, 126, 240, 0)",
					borderColor: "rgba(57, 126, 240, 0.04)",
					borderWidth: 20
				},
				label: {
					show: true,
					formatter: "转化率：{c}%",
					color: "rgba(0, 0, 0, 0.85)",
					fontFamily: "HarmonyOS Sans-Medium",
					fontSize: 12,
					position: "right"
				},
				itemStyle: {
					borderRadius: [0, 3, 3, 0], // 圆角（左上、右上、右下、左下）
					color: {
						x: 0,
						y: 1,
						x2: 1,
						y2: 0,
						colorStops: [
							{
								offset: 0,
								color: "rgba(57, 126, 240, 1)" // 0% 处的颜色
							},
							{
								offset: 1,
								color: "rgba(51, 207, 201, 1)" // 100% 处的颜色
							}
						]
					}
				},
				data: currentValueList
			}
		]
	};
	useEcharts(myChart, option);

	// 循环更新数据
	timeInter.value = setInterval(() => {
		getCurrentData();
		myChart.setOption({
			yAxis: [
				{
					id: "yAxis1",
					data: currentNameList
				}
			],
			series: [
				{
					id: "bar",
					data: currentValueList
				}
			]
		});
	}, 3000);
});

onUnmounted(() => {
	timeInter.value && clearInterval(timeInter.value); //销毁
	timeInter.value = null;
});
</script>

<style scoped lang="less"></style>
