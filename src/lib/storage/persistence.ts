/**
 * Benta's Funeral Home (BFH OS) Persistence Engine
 * Provides offline-first resilient storage with automated hydration and fallback to initial mock data.
 */

export const STORAGE_KEYS = {
  CASES: 'bfh_cases_v3',
  DIRECTORS: 'bfh_directors_v3',
  DIRECTOR_PROFILES: 'bfh_directors_v3',
  ASSIGNMENTS: 'bfh_service_assignments_v3',
  SERVICE_ASSIGNMENTS: 'bfh_service_assignments_v3',
  VOUCHERS: 'bfh_1099_vouchers_v3',
  CALENDAR_EVENTS: 'bfh_calendar_events_v3',
  LIVERY_HOLDS: 'bfh_livery_holds_v3',
  SERVICE_PARTNERS: 'bfh_service_partners_v3',
  PARTNER_REQUESTS: 'bfh_partner_requests_v3',
  MANAGER_AUTH: 'bfh_manager_auth_session',
  MANAGER_PIN: 'bfh_custom_manager_pin',
  NOTIFICATIONS: 'bfh_notifications_v3',
  TWILIO_GATEWAY_CONFIG: 'bfh_twilio_gateway_config'
};

export function loadPersistedState<T>(key: string, fallbackDefault: T): T {
  if (typeof window === 'undefined') return fallbackDefault;
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallbackDefault;
    return JSON.parse(item) as T;
  } catch (error) {
    console.warn(`[BFH Persistence] Failed to load key "${key}", using defaults:`, error);
    return fallbackDefault;
  }
}

export function savePersistedState<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`[BFH Persistence] Failed to save key "${key}":`, error);
  }
}

export function clearAllPersistedDemoData(): void {
  if (typeof window === 'undefined') return;
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    console.log('[BFH Persistence] Demo storage reset to factory default state.');
  } catch (error) {
    console.error('[BFH Persistence] Error resetting storage:', error);
  }
}
