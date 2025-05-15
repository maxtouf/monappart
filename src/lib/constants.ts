import { Stage } from './store/useAppStore';

export const STAGES: { id: Stage; label: string; description: string }[] = [
  {
    id: 'search',
    label: 'Recherche',
    description: 'Recherche et visite de biens immobiliers',
  },
  {
    id: 'offer',
    label: 'Offre',
    description: 'Soumission d\'une offre d\'achat',
  },
  {
    id: 'negotiation',
    label: 'Négociation',
    description: 'Négociation du prix et des conditions',
  },
  {
    id: 'financing',
    label: 'Financement',
    description: 'Recherche et obtention du financement',
  },
  {
    id: 'presale',
    label: 'Compromis',
    description: 'Signature du compromis de vente',
  },
  {
    id: 'notary',
    label: 'Notaire',
    description: 'Préparation des documents notariés',
  },
  {
    id: 'signing',
    label: 'Signature',
    description: 'Signature de l\'acte définitif',
  },
  {
    id: 'handover',
    label: 'Remise des clés',
    description: 'Remise des clés et prise de possession',
  },
];

export const DOCUMENT_CATEGORIES = [
  'Compromis',
  'Offre de prêt',
  'Attestation',
  'Diagnostic',
  'Plan',
  'Facture',
  'Contrat',
  'Autre',
];

export const CONTACT_ROLES = [
  'Agent immobilier',
  'Vendeur',
  'Notaire',
  'Banquier',
  'Courtier',
  'Assureur',
  'Diagnostiqueur',
  'Autre',
];

export const formatCurrency = (amount?: number): string => {
  if (amount === undefined) return '0 €';
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
};

export const formatDate = (dateString?: string): string => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
};

export const getStageProgress = (currentStage: Stage): number => {
  const index = STAGES.findIndex(stage => stage.id === currentStage);
  if (index === -1) return 0;
  return Math.round(((index + 1) / STAGES.length) * 100);
};

export const getNextStage = (currentStage: Stage): Stage | null => {
  const currentIndex = STAGES.findIndex(stage => stage.id === currentStage);
  if (currentIndex === -1 || currentIndex === STAGES.length - 1) return null;
  return STAGES[currentIndex + 1].id;
};

export const getPreviousStage = (currentStage: Stage): Stage | null => {
  const currentIndex = STAGES.findIndex(stage => stage.id === currentStage);
  if (currentIndex <= 0) return null;
  return STAGES[currentIndex - 1].id;
};