<template>
	<div>Home</div>
</template>

<script setup lang="ts" name="home">
import { onMounted } from "vue";

onMounted(() => {
	console.log("1.-组件挂载到页面之后执行-------onMounted");
});
</script>
<style scoped lang="less"></style>
