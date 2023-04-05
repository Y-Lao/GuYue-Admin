<template>
	<a-drawer v-model:visible="drawerVisible" title="Basic Drawer" placement="right">
		<ThemeColor :colors="colors" :colorNames="colorNames" />
		<p>Some contents...</p>
		<p>Some contents...</p>
		<p class="ddd">Some contents...</p>
	</a-drawer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import mittBus from "@/utils/mittBus";
import { DEFAULT_PRIMARY } from "@/config/config";
import ThemeColor from "@/components/ThemeColor/index.vue";

const colors = ref([DEFAULT_PRIMARY, "#F5222D", "#FA541C", "#FAAD14", "#13C2C2", "#52C41A", "#1890FF", "#722ED1"]);
const colorNames = ref(["极客蓝(默认)", "薄暮", "火山", "日暮", "明青", "极光绿", "拂晓蓝", "酱紫"]);

// 打开主题设置
const drawerVisible = ref(false);
mittBus.on("openThemeDrawer", () => (drawerVisible.value = true));
</script>

<style scoped lang="less">
@import url("./index.less");
.ddd {
	background-color: @primary-color;
}
</style>
