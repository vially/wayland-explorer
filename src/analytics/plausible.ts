import Plausible from 'plausible-tracker'

export interface AnalyticsTracker {
    trackPageview: () => void
}

const noopTracker: AnalyticsTracker = { trackPageview: () => {} }

let currentTracker: AnalyticsTracker = noopTracker

export function setupAnalytics() {
    const enabled =
        process.env.NODE_ENV === 'production' &&
        !localStorage.getItem('plausible_ignore')

    currentTracker = enabled ? Plausible() : noopTracker
}

export function useAnalytics(): AnalyticsTracker {
    return currentTracker
}
