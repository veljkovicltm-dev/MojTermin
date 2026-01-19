import { Business } from './types';

export const MOCK_BUSINESSES: Business[] = [
  {
    id: '1',
    name: 'Salon Lepote "Aura"',
    category: 'Kozmetički saloni',
    city: 'Beograd',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?q=80&w=800&auto=format&fit=crop',
    address: 'Knez Mihailova 12',
    description: 'Vrhunska nega lica i tela.',
    staff: [
      { id: 'st1', name: 'Ana Jovanović', role: 'Kozmetičar', avatar: 'https://i.pravatar.cc/150?u=st1' },
      { id: 'st2', name: 'Jovana Lukić', role: 'Tehničar', avatar: 'https://i.pravatar.cc/150?u=st2' }
    ],
    services: [
      { id: 's1', name: 'Manikir', duration: 45, price: 1500, description: 'Klasičan manikir.' },
      { id: 's2', name: 'Tretman Lica', duration: 60, price: 3500, description: 'Hidratacija.' }
    ]
  },
  {
    id: '2',
    name: 'Titan Gym',
    category: 'Fitness i teretana',
    city: 'Novi Sad',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop',
    address: 'Bulevar Oslobođenja 45',
    description: 'Najmodernija oprema u gradu.',
    staff: [{ id: 'st3', name: 'Marko Nikolić', role: 'Trener', avatar: 'https://i.pravatar.cc/150?u=st3' }],
    services: [{ id: 's3', name: 'Personalni Trening', duration: 60, price: 2000, description: '1 na 1 trening.' }]
  }
];