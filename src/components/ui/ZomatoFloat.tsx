'use client';

/**
 * Re-exporting DeliveryAppsFloat for backward compatibility.
 * Replaces the single Zomato button with the unified 4-platform delivery tray (Zomato, Swiggy, Toing, Ownly by Rapido).
 */
import { DeliveryAppsFloat } from './DeliveryAppsFloat';

export { DeliveryAppsFloat };
export const ZomatoFloat = DeliveryAppsFloat;
export default DeliveryAppsFloat;
