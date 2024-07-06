import { CompanyMetadata, CompanyOverview, StockData } from ".";

export type TopGainersAndLosersResponse = {
  top_gainers: StockData[];
  top_losers: StockData[];
  most_actively_traded: StockData[];
};

export type CompanyOverviewResponse = CompanyOverview;

export type CompanyMetadataResponse = CompanyMetadata[];

export enum TimeSeriesDataIntervals {
  "5M" = "Time Series (5min)",
  "1D" = "Time Series (Daily)",
  "1W" = "Weekly Time Series",
  "1M" = "Monthly Time Series",
}

export type TimeSeriesDataResponseMeta = {
  "Meta Data": {
    "1. Information": string;
    "2. Symbol": string;
    "3. Last Refreshed": string;
    "4. Time Zone": string;
  };
};

export type TimeSeriesDataResponseDetails = {
  "1. open": string;
  "2. high": string;
  "3. low": string;
  "4. close": string;
  "5. volume": string;
};

export type TimeSeriesDataResponse = TimeSeriesDataResponseMeta & {
  [key: string]: {
    [key in TimeSeriesDataIntervals]: TimeSeriesDataResponseDetails;
  };
};
