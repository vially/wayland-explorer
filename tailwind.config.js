const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: 'media', // or 'media' or 'class'
    theme: {
        extend: {},
        colors: { ...colors, transparent: 'transparent' },
        fontFamily: {
            sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            serif: [...defaultTheme.fontFamily.serif],
            mono: [...defaultTheme.fontFamily.mono],
        },
    },
    variants: {
        extend: {},
        scrollbar: ['dark', 'rounded'],
    },
    plugins: [require('tailwind-scrollbar')],
}
