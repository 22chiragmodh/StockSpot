import { CompanyMetadata, CompanyOverview, StockData } from ".";

export type TopGainersAndLosersResponse = {
  top_gainers: StockData[];
  top_losers: StockData[];
  actively_traded: StockData[];
};

export type CompanyOverviewResponse = CompanyOverview;

export type CompanyMetadataResponse = CompanyMetadata[];
