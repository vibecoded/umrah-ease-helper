
import { DocumentItem } from '@/types';

export const REQUIRED_DOCUMENTS: DocumentItem[] = [
  {
    id: 'passport',
    name: 'Valid Passport',
    description: 'Must be valid for at least 6 months from date of travel',
    required: true,
    completed: false,
    category: 'travel'
  },
  {
    id: 'visa',
    name: 'Umrah Visa',
    description: 'Saudi visa specifically for Umrah',
    required: true,
    completed: false,
    category: 'travel'
  },
  {
    id: 'photos',
    name: 'Passport Photos',
    description: 'Recent passport-sized photographs with white background',
    required: true,
    completed: false,
    category: 'identity'
  },
  {
    id: 'vaccination',
    name: 'Vaccination Certificate',
    description: 'Meningitis ACWY vaccine certificate and/or COVID-19 vaccination as required',
    required: true,
    completed: false,
    category: 'health'
  },
  {
    id: 'travel-insurance',
    name: 'Travel Insurance',
    description: 'Insurance covering health emergencies and travel issues',
    required: true,
    completed: false,
    category: 'financial'
  },
  {
    id: 'flight-tickets',
    name: 'Flight Tickets',
    description: 'Confirmed round-trip tickets',
    required: true,
    completed: false,
    category: 'travel'
  },
  {
    id: 'hotel-booking',
    name: 'Hotel Confirmation',
    description: 'Confirmed hotel reservations in Makkah and Madinah',
    required: true,
    completed: false,
    category: 'travel'
  },
  {
    id: 'ihram',
    name: 'Ihram Garments',
    description: 'For men: two pieces of white unsewn cloth',
    required: true,
    completed: false,
    category: 'religious'
  },
  {
    id: 'money',
    name: 'Saudi Riyals',
    description: 'Local currency for expenses during your stay',
    required: true,
    completed: false,
    category: 'financial'
  },
  {
    id: 'dua-book',
    name: 'Umrah Guide & Dua Book',
    description: 'Book containing rituals and supplications for Umrah',
    required: false,
    completed: false,
    category: 'religious'
  },
  {
    id: 'mahram-proof',
    name: 'Mahram Proof',
    description: 'For women under 45: proof of relationship with accompanying mahram',
    required: false,
    completed: false,
    category: 'identity'
  },
  {
    id: 'medicines',
    name: 'Personal Medications',
    description: 'Prescription medications with doctor\'s note if necessary',
    required: false,
    completed: false,
    category: 'health'
  }
];

export function getDocumentsByCategory(category: string): DocumentItem[] {
  return REQUIRED_DOCUMENTS.filter(doc => doc.category === category);
}

export function getRequiredDocuments(): DocumentItem[] {
  return REQUIRED_DOCUMENTS.filter(doc => doc.required);
}

export function getCompletedDocuments(): DocumentItem[] {
  return REQUIRED_DOCUMENTS.filter(doc => doc.completed);
}

export function getDocumentById(id: string): DocumentItem | undefined {
  return REQUIRED_DOCUMENTS.find(doc => doc.id === id);
}

export function updateDocumentStatus(id: string, completed: boolean): void {
  const document = REQUIRED_DOCUMENTS.find(doc => doc.id === id);
  if (document) {
    document.completed = completed;
  }
}
