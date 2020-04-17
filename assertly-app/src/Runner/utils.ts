export function getIframe(): HTMLElement | null {
  const doc = window.document.getElementById('runner-iframe');

  return doc;
}

export function isJson(str: string) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
