const MIN_RATIO = 1.3;
const MAX_RATIO = 2.6;

export function getAspectRatioWarning(
  width: number,
  height: number
): string | null {
  const ratio = height / width;

  if (ratio < 1) {
    return "This image might not fit well on a phone screen. Try using a portrait (vertical) photo instead.";
  }
  if (ratio < MIN_RATIO) {
    return "This image might not fit well on a phone screen. Try a taller image for best results.";
  }
  if (ratio > MAX_RATIO) {
    return "This image might not fit well on a phone screen. Try a wider image for best results.";
  }
  return null;
}
