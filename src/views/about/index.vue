<template>
	<!-- 项目简介 -->
	<div class="card mb-10">
		<h4 class="title">项目简介</h4>
		<span class="text">
			<a data-v-cf7f3571="" class="guyue-link" href="https://juejin.cn/user/4068638047082029/posts" target="_blank">
				<span class="guyue-link_title">ProTable 组件</span>
			</a>
			一款基于 Vue3.2、TypeScript、Vite3、Pinia、Ant Design Vue 开源的后台管理框架，使用目前最新技术栈开发。
			另外本项目还封装了一些常用组件、Hooks、指令、动态路由、按钮级别权限控制等功能。
		</span>
	</div>
	<!-- 项目信息 -->
	<div class="card mb-10">
		<h4 class="title">项目信息</h4>
		<a-descriptions :column="2" bordered>
			<!-- 版本号 -->
			<a-descriptions-item label="版本号">
				<a-tag color="var(--ant-primary-4)">{{ version }}</a-tag>
			</a-descriptions-item>
			<!-- 发布时间 -->
			<a-descriptions-item label="发布时间">
				<a-tag color="var(--ant-primary-4)">{{ lastBuildTime }}</a-tag>
			</a-descriptions-item>
			<!-- Gitee -->
			<a-descriptions-item label="Gitee">
				<a data-v-cf7f3571="" class="guyue-link" href="https://gitee.com/Y_lao/GuYue-Admin" target="_blank">
					<span class="guyue-link_title">Gitee</span>
				</a>
			</a-descriptions-item>
			<!-- Github -->
			<a-descriptions-item label="Github">
				<a data-v-cf7f3571="" class="guyue-link" href="https://github.com/Y-Lao" target="_blank">
					<span class="guyue-link_title">Github</span>
				</a>
			</a-descriptions-item>
			<!-- 文档地址 -->
			<a-descriptions-item label="文档地址">
				<a data-v-cf7f3571="" class="guyue-link" href="#" target="_blank">
					<span class="guyue-link_title">文档地址</span>
				</a>
			</a-descriptions-item>
			<!-- 预览地址 -->
			<a-descriptions-item label="预览地址">
				<a data-v-cf7f3571="" class="guyue-link" href="#" target="_blank">
					<span class="guyue-link_title">预览地址</span>
				</a>
			</a-descriptions-item>
		</a-descriptions>
	</div>
	<!-- 生产环境依赖 -->
	<div class="card mb-10">
		<h4 class="title">生产环境依赖</h4>
		<a-descriptions :column="3" bordered>
			<a-descriptions-item v-for="(value, key) in dependencies" :key="key" :label="key">
				<a-tag>{{ value }}</a-tag>
			</a-descriptions-item>
		</a-descriptions>
	</div>
	<!-- 开发环境依赖 -->
	<div class="card">
		<h4 class="title">开发环境依赖</h4>
		<a-descriptions :column="3" bordered>
			<a-descriptions-item v-for="(value, key) in devDependencies" :key="key" :label="key">
				<a-tag>{{ value }}</a-tag>
			</a-descriptions-item>
		</a-descriptions>
	</div>
</template>

<script setup lang="ts" name="projectAbout">
const { pkg, lastBuildTime } = __APP_INFO__;
const { dependencies, devDependencies, version } = pkg;
</script>

<style scoped lang="less">
.card {
	.title {
		margin: 0 0 15px;
		font-size: 18px;
		font-weight: bold;
		color: @primary-text-color;
	}
	.text {
		font-size: 15px;
		line-height: 25px;
		color: @primary-text-color;
	}
	.guyue-link {
		position: relative;
		font-size: 15px;
		color: var(--ant-primary-color);
		&:hover {
			color: var(--ant-primary-color-hover);
			&::after {
				position: absolute;
				right: 0;
				bottom: 0;
				left: 0;
				height: 0;
				content: "";
				border-bottom: 1px solid var(--ant-primary-color-hover);
			}
		}
	}
}
</style>
