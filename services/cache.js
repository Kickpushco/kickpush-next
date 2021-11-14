import fs from "fs";
import path from "path";

const CACHE_PATH = path.resolve(".development-cache");

function cacheLog(str) {
  console.log(`[CACHE] ${str}`);
}

export async function fetchFromCache(cacheId, fetchData, bust = false) {
  if (process.env.NODE_ENV === "production") {
    cacheLog("Skipping cache for production.");
    return await fetchData();
  }

  const cachePath = path.join(CACHE_PATH, `${cacheId}.json`);

  if (bust) cacheLog(`Cache ignored (if present) for ${cacheId}`);

  if (!bust) {
    let cachedData;
    try {
      cachedData = JSON.parse(fs.readFileSync(cachePath, "utf8"));
    } catch (error) {
      cacheLog(`Error: No cache for "${cacheId}" found.`);
    }
    if (cachedData) {
      cacheLog(`"${cacheId}" found, serving data from cache.`);
      return cachedData;
    }
  }

  let data;
  try {
    data = await fetchData();
    fs.writeFileSync(cachePath, JSON.stringify(data), {
      flag: "w",
      encoding: "utf8",
    });
    cacheLog(`Cache created for "${cacheId}"`);
  } catch (error) {
    cacheLog(`Error: No cache created for "${cacheId}"`);
    cacheLog(error);
  }

  return data;
}
