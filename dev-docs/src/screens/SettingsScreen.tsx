import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { loadSettings, saveSettings, VALID_MODELS } from "@/lib/settings";
import { testConnection } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

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
          MODEL_OPTIONS.includes(settings.selectedModel as typeof MODEL_OPTIONS[0])
            ? (settings.selectedModel as typeof MODEL_OPTIONS[0])
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
        <Field label="OpenRouter API Key" htmlFor="openrouter-api-key">
          <Input
            id="openrouter-api-key"
            type="password"
            mono
            onChange={(event) => setOpenrouterApiKey(event.currentTarget.value)}
            placeholder="sk-or-..."
            value={openrouterApiKey}
          />
        </Field>

        <Field label="Model" htmlFor="selected-model">
          <Select
            id="selected-model"
            onChange={(event) => setSelectedModel(event.currentTarget.value as typeof MODEL_OPTIONS[0])}
            value={selectedModel}
          >
            {MODEL_OPTIONS.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </Select>
        </Field>

        <div className="space-y-3">
          <Button type="submit">Save</Button>
          <div className="min-h-5 text-sm">
            {isSaved && <span className="text-muted-foreground">Saved</span>}
            {saveError && <span className="text-destructive">{saveError}</span>}
          </div>
        </div>

        <div className="space-y-3">
          <Button
            variant="secondary"
            loading={testStatus === "testing"}
            disabled={testStatus === "testing"}
            onClick={handleTestConnection}
            type="button"
          >
            {testStatus === "testing" ? "Testing…" : "Test Connection"}
          </Button>
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
