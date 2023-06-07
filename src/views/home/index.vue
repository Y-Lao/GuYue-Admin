<template>
	<a-card title="工作台" :bordered="false" :bodyStyle="{ padding: '15px' }" class="mb-6">
		<a-row>
			<a-col :span="12">
				<div class="flx-align-center">
					<a-avatar :size="{ md: 42, xl: 52, xxl: 64 }">
						<template #icon>
							<img alt="avatar" src="@/assets/images/avatar.jpg" />
						</template>
					</a-avatar>
					<div>
						<p class="px-16 text-title">
							<span>{{ time }}</span
							>，{{ username }}，开始您一天的工作吧！
						</p>
						<p class="px-16 text-gray">今日阴转大雨，17℃ - 28℃，出门记得带伞哦。</p>
					</div>
				</div>
			</a-col>
			<a-col :span="12" class="flx-justify-between">
				<a-card :bordered="false" :bodyStyle="{ padding: '6px' }">
					<p class="count-text">项目数</p>
					<a-typography-text strong class="info-size">
						<CountUp :end="1600" :options="{ prefix: '' }"></CountUp>
					</a-typography-text>
				</a-card>
				<a-card :bordered="false" :bodyStyle="{ padding: '6px' }">
					<p class="count-text">待办</p>
					<a-typography-text strong class="info-size">
						<CountUp :end="9" :options="{ prefix: '' }"></CountUp>/<CountUp :end="16" :options="{ prefix: '' }"></CountUp>
					</a-typography-text>
				</a-card>
				<a-card :bordered="false" :bodyStyle="{ padding: '6px' }">
					<p class="count-text">消息</p>
					<a-typography-text strong class="info-size">
						<CountUp :end="1136" :options="{ prefix: '' }"></CountUp>
					</a-typography-text>
				</a-card>
			</a-col>
		</a-row>
	</a-card>
	<a-row :gutter="6">
		<!-- 工程项目 -->
		<a-col :span="12">
			<a-card title="工程项目" class="mb-6">
				<template #extra><a href="https://gitee.com/Y_lao/GuYue-Admin" target="_blank">更多项目</a></template>
				<a-card-grid v-for="item in projectData" :key="item.title">
					<div class="flex flex-row">
						<component :is="item.icon" :style="{ fontSize: '30px', color: item.color }"></component>
						<span class="project-text">
							<a-anchor-link :href="item.link" :title="item.title" target="_blank" />
						</span>
					</div>
					<div class="flex mt-8 text-gray" style="height: 40px; overflow: hidden">{{ item.desc }}</div>
					<div class="flex mt-8 text-gray" style="height: 20px; overflow: hidden; font-size: 12px; color: rgb(0 0 0 / 25%)">
						{{ item.author }}
					</div>
				</a-card-grid>
			</a-card>
			<!-- 动态 -->
			<a-card title="动态" :bordered="false" :bodyStyle="{ paddingTop: 0, paddingBottom: 0 }">
				<a-list item-layout="horizontal" :data-source="dynamicData">
					<template #renderItem="{ item }">
						<a-list-item>
							<a-list-item-meta :description="item.desc">
								<template #title>
									<a :href="item.link" target="_blank">{{ item.title }}</a>
								</template>
								<template #avatar>
									<a-avatar :size="40">
										<template #icon>
											<img alt="avatar" src="@/assets/images/avatar.jpg" />
										</template>
									</a-avatar>
								</template>
							</a-list-item-meta>
						</a-list-item>
					</template>
				</a-list>
			</a-card>
		</a-col>
		<!-- 快捷操作 -->
		<a-col :span="12">
			<a-card title="快捷操作" class="mb-6">
				<a-card-grid
					style="padding: 12px; text-align: center"
					v-for="item in shortcutKeyList"
					:key="item.title"
					class="shortcut-key"
				>
					<div class="flex justify-center flex-col" @click="item.onClick">
						<span>
							<component :is="item.icon" :style="{ fontSize: '26px', color: item.color }"></component>
						</span>
						<span class="title">{{ item.title }}</span>
					</div>
				</a-card-grid>
			</a-card>
			<!-- Gitee / GitHub 访问量占比 -->
			<a-card title="Gitee / GitHub 访问量占比" :bodyStyle="{ height: '350px' }">
				<div class="book-echarts">
					<Pie ref="pieRef" />
				</div>
			</a-card>
		</a-col>
	</a-row>
</template>

<script setup lang="ts" name="home">
import { ref, computed, onMounted } from "vue";
import { useUserStore } from "@/stores/modules/user";
import { getTimeState } from "@/utils/util";
import { useRouter } from "vue-router";
import Pie from "./components/pie.vue";
import CountUp from "@/components/CountUp/index.vue";

interface DataItem {
	id: string;
	title: string;
	link: string;
	desc: string;
}

interface ShortcutKeyItem {
	icon: string;
	title: string;
	color: string;
	onClick: () => void;
}

interface ShortcutKeyItem {
	icon: string;
	title: string;
	color: string;
	onClick: () => void;
}

interface ProjectItem {
	icon: string;
	title: string;
	desc: string;
	author: string;
	color: string;
	link?: string;
}

const router = useRouter();
const userStore = useUserStore();
const username = computed(() => userStore.userInfo.name);
const time = computed(() => getTimeState());
const pieRef = ref();

/* 快捷键 */
const shortcutKeyList: ShortcutKeyItem[] = [
	{
		icon: "FundViewOutlined",
		title: "主控台",
		color: "#68c755",
		onClick: () => {
			router.push("/dashboard/dataVisualize");
		}
	},
	{
		icon: "FileTextOutlined",
		title: "表单",
		color: "#fab558",
		onClick: () => {
			router.push("/form/basicForm");
		}
	},
	{
		icon: "LockOutlined",
		title: "权限管理",
		color: "#3da2ff",
		onClick: () => {
			router.push("/auth/menu");
		}
	},
	{
		icon: "BarChartOutlined",
		title: "数据大屏",
		color: "#f387aa",
		onClick: () => {
			router.push("/dataScreen");
		}
	},
	{
		icon: "ProjectOutlined",
		title: "关于项目",
		color: "#814dd6",
		onClick: () => {
			router.push("/about/index");
		}
	},
	{
		icon: "MailOutlined",
		title: "消息",
		color: "#5cdbd3",
		onClick: () => {}
	}
];
/* 动态 */
const dynamicData: DataItem[] = [
	{
		id: "1",
		title: "vue3自定义右键菜单组件",
		link: "https://juejin.cn/post/7212456518331088952",
		desc: "2023-05-06 22:06:16"
	},
	{
		id: "2",
		title: "工程化之Axios + Ts的二次封装",
		link: "https://juejin.cn/post/7175174061515866149",
		desc: "2023-05-04 12:17:16"
	},
	{
		id: "3",
		title: "less 定义全局样式",
		link: "https://juejin.cn/post/7167007858394546213",
		desc: "2023-05-03 21:37:16"
	},
	{
		id: "4",
		title: "vue3.2 - nextTick的使用",
		link: "https://juejin.cn/post/7039135899904393229",
		desc: "2023-05-02 15:27:16"
	},
	{
		id: "5",
		title: "Vue版的 hooks 库 --- VueUse",
		link: "https://juejin.cn/post/7055248384713555999",
		desc: "2023-05-01 05:30:16"
	},
	{
		id: "6",
		title: "Vue3自定义指令-10个常见的实用指令",
		link: "https://juejin.cn/post/6968996649515515917",
		desc: "2023-05-01 16:17:16"
	}
];
/* 工程项目 */
const projectData: ProjectItem[] = [
	{
		icon: "GithubOutlined",
		title: "Github",
		desc: "是一个面向开源及私有软件项目的托管平台。",
		author: "开源君 2021-07-04",
		color: "#333639",
		link: "https://github.com/"
	},
	{
		icon: "GitlabOutlined",
		title: "Gitlab",
		desc: "基于git的项目管理软件。",
		author: "学不动也要学 2021-07-04",
		color: "#47ba86",
		link: "https://gitlab.com/users/sign_in"
	},
	{
		icon: "Html5Outlined",
		title: "HTML5",
		desc: "HTML5是互联网的下一代标准。",
		author: "撸码也是一种艺术 2021-04-01",
		color: "#e4502c",
		link: "https://www.w3school.com.cn/html/html5_intro.asp"
	},
	{
		icon: "TaobaoCircleOutlined",
		title: "淘宝网",
		desc: "只有你想不到，没有你淘不到。",
		author: "购物天地 2021-04-01",
		color: "#42b983",
		link: "https://www.taobao.com/"
	},
	{
		icon: "AlipayCircleOutlined",
		title: "支付宝",
		desc: "致力于为企业和个人提供，简单、安全、快速、支付解决方案。",
		author: "支付工具 2021-07-04",
		color: "#61dafb",
		link: "https://auth.alipay.com/login/index.htm"
	},
	{
		icon: "WeiboOutlined",
		title: "微博",
		desc: "分享简短实时信息的社交平台。",
		author: "分享君 2021-07-04",
		color: "#dd0031",
		link: "https://weibo.com/newlogin?url=https%3A%2F%2Fweibo.com%2F"
	}
];

const pieData = [
	{ value: 4524, name: "Gitee 访问量" },
	{ value: 8616, name: "GitHub 访问量" }
];

onMounted(() => {
	pieRef.value.initChart(pieData);
});
</script>

<style scoped lang="less">
@import url("./index.less");
</style>
