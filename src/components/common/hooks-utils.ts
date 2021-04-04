import { useEffect } from 'react'

const addBodyClass = (className: string) =>
    document.body.classList.add(className)

const removeBodyClass = (className: string) =>
    document.body.classList.remove(className)

export function useBodyClass(className: string) {
    useEffect(() => {
        // Set up
        addBodyClass(className)

        // Clean up
        return () => removeBodyClass(className)
    }, [className])
}

export function usePageTitle(title: string) {
    useEffect(() => {
        document.title = `${title} | Wayland Explorer`
    }, [title])
}
