import type { Cache_Key, StorageType } from "@/enums/cache";

export type Cache = {
	key: Cache_Key | string;
	type: StorageType;
	hasEncrypt?: boolean;
	expire?: null | number;
};
