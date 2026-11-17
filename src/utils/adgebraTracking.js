const ATTRIBUTION_STORAGE_KEY = "astrotring_adgebra_attribution";

/**
 * Returns the current Adgebra click attribution while it is within the
 * 30-day attribution window. Missing/expired tracking never blocks checkout.
 */
export const getAdgebraTrackingId = () => {
  if (typeof window === "undefined") return null;

  try {
    const stored = window.localStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (!stored) return null;

    const attribution = JSON.parse(stored);
    if (
      !attribution?.tracking_id ||
      !attribution?.expires_at ||
      Number(attribution.expires_at) < Date.now()
    ) {
      window.localStorage.removeItem(ATTRIBUTION_STORAGE_KEY);
      return null;
    }

    return String(attribution.tracking_id);
  } catch (error) {
    // Attribution is optional. A storage issue must not break order checkout.
    return null;
  }
};
