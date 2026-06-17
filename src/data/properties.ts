/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import luxuryHeroVilla from '../assets/images/luxury_hero_villa_1781657129005.jpg';

export interface Agent {
  id: string;
  name: string;
  role: string;
  image: string;
  phone: string;
  email: string;
  rating: number;
  experience: string;
}

export interface VirtualTourHotspot {
  label: string;
  targetRoomId: string;
  x: number; // percentage coordinate 0-100 from left
  y: number; // percentage coordinate 0-100 from top
}

export interface VirtualTourRoom {
  id: string;
  name: string;
  image: string;
  hotspots: VirtualTourHotspot[];
}

export interface VirtualTourData {
  rooms: VirtualTourRoom[];
  videoUrl: string; // HD video walkthrough simulated url
  narrative: string[]; // step-by-step commentary text for HD walkthrough
  ambientAudio: 'ocean' | 'city' | 'forest' | 'fireplace' | 'lounge';
}

export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  badge: 'Exclusive' | 'New Listing' | 'Under Contract' | 'Price Upon Request';
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  gallery: string[];
  description: string;
  type: 'Villa' | 'Penthouse' | 'Mansion' | 'Chalet' | 'Estate';
  purpose: 'Buy' | 'Rent';
  lifestyle: string[];
  agentId: string;
  yearBuilt: number;
  virtualTour: VirtualTourData;
}

export const AGENTS: Agent[] = [
  {
    id: 'agent-1',
    name: 'Eleanor Vance',
    role: 'Principal Partner & Private Advisor',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600',
    phone: '+1 (310) 555-0190',
    email: 'eleanor@maisonelite.com',
    rating: 5.0,
    experience: '14 Years'
  },
  {
    id: 'agent-2',
    name: 'Julian Montgomery',
    role: 'Global Luxury Investment Specialist',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600',
    phone: '+1 (310) 555-0144',
    email: 'julian@maisonelite.com',
    rating: 4.9,
    experience: '11 Years'
  },
  {
    id: 'agent-3',
    name: 'Sienna Sterling',
    role: 'Director of International Estates',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600',
    phone: '+1 (310) 555-0177',
    email: 'sienna@maisonelite.com',
    rating: 5.0,
    experience: '9 Years'
  }
];

export const PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    title: 'The Overlook Estate',
    location: 'Malibu, California',
    price: 32500000,
    badge: 'Exclusive',
    beds: 6,
    baths: 8,
    sqft: 11400,
    image: luxuryHeroVilla,
    gallery: [
      luxuryHeroVilla,
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200'
    ],
    description: 'Suspended dramatically over the Pacific on a private Malibu peninsula, The Overlook Estate represents the pinnacle of Californian modern architectural design. Conceived by award-winning architects, this glass and structural concrete marvel offers true 270-degree floor-to-ceiling ocean views, a magnificent 100-foot infinity pool that merges with the horizon, a customized subterranean wellness center, state-of-the-art home-theater cave, and a professional-grade private chef kitchen. Fully integrated Smart-home automation controls climate, safety, and sensory media across all levels.',
    type: 'Villa',
    purpose: 'Buy',
    lifestyle: ['Oceanfront', 'Subterranean Spa', 'Infinity Pool', 'Private Helipad', '1000-Bottle Wine Room'],
    agentId: 'agent-1',
    yearBuilt: 2024,
    virtualTour: {
      ambientAudio: 'ocean',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-luxury-resort-with-swimming-pool-41584-large.mp4',
      narrative: [
        'Hovering over the rugged Malibu cliffs, we begin with a wide cinematic sweep of The Overlook Estate outline.',
        'We transition to the grand entry atrium, where double-height sliding glass walls frames a limitless ocean horizon.',
        'Sailing quiet above the 100-foot custom infinity pool, the water mirrors the shifting Californian sunset.',
        'Entering the subterranean master retreat, private wellness hydro-tubs and Calacatta marble elements emerge.'
      ],
      rooms: [
        {
          id: 'foyer',
          name: 'Grand Entrance Foyer',
          image: luxuryHeroVilla,
          hotspots: [
            { label: 'Walk to Great Room', targetRoomId: 'living', x: 75, y: 55 },
            { label: 'Step Outer Infinity Pool', targetRoomId: 'pool', x: 25, y: 65 }
          ]
        },
        {
          id: 'living',
          name: 'Oceanfront Great Room',
          image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200',
          hotspots: [
            { label: 'Return to Foyer', targetRoomId: 'foyer', x: 15, y: 65 },
            { label: 'Enter Master Suite', targetRoomId: 'suite', x: 80, y: 60 }
          ]
        },
        {
          id: 'pool',
          name: '100-Foot Infinity Pool Deck',
          image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200',
          hotspots: [
            { label: 'Return to Foyer', targetRoomId: 'foyer', x: 45, y: 40 },
            { label: 'Enter Great Room', targetRoomId: 'living', x: 75, y: 50 }
          ]
        },
        {
          id: 'suite',
          name: 'Owner’s Bed Suite',
          image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200',
          hotspots: [
            { label: 'Walk to Great Room', targetRoomId: 'living', x: 20, y: 55 }
          ]
        }
      ]
    }
  },
  {
    id: 'prop-2',
    title: 'The Amethyst Sky Penthouse',
    location: 'Park Avenue, New York',
    price: 24500000,
    badge: 'New Listing',
    beds: 4,
    baths: 4.5,
    sqft: 6800,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200'
    ],
    description: 'Governing the New York City skyline from a premier high-rise on Park Avenue, this duplex sky-mansion encapsulates modern architectural luxury. Every angle showcases breathtaking Central Park and Manhattan skyline views through soaring double-height 22-foot glass walls. Featuring bespoke Italian white-calacatta marble flooring, hand-crafted bronze staircases, a private terrace sky garden with an outdoor fireplace, and direct elevator entry with multi-tiered security, this is a masterpiece elevated above the world.',
    type: 'Penthouse',
    purpose: 'Buy',
    lifestyle: ['Central Park Views', 'Private Elevator', '22ft Soaring Ceiling', 'Sky Terrace', '24/7 Concierge Service'],
    agentId: 'agent-2',
    yearBuilt: 2023,
    virtualTour: {
      ambientAudio: 'city',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-with-beautiful-light-42407-large.mp4',
      narrative: [
        'We lift off right over Central Park, shifting our gaze to the striking crown duplex on Park Avenue.',
        'Stepping out of the keycard elevator, you stand in the dramatic, glass double-height entry lobby.',
        'We glide through the grand salon, observing customized brass accents mirroring the Manhattan skyline.',
        'Finally, we venture onto the private terrace patio to enjoy the golden sunset reflecting off iconic high-rises.'
      ],
      rooms: [
        {
          id: 'lobby',
          name: 'Direct Elevator Entry Lobby',
          image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200',
          hotspots: [
            { label: 'Walk into Grand Salon', targetRoomId: 'salon', x: 50, y: 60 }
          ]
        },
        {
          id: 'salon',
          name: 'Double-Height Grand Salon',
          image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200',
          hotspots: [
            { label: 'Walk to Private Lobby', targetRoomId: 'lobby', x: 15, y: 70 },
            { label: 'Inspect Chef’s Kitchen', targetRoomId: 'kitchen', x: 80, y: 60 }
          ]
        },
        {
          id: 'kitchen',
          name: 'Calacatta Culinary Core',
          image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200',
          hotspots: [
            { label: 'Walk to Grand Salon', targetRoomId: 'salon', x: 20, y: 65 },
            { label: 'Step Out to Sky Terrace', targetRoomId: 'terrace', x: 75, y: 50 }
          ]
        },
        {
          id: 'terrace',
          name: 'Panoramic Sky Terrace',
          image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200',
          hotspots: [
            { label: 'Re-enter Chef’s Kitchen', targetRoomId: 'kitchen', x: 35, y: 45 }
          ]
        }
      ]
    }
  },
  {
    id: 'prop-3',
    title: 'La Cerulean Cove',
    location: 'Saint-Jean-Cap-Ferrat, France',
    price: 45000000,
    badge: 'Price Upon Request',
    beds: 7,
    baths: 9,
    sqft: 14200,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1200',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?q=80&w=1200',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200'
    ],
    description: 'Commanding a premier direct waterfront cliffside on Saint-Jean-Cap-Ferrat, La Cerulean Cove represents architectural high-art. Inspired by superyacht aesthetics, the villa boasts sweeping curvilinear glass walls, limestone terraces, and a private natural cove beach. Complete with a direct elevator from the cliff deck down to private deepwater yacht docks, an outdoor glass-sided pool, fully landscaped tropical olive gardens, and private guest wings, it is the crown jewel of the French Riviera.',
    type: 'Estate',
    purpose: 'Buy',
    lifestyle: ['Deepwater Yacht Dock', 'Private Pier', 'Guest House Pavilion', 'Seawater Glass Pool', 'Mediterranean Olive Gardens'],
    agentId: 'agent-3',
    yearBuilt: 2022,
    virtualTour: {
      ambientAudio: 'ocean',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-luxury-mansion-with-pool-and-surrounding-41857-large.mp4',
      narrative: [
        'Anchored on the Saint-Jean-Cap-Ferrat shoreline, we approach the villa from the Mediterranean waves.',
        'Standing on the open limestone terrace, the refreshing seawater breeze flows around custom glass arches.',
        'Passing inside, the state-of-the-art dining salon pairs custom French art with pristine oceanic views.',
        'A glass lift whisks us down to the private deepwater dock, ready to host custom luxury superyachts.'
      ],
      rooms: [
        {
          id: 'shore',
          name: 'Direct Waterfront View',
          image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200',
          hotspots: [
            { label: 'Walk to Limestone Terrace', targetRoomId: 'patio', x: 50, y: 45 }
          ]
        },
        {
          id: 'patio',
          name: 'Limestone Ocean Terrace',
          image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1200',
          hotspots: [
            { label: 'Return to Shore Desk', targetRoomId: 'shore', x: 20, y: 75 },
            { label: 'Enter Mediterranean Dining', targetRoomId: 'dining', x: 75, y: 60 }
          ]
        },
        {
          id: 'dining',
          name: 'High-Art Dining Salon',
          image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?q=80&w=1200',
          hotspots: [
            { label: 'Walk out to Terrace', targetRoomId: 'patio', x: 15, y: 65 },
            { label: 'Inspect Seawater Glass Pool', targetRoomId: 'pool', x: 80, y: 55 }
          ]
        },
        {
          id: 'pool',
          name: 'Seawater Glass Pool Deck',
          image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200',
          hotspots: [
            { label: 'Return to Dining Salon', targetRoomId: 'dining', x: 30, y: 45 }
          ]
        }
      ]
    }
  },
  {
    id: 'prop-4',
    title: 'The Obsidian Chalet',
    location: 'Zermatt, Switzerland',
    price: 85000,
    badge: 'Exclusive',
    beds: 5,
    baths: 6,
    sqft: 7500,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200'
    ],
    description: 'An elite, modern alpine escape presenting direct, unobstructed views of the timeless Matterhorn. The Obsidian Chalet is sculpted with dark native wood, locally quarried granite slabs, and vast high-thermal glass panels. Relax near the massive double-sided floating fireplace or submerge in the indoor-to-outdoor heated hydro-spa pool. Includes ski-in/ski-out privilege, a complete private sensory cinema, an internal glass lift, and dynamic Michelin-star qualified private culinary service.',
    type: 'Chalet',
    purpose: 'Rent',
    lifestyle: ['Ski-In/Ski-Out Privileges', 'Matterhorn Peak Views', 'Heated Indoor/Outdoor Hydro-pool', 'Subterranean Spa & Hammam', 'Ski Butler Lounge'],
    agentId: 'agent-1',
    yearBuilt: 2023,
    virtualTour: {
      ambientAudio: 'fireplace',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-cozy-hotel-room-with-wooden-themed-interior-and-fireplace-43285-large.mp4',
      narrative: [
        'Nestled deep in the snow-draped peaks of Zermatt, we soar above the sleek dark structural lines of the chalet.',
        'Standing in the expansive grand common, a majestic suspended crackling fireplace warms the space.',
        'Warm lights guide us to the subterranean wellness retreat, featuring real hydro-spa pools cascading outside into snow.'
      ],
      rooms: [
        {
          id: 'main',
          name: 'The Matterhorn Common',
          image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200',
          hotspots: [
            { label: 'Walk to Floating Fireplace', targetRoomId: 'fireplace', x: 65, y: 55 }
          ]
        },
        {
          id: 'fireplace',
          name: 'Bespoke Granite Hearth',
          image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200',
          hotspots: [
            { label: 'Return to Common Area', targetRoomId: 'main', x: 20, y: 70 },
            { label: 'Elevate to Alpine Hydro-Spa', targetRoomId: 'spa', x: 80, y: 60 }
          ]
        },
        {
          id: 'spa',
          name: 'Subterranean Thermal Spa',
          image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200',
          hotspots: [
            { label: 'Take Internal Lift to Hearth', targetRoomId: 'fireplace', x: 45, y: 40 }
          ]
        }
      ]
    }
  },
  {
    id: 'prop-5',
    title: 'Verve Desert Sanctuary',
    location: 'Palm Springs, California',
    price: 18900000,
    badge: 'Under Contract',
    beds: 5,
    baths: 5,
    sqft: 8200,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200'
    ],
    description: 'Conceived as an elegant natural extension of the rugged Mojave desert floor, Verve Desert Sanctuary blends mid-century modern heritage with pristine futuristic design. Massive sliding pocket doors dissolve the boundaries between the high-end concrete architectural living space and the outdoor sand-stone pool deck. Equipped with an architectural sunken outdoor fire pit lounge, private tennis court, bespoke native xeriscaping, and off-grid solar-storing battery technology, it is a sustainable paradise.',
    type: 'Mansion',
    purpose: 'Buy',
    lifestyle: ['Sunken Lounge Fire Pit', 'Ultra-Private Plot', 'Championship Tennis Court', 'Solar Microgrid Ready', 'Infinity Wellness Pool'],
    agentId: 'agent-2',
    yearBuilt: 2024,
    virtualTour: {
      ambientAudio: 'forest',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-suburban-house-with-a-pool-and-sun-beds-41585-large.mp4',
      narrative: [
        'Sweeping through the majestic Palms, we reveal the sustainable futuristic sanctuary blending with local sands.',
        'Sliding pocket doors open completely to draw the calm desert wind into customizable limestone lounges.',
        'We hover at the sandstone pool deck, highlighting the sunken geometric open firepit for dusk gatherings.'
      ],
      rooms: [
        {
          id: 'oasis',
          name: 'Palm Entry Oasis',
          image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200',
          hotspots: [
            { label: 'Walk inside to Lounge', targetRoomId: 'lounge', x: 60, y: 55 }
          ]
        },
        {
          id: 'lounge',
          name: 'The Obsidian Desert Lounge',
          image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200',
          hotspots: [
            { label: 'Return to Palm Entry', targetRoomId: 'oasis', x: 20, y: 65 },
            { label: 'Step to Sandstone Patio', targetRoomId: 'patio', x: 80, y: 55 }
          ]
        },
        {
          id: 'patio',
          name: 'Sandstone Patio & Firepit',
          image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200',
          hotspots: [
            { label: 'Return into Lounge', targetRoomId: 'lounge', x: 45, y: 50 }
          ]
        }
      ]
    }
  },
  {
    id: 'prop-6',
    title: 'The Sovereign Pavilion',
    location: 'Bel Air, California',
    price: 120000,
    badge: 'Exclusive',
    beds: 8,
    baths: 11,
    sqft: 21000,
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200'
    ],
    description: 'Laid across three magnificent flat acres in the heart of Bel Air, The Sovereign Pavilion is a mega-estate of unparalleled caliber. Entering through grand 18-foot tall security gates, customers are greeted by a striking grand water-fountain motor court. The property features a indoor-outdoor 12-seat Teppanyaki dining deck, 50-car subterranean auto gallery, full-circuit organic health spa with a cold-plunge and Finnish cedar sauna, dual Olympic-length swimming pools, and a dedicated high-security panic pavilion.',
    type: 'Mansion',
    purpose: 'Rent',
    lifestyle: ['50-Vehicle Auto Gallery', 'Teppanyaki Dining Deck', 'Twin Olympic Pools', 'Personal Wellness circuit', 'Gated 3-Acre Sanctuary'],
    agentId: 'agent-3',
    yearBuilt: 2025,
    virtualTour: {
      ambientAudio: 'lounge',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-mansion-with-large-outdoor-pool-at-sunset-41581-large.mp4',
      narrative: [
        'Approaching the towering gates of Bel Air, we sweep down the dramatic illuminated motor court fountain.',
        'Gliding into the grand double dining parlor, custom European crystal highlights luxurious velvet walls.',
        'Standing at the twin Olympic pools, the custom underwater lightscapes sync with the starry Bel Air sky.'
      ],
      rooms: [
        {
          id: 'fountain',
          name: 'Grand Fountain Court',
          image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200',
          hotspots: [
            { label: 'Enter Dining Pavilion', targetRoomId: 'dining', x: 65, y: 50 }
          ]
        },
        {
          id: 'dining',
          name: 'Interactive Dining Pavilion',
          image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200',
          hotspots: [
            { label: 'Walk out to Fountain', targetRoomId: 'fountain', x: 15, y: 70 },
            { label: 'Step to Twin Olympic Pools', targetRoomId: 'pool', x: 80, y: 60 }
          ]
        },
        {
          id: 'pool',
          name: 'Twin Olympic Pools Deck',
          image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200',
          hotspots: [
            { label: 'Walk to Master Lounge', targetRoomId: 'lounge', x: 75, y: 55 },
            { label: 'Return to Dining Salon', targetRoomId: 'dining', x: 25, y: 45 }
          ]
        },
        {
          id: 'lounge',
          name: 'The Sovereign Master Lounge',
          image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200',
          hotspots: [
            { label: 'Return to Olympic Pool', targetRoomId: 'pool', x: 30, y: 65 }
          ]
        }
      ]
    }
  }
];

export const TESTIMONIALS = [
  {
    quote: "Maison Elite transcended our expectations of what a luxury advisory should be. Julian's understanding of global architectural design and finance allowed us to acquire our Saint-Jean-Cap-Ferrat cove listing completely off-market, safely and privately.",
    author: "Maximilian & Clara Roth",
    title: "International Venture Partners",
    rating: 5
  },
  {
    quote: "Reaching out to Eleanor for our penthouse acquisition in Manhattan was the best real estate decision we made. Her discretion, uncompromising standard of operational speed, and exclusive network are truly unmatched.",
    author: "Dr. Alistair Sterling",
    title: "Chairman, Sterling BioMed",
    rating: 5
  },
  {
    quote: "Maison's team behaves less like salespeople and more like private wealth, art curatorial consultancies. They understood exactly our aesthetic values and brought us only masterpieces.",
    author: "Yasmine El-Amin",
    title: "Art Curator & Philanthropist",
    rating: 5
  }
];

export const GALLERY_ITEMS = [
  {
    id: 'gal-1',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=600',
    title: 'Architectural Details',
    category: 'Interiors'
  },
  {
    id: 'gal-2',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=600',
    title: 'Matterhorn Chalet Spa',
    category: 'Wellness'
  },
  {
    id: 'gal-3',
    image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?q=80&w=600',
    title: 'Minimalist Diners',
    category: 'Culinary'
  },
  {
    id: 'gal-4',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=600',
    title: 'Infinity Ocean Merges',
    category: 'Outdoor'
  },
  {
    id: 'gal-5',
    image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=600',
    title: 'Bronze Master Staircase',
    category: 'Interiors'
  },
  {
    id: 'gal-6',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=600',
    title: 'Palm Springs xeriscaping',
    category: 'Landscape'
  }
];
