import useSWR from "swr";
import { fetcher } from "./fetcher";

interface StockData {
  ticker: string;
  price: string;
  change_amount: string;
  change_percentage: string;
  volume: string;
}

interface TopGainersAndLosersResponse {
  top_gainers: StockData[];
  top_losers: StockData[];
}

const API_KEY = "5AJ5VF8Q8JZE5NJ5";
const API_URL = `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${API_KEY}`;

export const useTopGainersAndLosers = () => {
  const { data, error } = useSWR<TopGainersAndLosersResponse>(API_URL, fetcher);

  return {
    gainers: data?.top_gainers,
    losers: data?.top_losers,
    isLoading: !error && !data,
    isError: error,
  };
};
