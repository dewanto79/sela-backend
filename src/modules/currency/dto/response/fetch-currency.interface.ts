export interface FetchCurrencyResponse {
  date: Date;
  base: string;
  rates: { [key: string]: string };
}
