export interface Project {
  id: string;
  title: string;
  category: 'logic' | 'pixels';
  tags: string[];
  description: string;
  featured: boolean;
  link?: string;
  preview?: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'doompet',
    title: 'DOOMPET',
    category: 'logic',
    tags: ['FLUTTER', 'SQLITE', 'SUPABASE'],
    description: 'An offline-first financial tracking application featuring daily limits and a local storage architecture.',
    featured: true,
    link: 'https://github.com/dooms667/doompet',
    preview: '/assets/videos/doompet.mp4'
  },

  {
    id: 'pos-system',
    title: 'POS & INVENTORY SYSTEM',
    category: 'logic',
    tags: ['JAVA', 'NETBEANS', 'MYSQL'],
    description: 'Desktop Point of Sale system for SMKS Persada Husada Indonesia, featuring a food pre-order module.',
    featured: true,
    link: 'https://github.com/dooms667/POS-SMK',
    preview: '/assets/videos/posphi.mp4',
  },

  {
    id: 'dovault-manager',
    title: 'DOVAULT - PASSWORD MANAGER',
    category: 'logic',
    tags: ['FLUTTER', 'SQLITE', 'LOCAL-FIRST'],
    description: 'A local-first, offline password manager for Android. Built with Flutter.',
    featured: false,
    link: 'https://github.com/dooms667/dovault',
  },

  {
    id: 'zine-kehancuran',
    title: 'KEHANCURAN NGASAL',
    category: 'pixels',
    tags: ['ZINE', 'SELF-PUBLISHED', 'PRINT'],
    description: 'A black-and-white zine about grief, anxiety and the stresses of everyday life printed in monochrome.',
    featured: true,
    link: 'https://www.instagram.com/p/DfSsPfkkx9P/?img_index=1',
    preview: '/assets/videos/zine-kehancuran.mp4'
  },

  {
    id: 'napak-tanah',
    title: 'NAPAK TANAH WOK!',
    category: 'pixels',
    tags: ['POSTER', 'TIPOGRAFI', 'POP'],
    description: 'Conceptual illustration set against a contrasting red background, framing a plated dish surrounded by flames. It carries a narrative about grounding ideas, social realism, and the fiery energy of local cultural roots.',
    featured: true,
    link: 'https://www.instagram.com/p/DekmvToEzYP/?img_index=1',
    preview: '/assets/images/napak-tanah.png',
  },

  {
    id: 'sori-ye',
    title: 'SORI YE!',
    category: 'pixels',
    tags: ['POSTER', 'VECTOR', 'POLITICAL'],
    description: 'A political and pop-culture satire piece featuring an iconic figure framed by roaring flames and signature speech bubbles, blending vintage comic book aesthetics with acute contemporary critique.',
    featured: false,
    link: 'https://www.instagram.com/p/Ddn8zkcGHz7/?img_index=1',
    preview: '/assets/images/soriye.png',
  },

  {
    id: 'akarkarsa',
    title: 'Akarkarsa Visual Identity',
    category: 'pixels',
    tags: ['BRANDING', 'EMROIDERY', 'VISUAL IDENTITY'],
    description: 'Visual identity and embroidered emblem design for the Akarkarsa organization. Featuring a sapling illustration embraced by two hands in a deep blue and forest green palette, symbolizing sustainable growth, environmental care, and grassroots collaboration.',
    featured: false,
    link: 'http://localhost:3000/gakada',
    preview: '/assets/images/akarkarsa.png',
  },

  {
    id: 'makan-tai',
    title: 'MAKAN T*I!',
    category: 'pixels',
    tags: ['LYRICAL', 'SATIRE', 'ILLUSTRATION'],
    description: 'A bold, provocative satirical illustration combining vibrant red typography with expressive character design to deliver a sharp yet humorous social commentary.',
    featured: false,
    link: 'https://www.instagram.com/p/C_ueAefy53y/',
    preview: '/assets/images/makantai.webp',
  },

  {
    id: 'mulai-sekarang',
    title: 'MULAI SEKARANG',
    category: 'pixels',
    tags: ['TIPOGRAFI', 'HINDIA', 'LYRICAL'],
    description: 'Street-style hand-lettered typography exploration set in a monochromatic blue palette, inspired by the lyric lines of Hindia song "Satu Hari Lagi". This piece merges fluid text flow with an introspective mindset to evoke personal urgency and self-reflection.',
    featured: false,
    link: 'https://www.instagram.com/p/C7wTvncSjdd/',
    preview: '/assets/images/mulaisekarang.jpg',
  },

  {
    id: 'siksa-kubur',
    title: 'SIKSA KUBUR',
    category: 'pixels',
    tags: ['MOVIE POSTER', 'DARK ART', 'HORROR'],
    description: 'An alternative cinematic poster design using a tense, dark-red monotone palette. It highlights psychological tension and fragmented character visuals to capture an intimate, grim horror atmosphere. (Approved by Joko Anwar himself.)',
    featured: false,
    link: 'https://www.instagram.com/p/C6JBTPZLS22/?img_index=1',
    preview: '/assets/images/siksakubur.webp',
  },

  {
    id: 'doom-scrolling',
    title: 'IN THE PALM OF OUR HAND',
    category: 'pixels',
    tags: ['ILLUSTRATION', 'RETRO POP', 'GRAPHIC DESIGN'],
    description: 'An illustration centered around the relationship between humanity and modern digital technology. Depicting a figure surrounded by gadgets and global connectivity within a retro-pop streetwear archive color palette, highlighting how our world rests in the palms of the digital age.',
    featured: false,
    link: 'https://www.instagram.com/p/DbOB1vkGPGi/?img_index=1',
    preview: '/assets/images/theworlds.jpg',
  },

  {
    id: 'amoliva',
    title: 'AMOLIVA - Product Branding',
    category: 'pixels',
    tags: ['ART DIRECTION', 'PRODUCT BRANDING', 'CAMPAIGN VISUAL'],
    description: 'Atmospheric product visual for Amoliva, a natural hair oil venture formulated with pumpkin seed oil and an eight-spices blend. Serving as the Art Director, this piece explores a moody, cinematic aesthetic with soft, diffused lighting to evoke natural care, organic purity, and an intimate sensory experience.',
    featured: false,
    link: 'https://www.instagram.com/p/DZejGQPO0JN/',
    preview: '/assets/videos/amoliva.mp4',
  },
  
  {
    id: 'whiplash',
    title: 'WHIPLASH',
    category: 'pixels',
    tags: ['EDITORIAL DESIGN', 'POSTER', 'MOTION GRAPHIC'],
    description: 'A conceptual editorial poster study inspired by the intense psychological drama Whiplash. Emphasizing bold typography, high-contrast monochrome tones, and raw emotional expressions to capture the grit, pressure, and relentless pursuit of perfection.',
    featured: false,
    link: 'https://www.instagram.com/p/C3xXUhdrC1s/?img_index=1',
    preview: '/assets/videos/whiplash.mp4',
  },
];