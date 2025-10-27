// Configuration complete du systeme MJ Creations

export const systemConfig = {
  // INFORMATIONS ENTREPRISE
  company: {
    name: 'MJ Creations',
    siret: '12345678900012',
    tva: 'FR12345678900',
    address: 'Bretagne, France',
    phone: '06.11.20.37.41',
    email: 'mj.creations22950@gmail.com',
    logo: '/logo.png'
  },

  // FRAIS DE DEPLACEMENT
  delivery: {
    baseFee: 25, // Forfait de base en euros
    perKm: 0.65, // EUR par kilometre
    freeAbove: 500, // Gratuit au-dessus de X EUR
    zones: [
      { name: 'Zone 1 (0-10km)', fee: 25 },
      { name: 'Zone 2 (10-25km)', fee: 40 },
      { name: 'Zone 3 (25-50km)', fee: 65 },
      { name: 'Zone 4 (50km+)', fee: 'Sur devis' }
    ]
  },

  // SYSTEME DE FIDELITE
  loyalty: {
    enabled: true,
    pointsPerEuro: 1, // 1 point par euro depense
    welcomeBonus: 50, // Points offerts a linscription
    rewards: [
      { points: 50, discount: 5, label: '50 pts = -5 EUR' },
      { points: 100, discount: 10, label: '100 pts = -10 EUR' },
      { points: 250, discount: 25, label: '250 pts = -25 EUR' },
      { points: 500, discount: 60, label: '500 pts = -60 EUR' },
      { points: 1000, discount: 150, label: '1000 pts = -150 EUR' }
    ]
  },

  // MOYENS DE PAIEMENT
  payments: {
    methods: [
      {
        id: 'card',
        name: 'Carte Bancaire',
        icon: 'CreditCard',
        enabled: true,
        description: 'Paiement securise par Stripe',
        fees: 0, // Pas de frais pour le client
        stripe: {
          publicKey: process.env.REACT_APP_STRIPE_PUBLIC_KEY || '',
          enabled: true
        }
      },
      {
        id: 'bank_transfer',
        name: 'Virement Bancaire',
        icon: 'Building',
        enabled: true,
        description: 'Virement sur notre compte bancaire',
        fees: 0,
        bankDetails: {
          bank: 'Credit Mutuel de Bretagne',
          holder: 'MJ Creations',
          iban: 'FR76 1234 5678 9012 3456 7890 123',
          bic: 'CMCIFRPP'
        }
      },
      {
        id: 'check',
        name: 'Cheque',
        icon: 'FileText',
        enabled: true,
        description: 'Cheque a lordre de MJ Creations',
        fees: 0,
        address: 'MJ Creations, Bretagne, France'
      },
      {
        id: 'cash',
        name: 'Especes',
        icon: 'Banknote',
        enabled: true,
        description: 'Paiement en especes sur place',
        fees: 0,
        maxAmount: 1000 // Limite legale
      },
      {
        id: 'paypal',
        name: 'PayPal',
        icon: 'Wallet',
        enabled: false,
        description: 'Paiement via PayPal',
        fees: 0,
        clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID || ''
      },
      {
        id: 'installments',
        name: 'Paiement en plusieurs fois',
        icon: 'Calendar',
        enabled: true,
        description: 'Jusqu a 4x sans frais (commandes > 500 EUR)',
        fees: 0,
        minAmount: 500,
        maxInstallments: 4
      }
    ],
    deposit: {
      enabled: true,
      percentage: 30, // 30% dacompte
      description: 'Un acompte de 30% est demande a la commande'
    }
  },

  // TVA
  vat: {
    standard: 20,
    reduced: 10,
    superReduced: 5.5,
    default: 'standard',
    categories: {
      renovation: 'reduced', // Travaux de renovation
      energyEfficiency: 'superReduced', // Travaux defficacite energetique
      other: 'standard'
    }
  },

  // DOCUMENTS
  documents: {
    quote: {
      prefix: 'DEV',
      validityDays: 30,
      termsAndConditions: 'Devis valable 30 jours. Acompte de 30% a la commande. Solde a la livraison.'
    },
    invoice: {
      prefix: 'FACT',
      paymentTerms: 'Paiement a reception de facture',
      latePenalty: 3, // Taux de penalite de retard (%)
      lateCompensation: 40 // Indemnite forfaitaire de recouvrement (EUR)
    },
    contract: {
      prefix: 'CONT',
      warranty: 2 // Garantie 2 ans
    }
  },

  // NOTIFICATIONS
  notifications: {
    client: {
      email: {
        orderConfirmation: true,
        paymentReceived: true,
        quoteExpiring: true,
        appointmentReminder: true
      },
      sms: {
        enabled: false,
        appointmentReminder: true,
        orderStatus: false
      },
      push: {
        enabled: true
      }
    },
    admin: {
      email: {
        newOrder: true,
        paymentReceived: true,
        lowStock: true
      },
      sms: {
        enabled: false
      }
    }
  },

  // HORAIRES
  businessHours: {
    monday: { open: '08:00', close: '18:00', closed: false },
    tuesday: { open: '08:00', close: '18:00', closed: false },
    wednesday: { open: '08:00', close: '18:00', closed: false },
    thursday: { open: '08:00', close: '18:00', closed: false },
    friday: { open: '08:00', close: '18:00', closed: false },
    saturday: { open: '09:00', close: '17:00', closed: false },
    sunday: { open: '00:00', close: '00:00', closed: true }
  },

  // MODULES ACTIVABLES
  modules: {
    chat: true,
    reviews: true,
    loyalty: true,
    stock: false,
    planning: true,
    photos: true,
    favorites: true,
    multiAddress: true
  },

  // LIMITES
  limits: {
    maxPhotos: 20,
    maxPhotoSize: 5, // MB
    maxAddresses: 5,
    minOrderAmount: 50, // EUR
    sessionTimeout: 30 // minutes
  },

  // SECURITE
  security: {
    passwordMinLength: 8,
    requireSpecialChar: true,
    requireNumber: true,
    maxLoginAttempts: 5,
    lockoutDuration: 15 // minutes
  },

  // THEMES
  themes: {
    default: 'light',
    available: ['light', 'dark', 'auto'],
    colors: {
      primary: '#00B4D8',
      secondary: '#0077B6',
      accent: '#FF6B35',
      success: '#06D6A0',
      warning: '#FFB627',
      error: '#EF476F'
    }
  }
};

// Configuration des avis clients
export const reviewsConfig = {
  enabled: true,
  requireVerifiedPurchase: false,
  moderationRequired: false,
  minRating: 1,
  maxRating: 5,
  allowPhotos: true,
  maxPhotosPerReview: 5
};

// Configuration du chat
export const chatConfig = {
  enabled: true,
  autoResponses: [
    {
      keywords: ['prix', 'cout', 'tarif'],
      response: 'Pour connaitre nos tarifs, consultez notre catalogue ou demandez un devis gratuit !'
    },
    {
      keywords: ['devis', 'estimation'],
      response: 'Vous pouvez demander un devis gratuit via notre formulaire ou en nous appelant au 06.11.20.37.41'
    },
    {
      keywords: ['rdv', 'rendez-vous', 'disponibilite'],
      response: 'Consultez nos disponibilites dans lespace Rendez-vous ou contactez-nous directement.'
    },
    {
      keywords: ['horaire', 'ouverture'],
      response: 'Nous sommes ouverts du lundi au vendredi de 8h a 18h et le samedi de 9h a 17h.'
    },
    {
      keywords: ['urgence', 'depannage'],
      response: 'Pour une urgence, appelez-nous directement au 06.11.20.37.41. Service 24/7 disponible.'
    }
  ],
  offlineMessage: 'Nous sommes actuellement indisponibles. Laissez-nous un message et nous vous repondrons rapidement.'
};

export default systemConfig;
