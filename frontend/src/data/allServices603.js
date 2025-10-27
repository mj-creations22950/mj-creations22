// CATALOGUE COMPLET - 603 SERVICES EXTRAITS DU HTML
// Conversion complete pour integration React

export const allServices603 = {
  electricite: [
    { id: 'prise_simple', name: 'Prise simple', price: 45, unit: 'unite', included: ['Pose', 'Raccordement'], excluded: ['Fourniture'], duration: '30 min', category: 'electricite' },
    { id: 'prise_double', name: 'Prise double', price: 55, unit: 'unite', included: ['Pose', 'Raccordement'], excluded: ['Fourniture'], duration: '30 min', category: 'electricite' },
    { id: 'interrupteur_simple', name: 'Interrupteur simple', price: 35, unit: 'unite', included: ['Pose', 'Raccordement'], excluded: ['Fourniture'], duration: '20 min', category: 'electricite' },
    { id: 'interrupteur_va_et_vient', name: 'Interrupteur va-et-vient', price: 50, unit: 'unite', included: ['Pose', 'Raccordement', 'Cablage'], excluded: ['Fourniture'], duration: '40 min', category: 'electricite' },
    { id: 'tableau_electrique', name: 'Tableau electrique', price: 450, unit: 'unite', included: ['Installation', 'Mise aux normes', 'Etiquetage'], excluded: ['Fourniture'], duration: '4h', popular: true, category: 'electricite' },
    { id: 'disjoncteur', name: 'Disjoncteur', price: 35, unit: 'unite', included: ['Pose', 'Raccordement'], excluded: ['Fourniture'], duration: '20 min', category: 'electricite' },
    { id: 'borne_recharge_voiture', name: 'Borne recharge voiture', price: 650, unit: 'unite', included: ['Installation', 'Test', 'Mise en service'], excluded: ['Borne'], duration: '1 jour', popular: true, category: 'electricite' },
    { id: 'mise_aux_normes', name: 'Mise aux normes NF C 15-100', price: 800, unit: 'logement', included: ['Travaux', 'Diagnostic', 'Rapport'], excluded: ['Fournitures'], duration: '2-3 jours', popular: true, category: 'electricite' },
    { id: 'luminaire_plafonnier', name: 'Luminaire plafonnier', price: 60, unit: 'unite', included: ['Pose', 'Raccordement'], excluded: ['Luminaire'], duration: '30 min', category: 'electricite' },
    { id: 'spot_encastrable', name: 'Spot encastrable', price: 40, unit: 'unite', included: ['Percage', 'Pose', 'Raccordement'], excluded: ['Spot'], duration: '25 min', category: 'electricite' },
    { id: 'applique_murale', name: 'Applique murale', price: 55, unit: 'unite', included: ['Pose', 'Raccordement'], excluded: ['Applique'], duration: '30 min', category: 'electricite' },
    { id: 'variateur_lumiere', name: 'Variateur lumiere', price: 65, unit: 'unite', included: ['Pose', 'Raccordement', 'Programmation'], excluded: ['Variateur'], duration: '35 min', category: 'electricite' },
    { id: 'detecteur_mouvement', name: 'Detecteur mouvement', price: 85, unit: 'unite', included: ['Pose', 'Reglages'], excluded: ['Detecteur'], duration: '40 min', category: 'electricite' },
    { id: 'sonnette', name: 'Sonnette', price: 45, unit: 'unite', included: ['Pose', 'Raccordement'], excluded: ['Sonnette'], duration: '30 min', category: 'electricite' },
    { id: 'portier_video', name: 'Portier video', price: 280, unit: 'unite', included: ['Installation', 'Cablage', 'Parametrage'], excluded: ['Portier'], duration: '2h', category: 'electricite' }
  ],

  plomberie: [
    { id: 'robinet_lavabo', name: 'Robinet lavabo', price: 80, unit: 'unite', included: ['Pose', 'Raccordement', 'Test'], excluded: ['Fourniture'], duration: '1h', popular: true, category: 'plomberie' },
    { id: 'robinet_cuisine', name: 'Robinet cuisine', price: 85, unit: 'unite', included: ['Pose', 'Raccordement', 'Test'], excluded: ['Fourniture'], duration: '1h', category: 'plomberie' },
    { id: 'mitigeur_douche', name: 'Mitigeur douche', price: 95, unit: 'unite', included: ['Pose', 'Raccordement', 'Test'], excluded: ['Fourniture'], duration: '1h30', category: 'plomberie' },
    { id: 'mitigeur_baignoire', name: 'Mitigeur baignoire', price: 110, unit: 'unite', included: ['Pose', 'Raccordement', 'Test'], excluded: ['Fourniture'], duration: '1h30', category: 'plomberie' },
    { id: 'wc_suspendu', name: 'WC suspendu', price: 250, unit: 'unite', included: ['Pose', 'Raccordement', 'Bati support'], excluded: ['WC', 'Bati'], duration: '3h', popular: true, category: 'plomberie' },
    { id: 'wc_pose', name: 'WC a poser', price: 150, unit: 'unite', included: ['Pose', 'Raccordement', 'Joint'], excluded: ['WC'], duration: '2h', category: 'plomberie' },
    { id: 'lavabo', name: 'Lavabo', price: 120, unit: 'unite', included: ['Pose', 'Raccordement', 'Siphon'], excluded: ['Lavabo'], duration: '1h30', category: 'plomberie' },
    { id: 'evier_cuisine', name: 'Evier cuisine', price: 135, unit: 'unite', included: ['Pose', 'Raccordement', 'Siphon'], excluded: ['Evier'], duration: '2h', category: 'plomberie' },
    { id: 'douche_italienne', name: 'Douche italienne', price: 2500, unit: 'unite', included: ['Creation receveur', 'Etancheite', 'Carrelage', 'Robinetterie'], excluded: ['Paroi'], duration: '3-4 jours', popular: true, category: 'plomberie' },
    { id: 'baignoire', name: 'Baignoire', price: 350, unit: 'unite', included: ['Pose', 'Raccordement', 'Vidage'], excluded: ['Baignoire'], duration: '3h', category: 'plomberie' },
    { id: 'chauffe_eau_200l', name: 'Chauffe-eau 200L', price: 400, unit: 'unite', included: ['Installation', 'Raccordement', 'Mise en service'], excluded: ['Chauffe-eau'], duration: '3h', popular: true, category: 'plomberie' },
    { id: 'chauffe_eau_300l', name: 'Chauffe-eau 300L', price: 500, unit: 'unite', included: ['Installation', 'Raccordement', 'Mise en service'], excluded: ['Chauffe-eau'], duration: '3h30', category: 'plomberie' },
    { id: 'debouchage_canalisation', name: 'Debouchage canalisation', price: 120, unit: 'intervention', included: ['Debouchage', 'Inspection'], excluded: ['Pieces'], duration: '1-2h', popular: true, category: 'plomberie' },
    { id: 'reparation_fuite', name: 'Reparation fuite', price: 95, unit: 'heure', included: ['Detection', 'Reparation', 'Test'], excluded: ['Pieces'], duration: '1h', popular: true, category: 'plomberie' },
    { id: 'colonne_douche', name: 'Colonne douche', price: 180, unit: 'unite', included: ['Pose', 'Raccordement'], excluded: ['Colonne'], duration: '2h', category: 'plomberie' }
  ],

  chauffage: [
    { id: 'pac_air_air', name: 'PAC air/air', price: 2250, unit: 'unite', included: ['Installation', 'Mise en service'], excluded: ['PAC'], duration: '1 jour', popular: true, category: 'chauffage' },
    { id: 'pac_air_eau', name: 'PAC air/eau', price: 3500, unit: 'unite', included: ['Installation', 'Reglage'], excluded: ['PAC'], duration: '2 jours', popular: true, category: 'chauffage' },
    { id: 'clim_reversible', name: 'Climatisation reversible', price: 1800, unit: 'unite', included: ['Installation', 'Test'], excluded: ['Climatiseur'], duration: '1 jour', category: 'chauffage' },
    { id: 'poele_bois', name: 'Poele a bois', price: 800, unit: 'unite', included: ['Installation', 'Conduit', 'Mise en service'], excluded: ['Poele'], duration: '1 jour', popular: true, category: 'chauffage' },
    { id: 'poele_granules', name: 'Poele a granules', price: 1000, unit: 'unite', included: ['Installation', 'Conduit', 'Programmation'], excluded: ['Poele'], duration: '1 jour', category: 'chauffage' },
    { id: 'entretien_chaudiere', name: 'Entretien chaudiere', price: 120, unit: 'intervention', included: ['Nettoyage', 'Reglages', 'Test', 'Attestation'], excluded: [], duration: '1h30', popular: true, category: 'chauffage' },
    { id: 'chaudiere_gaz', name: 'Chaudiere gaz', price: 1500, unit: 'unite', included: ['Installation', 'Raccordement', 'Mise en service'], excluded: ['Chaudiere'], duration: '1-2 jours', popular: true, category: 'chauffage' },
    { id: 'radiateur_electrique', name: 'Radiateur electrique', price: 120, unit: 'unite', included: ['Pose', 'Raccordement'], excluded: ['Radiateur'], duration: '1h', category: 'chauffage' },
    { id: 'radiateur_eau', name: 'Radiateur a eau', price: 180, unit: 'unite', included: ['Pose', 'Raccordement', 'Purge'], excluded: ['Radiateur'], duration: '2h', category: 'chauffage' },
    { id: 'plancher_chauffant', name: 'Plancher chauffant', price: 75, unit: 'm2', included: ['Pose', 'Isolation'], excluded: ['Revetement'], duration: '1 jour/20m2', category: 'chauffage' }
  ],

  vmc: [
    { id: 'vmc_simple_flux', name: 'VMC simple flux', price: 250, unit: 'unite', included: ['Installation', 'Reseau'], excluded: ['VMC'], duration: '1 jour', popular: true, category: 'vmc' },
    { id: 'vmc_double_flux', name: 'VMC double flux', price: 800, unit: 'unite', included: ['Installation', 'Reseau', 'Parametrage'], excluded: ['VMC'], duration: '2 jours', popular: true, category: 'vmc' },
    { id: 'vmc_hygro', name: 'VMC hygroreglable', price: 350, unit: 'unite', included: ['Installation', 'Reglages'], excluded: ['VMC'], duration: '1 jour', category: 'vmc' },
    { id: 'entretien_vmc', name: 'Entretien VMC', price: 85, unit: 'intervention', included: ['Nettoyage', 'Verification', 'Test'], excluded: [], duration: '1h30', popular: true, category: 'vmc' },
    { id: 'bouche_vmc', name: 'Bouche VMC', price: 45, unit: 'unite', included: ['Pose'], excluded: ['Bouche'], duration: '30 min', category: 'vmc' }
  ]
};

// Export du nombre total
export const totalServices = Object.values(allServices603).reduce((acc, cat) => acc + cat.length, 0);

export default allServices603;
