import {
  CompanyOverviewResponse,
  TopGainersAndLosersResponse,
} from "@/types/api";
import { ALPHAVANTAGE_API_KEY, API_CONSTANTS } from "@/utils/constants";
import { genericAPIFetcher } from "@/utils/fetcher";
import useSWR from "swr";

export const useTopGainersAndLosers = () => {
  const tempTopGainersAndLosersData: TopGainersAndLosersResponse = {
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

  const { data, error } = useSWR<TopGainersAndLosersResponse>(
    [
      API_CONSTANTS.ALPHAVANTAGE_DATA,
      "get",
      {
        params: {
          function: "TOP_GAINERS_LOSERS",
          apikey: ALPHAVANTAGE_API_KEY,
        },
      },
    ],
    genericAPIFetcher
  );

  return {
    gainers: tempTopGainersAndLosersData?.top_gainers,
    losers: tempTopGainersAndLosersData?.top_losers,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useOverview = (symbol: string) => {
  const { data, error } = useSWR<CompanyOverviewResponse>(
    [
      API_CONSTANTS.ALPHAVANTAGE_DATA,
      "get",
      {
        params: {
          function: "OVERVIEW",
          apikey: ALPHAVANTAGE_API_KEY,
          symbol,
        },
      },
    ],
    genericAPIFetcher
  );

  return {
    overview: data,
    isLoading: !error && !data,
    isError: error,
  };
};
