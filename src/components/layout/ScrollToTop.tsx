import { useEffect } from 'react'
import { useLocation } from 'wouter'

export const ScrollToTop = () => {
    const [pathname] = useLocation()

    useEffect(() => window.scrollTo(0, 0), [pathname])

    return null
}
