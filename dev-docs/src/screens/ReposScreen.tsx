import { open } from "@tauri-apps/plugin-dialog";
import { appDataDir } from "@tauri-apps/api/path";
import { useEffect, useRef, useState } from "react";
import { streamIndex } from "@/lib/api";
import { loadSettings, saveSettings } from "@/lib/settings";

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
      <div className="space-y-2">
        <label className="block text-sm font-medium">Repository Folder</label>
        <div className="flex gap-2">
          <div className="flex h-10 flex-1 items-center rounded-md border border-input bg-background px-3 text-sm text-muted-foreground">
            {selectedPath ?? "No folder selected"}
          </div>
          <button
            className="h-10 rounded-md border border-input bg-background px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={handleBrowse}
            type="button"
          >
            Browse
          </button>
        </div>
      </div>

      <button
        className="h-10 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
        disabled={!selectedPath || isIndexing}
        onClick={handleIndex}
        type="button"
      >
        {isIndexing ? "Indexing…" : "Index Folder"}
      </button>

      {progressLines.length > 0 && (
        <div
          ref={logRef}
          className="h-48 overflow-y-auto rounded-md border bg-zinc-950 p-3 font-mono text-xs text-zinc-300"
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
