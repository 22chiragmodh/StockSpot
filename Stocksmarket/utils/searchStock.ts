import { stocks, stockPrices } from "@/data";

export const searchStocks = (text: string) => {
  if (!text) return [];

  return stocks.filter(
    (i) =>
      i.ticker.match(new RegExp(text, "i")) ||
      i.companyName.match(new RegExp(text, "i"))
  );
};

export const selectstock = (text: string) => {
  const stock = stocks.filter((i) => i.ticker === text);

  if (stock) return stock[0];
  return null;
};
export const selectstockPrices = (text: string) => {
  const stock = stockPrices.filter((i) => i.ticker === text);

  if (stock) return stock[0].prices;
  return null;
};
