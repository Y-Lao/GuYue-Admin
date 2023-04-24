<template>
	<a-dropdown :trigger="['click']" placement="bottom">
		<a-button size="small" type="primary">
			<span>{{ $t("tabs.more") }}</span>
			<DownOutlined />
		</a-button>
		<template #overlay>
			<a-menu>
				<a-menu-item key="refresh" @click="refresh">
					<div class="item-choice">
						<sync-outlined />
						<span class="title">{{ $t("tabs.refresh") }}</span>
					</div>
				</a-menu-item>
				<a-menu-item key="maximize" @click="maximize">
					<div class="item-choice">
						<expand-outlined />
						<span class="title">{{ $t("tabs.maximize") }}</span>
					</div>
				</a-menu-item>
				<a-menu-divider />
				<a-menu-item key="closeCurrent" @click="closeCurrentTab">
					<div class="item-choice">
						<minus-circle-outlined />
						<span class="title">{{ $t("tabs.closeCurrent") }}</span>
					</div>
				</a-menu-item>
				<a-menu-item key="closeOther" @click="closeOtherTab">
					<div class="item-choice">
						<close-circle-outlined />
						<span class="title">{{ $t("tabs.closeOther") }}</span>
					</div>
				</a-menu-item>
				<a-menu-item key="closeAll" @click="closeAllTab">
					<div class="item-choice">
						<file-excel-outlined />
						<span class="title">{{ $t("tabs.closeAll") }}</span>
					</div>
				</a-menu-item>
			</a-menu>
		</template>
	</a-dropdown>
</template>

<script setup lang="ts">
import { nextTick } from "vue";
import { HOME_URL } from "@/config";
import { useGlobalStore } from "@/stores/modules/global";
import { useTabsStore } from "@/stores/modules/tabs";
import { useKeepAliveStore } from "@/stores/modules/keepAlive";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const tabsStore = useTabsStore();
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

// 页面全屏
const maximize = () => {
	globalStore.setGlobalState("maximize", true);
};

// 关闭当前
const closeCurrentTab = () => {
	// tab是否固定页面
	if (route.meta.isAffix) return;
	tabsStore.removeTabs(route.fullPath);
	keepAliveStore.removeKeepAliveName(route.name as string);
};

// 关闭其他
const closeOtherTab = () => {
	tabsStore.closeMultipleTab(route.fullPath);
	keepAliveStore.setKeepAliveName([route.name] as string[]);
};

// 关闭全部
const closeAllTab = () => {
	tabsStore.closeMultipleTab();
	keepAliveStore.setKeepAliveName();
	router.push(HOME_URL);
};
</script>

<style scoped lang="less">
.item-choice {
	display: flex;
	align-items: center;
	height: 28px;
	.title {
		margin-left: 5px;
	}
}
</style>
