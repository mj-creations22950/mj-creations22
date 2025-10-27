// Mock data for MJ Créations

export const services = [
  {
    id: 'plomberie',
    title: 'Plomberie & Sanitaire',
    icon: '💧',
    color: '#00B4D8',
    image: 'https://images.unsplash.com/photo-1635221798248-8a3452ad07cd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwbHVtYmVyfGVufDB8fHx8MTc2MTU3MDE1N3ww&ixlib=rb-4.1.0&q=85',
    description: 'Installation et réparation de tous systèmes de plomberie',
    services: [
      'Installation réseaux d\'eau chaude et froide',
      'Réparation de fuites et débouchage',
      'Pose de robinetterie, éviers, lavabos',
      'Installation douches et WC'
    ]
  },
  {
    id: 'chauffage',
    title: 'Chauffage',
    icon: '🔥',
    color: '#FF6B35',
    image: 'https://images.pexels.com/photos/2317640/pexels-photo-2317640.jpeg',
    description: 'Entretien et installation de systèmes de chauffage',
    services: [
      'Entretien chaudières gaz, fioul et électriques',
      'Remplacement de chaudières et radiateurs',
      'Mise en route et purge du système',
      'Dépannage d\'urgence 24/7'
    ]
  },
  {
    id: 'electricite',
    title: 'Électricité',
    icon: '⚡',
    color: '#FFB627',
    image: 'https://images.unsplash.com/photo-1681729058105-e30fcb24a67b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2lhbiUyMHdvcmt8ZW58MHx8fHwxNzYxNTcwMTY3fDA&ixlib=rb-4.1.0&q=85',
    description: 'Mise en conformité et installation électrique',
    services: [
      'Mise en conformité NF C 15-100',
      'Installation tableaux électriques et luminaires',
      'Ajout de prises et circuits spécialisés',
      'Diagnostic électrique complet'
    ]
  },
  {
    id: 'vmc',
    title: 'VMC / Ventilation',
    icon: '🌀',
    color: '#06D6A0',
    image: 'https://images.pexels.com/photos/1325725/pexels-photo-1325725.jpeg',
    description: 'Pose et entretien de systèmes de ventilation',
    services: [
      'Pose de systèmes simple et double flux',
      'Entretien des conduits et bouches',
      'Optimisation de la qualité de l\'air',
      'Diagnostic de ventilation'
    ]
  }
];

export const testimonials = [
  {
    id: 1,
    name: 'Sophie Martin',
    location: 'Rennes',
    rating: 5,
    date: '2025-01-15',
    text: 'Excellent service ! Intervention rapide pour une fuite d\'eau. Le technicien était professionnel et a tout réparé en moins de 2 heures.',
    service: 'Plomberie'
  },
  {
    id: 2,
    name: 'Jean Dupont',
    location: 'Brest',
    rating: 5,
    date: '2025-01-10',
    text: 'Installation complète de ma chaudière. Travail impeccable, explications claires et prix transparent. Je recommande vivement !',
    service: 'Chauffage'
  },
  {
    id: 3,
    name: 'Marie Leblanc',
    location: 'Vannes',
    rating: 5,
    date: '2024-12-28',
    text: 'Rénovation électrique de toute la maison. Équipe sérieuse, respectueuse et très compétente. Chantier propre et dans les délais.',
    service: 'Électricité'
  },
  {
    id: 4,
    name: 'Pierre Rousseau',
    location: 'Lorient',
    rating: 5,
    date: '2024-12-20',
    text: 'Pose d\'une VMC double flux. Excellent conseil pour choisir le modèle adapté. Installation soignée et rapide.',
    service: 'VMC'
  },
  {
    id: 5,
    name: 'Camille Bernard',
    location: 'Saint-Malo',
    rating: 5,
    date: '2024-12-15',
    text: 'Rénovation complète de salle de bain. Du début à la fin, tout était parfait. Une équipe à l\'écoute et de très bons conseils.',
    service: 'Plomberie'
  },
  {
    id: 6,
    name: 'Thomas Petit',
    location: 'Quimper',
    rating: 5,
    date: '2024-12-08',
    text: 'Dépannage électrique en urgence. Réactivité exceptionnelle, problème résolu en 1h. Prix très correct pour une intervention d\'urgence.',
    service: 'Électricité'
  }
];

export const portfolioItems = [
  {
    id: 1,
    title: 'Rénovation Salle de Bain Moderne',
    category: 'plomberie',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwxfHxiYXRocm9vbSUyMHJlbm92YXRpb258ZW58MHx8fHwxNzYxNTcwMTcyfDA&ixlib=rb-4.1.0&q=85',
    description: 'Rénovation complète avec douche italienne et robinetterie premium',
    location: 'Rennes',
    duration: '5 jours'
  },
  {
    id: 2,
    title: 'Installation Chaudière Condensation',
    category: 'chauffage',
    image: 'https://images.pexels.com/photos/2317640/pexels-photo-2317640.jpeg',
    description: 'Remplacement chaudière fioul par chaudière à condensation gaz',
    location: 'Brest',
    duration: '2 jours'
  },
  {
    id: 3,
    title: 'Mise aux Normes Électriques',
    category: 'electricite',
    image: 'https://images.pexels.com/photos/1325725/pexels-photo-1325725.jpeg',
    description: 'Rénovation complète de l\'installation électrique aux normes NF C 15-100',
    location: 'Vannes',
    duration: '3 jours'
  },
  {
    id: 4,
    title: 'Salle de Bain Contemporaine',
    category: 'plomberie',
    image: 'https://images.unsplash.com/photo-1521783593447-5702b9bfd267?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwyfHxiYXRocm9vbSUyMHJlbm92YXRpb258ZW58MHx8fHwxNzYxNTcwMTcyfDA&ixlib=rb-4.1.0&q=85',
    description: 'Installation baignoire îlot et système de plomberie moderne',
    location: 'Lorient',
    duration: '4 jours'
  }
];

export const faqItems = [
  {
    id: 1,
    question: 'Intervenez-vous en urgence ?',
    answer: 'Oui, nous assurons un service d\'urgence 24h/24 et 7j/7 pour les dépannages de plomberie, chauffage et électricité. Contactez-nous au 06.11.20.37.41 pour toute intervention urgente.',
    category: 'general'
  },
  {
    id: 2,
    question: 'Quelles sont vos zones d\'intervention ?',
    answer: 'Nous intervenons dans toute la Bretagne, principalement sur Rennes, Brest, Vannes, Lorient, Saint-Malo, Quimper et les environs. N\'hésitez pas à nous contacter pour connaître notre disponibilité dans votre zone.',
    category: 'general'
  },
  {
    id: 3,
    question: 'Proposez-vous des devis gratuits ?',
    answer: 'Oui, tous nos devis sont gratuits et sans engagement. Nous nous déplaçons pour évaluer vos besoins et vous proposer une solution adaptée à votre budget.',
    category: 'devis'
  },
  {
    id: 4,
    question: 'Êtes-vous assurés et certifiés ?',
    answer: 'Oui, nous sommes une entreprise assurée avec garantie décennale. Nos techniciens sont qualifiés et respectent toutes les normes en vigueur (NF C 15-100 pour l\'électricité, DTU pour la plomberie, etc.).',
    category: 'certifications'
  },
  {
    id: 5,
    question: 'Quels sont vos délais d\'intervention ?',
    answer: 'Pour les urgences, nous intervenons dans les 2 heures. Pour les travaux programmés, nous nous adaptons à votre planning et proposons généralement des rendez-vous sous 48 à 72 heures.',
    category: 'delais'
  },
  {
    id: 6,
    question: 'Proposez-vous des facilités de paiement ?',
    answer: 'Oui, nous acceptons plusieurs moyens de paiement (CB, chèque, virement) et pouvons proposer des facilités de paiement pour les gros chantiers. Nous vous accompagnons également dans vos démarches d\'aides financières (MaPrimeRénov\', etc.).',
    category: 'paiement'
  },
  {
    id: 7,
    question: 'Garantissez-vous vos travaux ?',
    answer: 'Tous nos travaux sont garantis. Nous offrons une garantie de 2 ans sur la main d\'œuvre et respectons les garanties constructeurs sur les équipements installés (chaudières, VMC, etc.).',
    category: 'garantie'
  },
  {
    id: 8,
    question: 'Faites-vous l\'entretien annuel des chaudières ?',
    answer: 'Oui, nous proposons des contrats d\'entretien annuel pour vos chaudières (gaz, fioul, électrique) conformément à la réglementation. Cela permet d\'assurer la sécurité et la longévité de votre installation.',
    category: 'entretien'
  }
];

export const blogPosts = [
  {
    id: 1,
    title: '5 Signes qu\'il faut remplacer votre chaudière',
    excerpt: 'Découvrez les signaux d\'alerte qui indiquent qu\'il est temps de changer votre système de chauffage pour un modèle plus performant et économique.',
    image: 'https://images.pexels.com/photos/2317640/pexels-photo-2317640.jpeg',
    category: 'Chauffage',
    date: '2025-01-20',
    readTime: '5 min',
    author: 'MJ Créations'
  },
  {
    id: 2,
    title: 'Comment économiser l\'eau dans votre maison',
    excerpt: 'Des astuces simples et efficaces pour réduire votre consommation d\'eau et faire des économies sur votre facture.',
    image: 'https://images.unsplash.com/photo-1635221798248-8a3452ad07cd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwbHVtYmVyfGVufDB8fHx8MTc2MTU3MDE1N3ww&ixlib=rb-4.1.0&q=85',
    category: 'Plomberie',
    date: '2025-01-18',
    readTime: '4 min',
    author: 'MJ Créations'
  },
  {
    id: 3,
    title: 'Mise aux normes électriques : ce qu\'il faut savoir',
    excerpt: 'Tout comprendre sur la norme NF C 15-100 et pourquoi elle est essentielle pour votre sécurité.',
    image: 'https://images.unsplash.com/photo-1681729058105-e30fcb24a67b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2lhbiUyMHdvcmt8ZW58MHx8fHwxNzYxNTcwMTY3fDA&ixlib=rb-4.1.0&q=85',
    category: 'Électricité',
    date: '2025-01-15',
    readTime: '6 min',
    author: 'MJ Créations'
  },
  {
    id: 4,
    title: 'VMC : Pourquoi la ventilation est cruciale',
    excerpt: 'L\'importance d\'une bonne ventilation pour la qualité de l\'air intérieur et la santé de votre famille.',
    image: 'https://images.pexels.com/photos/1325725/pexels-photo-1325725.jpeg',
    category: 'VMC',
    date: '2025-01-12',
    readTime: '5 min',
    author: 'MJ Créations'
  }
];

export const stats = [
  { value: '15+', label: 'Années d\'expérience' },
  { value: '2500+', label: 'Clients satisfaits' },
  { value: '98%', label: 'Taux de satisfaction' },
  { value: '24/7', label: 'Service d\'urgence' }
];
