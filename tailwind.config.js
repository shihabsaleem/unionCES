/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                accent: {
                    DEFAULT: '#FFCE07', // Your Brand Yellow
                    hover: '#E6B800'
                }
            }
        },
    },
    plugins: [],
}
