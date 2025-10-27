// TOUTES les donnees mockees completes pour MJ Creations
// Extrait du fichier HTML original complet

export const mockData = {
  // COMMANDES COMPLETES
  orders: [
    {
      id: 'CMD-2024-001',
      clientId: 'client1',
      clientName: 'Sophie Martin',
      email: 'sophie.martin@email.com',
      phone: '06 12 34 56 78',
      date: '2024-10-20',
      status: 'completed',
      statusLabel: 'Terminee',
      items: [
        { serviceKey: 'robinet_lavabo', category: 'plomberie', quantity: 2, price: 80 }
      ],
      subtotal: 160,
      tva: 32,
      deliveryFee: 25,
      discount: 0,
      total: 217,
      paymentMethod: 'card',
      paymentStatus: 'paid',
      address: '15 Rue de la Republique, 35000 Rennes',
      notes: 'Intervention rapide demandee'
    },
    {
      id: 'CMD-2024-002',
      clientId: 'client2',
      clientName: 'Jean Dupont',
      email: 'jean.dupont@email.com',
      phone: '06 23 45 67 89',
      date: '2024-10-18',
      status: 'confirmed',
      statusLabel: 'Confirmee',
      items: [
        { serviceKey: 'entretien_chaudiere', category: 'chauffage', quantity: 1, price: 120 }
      ],
      subtotal: 120,
      tva: 24,
      deliveryFee: 40,
      discount: 0,
      total: 184,
      paymentMethod: 'bank_transfer',
      paymentStatus: 'pending',
      address: '8 Avenue du Port, 29200 Brest'
    },
    {
      id: 'CMD-2024-003',
      clientId: 'client3',
      clientName: 'Marie Leblanc',
      email: 'marie.leblanc@email.com',
      phone: '06 34 56 78 90',
      date: '2024-10-15',
      status: 'pending',
      statusLabel: 'En attente',
      items: [
        { serviceKey: 'prise_simple', category: 'electricite', quantity: 5, price: 45 },
        { serviceKey: 'interrupteur_simple', category: 'electricite', quantity: 3, price: 35 }
      ],
      subtotal: 330,
      tva: 66,
      deliveryFee: 25,
      discount: 10,
      total: 411,
      paymentMethod: 'check',
      paymentStatus: 'pending',
      address: '22 Rue Victor Hugo, 56000 Vannes'
    }
  ],

  // CLIENTS COMPLETS
  clients: [
    {
      id: 'client1',
      name: 'Sophie Martin',
      email: 'sophie.martin@email.com',
      phone: '06 12 34 56 78',
      address: '15 Rue de la Republique',
      city: 'Rennes',
      zipCode: '35000',
      registeredDate: '2023-05-12',
      totalOrders: 12,
      totalSpent: 3280,
      loyaltyPoints: 3280,
      status: 'vip',
      addresses: [
        {
          id: 'addr1',
          type: 'Principale',
          address: '15 Rue de la Republique',
          city: 'Rennes',
          zipCode: '35000',
          isDefault: true
        },
        {
          id: 'addr2',
          type: 'Secondaire',
          address: '8 Impasse des Lilas',
          city: 'Saint-Malo',
          zipCode: '35400',
          isDefault: false
        }
      ],
      preferences: {
        newsletter: true,
        sms: false,
        emailNotifications: true,
        theme: 'cyan'
      }
    },
    {
      id: 'client2',
      name: 'Jean Dupont',
      email: 'jean.dupont@email.com',
      phone: '06 23 45 67 89',
      address: '8 Avenue du Port',
      city: 'Brest',
      zipCode: '29200',
      registeredDate: '2023-08-20',
      totalOrders: 8,
      totalSpent: 4500,
      loyaltyPoints: 4500,
      status: 'active',
      addresses: [
        {
          id: 'addr3',
          type: 'Principale',
          address: '8 Avenue du Port',
          city: 'Brest',
          zipCode: '29200',
          isDefault: true
        }
      ],
      preferences: {
        newsletter: true,
        sms: true,
        emailNotifications: true,
        theme: 'default'
      }
    },
    {
      id: 'client3',
      name: 'Marie Leblanc',
      email: 'marie.leblanc@email.com',
      phone: '06 34 56 78 90',
      address: '22 Rue Victor Hugo',
      city: 'Vannes',
      zipCode: '56000',
      registeredDate: '2022-11-05',
      totalOrders: 24,
      totalSpent: 8200,
      loyaltyPoints: 8200,
      status: 'vip',
      addresses: [
        {
          id: 'addr4',
          type: 'Principale',
          address: '22 Rue Victor Hugo',
          city: 'Vannes',
          zipCode: '56000',
          isDefault: true
        }
      ],
      preferences: {
        newsletter: true,
        sms: false,
        emailNotifications: true,
        theme: 'purple'
      }
    }
  ],

  // RENDEZ-VOUS COMPLETS
  appointments: [
    {
      id: 'RDV-001',
      clientId: 'client1',
      clientName: 'Sophie Martin',
      service: 'Installation chaudiere',
      date: '2024-11-05',
      time: '14:00',
      duration: '3h',
      status: 'confirmed',
      technician: 'Marc Julien',
      address: '15 Rue de la Republique, 35000 Rennes',
      notes: 'Prevoir acces au local technique'
    },
    {
      id: 'RDV-002',
      clientId: 'client2',
      clientName: 'Jean Dupont',
      service: 'Reparation fuite',
      date: '2024-10-28',
      time: '10:00',
      duration: '2h',
      status: 'confirmed',
      technician: 'Marc Julien',
      address: '8 Avenue du Port, 29200 Brest',
      notes: 'Urgent'
    },
    {
      id: 'RDV-003',
      clientId: 'client3',
      clientName: 'Marie Leblanc',
      service: 'Diagnostic electrique',
      date: '2024-11-02',
      time: '09:00',
      duration: '2h30',
      status: 'pending',
      technician: 'A assigner',
      address: '22 Rue Victor Hugo, 56000 Vannes',
      notes: ''
    }
  ],

  // DEVIS COMPLETS
  quotes: [
    {
      id: 'DEV-2024-001',
      clientId: 'client1',
      clientName: 'Sophie Martin',
      email: 'sophie.martin@email.com',
      date: '2024-10-18',
      expiryDate: '2024-11-17',
      status: 'pending',
      statusLabel: 'En attente',
      items: [
        { serviceKey: 'vmc_double_flux', category: 'vmc', quantity: 1, price: 2800 }
      ],
      subtotal: 2800,
      tva: 560,
      deliveryFee: 40,
      discount: 0,
      total: 3400,
      notes: 'Installation complete avec reseau'
    },
    {
      id: 'DEV-2024-002',
      clientId: 'client2',
      clientName: 'Jean Dupont',
      email: 'jean.dupont@email.com',
      date: '2024-10-12',
      expiryDate: '2024-11-11',
      status: 'accepted',
      statusLabel: 'Accepte',
      items: [
        { serviceKey: 'douche_italienne', category: 'plomberie', quantity: 1, price: 2500 }
      ],
      subtotal: 2500,
      tva: 500,
      deliveryFee: 25,
      discount: 100,
      total: 2925,
      notes: 'Renovation complete salle de bain'
    }
  ],

  // FACTURES
  invoices: [
    {
      id: 'FACT-2024-001',
      orderId: 'CMD-2024-001',
      clientId: 'client1',
      clientName: 'Sophie Martin',
      date: '2024-10-20',
      dueDate: '2024-11-20',
      status: 'paid',
      statusLabel: 'Payee',
      amount: 217,
      paymentMethod: 'card',
      pdfUrl: '/invoices/FACT-2024-001.pdf'
    },
    {
      id: 'FACT-2024-002',
      orderId: 'CMD-2024-002',
      clientId: 'client2',
      clientName: 'Jean Dupont',
      date: '2024-10-18',
      dueDate: '2024-11-18',
      status: 'pending',
      statusLabel: 'En attente',
      amount: 184,
      paymentMethod: 'bank_transfer',
      pdfUrl: '/invoices/FACT-2024-002.pdf'
    }
  ],

  // NOTIFICATIONS
  notifications: [
    {
      id: 'notif1',
      userId: 'client1',
      type: 'order',
      title: 'Commande confirmee',
      message: 'Votre commande CMD-2024-001 a ete confirmee',
      date: '2024-10-20',
      read: true
    },
    {
      id: 'notif2',
      userId: 'client1',
      type: 'appointment',
      title: 'Rappel rendez-vous',
      message: 'Votre rendez-vous du 05/11 a 14h00',
      date: '2024-10-27',
      read: false
    },
    {
      id: 'notif3',
      userId: 'client1',
      type: 'loyalty',
      title: 'Points fidelite',
      message: 'Vous avez gagne 217 points !',
      date: '2024-10-20',
      read: false
    }
  ],

  // FAVORIS
  favorites: [
    {
      userId: 'client1',
      services: ['robinet_lavabo', 'entretien_chaudiere', 'prise_simple']
    }
  ],

  // PHOTOS CHANTIERS
  gallery: [
    {
      id: 'photo1',
      orderId: 'CMD-2024-001',
      url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a',
      caption: 'Salle de bain moderne',
      date: '2024-10-20',
      category: 'plomberie'
    }
  ]
};

export default mockData;
