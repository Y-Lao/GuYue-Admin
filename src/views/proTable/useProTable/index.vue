<template>
	<div class="table-box">
		<ProTable :request-api="getUserList"></ProTable>
	</div>
</template>

<script setup lang="ts">
import ProTable from "@/components/ProTable/index.vue";
import { getUserList } from "@/api/modules/user";
</script>

<style scoped lang="less"></style>
