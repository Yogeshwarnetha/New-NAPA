export async function postJson(path: string, body: any) {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    credentials: 'include',
  });
  const text = await res.text();
  try { return { status: res.status, data: JSON.parse(text) }; } catch { return { status: res.status, data: text }; }
}

export async function postForm(path: string, formData: FormData) {
  const res = await fetch(path, { method: 'POST', body: formData, credentials: 'include' });
  const json = await res.json();
  return { status: res.status, data: json };
}
