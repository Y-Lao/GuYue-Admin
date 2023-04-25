<template>
	<div>
		<a-dropdown :trigger="['click']" placement="bottom">
			<i :class="'iconfont icon-contentright'" class="toolBar-icon" id="assemblySizeGuide"></i>
			<template #overlay>
				<a-menu>
					<a-menu-item
						v-for="item in assemblySizeList"
						:key="item"
						:disabled="assemblySize === item"
						@click="setAssemblySize(item)"
					>
						{{ assemblySizeListCh[item] }}
					</a-menu-item>
				</a-menu>
			</template>
		</a-dropdown>
	</div>
</template>

<script setup lang="ts">
import { reactive, computed } from "vue";
import { useGlobalStore } from "@/stores/modules/global";
import { AssemblySizeType } from "@/stores/interface";

const globalStore = useGlobalStore();
const assemblySize = computed(() => globalStore.assemblySize);

const assemblySizeList: AssemblySizeType[] = ["middle", "large", "small"];
const assemblySizeListCh = reactive<{ [key: string]: string }>({
	middle: "默认",
	large: "大型",
	small: "小型"
});

const setAssemblySize = (item: AssemblySizeType) => {
	if (assemblySize.value === item) return;
	globalStore.setGlobalState("assemblySize", item);
};
</script>
