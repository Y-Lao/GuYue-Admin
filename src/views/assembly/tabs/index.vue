<template>
	<div class="card content-box">
		<a-alert class="w-100 mb-20" message="标签页操作 🍓🍓🍓🍈🍈🍈" type="info" />
		<div class="mb-30">
			<a-input-search placeholder="请输入内容" v-model:value="tabsTitle" style="width: 500px">
				<template #enterButton>
					<a-button type="primary" @click="editTabsTitle">设置 Tab 标题</a-button>
				</template>
			</a-input-search>
		</div>
		<a-space class="mb-30">
			<a-button type="primary" @click="refresh">
				<template #icon>
					<sync-outlined />
				</template>
				刷新当前页
			</a-button>
			<a-button type="primary" @click="maximize">
				<template #icon>
					<expand-outlined />
				</template>
				当前页全屏
			</a-button>
			<a-button type="primary" @click="closeCurrentTab">
				<template #icon>
					<minus-circle-outlined />
				</template>
				关闭当前页
			</a-button>
			<a-button type="primary" @click="closeOtherTab">
				<template #icon>
					<close-circle-outlined />
				</template>
				关闭其他
			</a-button>
			<a-button type="primary" @click="closeAllTab">
				<template #icon>
					<file-excel-outlined />
				</template>
				全部关闭
			</a-button>
		</a-space>
		<a-space class="mb-30">
			<a-button @click="handleToDetail('1')">
				<template #icon>
					<thunderbolt-outlined />
				</template>
				打开详情页1
			</a-button>
			<a-button @click="handleToDetail('2')">
				<template #icon>
					<thunderbolt-outlined />
				</template>
				打开详情页2
			</a-button>
			<a-button @click="handleToDetail('3')">
				<template #icon>
					<thunderbolt-outlined />
				</template>
				打开详情页3
			</a-button>
			<a-button @click="handleToDetail('4')">
				<template #icon>
					<thunderbolt-outlined />
				</template>
				打开详情页4
			</a-button>
			<a-button @click="handleToDetail('5')">
				<template #icon>
					<thunderbolt-outlined />
				</template>
				打开详情页5
			</a-button>
		</a-space>
	</div>
</template>

<script setup lang="ts" name="tabs">
import { nextTick, ref } from "vue";
import { HOME_URL } from "@/config";
import { useRoute, useRouter } from "vue-router";
import { useTabsStore } from "@/stores/modules/tabs";
import { useGlobalStore } from "@/stores/modules/global";
import { useKeepAliveStore } from "@/stores/modules/keepAlive";

const route = useRoute();
const router = useRouter();
const tabStore = useTabsStore();
const globalStore = useGlobalStore();
const keepAliveStore = useKeepAliveStore();

// 刷新当前页面
const refresh = () => {
	setTimeout(() => {
		keepAliveStore.removeKeepAliveName(route.name as string);
		globalStore.setGlobalState("refreshPage", false);
		nextTick(() => {
			keepAliveStore.addKeepAliveName(route.name as string);
			globalStore.setGlobalState("refreshPage", true);
		});
	}, 0);
};

// 当前页全屏
const maximize = () => {
	globalStore.setGlobalState("maximize", true);
};

// 关闭当前页
const closeCurrentTab = () => {
	if (route.meta.isAffix) return;
	tabStore.removeTabs(route.fullPath);
	keepAliveStore.removeKeepAliveName(route.name as string);
};

// 关闭其他
const closeOtherTab = () => {
	tabStore.closeMultipleTab(route.fullPath);
	keepAliveStore.setKeepAliveName([route.name] as string[]);
};

// 全部关闭
const closeAllTab = () => {
	tabStore.closeMultipleTab();
	keepAliveStore.setKeepAliveName();
	router.push(HOME_URL);
};

// 设置 Tab 标题
const tabsTitle = ref("");
const editTabsTitle = () => {
	tabStore.setTabsTitle(tabsTitle.value);
};

// 打开详情页
const handleToDetail = (id: string) => {
	router.push(`/assembly/tabs/detail/${id}`);
};
</script>

<style scoped lang="less"></style>
