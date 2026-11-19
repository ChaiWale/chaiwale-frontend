export interface DeliveryPartner {
  id: 'zomato' | 'swiggy' | 'toing' | 'ownly';
  name: string;
  displayName: string;
  tagline: string;
  url: string;
  logo: string;
  brandColor: string;
  hoverColor: string;
  lightBg: string;
  borderColor: string;
  badge?: string;
}

export const DELIVERY_PARTNERS: DeliveryPartner[] = [
  {
    id: 'zomato',
    name: 'Zomato',
    displayName: 'Zomato',
    tagline: 'Live tracking & great offers',
    url: 'https://zomato.onelink.me/xqzv/zmfs3x6y',
    logo: '/assets/delivery-partners/zomato.png',
    brandColor: '#E23744',
    hoverColor: '#CB202D',
    lightBg: '#FFF5F5',
    borderColor: '#FBC7C9',
    badge: 'Popular'
  },
  {
    id: 'swiggy',
    name: 'Swiggy',
    displayName: 'Swiggy',
    tagline: 'Lightning fast doorstep delivery',
    url: 'https://www.swiggy.com/menu/1476567?source=sharing',
    logo: '/assets/delivery-partners/swiggy.png',
    brandColor: '#FC8019',
    hoverColor: '#E06D0E',
    lightBg: '#FFF7ED',
    borderColor: '#FED7AA',
    badge: 'Fastest'
  },
  {
    id: 'toing',
    name: 'Toing',
    displayName: 'Toing',
    tagline: 'Everyday lowest menu prices',
    url: 'https://www.toingit.com/menu/1476567',
    logo: '/assets/delivery-partners/toing.png',
    brandColor: '#00873E',
    hoverColor: '#006B32',
    lightBg: '#F0FDF4',
    borderColor: '#BBF7D0',
    badge: 'Best Value'
  },
  {
    id: 'ownly',
    name: 'Ownly by Rapido',
    displayName: 'Ownly by Rapido',
    tagline: 'Zero commission food delivery',
    url: 'https://ownly.food/app/brand/BR505023',
    logo: '/assets/delivery-partners/ownly.jpg',
    brandColor: '#E81075',
    hoverColor: '#C40A61',
    lightBg: '#FDF2F8',
    borderColor: '#FBCFE8',
    badge: 'Zero Fee'
  }
];
