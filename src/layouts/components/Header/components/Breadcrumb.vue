<template>
	<div :class="['breadcrumb-box', !globalStore.breadcrumbIcon && 'no-icon']">
		<a-breadcrumb class="breadcrumb" id="breadcrumbGuide">
			<template #separator>
				<SvgIcon name="dayu" style="color: #c1c3c8" :iconStyle="{ width: '18px', height: '18px' }" />
			</template>
			<a-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="item.path">
				<div
					class="a-breadcrumb__inner is-link"
					@click="onBreadcrumbClick(item, index)"
					:class="index === breadcrumbList.length - 1 ? 'a-breadcrumb__inner_last' : ''"
				>
					<div class="breadcrumb-icon" v-show="item.meta.icon && globalStore.breadcrumbIcon">
						<component :is="item.meta.icon"></component>
					</div>
					<span class="breadcrumb-title">{{ item.meta.title }}</span>
				</div>
			</a-breadcrumb-item>
		</a-breadcrumb>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useGlobalStore } from "@/stores/modules/global";
import { useAuthStore } from "@/stores/modules/auth";
import { useRoute, useRouter } from "vue-router";
import { HOME_URL } from "@/config";
import SvgIcon from "@/components/SvgIcon/index.vue";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const globalStore = useGlobalStore();

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
				display: flex;
				align-items: center;
				justify-content: center;
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
			top: 5px;
		}
		.a-breadcrumb__inner.is-link {
			font-weight: 700;
			color: #303133;
			&:hover {
				color: var(--ant-primary-color);
				cursor: pointer;
			}
		}
		.a-breadcrumb__inner_last,
		.a-breadcrumb__inner_last:hover {
			font-weight: 400 !important;
			color: #606266 !important;
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
