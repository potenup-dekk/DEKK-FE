interface DataLayerTarget {
  dataLayer?: unknown[];
}

const trackGtmEvent = (eventName: string, params?: Record<string, unknown>) => {
  if (typeof window === "undefined") {
    return;
  }

  const target = window as Window & DataLayerTarget;

  if (!Array.isArray(target.dataLayer)) {
    target.dataLayer = [];
  }

  target.dataLayer.push({
    event: eventName,
    ...params,
  });
};

export default trackGtmEvent;
