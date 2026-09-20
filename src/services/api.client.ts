const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export interface CategoryDto {
  id: string;
  slug: string;
  name: string;
  display_order: number;
}

export interface MenuItemDto {
  id: string;
  category_id: string;
  slug: string;
  name: string;
  description: string | null;
  base_price: number;
  is_veg: boolean;
  image_path: string | null;
  is_available: boolean;
}

export interface OrderItemInput {
  productId?: string;
  variantId?: string;
  name: string;
  unitPrice: number;
  quantity: number;
}

export interface CreateOrderPayload {
  customerId?: string;
  orderType: 'DINE_IN' | 'TAKEAWAY' | 'DIRECT_DELIVERY' | 'PORTER';
  deliveryAddress?: string;
  deliveryDistanceKm?: number;
  specialInstructions?: string;
  paymentMode?: 'CASH' | 'UPI' | 'CREDIT';
  transactionRef?: string;
  items: OrderItemInput[];
}

export interface UpiConfigDto {
  upiId: string;
  accountName: string;
  qrUrl: string;
}

export async function fetchUpiConfig(): Promise<UpiConfigDto> {
  const res = await fetch(`${BACKEND_URL}/api/v1/config/upi`);
  if (!res.ok) {
    return {
      upiId: 'chaiwale@ptyes',
      accountName: 'Shubham Sharma',
      qrUrl: '/media/branding/qr/chaiwale-upi-qr.jpeg'
    };
  }
  const data = await res.json();
  return data.data;
}

export interface BrandConfigDto {
  brandName: string;
  tagline: string;
  whatsappNumber: string;
  phone: string;
  address: string;
  email: string;
  upiId: string;
  logoUrl: string;
}

export async function fetchBrandConfig(): Promise<BrandConfigDto> {
  const res = await fetch(`${BACKEND_URL}/api/v1/config/brand`).catch(() => null);
  if (!res || !res.ok) {
    return {
      brandName: 'Chaiwale',
      tagline: 'Sip, Bite, Repeat',
      whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919310112564',
      phone: '+91 93101 12564',
      address: 'Upper Ground Floor, Vardhman Grand Plaza, G-31, M2K Rd, Mangalam Place, Sector 03, Rohini, New Delhi, Delhi 110085',
      email: 'admin@chaiwale.co.in',
      upiId: 'chaiwale@ptyes',
      logoUrl: '/media/branding/logo/chaiwale-logo.jpeg'
    };
  }
  const data = await res.json();
  return data.data;
}

export interface CateringEnquiryPayload {
  customerName: string;
  phone: string;
  email?: string;
  companyName?: string;
  serviceType: 'OFFICE_LUNCH' | 'BHANDARA' | 'EVENT_BULK' | 'CUSTOM_EVENT';
  headcount: number;
  eventDate?: string;
  requirements?: string;
}

/**
 * Fetch active menu categories from central backend API
 */
export async function fetchCategories(): Promise<CategoryDto[]> {
  const res = await fetch(`${BACKEND_URL}/api/v1/menu/categories`);
  if (!res.ok) {
    throw new Error(`Failed to load categories: ${res.statusText}`);
  }
  const data = await res.json();
  return data.data || [];
}

/**
 * Fetch available menu items with optional category and search query
 */
export async function fetchMenuItems(categoryId?: string, search?: string): Promise<MenuItemDto[]> {
  const params = new URLSearchParams();
  if (categoryId && categoryId !== 'all') params.append('category_id', categoryId);
  if (search && search.trim()) params.append('search', search.trim());

  const url = `${BACKEND_URL}/api/v1/menu/items${params.toString() ? '?' + params.toString() : ''}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to load menu items: ${res.statusText}`);
  }
  const data = await res.json();
  return data.data || [];
}

/**
 * Submit order to backend for authoritative price verification and database creation
 */
export async function submitOrder(payload: CreateOrderPayload): Promise<{ id: string; orderNumber: string }> {
  const res = await fetch(`${BACKEND_URL}/api/v1/orders/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Failed to place order');
  }
  return data.data;
}

/**
 * Track order dispatch and kitchen preparation status
 */
export async function trackOrder(orderNumber: string): Promise<any> {
  const res = await fetch(`${BACKEND_URL}/api/v1/orders/track/${encodeURIComponent(orderNumber)}`);
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Order not found');
  }
  return data.data;
}

/**
 * Submit catering enquiry
 */
export async function submitCateringEnquiry(payload: CateringEnquiryPayload): Promise<{ id: string; leadNumber: string }> {
  const res = await fetch(`${BACKEND_URL}/api/v1/catering/enquire`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Failed to submit catering enquiry');
  }
  return data.data;
}
