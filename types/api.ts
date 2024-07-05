import { CompanyOverview, StockData } from ".";

export type TopGainersAndLosersResponse = {
  top_gainers: StockData[];
  top_losers: StockData[];
};

export type CompanyOverviewResponse = CompanyOverview;
