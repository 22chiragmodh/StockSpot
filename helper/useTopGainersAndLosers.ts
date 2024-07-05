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
  const tempData: TopGainersAndLosersResponse = {
    top_gainers: [
      {
        ticker: "AAPL",
        price: "150.00",
        change_amount: "5.00",
        change_percentage: "3.45",
        volume: "3500000",
      },
      {
        ticker: "MSFT",
        price: "250.00",
        change_amount: "7.00",
        change_percentage: "2.88",
        volume: "3000000",
      },
    ],
    top_losers: [
      {
        ticker: "TSLA",
        price: "600.00",
        change_amount: "-20.00",
        change_percentage: "-3.23",
        volume: "5000000",
      },
      {
        ticker: "AMZN",
        price: "3100.00",
        change_amount: "-50.00",
        change_percentage: "-1.59",
        volume: "2000000",
      },
    ],
  };
  const { data, error } = useSWR<TopGainersAndLosersResponse>(API_URL, fetcher);

  return {
    gainers: tempData?.top_gainers,
    losers: tempData?.top_losers,
    isLoading: !error && !data,
    isError: error,
  };
};
