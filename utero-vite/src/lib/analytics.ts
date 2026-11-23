import ReactGA from 'react-ga4';

const analyticsEnabled = import.meta.env.VITE_ENABLE_ANALYTICS !== 'false';
const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();
const clarityProjectId = import.meta.env.VITE_MICROSOFT_CLARITY_ID?.trim();
const bingUetTagId = import.meta.env.VITE_BING_UET_TAG_ID?.trim();

type UetQueue = { push: (...items: unknown[]) => unknown };
type UetConstructor = new (config: { ti: string; enableAutoSpaTracking: boolean; q: UetQueue }) => UetQueue;

let pendingPageView: { path: string; title: string } | null = null;

export function initializeAnalytics() {
  if (!analyticsEnabled) return;

  if (gaMeasurementId) {
    ReactGA.initialize(gaMeasurementId, { gaOptions: { send_page_view: false } });
    if (pendingPageView) {
      ReactGA.send({ hitType: 'pageview', page: pendingPageView.path, title: pendingPageView.title });
      pendingPageView = null;
    }
  }

  if (clarityProjectId && !document.getElementById('microsoft-clarity')) {
    const script = document.createElement('script');
    script.id = 'microsoft-clarity';
    script.async = true;
    script.src = `https://www.clarity.ms/tag/${encodeURIComponent(clarityProjectId)}`;
    document.head.appendChild(script);
  }

  if (bingUetTagId && !document.getElementById('microsoft-uet')) {
    const uetWindow = window as Window & { uetq?: UetQueue; UET?: UetConstructor };
    uetWindow.uetq ??= new Array<unknown>();

    const script = document.createElement('script');
    script.id = 'microsoft-uet';
    script.async = true;
    script.src = 'https://bat.bing.com/bat.js';
    script.onload = () => {
      if (!uetWindow.UET || !uetWindow.uetq) return;
      uetWindow.uetq = new uetWindow.UET({
        ti: bingUetTagId,
        enableAutoSpaTracking: true,
        q: uetWindow.uetq,
      });
      uetWindow.uetq.push('pageLoad');
    };
    document.head.appendChild(script);
  }
}

export function trackPageView(path: string, title: string) {
  if (!analyticsEnabled) return;
  if (!ReactGA.isInitialized) {
    pendingPageView = { path, title };
    return;
  }

  ReactGA.send({ hitType: 'pageview', page: path, title });
}

export function trackEvent(name: string, params: Record<string, string | number | boolean> = {}) {
  if (!analyticsEnabled || !ReactGA.isInitialized) return;
  ReactGA.event(name, params);
}
