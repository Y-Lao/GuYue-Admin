<template>
	<div :class="['breadcrumb-box', !themeConfig.breadcrumbIcon && 'no-icon']">
		<a-breadcrumb class="breadcrumb">
			<template #separator><span style="color: #c1c3c8">></span></template>
			<transition-group name="breadcrumb" mode="out-in">
				<a-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="item.path">
					<div class="a-breadcrumb__inner is-link" @click="onBreadcrumbClick(item, index)">
						<div class="breadcrumb-icon" v-show="item.meta.icon && themeConfig.breadcrumbIcon">
							<component :is="item.meta.icon"></component>
						</div>
						<span class="breadcrumb-title">{{ item.meta.title }}</span>
					</div>
				</a-breadcrumb-item>
			</transition-group>
		</a-breadcrumb>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { GlobalStore } from "@/stores";
import { AuthStore } from "@/stores/modules/auth";
import { useRoute, useRouter } from "vue-router";
import { HOME_URL } from "@/config/config";

const route = useRoute();
const router = useRouter();
const authStore = AuthStore();
const globalStore = GlobalStore();
const themeConfig = computed(() => globalStore.themeConfig);
const breadcrumbList = computed(() => {
	let breadcrumbData = authStore.breadcrumbListGet[route.matched[route.matched.length - 1].path] ?? [];
	// 不需要首页面包屑可删除以下判断
	if (breadcrumbData[0].meta.title !== route.meta.title) {
		breadcrumbData = [{ path: HOME_URL, meta: { icon: "HomeFilled", title: "首页" } }, ...breadcrumbData];
	}
	return breadcrumbData;
});

const onBreadcrumbClick = (item: Menu.MenuOptions, index: number) => {
	if (index !== breadcrumbList.value.length - 1) router.push(item.path);
};
</script>

<style scoped lang="less">
.breadcrumb-box {
	display: flex;
	align-items: center;
	padding-right: 50px;
	overflow: hidden;
	mask-image: linear-gradient(90deg, #000000 0%, #000000 calc(100% - 50px), transparent);
	.breadcrumb {
		white-space: nowrap;
		:global(.ant-breadcrumb-link) {
			position: relative;
			display: inline-block;
			float: none;
		}
		.a-breadcrumb__inner {
			display: inline-flex;
			.breadcrumb-icon {
				margin-top: 2px;
				margin-right: 6px;
				font-size: 16px;
			}
			.breadcrumb-title {
				margin-top: 3px;
			}
		}
		:global(.ant-breadcrumb-separator) {
			position: relative;
			top: -1px;
		}
	}
}
.no-icon {
	.breadcrumb {
		:global(.ant-breadcrumb-link) {
			top: -2px;
			:global(.ant-breadcrumb-separator) {
				top: 2px;
			}
		}
	}
}
</style>
