import { SIDECAR_URL } from "./sidecar";
import type { AppSettings } from "./settings";

export interface ExportResult {
  files_written: number;
  root_path: string;
}

/**
 * Sends a minimal one-message chat request to POST /chat and reads the
 * first SSE data event as a connectivity check.
 *
 * Returns "connected" on success.
 * Throws an Error with a human-readable message on failure.
 */
export async function testConnection(settings: AppSettings): Promise<string> {
  const response = await fetch(`${SIDECAR_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: settings.openrouterApiKey,
      model: settings.selectedModel,
      messages: [{ role: "user", content: "Reply with only the word: OK" }],
    }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => response.statusText);
    throw new Error(`HTTP ${response.status}: ${text}`);
  }

  const reader = response.body?.getReader();
  if (!reader) throw new Error("No response body");

  const { value } = await reader.read();
  reader.cancel();

  const text = new TextDecoder().decode(value ?? new Uint8Array());
  if (!text.includes("data:")) throw new Error("Unexpected response format");

  return "connected";
}

export interface StreamChatRequest {
  apiKey: string;
  model: string;
  messages: Array<{ role: string; content: string }>;
  persistDir?: string; // Optional — used in ST3. Ignore for now.
}

export async function streamChat(
  request: StreamChatRequest,
  onChunk: (token: string) => void,
): Promise<void> {
  const response = await fetch(`${SIDECAR_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: request.apiKey,
      model: request.model,
      messages: request.messages,
      ...(request.persistDir ? { persist_dir: request.persistDir } : {}),
    }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => response.statusText);
    throw new Error(`HTTP ${response.status}: ${text}`);
  }

  const reader = response.body?.getReader();
  if (!reader) throw new Error("No response body");
  const decoder = new TextDecoder();

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    const text = decoder.decode(value, { stream: true });
    for (const line of text.split("\n")) {
      if (!line.startsWith("data: ") || line === "data: [DONE]") continue;
      try {
        const json = JSON.parse(line.slice(6)) as {
          choices?: Array<{ delta?: { content?: string } }>;
        };
        const token = json.choices?.[0]?.delta?.content;
        if (token) onChunk(token);
      } catch {
        // skip malformed chunks
      }
    }
  }
}

export async function streamIndex(
  folderPath: string,
  persistDir: string,
  onProgress: (line: string) => void,
): Promise<void> {
  const response = await fetch(`${SIDECAR_URL}/index`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ folder_path: folderPath, persist_dir: persistDir }),
  });
  if (!response.ok) {
    throw new Error(`Index failed: HTTP ${response.status}`);
  }
  const reader = response.body?.getReader();
  if (!reader) throw new Error("No response body");
  const decoder = new TextDecoder();
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    const text = decoder.decode(value, { stream: true });
    for (const line of text.split("\n")) {
      if (line.trim()) onProgress(line.trim());
    }
  }
}
