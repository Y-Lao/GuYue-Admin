import { createRouter, createWebHashHistory } from "vue-router";
// import { GlobalStore } from "@/stores";
import { staticRouter, errorRouter } from "@/routers/modules/staticRouter";
import NProgress from "@/config/nprogress";

/**
 * @description 动态路由参数配置简介 📚
 * @param path ==> 菜单路径
 * @param name ==> 菜单别名
 * @param redirect ==> 重定向地址
 * @param component ==> 视图文件路径
 * @param meta ==> 菜单信息
 * @param meta.icon ==> 菜单图标
 * @param meta.title ==> 菜单标题
 * @param meta.activeMenu ==> 当前路由为详情页时，需要高亮的菜单
 * @param meta.isLink ==> 是否外链
 * @param meta.isHide ==> 是否隐藏
 * @param meta.isFull ==> 是否全屏(示例：数据大屏页面)
 * @param meta.isAffix ==> 是否固定在 tabs nav
 * @param meta.isKeepAlive ==> 是否缓存
 * */
const router = createRouter({
	history: createWebHashHistory(),
	routes: [...staticRouter, ...errorRouter],
	strict: false, // 是否禁止尾部斜杠
	scrollBehavior: () => ({ left: 0, top: 0 }) // 在页面之间导航时控制滚动的功能，让页面回到顶部
});

/**
 * @description 路由拦截 beforeEach
 * */
router.beforeEach((to, from, next) => {
	console.log(to, from, next);

	// const globalStore = GlobalStore();

	// 1.NProgress 开始
	NProgress.start();

	// 2.动态设置标题
	const title = import.meta.env.VITE_GLOB_APP_TITLE;
	document.title = to.meta.title ? `${to.meta.title} - ${title}` : title;
});
