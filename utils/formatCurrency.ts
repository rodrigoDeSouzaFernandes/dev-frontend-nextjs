const formatCurrencyUSD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
}).format;

export function formatPriceValue(value: string) {
  const digits = value.replace(/\D/g, "");
  const number = Number(digits) / 100;
  return formatCurrencyUSD(number);
}

export function parsePriceValue(value: string): number {
  return Number(value.replace(/[^0-9.]/g, ""));
}