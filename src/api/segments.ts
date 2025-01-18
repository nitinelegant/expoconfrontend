import { cacheApi, CacheDataResponse } from "./cacheApi";

export async function fetchSegments(): Promise<CacheDataResponse> {
  const response = await cacheApi.getCacheData();
  return response;
}
