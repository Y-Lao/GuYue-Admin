<template>
	<template v-for="subItem in menuList" :key="subItem.name">
		<a-sub-menu v-if="subItem.children && subItem.children.length > 0" :key="subItem.path">
			<template #icon>
				<component :is="subItem.meta.icon"></component>
			</template>
			<template #title>
				<span>{{ subItem.meta.title }}</span>
			</template>
			<SubMenu :menuList="subItem.children" />
		</a-sub-menu>
		<a-menu-item v-else :key="subItem.path + ''" @click="handleClickMenu(subItem)">
			<template #icon>
				<component :is="subItem.meta.icon"></component>
			</template>
			<span>{{ subItem.meta.title }}</span>
		</a-menu-item>
	</template>
</template>

<script setup lang="ts" name="SubMenu">
import { useRouter } from "vue-router";

defineProps<{ menuList: Menu.MenuOptions[] }>();

const router = useRouter();
const handleClickMenu = (subItem: Menu.MenuOptions) => {
	if (subItem.meta.isLink) return window.open(subItem.meta.isLink, "_blank");
	router.push(subItem.path);
};
</script>
