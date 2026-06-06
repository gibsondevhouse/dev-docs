import { invoke } from "@tauri-apps/api/core";
import { Store } from "@tauri-apps/plugin-store";

const SETTINGS_STORE = "settings.json";
const DEFAULT_MODEL = "deepseek/deepseek-v4-flash";
export const VALID_MODELS = ["deepseek/deepseek-v4-pro", "deepseek/deepseek-v4-flash"] as const;

let storePromise: Promise<Store> | null = null;

function getStore(): Promise<Store> {
  storePromise ??= Store.load(SETTINGS_STORE, {
    defaults: {
      selectedModel: DEFAULT_MODEL,
    },
  });

  return storePromise;
}

export interface AppSettings {
  openrouterApiKey: string;
  selectedModel: string;
  repoPath: string;
}

export async function loadSettings(): Promise<AppSettings> {
  const store = await getStore();
  const legacyKey = await store.get<string>("openrouterApiKey");
  let key = await invoke<string>("load_openrouter_api_key");

  if (!key && legacyKey) {
    await invoke("save_openrouter_api_key", { apiKey: legacyKey });
    key = legacyKey;
  }

  if (legacyKey !== undefined) {
    await store.delete("openrouterApiKey");
    await store.save();
  }

  const rawModel = (await store.get<string>("selectedModel")) ?? DEFAULT_MODEL;
  const model = (VALID_MODELS as readonly string[]).includes(rawModel) ? rawModel : DEFAULT_MODEL;
  const repoPath = (await store.get<string>("repoPath")) ?? "";
  return { openrouterApiKey: key, selectedModel: model, repoPath };
}

export async function saveSettings(settings: AppSettings): Promise<void> {
  const store = await getStore();
  await invoke("save_openrouter_api_key", { apiKey: settings.openrouterApiKey });
  if (await store.has("openrouterApiKey")) {
    await store.delete("openrouterApiKey");
    await store.save();
  }

  await store.set("selectedModel", settings.selectedModel);
  await store.set("repoPath", settings.repoPath);
  await store.save();
}
