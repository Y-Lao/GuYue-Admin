<template>
	<div class="card content-box">
		<span class="text">分步表单 --- 将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。</span>
		<div class="w-60">
			<a-steps :current="current">
				<a-step v-for="item in steps" :title="item.title" :description="item.description" :key="item.title" />
			</a-steps>
			<div class="steps-content">
				<component
					:is="stepsComponent[current]"
					:next="next"
					:prev="prev"
					:stepsData="stepsData"
					:changeCurrent="changeCurrent"
				></component>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts" name="substepForm">
import { ref } from "vue";
import SubstepOne from "./components/SubstepOne.vue";
import SubstepTwo from "./components/SubstepTwo.vue";
import SubstepThree from "./components/SubstepThree.vue";

interface Steps {
	stepOne: any;
	stepTwo: any;
	stepThree: any;
}

/* 当前步骤 */
const current = ref(0);
/* 分步表单 */
const steps = ref([
	{
		title: "填写转账信息",
		description: "确保填写正确"
	},
	{
		title: "确认转账信息",
		description: "确认转账信息"
	},
	{
		title: "完成转账",
		description: "恭喜您，完成转账"
	}
]);
/* 分步表单数据 */
const stepsData = ref<Steps>({
	stepOne: {},
	stepTwo: {},
	stepThree: {}
});
/* 分步表单步骤 */
const stepsComponent = [SubstepOne, SubstepTwo, SubstepThree];
/* 下一步 */
const next = (params: Object = {}) => {
	if (current.value === 0) stepsData.value.stepOne = params;
	if (current.value === 1) stepsData.value.stepTwo = params;
	if (current.value === 2) stepsData.value.stepThree = params;
	current.value++;
};
/* 上一步 */
const prev = () => {
	current.value--;
};
/* 改变当前步骤 */
const changeCurrent = (val: number) => {
	current.value = val;
};
</script>

<style scoped lang="less">
.steps-content {
	display: flex;
	justify-content: center;
	min-height: 200px;
	margin-top: 30px;
}
</style>
