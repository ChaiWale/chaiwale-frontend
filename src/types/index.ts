export interface MenuItemSummary {
  id: string;
  name: string;
  category: string;
  price: number;
}

export interface OrderStatusSummary {
  orderId: string;
  status: string;
  placedAt: string;
}

export interface QuoteRequestInput {
  customerName: string;
  phone: string;
  email?: string;
  eventType: 'OFFICE_LUNCH' | 'BHANDARA' | 'CORPORATE_EVENT' | 'OTHER';
  estimatedGuestCount: number;
  notes?: string;
}
