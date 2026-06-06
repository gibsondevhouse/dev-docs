import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { loadSettings, saveSettings, VALID_MODELS } from "@/lib/settings";
import { testConnection } from "@/lib/api";

const MODEL_OPTIONS = VALID_MODELS;

type TestStatus = "idle" | "testing" | "success" | "error";

export function SettingsScreen() {
  const [openrouterApiKey, setOpenrouterApiKey] = useState("");
  const [selectedModel, setSelectedModel] = useState(MODEL_OPTIONS[0]);
  const [repoPath, setRepoPath] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [testStatus, setTestStatus] = useState<TestStatus>("idle");
  const [testError, setTestError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    loadSettings()
      .then((settings) => {
        if (!isMounted) {
          return;
        }

        setOpenrouterApiKey(settings.openrouterApiKey);
        setSelectedModel(
          MODEL_OPTIONS.includes(settings.selectedModel)
            ? settings.selectedModel
            : MODEL_OPTIONS[0],
        );
        setRepoPath(settings.repoPath);
      })
      .catch(() => {
        // Store access is only available inside Tauri.
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isSaved) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setIsSaved(false);
    }, 2000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isSaved]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaveError(null);
    try {
      await saveSettings({ openrouterApiKey, selectedModel, repoPath });
      setIsSaved(true);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : String(err));
    }
  }

  async function handleTestConnection() {
    setTestStatus("testing");
    setTestError(null);
    if (!openrouterApiKey) {
      setTestStatus("error");
      setTestError("No API key in state — enter your key and click Save first.");
      return;
    }
    try {
      await testConnection({ openrouterApiKey, selectedModel, repoPath });
      setTestStatus("success");
    } catch (err) {
      setTestStatus("error");
      setTestError(err instanceof Error ? err.message : "Unknown error");
    }
  }

  return (
    <div className="max-w-2xl p-6">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label
            className="block text-sm font-medium text-foreground"
            htmlFor="openrouter-api-key"
          >
            OpenRouter API Key
          </label>
          <input
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            id="openrouter-api-key"
            onChange={(event) => setOpenrouterApiKey(event.currentTarget.value)}
            placeholder="sk-or-..."
            type="password"
            value={openrouterApiKey}
          />
        </div>

        <div className="space-y-2">
          <label
            className="block text-sm font-medium text-foreground"
            htmlFor="selected-model"
          >
            Model
          </label>
          <select
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none ring-offset-background transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            id="selected-model"
            onChange={(event) => setSelectedModel(event.currentTarget.value)}
            value={selectedModel}
          >
            {MODEL_OPTIONS.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-3">
          <button
            className="h-10 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            type="submit"
          >
            Save
          </button>
          <div className="min-h-5 text-sm">
            {isSaved && <span className="text-muted-foreground">Saved</span>}
            {saveError && <span className="text-destructive">{saveError}</span>}
          </div>
        </div>

        <div className="space-y-3">
          <button
            className="h-10 rounded-md border border-input bg-background px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50"
            disabled={testStatus === "testing"}
            onClick={handleTestConnection}
            type="button"
          >
            {testStatus === "testing" ? "Testing…" : "Test Connection"}
          </button>
          <div aria-live="polite" className="min-h-5 text-sm">
            {testStatus === "success" && (
              <span className="font-medium text-green-600">Connected</span>
            )}
            {testStatus === "error" && (
              <span className="text-destructive">
                {testError ?? "Connection failed"}
              </span>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
