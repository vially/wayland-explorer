import { useEffect, useState } from 'react'

export const DarkModeButton = ({ className }: { className?: string }) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof localStorage !== 'undefined') {
            return localStorage.getItem('dark-mode') === 'true'
        } else {
            return false
        }
    })

    useEffect(() => {
        const body = document.querySelector('body')
        if (isDarkMode) {
            body?.classList.add('dark')
        } else {
            body?.classList.remove('dark')
        }

        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('dark-mode', isDarkMode.toString())
        }
    }, [isDarkMode])

    return (
        <div className={className}>
            <button
                className="flex bg-white text-black rounded-full focus:outline-none p-px"
                onClick={() => setIsDarkMode(!isDarkMode)}
            >
                <span
                    className="codicon codicon-color-mode"
                    style={{ fontSize: 20 }}
                ></span>
            </button>
        </div>
    )
}
