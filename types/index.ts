export type StockData = {
  ticker: string;
  price: string;
  change_amount: string;
  change_percentage: string;
  volume: string;
};

export type CompanyOverview = {
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
};

export type CompanyMetadata = {
  name: string;
  ticker: string;
  image: string;
};
