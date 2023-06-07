<template>
	<!-- 统计数据 -->
	<a-row :gutter="4" class="mb-6">
		<a-col :md="12" :xl="6" v-for="item in statisticList" :key="item.title">
			<a-card hoverable size="small">
				<a-skeleton :loading="loading" active>
					<div class="flx-justify-between">
						<div>
							<img :src="getSvgImage(item.icon)" class="top-card-img" />
							<div class="pt-10">{{ item.title }}</div>
						</div>
						<div>
							<a-typography-text type="secondary">{{ item.period }}</a-typography-text>
						</div>
					</div>
					<div class="flx-justify-between">
						<a-typography-title :level="2">
							<CountUp :end="item.value" :options="{ prefix: item.prefix }"></CountUp>
						</a-typography-title>
						<div>
							<a-tag :color="item.isRise ? '#18A058' : '#D03050'">{{ item.change }}</a-tag>
							<SvgIcon :name="item.isRise ? 'rise' : 'decline'" />
						</div>
					</div>
				</a-skeleton>
			</a-card>
		</a-col>
	</a-row>
	<!-- 访问量、区域排行 -->
	<a-row :gutter="6" class="mb-6">
		<a-col :md="24" :xl="12">
			<a-card title="访问量" :bordered="false" hoverable>
				<a-skeleton :loading="loading" active>
					<PageView />
				</a-skeleton>
			</a-card>
		</a-col>
		<a-col :md="24" :xl="12">
			<a-card title="区域排行" :bordered="false" hoverable>
				<a-skeleton :loading="loading" active>
					<AreaRankingView />
				</a-skeleton>
			</a-card>
		</a-col>
	</a-row>
	<!-- 销售额、访问来源 -->
	<a-row :gutter="6" class="mb-6">
		<a-col :md="24" :xl="12">
			<a-card title="销售额" :bordered="false" hoverable>
				<a-skeleton :loading="loading" active>
					<SaleroomView />
				</a-skeleton>
			</a-card>
		</a-col>
		<a-col :md="24" :xl="12">
			<a-card title="访问来源" :bordered="false" hoverable>
				<a-skeleton :loading="loading" active>
					<AccessSourceView />
				</a-skeleton>
			</a-card>
		</a-col>
	</a-row>
</template>

<script setup lang="ts" name="dataVisualize">
import { ref, onMounted } from "vue";
import { getSvgImage } from "@/utils/util";

import PageView from "./components/PageView.vue";
import SaleroomView from "./components/SaleroomView.vue";
import AccessSourceView from "./components/AccessSourceView.vue";
import AreaRankingView from "./components/AreaRankingView.vue";
import SvgIcon from "@/components/SvgIcon/index.vue";
import CountUp from "@/components/CountUp/index.vue";

/* 骨架屏 */
const loading = ref(true);
/* 统计数据 */
const statisticList = ref([
	{
		title: "访问量",
		period: "周",
		value: 63089,
		change: "+31%",
		icon: "visits",
		isRise: true,
		prefix: ""
	},
	{
		title: "销售额",
		period: "周",
		value: 138826,
		change: "+23%",
		icon: "sale",
		isRise: true,
		prefix: "￥"
	},
	{
		title: "订单量",
		period: "周",
		value: 9500,
		change: "-20%",
		icon: "order_count",
		isRise: false,
		prefix: ""
	},
	{
		title: "成交额",
		period: "月",
		value: 396200,
		change: "-11%",
		icon: "volume",
		isRise: false,
		prefix: "￥"
	}
]);

onMounted(() => {
	setTimeout(() => {
		loading.value = false;
	}, 2000);
});
</script>

<style scoped lang="less">
.top-card-img {
	width: 32px;
	margin-left: 5px;
}
</style>
