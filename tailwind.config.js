/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f7e6',
          100: '#ceefce',
          200: '#a2dfa2',
          300: '#76cf76',
          400: '#4abf4a',
          500: '#14a800', // Upwork primary green
          600: '#128e00',
          700: '#0f7500',
          800: '#0c5c00',
          900: '#093c00',
        },
        secondary: {
          50: '#e6eef8',
          100: '#ccddf2',
          200: '#99bbe5',
          300: '#6699d8',
          400: '#3377cb',
          500: '#1f57c3', // Secondary blue
          600: '#1a49a5',
          700: '#153b87',
          800: '#102d69',
          900: '#0b1e46',
        },
        neutral: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        success: {
          50: '#ecfdf5',
          500: '#10b981',
          700: '#047857',
        },
        warning: {
          50: '#fffbeb',
          500: '#f59e0b',
          700: '#b45309',
        },
        error: {
          50: '#fef2f2',
          500: '#ef4444',
          700: '#b91c1c',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 4px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};