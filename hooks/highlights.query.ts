import React, { useEffect, useState } from "react";
import useSWR from "swr";

import { genericAPIFetcher } from "@/utils/fetcher";
import { ALPHAVANTAGE_API_KEY, API_CONSTANTS } from "@/utils/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { IconArrowAutofitUp } from "@tabler/icons-react-native";
import { TopGainersAndLosersResponse } from "@/types/api";
import { AxiosResponse } from "axios";
const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

const cacheData = async (key: string, data: any): Promise<void> => {
  try {
    const timestamp = Date.now();
    const dataWithTimestamp = { data, timestamp };
    await AsyncStorage.setItem(key, JSON.stringify(dataWithTimestamp));
  } catch (error) {
    console.error("Error saving data to AsyncStorage:", error);
  }
};

const getCachedData = async (key: string): Promise<any | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    if (jsonValue != null) {
      const parsedValue = JSON.parse(jsonValue);
      const { data, timestamp } = parsedValue;

      // Check if the cached data is older than one day
      if (Date.now() - timestamp < ONE_DAY_IN_MS) {
        return data;
      } else {
        // Cached data is too old, invalidate it
        await AsyncStorage.removeItem(key);
      }
    }
    return null;
  } catch (error) {
    console.error("Error getting data from AsyncStorage:", error);
    return null;
  }
};

const useHighlightedData = (
  cacheKey: string,
  fetcher: () => Promise<any>
): { data: any; error: any; isLoading: boolean } => {
  const { data, error, isLoading } = useSWR(cacheKey, fetcher);

  React.useEffect(() => {
    if (data && !error) {
      cacheData(cacheKey, data);
    }
  }, [data, error]);

  return { data, error, isLoading };
};

export const useHighlights = () => {
  const cacheKey = "topGainersAndLosers";
  const fetcher = async (): Promise<any> => {
    const cachedData = await getCachedData(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    const response = await genericAPIFetcher([
      API_CONSTANTS.ALPHAVANTAGE_DATA,
      "get",
      {
        params: {
          function: "TOP_GAINERS_LOSERS",
          apikey: ALPHAVANTAGE_API_KEY,
        },
      },
    ]);
    return response.data;
  };
  const { data, error, isLoading } = useHighlightedData(cacheKey, fetcher);

  return {
    gainers: data?.top_gainers,
    losers: data?.top_losers,
    trending: data?.most_actively_traded,
    isLoadingHighlights: isLoading,
    errorLoadingHighlights: error,
  };
};

// export const useHighlights = () => {
//   const [data, setData] = useState<TopGainersAndLosersResponse | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<any>(null);

//   useEffect(() => {
//     const fetchretryErrorHighlights = async () => {
//       let retryCount = 0;
//       while (retryCount < 3) {
//         try {
//           const response: AxiosResponse<TopGainersAndLosersResponse> =
//             await genericAPIFetcher([
//               "https://api.twitter.com/",
//               "get",
//               {
//                 params: {
//                   function: "TOP_GAINERS_LOSERS",
//                   apikey: ALPHAVANTAGE_API_KEY,
//                 },
//               },
//             ]);

//           setData(response.data);
//           setIsLoading(false);
//         } catch (err) {
//           retryCount++;

//           if (retryCount === 3) {
//             setError(err);
//             console.log(err);
//           } else {
//             await new Promise((resolve, reject) => setTimeout(resolve, 2000));
//           }
//         }
//       }
//     };

//     fetchretryErrorHighlights();
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response: AxiosResponse<TopGainersAndLosersResponse> =
//           await genericAPIFetcher([
//             "https://api.twitter.com/",
//             "get",
//             {
//               params: {
//                 function: "TOP_GAINERS_LOSERS",
//                 apikey: ALPHAVANTAGE_API_KEY,
//               },
//             },
//           ]);

//         setData(response.data);
//       } catch (err) {
//         console.log(err);
//         setError(err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

// return {
//   gainers: data?.top_gainers,
//   losers: data?.top_losers,
//   trending: data?.most_actively_traded,
//   isLoadingHighlights: isLoading,
//   errorLoadingHighlights: error,
// };
