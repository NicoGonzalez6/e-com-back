export enum currencyTypes {
  ARS = 'ARS',
  USD = 'USD',
}

export interface currencyTypesI {
  id: number;
  currency: currencyTypes.ARS | currencyTypes.USD;
}
