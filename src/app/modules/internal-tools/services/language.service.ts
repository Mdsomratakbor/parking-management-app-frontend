import { Injectable } from '@angular/core';
import { LanguageKey, Translations } from '../models/language';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  public currentLanguage: LanguageKey = 'en'; // Default language
  private translations: Translations = {
    en: {
      title: 'Name',
      code: 'Code',
      brand: 'Brand',
      price: 'Price',
      description: 'Description',
      createdAt: 'Created At',
      isDeleted: 'Deleted',
      actions: 'Actions',
      searchByTitle: 'Search by Title',
      searchByBrand: 'Search by Brand',
      createNewItem: 'Create New Item',
    },
    es: {
      title: 'Nombre',
      code: 'Código',
      brand: 'Marca',
      price: 'Precio',
      description: 'Descripción',
      createdAt: 'Creado En',
      isDeleted: 'Eliminado',
      actions: 'Acciones',
      searchByTitle: 'Buscar por Título',
      searchByBrand: 'Buscar por Marca',
      createNewItem: 'Crear Nuevo Artículo',
    },
    // Add more languages as needed
  };

  setLanguage(lang: LanguageKey) {
    this.currentLanguage = lang;
  }

  getTranslation(key: keyof Translations[LanguageKey]): string {
    return this.translations[this.currentLanguage][key] || key;
  }
}
