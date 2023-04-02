<template>
	<div class="tabs-box">
		<div class="tabs-menu">
			<a-tabs
				v-model:activeKey="tabsMenuValue"
				hide-add
				type="editable-card"
				@tab-click="tabClick"
				@edit="onEdit"
				:tabBarStyle="tabBarStyle"
				:tabBarGutter="5"
			>
				<a-tab-pane v-for="item in tabsMenuList" :key="item.path" :tab="item.title" :closable="item.close">
					<template #tab>
						<span>
							<component :is="item.icon"></component>
							{{ item.title }}
						</span>
					</template>
				</a-tab-pane>
			</a-tabs>
			<MoreButton />
		</div>
	</div>
</template>

<script setup lang="ts">
import Sortable from "sortablejs";
import { ref, computed, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
// import { GlobalStore } from "@/stores";
import { TabsStore } from "@/stores/modules/tabs";
import { AuthStore } from "@/stores/modules/auth";
import { KeepAliveStore } from "@/stores/modules/keepAlive";
import router from "@/routers";
import MoreButton from "./components/MoreButton.vue";

const route = useRoute();
const tabsStore = TabsStore();
// const globalStore = GlobalStore();
const authStore = AuthStore();
const keepAliveStore = KeepAliveStore();

const tabsMenuValue = ref(route.fullPath);
const tabsMenuList = computed(() => tabsStore.tabsMenuList);
const tabBarStyle = {
	padding: "0 10px",
	height: "40px",
	margin: 0
};

onMounted(() => {
	tabsDrop();
	initTabs();
});

// 标签拖拽排序
const tabsDrop = () => {
	Sortable.create(document.querySelector(".ant-tabs-nav-list") as HTMLElement, {
		draggable: ".ant-tabs-tab",
		animation: 300,
		onEnd: ({ newIndex, oldIndex }) => {
			const tabsList = [...tabsStore.tabsMenuList];
			const currRow = tabsList.splice(oldIndex as number, 1)[0];
			tabsList.splice(newIndex as number, 0, currRow);
			tabsStore.setTabs(tabsList);
		}
	});
};

// 初始化需要固定的标签,比如首页
const initTabs = () => {
	authStore.flatMenuListGet.forEach(item => {
		if (item.meta.isAffix && !item.meta.isHide && !item.meta.isFull) {
			const tabsParams = {
				icon: item.meta.icon,
				title: item.meta.title,
				path: item.path,
				name: item.name,
				close: !item.meta.isAffix
			};
			tabsStore.addTabs(tabsParams);
		}
	});
};

// 监听路由的变化，防止浏览器后退/前进不变化
watch(
	() => route.fullPath,
	() => {
		// 是否满屏
		if (route.meta.isFull) return;
		// 当前tabs
		tabsMenuValue.value = route.fullPath;
		const tabsParams = {
			icon: route.meta.icon as string,
			title: route.meta.title as string,
			path: route.fullPath,
			name: route.name as string,
			close: !route.meta.isAffix
		};
		tabsStore.addTabs(tabsParams);
		route.meta.isKeepAlive && keepAliveStore.addKeepAliveName(route.name as string);
	},
	{
		immediate: true
	}
);

// 新增和删除页签的回调，在 type="editable-card" 时有效
const onEdit = (targetKey: string, action: string) => {
	if (action === "remove") {
		tabRemove(targetKey);
	}
};

// 点击 Tab, 跳转对应路由
const tabClick = (path: string) => {
	router.push(path);
};

// 移除 Tab
const tabRemove = (fullPath: string) => {
	let tabsMenuList = tabsStore.tabsMenuList.filter(item => item.path == fullPath);
	const name = tabsMenuList[0].name || "";
	keepAliveStore.removeKeepAliveName(name);
	// 移除
	tabsStore.removeTabs(fullPath, route.fullPath == fullPath);
};
</script>

<style scoped lang="less">
@import url("./index.less");
</style>
