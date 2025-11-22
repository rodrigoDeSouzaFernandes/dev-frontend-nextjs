export function generateFakeImageUrl(dataUrl: string): string {
  if (!dataUrl.startsWith("data:")) return dataUrl;
  const randomId = Math.floor(Math.random() * 1000000);
  const extension = dataUrl.startsWith("data:image/png") ? "png" : "jpg";
  return `https://fakeimgserver.com/images/${randomId}.${extension}`;
}
