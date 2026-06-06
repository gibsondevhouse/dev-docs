const SIDECAR_URL = "http://127.0.0.1:37421";

export async function checkSidecarHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${SIDECAR_URL}/health`);
    const data = await res.json();
    return data.status === "ok";
  } catch {
    return false;
  }
}

export { SIDECAR_URL };
