import Cookies from 'js-cookie';

const COOKIE_KEYS = {
  PREFERENCES: 'user_preferences',
  CONSENT: 'cookies_accepted'
};

const DEFAULT_PREFERENCES = {
  language: 'en',
  theme: 'light',
  favoriteNumber: 7
};

// Add user-specific cookie handling
const getUserSpecificKey = (baseKey, userId) => {
  return userId ? `${baseKey}_${userId}` : baseKey;
};

// Returns true if cookies are explicitly accepted, false if explicitly rejected, undefined if never set
export const getCookieConsent = (userId = null) => {
  const consentKey = getUserSpecificKey(COOKIE_KEYS.CONSENT, userId);
  const consentValue = Cookies.get(consentKey);
  
  if (consentValue === undefined) {
    return undefined;
  }
  return consentValue === 'true';
};

export const setCookieConsent = (accepted, userId = null) => {
  const consentKey = getUserSpecificKey(COOKIE_KEYS.CONSENT, userId);
  Cookies.set(consentKey, accepted.toString(), { expires: 365 });
};

export const getPreferences = (userId = null) => {
  const preferencesKey = getUserSpecificKey(COOKIE_KEYS.PREFERENCES, userId);
  const preferencesStr = Cookies.get(preferencesKey);
  
  if (!preferencesStr) return DEFAULT_PREFERENCES;
  
  try {
    return JSON.parse(preferencesStr);
  } catch (e) {
    console.error('Error parsing preferences:', e);
    return DEFAULT_PREFERENCES;
  }
};

export const savePreferences = (preferences, userId = null) => {
  const preferencesKey = getUserSpecificKey(COOKIE_KEYS.PREFERENCES, userId);
  Cookies.set(preferencesKey, JSON.stringify(preferences), { expires: 30 });
};

export const clearPreferences = (userId = null) => {
  const preferencesKey = getUserSpecificKey(COOKIE_KEYS.PREFERENCES, userId);
  const consentKey = getUserSpecificKey(COOKIE_KEYS.CONSENT, userId);
  
  Cookies.remove(preferencesKey);
  Cookies.remove(consentKey);
};