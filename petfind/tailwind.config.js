/** @type {import('tailwindcss').Config} */

const { nextui } = require('@nextui-org/react')
const colors = require('tailwindcss/colors')

export default {
  content: [
    './index.html',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    colors: {
      ...colors
    },
    extend: {}
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        dark: {
          colors: {
            primary: {
              DEFAULT: '#F87171',
              foreground: '#000000'
            },
            focus: '#F87171'
          }
        },
        light: {
          colors: {
            primary: {
              DEFAULT: '#F87171',
              foreground: '#FFFFFF'
            },
            focus: '#F87171'
          }
        }
      }
    })
  ]
}
