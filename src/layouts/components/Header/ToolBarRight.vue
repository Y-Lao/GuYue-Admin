<template>
	<div class="tool-bar-ri">
		<!-- <ParticleClock /> -->
		<div class="header-icon">
			<AssemblySize id="assembly-size" />
			<Language id="language" />
			<SearchMenu id="search-menu" />
			<ThemeSetting id="theme-setting" />
			<Message id="message" />
			<Fullscreen id="fullscreen" />
		</div>
		<!-- 使用者 -->
		<span class="username">GuYue</span>
		<Avatar />
	</div>
</template>

<script setup lang="ts" name="ToolBarRight">
// 组件大小
import AssemblySize from "./components/AssemblySize.vue";
// 语言
import Language from "./components/Language.vue";
// 菜单栏搜索
import SearchMenu from "./components/SearchMenu.vue";
// 主题
import ThemeSetting from "./components/ThemeSetting.vue";
// 通知
import Message from "./components/Message.vue";
// 全屏幕
import Fullscreen from "./components/Fullscreen.vue";
// 头像
import Avatar from "./components/Avatar.vue";
// 粒子时钟
// import ParticleClock from "@/components/ParticleClock/index.vue";
</script>

<style scoped lang="less">
.tool-bar-ri {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	margin: 0 30px 0 0;
	.header-icon {
		display: flex;
		align-items: center;
		height: 100%;
		#assembly-size,
		#language,
		#search-menu,
		#theme-setting,
		#message,
		#fullscreen {
			height: 100%;
			margin-right: 21px;
			line-height: 55px;
		}
		#message {
			padding-top: 3px;
		}
		#fullscreen {
			padding-top: 2px;
		}
	}
	.username {
		height: 100%;
		padding-top: 2px;
		margin: 0 20px 0 0;
		font-size: 15px;
		line-height: 55px;
	}
}
</style>
