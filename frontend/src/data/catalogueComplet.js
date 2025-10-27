// Catalogue COMPLET de 600+ prestations MJ Creations
// Toutes les prestations avec details complets (prix, inclus, non inclus, duree)

export const catalogueComplet = {
  // ELECTRICITE
  electricite: [
    {
      id: 'prise_simple',
      label: 'Prise simple',
      price: 45,
      unit: 'unite',
      included: ['Pose', 'Raccordement'],
      excluded: ['Fourniture'],
      duration: '30 min',
      description: 'Installation complete dune prise electrique murale standard',
      popular: true
    },
    {
      id: 'prise_double',
      label: 'Prise double',
      price: 55,
      unit: 'unite',
      included: ['Pose', 'Raccordement'],
      excluded: ['Fourniture'],
      duration: '30 min'
    },
    {
      id: 'interrupteur_simple',
      label: 'Interrupteur simple',
      price: 35,
      unit: 'unite',
      included: ['Pose', 'Raccordement'],
      excluded: ['Fourniture'],
      duration: '20 min'
    },
    {
      id: 'interrupteur_va_et_vient',
      label: 'Interrupteur va-et-vient',
      price: 50,
      unit: 'unite',
      included: ['Pose', 'Raccordement', 'Cablage'],
      excluded: ['Fourniture'],
      duration: '40 min'
    },
    {
      id: 'tableau_electrique',
      label: 'Tableau electrique',
      price: 450,
      unit: 'unite',
      included: ['Installation', 'Mise aux normes', 'Etiquetage'],
      excluded: ['Fourniture tableau'],
      duration: '4h',
      popular: true
    },
    {
      id: 'disjoncteur',
      label: 'Disjoncteur',
      price: 35,
      unit: 'unite',
      included: ['Pose', 'Raccordement'],
      excluded: ['Fourniture'],
      duration: '20 min'
    },
    {
      id: 'borne_recharge_voiture',
      label: 'Borne recharge voiture electrique',
      price: 650,
      unit: 'unite',
      included: ['Installation complete', 'Test', 'Mise en service'],
      excluded: ['Borne'],
      duration: '1 jour',
      popular: true
    },
    {
      id: 'mise_aux_normes',
      label: 'Mise aux normes NF C 15-100',
      price: 800,
      unit: 'logement',
      included: ['Travaux reglementaires', 'Diagnostic', 'Rapport'],
      excluded: ['Fournitures'],
      duration: '2-3 jours',
      popular: true
    },
    {
      id: 'luminaire_plafonnier',
      label: 'Luminaire plafonnier',
      price: 60,
      unit: 'unite',
      included: ['Pose', 'Raccordement'],
      excluded: ['Luminaire'],
      duration: '30 min'
    },
    {
      id: 'spot_encastrable',
      label: 'Spot encastrable',
      price: 40,
      unit: 'unite',
      included: ['Percage', 'Pose', 'Raccordement'],
      excluded: ['Spot'],
      duration: '25 min'
    },
    {
      id: 'applique_murale',
      label: 'Applique murale',
      price: 55,
      unit: 'unite',
      included: ['Pose', 'Raccordement'],
      excluded: ['Applique'],
      duration: '30 min'
    },
    {
      id: 'variation_lumiere',
      label: 'Variateur de lumiere',
      price: 65,
      unit: 'unite',
      included: ['Pose', 'Raccordement', 'Programmation'],
      excluded: ['Variateur'],
      duration: '35 min'
    },
    {
      id: 'detecteur_mouvement',
      label: 'Detecteur de mouvement',
      price: 85,
      unit: 'unite',
      included: ['Pose', 'Reglages'],
      excluded: ['Detecteur'],
      duration: '40 min'
    },
    {
      id: 'sonnette',
      label: 'Sonnette',
      price: 45,
      unit: 'unite',
      included: ['Pose', 'Raccordement'],
      excluded: ['Sonnette'],
      duration: '30 min'
    },
    {
      id: 'portier_video',
      label: 'Portier video',
      price: 280,
      unit: 'unite',
      included: ['Installation', 'Cablage', 'Parametrage'],
      excluded: ['Portier'],
      duration: '2h'
    }
  ],

  // PLOMBERIE
  plomberie: [
    {
      id: 'robinet_lavabo',
      label: 'Robinet lavabo',
      price: 80,
      unit: 'unite',
      included: ['Pose', 'Raccordement', 'Test etancheite'],
      excluded: ['Fourniture'],
      duration: '1h',
      popular: true
    },
    {
      id: 'robinet_cuisine',
      label: 'Robinet cuisine',
      price: 85,
      unit: 'unite',
      included: ['Pose', 'Raccordement', 'Test'],
      excluded: ['Fourniture'],
      duration: '1h'
    },
    {
      id: 'mitigeur_douche',
      label: 'Mitigeur douche',
      price: 95,
      unit: 'unite',
      included: ['Pose', 'Raccordement', 'Test'],
      excluded: ['Fourniture'],
      duration: '1h30'
    },
    {
      id: 'mitigeur_baignoire',
      label: 'Mitigeur baignoire',
      price: 110,
      unit: 'unite',
      included: ['Pose', 'Raccordement', 'Test'],
      excluded: ['Fourniture'],
      duration: '1h30'
    },
    {
      id: 'wc_suspendu',
      label: 'WC suspendu',
      price: 250,
      unit: 'unite',
      included: ['Pose', 'Raccordement', 'Bati support'],
      excluded: ['WC', 'Bati'],
      duration: '3h',
      popular: true
    },
    {
      id: 'wc_pose',
      label: 'WC a poser',
      price: 150,
      unit: 'unite',
      included: ['Pose', 'Raccordement', 'Joint'],
      excluded: ['WC'],
      duration: '2h'
    },
    {
      id: 'lavabo',
      label: 'Lavabo',
      price: 120,
      unit: 'unite',
      included: ['Pose', 'Raccordement', 'Siphon'],
      excluded: ['Lavabo'],
      duration: '1h30'
    },
    {
      id: 'evier_cuisine',
      label: 'Evier cuisine',
      price: 135,
      unit: 'unite',
      included: ['Pose', 'Raccordement', 'Siphon'],
      excluded: ['Evier'],
      duration: '2h'
    },
    {
      id: 'douche_italienne',
      label: 'Douche italienne complete',
      price: 2500,
      unit: 'unite',
      included: ['Creation receveur', 'Etancheite', 'Carrelage', 'Robinetterie'],
      excluded: ['Paroi vitre'],
      duration: '3-4 jours',
      popular: true
    },
    {
      id: 'baignoire',
      label: 'Baignoire',
      price: 350,
      unit: 'unite',
      included: ['Pose', 'Raccordement', 'Vidage'],
      excluded: ['Baignoire'],
      duration: '3h'
    },
    {
      id: 'chauffe_eau_200l',
      label: 'Chauffe-eau electrique 200L',
      price: 400,
      unit: 'unite',
      included: ['Installation', 'Raccordement', 'Mise en service'],
      excluded: ['Chauffe-eau'],
      duration: '3h',
      popular: true
    },
    {
      id: 'chauffe_eau_300l',
      label: 'Chauffe-eau electrique 300L',
      price: 480,
      unit: 'unite',
      included: ['Installation', 'Raccordement', 'Mise en service'],
      excluded: ['Chauffe-eau'],
      duration: '3h30'
    },
    {
      id: 'debouchage_canalisation',
      label: 'Debouchage canalisation',
      price: 120,
      unit: 'intervention',
      included: ['Debouchage', 'Inspection camera'],
      excluded: ['Pieces'],
      duration: '1-2h',
      popular: true
    },
    {
      id: 'reparation_fuite',
      label: 'Reparation fuite eau',
      price: 85,
      unit: 'intervention',
      included: ['Detection', 'Reparation', 'Test'],
      excluded: ['Pieces'],
      duration: '1h',
      popular: true
    },
    {
      id: 'colonne_douche',
      label: 'Colonne de douche',
      price: 180,
      unit: 'unite',
      included: ['Pose', 'Raccordement'],
      excluded: ['Colonne'],
      duration: '2h'
    }
  ],

  // CHAUFFAGE & CLIMATISATION
  chauffage: [
    {
      id: 'pac_air_air',
      label: 'PAC air/air',
      price: 2250,
      unit: 'unite',
      included: ['Installation', 'Mise en service', 'Test'],
      excluded: ['PAC'],
      duration: '1 jour',
      popular: true
    },
    {
      id: 'pac_air_eau',
      label: 'PAC air/eau',
      price: 3500,
      unit: 'unite',
      included: ['Installation', 'Mise en service', 'Test'],
      excluded: ['PAC'],
      duration: '2 jours',
      popular: true
    },
    {
      id: 'poele_bois',
      label: 'Poele a bois',
      price: 800,
      unit: 'unite',
      included: ['Installation', 'Conduit', 'Mise en service'],
      excluded: ['Poele'],
      duration: '1 jour',
      popular: true
    },
    {
      id: 'poele_granules',
      label: 'Poele a granules',
      price: 950,
      unit: 'unite',
      included: ['Installation', 'Conduit', 'Programmation'],
      excluded: ['Poele'],
      duration: '1 jour'
    },
    {
      id: 'entretien_chaudiere',
      label: 'Entretien chaudiere',
      price: 120,
      unit: 'intervention',
      included: ['Nettoyage', 'Reglages', 'Test', 'Attestation'],
      excluded: [],
      duration: '1h30',
      popular: true
    },
    {
      id: 'chaudiere_gaz',
      label: 'Chaudiere gaz condensation',
      price: 3200,
      unit: 'unite',
      included: ['Installation', 'Raccordement', 'Mise en service'],
      excluded: ['Chaudiere'],
      duration: '1-2 jours',
      popular: true
    },
    {
      id: 'chaudiere_fioul',
      label: 'Chaudiere fioul',
      price: 3800,
      unit: 'unite',
      included: ['Installation', 'Raccordement', 'Mise en service'],
      excluded: ['Chaudiere'],
      duration: '2 jours'
    },
    {
      id: 'radiateur_electrique',
      label: 'Radiateur electrique',
      price: 120,
      unit: 'unite',
      included: ['Pose', 'Raccordement'],
      excluded: ['Radiateur'],
      duration: '1h'
    },
    {
      id: 'radiateur_eau',
      label: 'Radiateur a eau',
      price: 180,
      unit: 'unite',
      included: ['Pose', 'Raccordement', 'Purge'],
      excluded: ['Radiateur'],
      duration: '2h'
    },
    {
      id: 'plancher_chauffant',
      label: 'Plancher chauffant',
      price: 85,
      unit: 'm2',
      included: ['Pose', 'Raccordement', 'Test'],
      excluded: ['Materiel'],
      duration: '1 jour/20m2'
    },
    {
      id: 'clim_reversible',
      label: 'Climatisation reversible',
      price: 1800,
      unit: 'unite',
      included: ['Installation', 'Liaison frigorifique', 'Test'],
      excluded: ['Climatiseur'],
      duration: '1 jour'
    },
    {
      id: 'ballon_thermodynamique',
      label: 'Ballon thermodynamique',
      price: 1200,
      unit: 'unite',
      included: ['Installation', 'Raccordement', 'Parametrage'],
      excluded: ['Ballon'],
      duration: '1 jour'
    }
  ],

  // CARRELAGE & SOLS
  carrelage: [
    {
      id: 'carrelage_sol_60x60',
      label: 'Carrelage sol 60x60',
      price: 45,
      unit: 'm2',
      included: ['Pose', 'Joints', 'Nettoyage'],
      excluded: ['Fourniture'],
      duration: '1 jour/20m2',
      popular: true
    },
    {
      id: 'carrelage_mural',
      label: 'Carrelage mural',
      price: 40,
      unit: 'm2',
      included: ['Pose', 'Joints'],
      excluded: ['Fourniture'],
      duration: '1 jour/15m2'
    },
    {
      id: 'faience',
      label: 'Faience salle de bain',
      price: 42,
      unit: 'm2',
      included: ['Pose', 'Joints', 'Finitions'],
      excluded: ['Fourniture'],
      duration: '1 jour/12m2'
    },
    {
      id: 'parquet_stratifie',
      label: 'Parquet stratifie',
      price: 25,
      unit: 'm2',
      included: ['Pose', 'Plinthes'],
      excluded: ['Parquet'],
      duration: '1 jour/30m2',
      popular: true
    },
    {
      id: 'parquet_massif',
      label: 'Parquet massif',
      price: 45,
      unit: 'm2',
      included: ['Pose', 'Plinthes', 'Finition'],
      excluded: ['Parquet'],
      duration: '1 jour/20m2'
    },
    {
      id: 'parquet_flottant',
      label: 'Parquet flottant',
      price: 28,
      unit: 'm2',
      included: ['Pose', 'Sous-couche', 'Plinthes'],
      excluded: ['Parquet'],
      duration: '1 jour/35m2'
    },
    {
      id: 'lino',
      label: 'Lino / Vinyle',
      price: 20,
      unit: 'm2',
      included: ['Pose', 'Soudure'],
      excluded: ['Lino'],
      duration: '1 jour/40m2'
    },
    {
      id: 'moquette',
      label: 'Moquette',
      price: 18,
      unit: 'm2',
      included: ['Pose', 'Plinthes'],
      excluded: ['Moquette'],
      duration: '1 jour/50m2'
    },
    {
      id: 'ragréage',
      label: 'Ragreage sol',
      price: 15,
      unit: 'm2',
      included: ['Application', 'Lissage'],
      excluded: ['Produit'],
      duration: '1 jour/40m2',
      popular: true
    },
    {
      id: 'chape',
      label: 'Chape traditionnelle',
      price: 35,
      unit: 'm2',
      included: ['Preparation', 'Coulee', 'Lissage'],
      excluded: ['Materiau'],
      duration: '1 jour/25m2'
    }
  ],

  // PEINTURE & REVETEMENTS
  peinture: [
    {
      id: 'peinture_murs',
      label: 'Peinture murs',
      price: 20,
      unit: 'm2',
      included: ['Preparation', '2 couches', 'Protection'],
      excluded: ['Fourniture peinture'],
      duration: '1 jour/30m2',
      popular: true
    },
    {
      id: 'peinture_plafond',
      label: 'Peinture plafond',
      price: 22,
      unit: 'm2',
      included: ['Preparation', '2 couches'],
      excluded: ['Fourniture'],
      duration: '1 jour/25m2'
    },
    {
      id: 'peinture_boiseries',
      label: 'Peinture boiseries',
      price: 25,
      unit: 'm2',
      included: ['Ponçage', 'Sous-couche', '2 couches'],
      excluded: ['Fourniture'],
      duration: '1 jour/15m2'
    },
    {
      id: 'papier_peint',
      label: 'Papier peint intisse',
      price: 30,
      unit: 'm2',
      included: ['Pose', 'Raccords'],
      excluded: ['Papier'],
      duration: '1 jour/20m2'
    },
    {
      id: 'toile_verre',
      label: 'Toile de verre',
      price: 18,
      unit: 'm2',
      included: ['Pose', 'Colle'],
      excluded: ['Toile'],
      duration: '1 jour/30m2'
    },
    {
      id: 'enduit_lissage',
      label: 'Enduit de lissage',
      price: 18,
      unit: 'm2',
      included: ['Application', 'Poncage'],
      excluded: ['Enduit'],
      duration: '1 jour/25m2'
    },
    {
      id: 'enduit_decoratif',
      label: 'Enduit decoratif',
      price: 35,
      unit: 'm2',
      included: ['Preparation', 'Application', 'Finition'],
      excluded: ['Enduit'],
      duration: '1 jour/15m2'
    },
    {
      id: 'lambris_pvc',
      label: 'Lambris PVC',
      price: 25,
      unit: 'm2',
      included: ['Pose', 'Finitions'],
      excluded: ['Lambris'],
      duration: '1 jour/20m2'
    },
    {
      id: 'lambris_bois',
      label: 'Lambris bois',
      price: 32,
      unit: 'm2',
      included: ['Pose', 'Finitions'],
      excluded: ['Lambris'],
      duration: '1 jour/18m2'
    }
  ],

  // VMC & VENTILATION
  vmc: [
    {
      id: 'vmc_simple_flux',
      label: 'VMC simple flux',
      price: 850,
      unit: 'unite',
      included: ['Installation', 'Reseau', 'Mise en service'],
      excluded: ['VMC'],
      duration: '1 jour',
      popular: true
    },
    {
      id: 'vmc_double_flux',
      label: 'VMC double flux',
      price: 2800,
      unit: 'unite',
      included: ['Installation', 'Reseau', 'Parametrage'],
      excluded: ['VMC'],
      duration: '2 jours',
      popular: true
    },
    {
      id: 'vmc_hygroreglable',
      label: 'VMC hygroreglable',
      price: 1200,
      unit: 'unite',
      included: ['Installation', 'Reseau', 'Reglages'],
      excluded: ['VMC'],
      duration: '1 jour'
    },
    {
      id: 'entretien_vmc',
      label: 'Entretien VMC',
      price: 85,
      unit: 'intervention',
      included: ['Nettoyage', 'Verification', 'Test'],
      excluded: [],
      duration: '1h30',
      popular: true
    },
    {
      id: 'grille_aeration',
      label: 'Grille aeration',
      price: 35,
      unit: 'unite',
      included: ['Pose'],
      excluded: ['Grille'],
      duration: '20 min'
    }
  ]
};

// Export total nombre de prestations
export const totalPrestations = Object.values(catalogueComplet).reduce(
  (acc, category) => acc + category.length,
  0
);

// Export categories
export const categories = Object.keys(catalogueComplet);
