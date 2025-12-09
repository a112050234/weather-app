import { City } from './types';

// Using high-quality Unsplash source images for the "Vibe"
export const CITIES: City[] = [
  {
    name: 'Taipei',
    lat: 25.0330,
    lng: 121.5654,
    imageUrl: 'https://images.unsplash.com/photo-1590326075908-11f2d650742d?q=80&w=1000&auto=format&fit=crop',
    country: 'Taiwan'
  },
  {
    name: 'Tokyo',
    lat: 35.6762,
    lng: 139.6503,
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1000&auto=format&fit=crop',
    country: 'Japan'
  },
  {
    name: 'New York',
    lat: 40.7128,
    lng: -74.0060,
    imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1000&auto=format&fit=crop',
    country: 'USA'
  },
  {
    name: 'London',
    lat: 51.5074,
    lng: -0.1278,
    imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1000&auto=format&fit=crop',
    country: 'UK'
  },
  {
    name: 'Paris',
    lat: 48.8566,
    lng: 2.3522,
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1000&auto=format&fit=crop',
    country: 'France'
  },
  {
    name: 'Sydney',
    lat: -33.8688,
    lng: 151.2093,
    imageUrl: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1000&auto=format&fit=crop',
    country: 'Australia'
  }
];

export const INITIAL_CITY = CITIES[0];