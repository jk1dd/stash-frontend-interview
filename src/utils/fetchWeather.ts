type WeatherData = { temp_F: string; feelslike_F: string };

// 5 mins cache
const CACHE_TTL = 5 * 60 * 1000;
const memoryCache: Record<string, { timestamp: number; data: WeatherData }> = {};

export async function fetchWeather(city: string): Promise<WeatherData> {
  const key = `weather_${city}`;
  const now = Date.now();

  // check in memory cache, return if fresh
  const mem = memoryCache[city];
  if (mem && now - mem.timestamp < CACHE_TTL) {
    return mem.data;
  }

  // check localStorage, return if fresh
  const stored = localStorage.getItem(key);
  if (stored) {
    try {
      const parsed = JSON.parse(stored) as { timestamp: number; data: WeatherData };
      if (now - parsed.timestamp < CACHE_TTL) {
        memoryCache[city] = parsed;
        return parsed.data;
      }
    } catch {

    }
  }

  // otherwise fetch fresh
  const url = `https://wttr.in/${encodeURIComponent(city)}?format=j1`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch weather for ${city}`);
  }
  const json = await res.json();
  const currentWeather = json.current_condition?.[0] || {};
  const data = { temp_F: currentWeather.temp_F, feelslike_F: currentWeather.FeelsLikeF };

  const record = { timestamp: now, data };
  memoryCache[city] = record;
  localStorage.setItem(key, JSON.stringify(record));

  return data;
}
