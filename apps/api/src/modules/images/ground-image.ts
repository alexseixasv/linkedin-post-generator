export function containsPostBody(prompt: string, body: string): boolean {
  const haystack = prompt.toLowerCase();
  const source = body.replace(/\s+/g, " ").trim();
  if (source.length < 40) {
    return false;
  }

  for (let index = 0; index <= source.length - 40; index += 12) {
    const slice = source.slice(index, index + 40).toLowerCase();
    if (slice.trim().length === 40 && haystack.includes(slice)) {
      return true;
    }
  }
  return false;
}
