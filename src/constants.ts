import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Nike Dunk Low Off White Lot 24',
    brand: 'Nike',
    price: 45599,
    image: 'https://marketplace.mainstreet.co.in/cdn/shop/files/Artboard_34_e6c50728-e958-4973-87fe-895e8f7e0535.png?v=1765541978',
    images: [
      'https://marketplace.mainstreet.co.in/cdn/shop/files/Artboard_34_e6c50728-e958-4973-87fe-895e8f7e0535.png?v=1765541978',
      'https://marketplace.mainstreet.co.in/cdn/shop/files/Artboard18_0376662b-c7f1-44e6-b4f6-a28a1d98fb99.png?v=1761557732'
    ],
    description: 'The Dunk Low Off-White Lot 24 combines Virgil Abloh signature deconstructed aesthetic with premium materials. Featuring a sail leather base, soft suede overlays, and vibrant orange accents, it is part of the exclusive series. The unique details and iconic zip-tie make this a collectors dream.',
    category: 'Collaborations',
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11']
  },
  {
    id: '2',
    name: 'Cloudtilt "Black Eclipse"',
    brand: 'ON Running',
    price: 18999,
    image: 'https://marketplace.mainstreet.co.in/cdn/shop/files/Artboard126_563a7ae6-3508-4837-816b-294092843bac.png?v=1761649715',
    images: [
      'https://marketplace.mainstreet.co.in/cdn/shop/files/Artboard126_563a7ae6-3508-4837-816b-294092843bac.png?v=1761649715'
    ],
    description: 'A collaboration between On and Loewe, the Cloudtilt features a precision-engineered midsole for ultra-lightweight cushioning.',
    category: 'Performance Luxury',
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10']
  },
  {
    id: '3',
    name: 'Samba OG "Iridescent Stripe"',
    brand: 'Adidas',
    price: 12999,
    image: 'https://marketplace.mainstreet.co.in/cdn/shop/files/Artboard117.png?v=1761644341',
    images: [
      'https://marketplace.mainstreet.co.in/cdn/shop/files/Artboard117.png?v=1761644341'
    ],
    description: 'The classic Samba OG returns with a modern twist, featuring iridescent stripes that catch the light from every angle.',
    category: 'Lifestyle',
    sizes: ['UK 4', 'UK 5', 'UK 6', 'UK 7', 'UK 8']
  },
  {
    id: '4',
    name: 'Air Jordan 1 Low "White Aluminum"',
    brand: 'Jordan',
    price: 15495,
    image: 'https://marketplace.mainstreet.co.in/cdn/shop/files/Artboard107_5177a997-e783-46f8-942d-914e6686033a.png?v=1761641642',
    images: [
      'https://marketplace.mainstreet.co.in/cdn/shop/files/Artboard107_5177a997-e783-46f8-942d-914e6686033a.png?v=1761641642'
    ],
    description: 'The Air Jordan 1 Low White Aluminum features a clean, two-tone colorway that brings a fresh perspective to the legendary silhouette.',
    category: 'Heritage',
    sizes: ['UK 5', 'UK 6', 'UK 7', 'UK 8']
  },
  {
    id: '5',
    name: 'Gazelle Indoor "Crystal White"',
    brand: 'Adidas',
    price: 13999,
    image: 'https://marketplace.mainstreet.co.in/cdn/shop/files/Artboard110.png?v=1761643049',
    images: [
      'https://marketplace.mainstreet.co.in/cdn/shop/files/Artboard110.png?v=1761643049'
    ],
    description: 'The Gazelle Indoor features a translucent gum sole and premium suede upper, staying true to its 1979 indoor soccer roots.',
    category: 'Terrace',
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10']
  },
  {
    id: '6',
    name: 'Yeezy Foam Runner "Onyx"',
    brand: 'Adidas',
    price: 16500,
    image: 'https://images.stockx.com/images/adidas-Yeezy-Foam-RNNR-Onyx-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&q=90&dpr=2&updated_at=1654444444',
    images: [
      'https://images.stockx.com/images/adidas-Yeezy-Foam-RNNR-Onyx-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&q=90&dpr=2&updated_at=1654444444'
    ],
    description: 'The Yeezy Foam Runner Onyx features a monochromatic dark grey finish on the futuristic slip-on silhouette.',
    category: 'Avant-Garde',
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11']
  }
];

export const BRANDS = ['Nike', 'Jordan', 'Adidas', 'New Balance', 'Yeezy'];
