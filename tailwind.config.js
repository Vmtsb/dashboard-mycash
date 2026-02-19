/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                neutral: {
                    0: '#FFFFFF',
                    200: '#F3F4F6',
                    300: '#E5E7EB',
                    500: '#9CA3AF',
                    1100: '#080B12',
                },
                brand: {
                    lime: '#D7FF00',
                    blue: {
                        600: '#2A89EF',
                    }
                }
            },
            spacing: {
                0: '0px',
                8: '8px',
                12: '12px',
                16: '16px',
                20: '20px',
                24: '24px',
                32: '32px',
                56: '56px',
                64: '64px',
            },
            borderRadius: {
                2: '2px',
                20: '20px',
                100: '100px',
                full: '100px',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
