export type LanguageKey = 'en' | 'es'; // Add more languages as needed

export interface Translations {
  [key: string]: {
    title: string;
    code: string;
    brand: string;
    price: string;
    description: string;
    createdAt: string;
    isDeleted: string;
    actions: string;
    searchByTitle: string;
    searchByBrand: string;
    createNewItem: string;
  };
}
