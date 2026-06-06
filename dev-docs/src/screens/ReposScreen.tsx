import { open } from "@tauri-apps/plugin-dialog";
import { appDataDir } from "@tauri-apps/api/path";
import { useEffect, useRef, useState } from "react";
import { streamIndex } from "@/lib/api";
import { loadSettings, saveSettings } from "@/lib/settings";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/input";

export function ReposScreen() {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [isIndexing, setIsIndexing] = useState(false);
  const [progressLines, setProgressLines] = useState<string[]>([]);
  const logRef = useRef<HTMLDivElement>(null);

  // Load saved path
  useEffect(() => {
    loadSettings()
      .then((s) => {
        if (s.repoPath) setSelectedPath(s.repoPath);
      })
      .catch(() => {});
  }, []);

  // Save path when it changes
  useEffect(() => {
    if (!selectedPath) return;
    loadSettings()
      .then((s) => saveSettings({ ...s, repoPath: selectedPath }))
      .catch(() => {});
  }, [selectedPath]);

  // Auto-scroll progress log
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [progressLines]);

  async function handleBrowse() {
    const result = await open({ directory: true, multiple: false });
    if (typeof result === "string") {
      setSelectedPath(result);
    }
  }

  async function handleIndex() {
    if (!selectedPath) return;
    setIsIndexing(true);
    setProgressLines([]);
    try {
      const persistDir = await appDataDir();
      await streamIndex(selectedPath, persistDir, (line) =>
        setProgressLines((prev) => [...prev, line]),
      );
      setProgressLines((prev) => [...prev, "✓ Done"]);
    } catch (err) {
      setProgressLines((prev) => [
        ...prev,
        `✗ Error: ${err instanceof Error ? err.message : "Unknown error"}`,
      ]);
    } finally {
      setIsIndexing(false);
    }
  }

  return (
    <div className="max-w-2xl space-y-6 p-6">
      <Field label="Repository Folder" htmlFor="repo-path">
        <div className="flex gap-2">
          <Input
            id="repo-path"
            readOnly
            value={selectedPath ?? ""}
            placeholder="No folder selected"
            className="flex-1"
          />
          <Button variant="secondary" onClick={handleBrowse} type="button">
            Browse
          </Button>
        </div>
      </Field>

      <Button
        disabled={!selectedPath || isIndexing}
        loading={isIndexing}
        onClick={handleIndex}
        type="button"
      >
        {isIndexing ? "Indexing…" : "Index Folder"}
      </Button>

      {progressLines.length > 0 && (
        <div
          ref={logRef}
          className="h-48 overflow-y-auto rounded-md border bg-[var(--terminal-bg)] p-3 font-mono text-xs text-[var(--terminal-fg)]"
        >
          {progressLines.map((line, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={i}>{line}</div>
          ))}
        </div>
      )}
    </div>
  );
}
