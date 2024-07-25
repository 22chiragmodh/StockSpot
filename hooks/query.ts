import { CompanyMetadata, SearchItem } from "@/types";
import { dailySeriesData } from "./tempData";
import {
  CompanyMetadataResponse,
  CompanyOverviewResponse,
  SearchResponse,
  TimeSeriesDataIntervals,
  TimeSeriesDataResponse,
  TimeSeriesDataResponseDetails,
  TopGainersAndLosersResponse,
} from "@/types/api";
import {
  ALPHAVANTAGE_API_KEY,
  API_CONSTANTS,
  API_NINJA_API_KEY,
} from "@/utils/constants";
import { genericAPIFetcher } from "@/utils/fetcher";
import { AxiosResponse } from "axios";
import useSWR from "swr";
import { TimeSeriesDetails } from "../types/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";

export const useOverview = (symbol: string) => {
  const { data, error, isLoading } = useSWR<
    AxiosResponse<CompanyOverviewResponse>
  >(
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
    overview: data?.data,
    // overview: DATA,
    isLoading: isLoading,
    isError: error,
  };
};

export const useTimeSeriesData = (
  interval: TimeSeriesDataIntervals,
  ticker: string
) => {
  const params: {
    function: string;
    apikey: string;
    interval?: string;
    symbol: string;
  } = {
    function: "",
    apikey: ALPHAVANTAGE_API_KEY,
    symbol: ticker,
  };

  switch (interval) {
    case TimeSeriesDataIntervals["5M"]:
      params.function = "TIME_SERIES_INTRADAY";
      params.interval = "5min";
      break;
    case TimeSeriesDataIntervals["1D"]:
      params.function = "TIME_SERIES_DAILY";
      break;
    case TimeSeriesDataIntervals["1W"]:
      params.function = "TIME_SERIES_WEEKLY";
      break;
    case TimeSeriesDataIntervals["1M"]:
      params.function = "TIME_SERIES_MONTHLY";
      break;
  }

  const { data, error, isLoading } = useSWR<
    AxiosResponse<TimeSeriesDataResponse>
  >(
    [
      API_CONSTANTS.ALPHAVANTAGE_DATA,
      "get",
      {
        params,
      },
    ],
    genericAPIFetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  let result = data?.data[interval];
  // let result = dailySeriesData["Time Series (Daily)"];

  return {
    series: result
      ? (Object.entries(result).map(([key, value]) => ({
          date: key,
          open: parseFloat(value["1. open"]),
          high: parseFloat(value["2. high"]),
          low: parseFloat(value["3. low"]),
          close: parseFloat(value["4. close"]),
          volume: parseFloat(value["5. volume"]),
        })) as TimeSeriesDetails[])
      : null,
    test: data?.data,
    isSeriesLoading: isLoading,
    seriesLoadingError: error,
  };
};

export const useSearchResults = (query: string) => {
  const { data, error, isLoading } = useSWR<AxiosResponse<SearchResponse>>(
    query
      ? [
          API_CONSTANTS.ALPHAVANTAGE_DATA,
          "get",
          {
            params: {
              function: "SYMBOL_SEARCH",
              apikey: ALPHAVANTAGE_API_KEY,
              keywords: query,
            },
          },
        ]
      : null,
    genericAPIFetcher
  );

  const trasformedData: SearchItem[] | undefined = data?.data?.bestMatches?.map(
    (item) => ({
      symbol: item["1. symbol"],
      name: item["2. name"],
      type: item["3. type"],
      region: item["4. region"],
      marketOpen: item["5. marketOpen"],
      marketClose: item["6. marketClose"],
      timezone: item["7. timezone"],
      currency: item["8. currency"],
      matchScore: item["9. matchScore"],
    })
  );

  return {
    searchResults: trasformedData,
    isLoadingSearchResults: isLoading,
    errorLoadingSearchResults: error,
  };
};
