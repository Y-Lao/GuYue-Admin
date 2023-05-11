<template>
	<span ref="countupRef"></span>
</template>

<script setup lang="ts">
import { CountUp } from "countup.js";
import type { CountUpOptions } from "countup.js";
import { onMounted, ref } from "vue";

let numAnim = ref(null) as any;
const countupRef = ref();
const props = defineProps({
	end: {
		type: Number,
		default: 0
	},
	options: {
		type: Object,
		validator(option: Object) {
			let keys = [
				"startVal",
				"decimalPlaces",
				"duration",
				"useGrouping",
				"useEasing",
				"smartEasingThreshold",
				"smartEasingAmount",
				"separator",
				"decimal",
				"prefix",
				"suffix",
				"numerals"
			];
			for (const key in option) {
				if (!keys.includes(key)) {
					console.error(" CountUp 传入的 options 值不符合 CountUpOptions");
					return false;
				}
			}
			return true;
		},
		default() {
			let options: CountUpOptions = {
				startVal: 0, // 开始的数字  一般设置0开始
				decimalPlaces: 2, // number类型 小数位，整数自动添.00
				duration: 2, // number类型 动画延迟秒数，默认值是2
				useGrouping: true, // boolean类型  是否开启逗号，默认true(1,000)false(1000)
				useEasing: true, // booleanl类型 动画缓动效果(ease),默认true
				smartEasingThreshold: 500, // numberl类型 大于这个数值的值开启平滑缓动
				smartEasingAmount: 300, // numberl类型
				separator: ",", // string 类型 分割用的符号
				decimal: ".", // string 类型  小数分割符合
				prefix: "", // sttring 类型  数字开头添加固定字符
				suffix: "", // sttring类型 数字末尾添加固定字符
				numerals: [] // Array类型 替换从0到9对应的字，也就是自定数字字符了,数组存储
			};
			return options;
		}
	}
});
onMounted(() => {
	initCount();
});
const initCount = () => {
	numAnim = new CountUp(countupRef.value, props.end, props.options);
	numAnim.start();
};

const updateCount = (num: number) => {
	numAnim.update(num);
};

defineExpose({
	initCount,
	updateCount
});
</script>

<style scoped lang="less"></style>
