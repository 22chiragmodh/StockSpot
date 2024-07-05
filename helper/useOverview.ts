import useSWR from "swr";
import { fetcher } from "./fetcher";

interface CompanyOverview {
  Symbol: string;
  AssetType: string;
  Name: string;
  Description: string;
  Exchange: string;
  Currency: string;
  Country: string;
  Sector: string;
  Industry: string;
  Address: string;
  Beta: string;
  PERatio: string;
  DividendYield: string;
  ProfitMargin: string;
  MarketCapitalization: string;
  // Add other fields you expect to receive from the API
}

const API_KEY = "CCSBEMX9IXBJLS49";
const BASE_URL =
  "https://www.alphavantage.co/query?function=OVERVIEW&apikey=" + API_KEY;

export const useOverview = (symbol: string) => {
  const url = BASE_URL + "&symbol=" + symbol;
  const { data, error } = useSWR<CompanyOverview>(url, fetcher);

  return {
    overview: data,
    isLoading: !error && !data,
    isError: error,
  };
};
