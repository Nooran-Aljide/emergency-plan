function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function fetchData<T>(
  url: string,
  delayMs: number = 800
): Promise<T> {
  await delay(delayMs);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}`);
  }

  return response.json();
}
