import { Cache_Key, StorageType } from "@/enums/cache";
import type { Cache } from "./type";

export const CacheConfig: Record<string, Cache> = {
	Token: {
		key: Cache_Key.Token,
		type: StorageType.LOCAL
	},
	RoleSelect: {
		key: Cache_Key.RoleOptions,
		type: StorageType.SESSION,
		expire: 60
	}
};
