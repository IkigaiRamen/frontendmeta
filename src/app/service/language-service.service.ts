import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageServiceService {
  private currentLanguageSubject: BehaviorSubject<string>;
  public currentLanguage$: Observable<string>;

  private translations: any = {
    en: {
      // English translations
      newButton: 'New',
      deleteButton: 'Delete',
      linearChart: 'Linear Chart',
      barChart: 'Bar Chart',
      pieChart: 'Pie Chart',
      labelDetails: 'Label Details',
      documentation: 'Documentation',
      noDocuments: 'There are no documents for this label yet.',
      newLabelButtonText: 'New',
      deleteLabelText: 'Delete',
      importLabelText: 'Import',
      exportLabelText: 'Export',
      seeStatButtonText: 'See Stat',
      deleteConfirmationText: 'Are you sure you want to delete',
      Name:'Name',
      Country:'Country',
      noCountry:'Country is required.',
      Ai:'Generate description with AI',
      Save:'Save',
      Cancel:'Cancel',
      Expand:'Expand all',
      Collapse:'Collapse all',

      // Add more translations as needed
    },
    fr: {
      // French translations
      newButton: 'Nouveau',
      deleteButton: 'Supprimer',
      linearChart: 'Graphique linéaire',
      barChart: 'Diagramme à barres',
      pieChart: 'Diagramme circulaire', 
      labelDetails: 'Détails de l\'étiquette',
      documentation: 'Documentation',
      noDocuments: 'Il n\'y a pas encore de documents pour cette étiquette.',
      newLabelButtonText: 'Nouveau',
      deleteLabelText: 'Supprimer',
      importLabelText: 'Importer',
      exportLabelText: 'Exporter',
      seeStatButtonText: 'Voir les stats',
      deleteConfirmationText: 'Êtes-vous sûr de vouloir supprimer',
      Name:'Nom',
      Country:'Pays',
      noCountry:'Le pays est obligatoire',
      Ai:'Génerer description avec IA',
      Save:'Sauvegarder',
      Cancel:'Annuler',
      Expand:'Développer tout',
      Collapse:'Tout réduire',
      // Add more translations as needed
    }
    // Add more languages and translations as needed
  };

  constructor() {
    // Initialize current language subject with default value
    this.currentLanguageSubject = new BehaviorSubject<string>('en');
    // Expose currentLanguage$ as an observable for components to subscribe
    this.currentLanguage$ = this.currentLanguageSubject.asObservable();
  }

  setCurrentLanguage(language: string): void {
    // Update current language subject
    this.currentLanguageSubject.next(language);
  }

  getTranslation(key: string): string {
    // Retrieve translation based on current language
    return this.translations[this.currentLanguageSubject.value][key] || key;
  }
}
