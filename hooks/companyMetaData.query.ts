import { CompanyMetadata } from "@/types";
import { API_CONSTANTS, API_NINJA_API_KEY } from "@/utils/constants";
import { genericAPIFetcher } from "@/utils/fetcher";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import useSWR from "swr";

const ONE_MONTH_IN_MS = 30 * 24 * 60 * 60 * 1000;

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
      if (Date.now() - timestamp < ONE_MONTH_IN_MS) {
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

const useCompanyMetaData = (
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

export const useCompanyMetaFromTicker = (ticker: string) => {
  const cacheKey = "companyMetaData";
  const fetcher = async (): Promise<any> => {
    const cachedData = await getCachedData(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    const response = await genericAPIFetcher([
      API_CONSTANTS.API_NINJA_LOGO,
      "get",
      {
        params: {
          ticker,
        },
        headers: {
          "X-Api-Key": API_NINJA_API_KEY,
        },
      },
    ]);
    return response.data;
  };

  const { data, error, isLoading } = useCompanyMetaData(cacheKey, fetcher);

  return {
    companyData: data?.data?.[0] as CompanyMetadata | undefined,
    isLoadingCompanyData: isLoading,
    errorLoadingCompanyData: error,
  };
};
