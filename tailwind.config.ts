import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  darkMode: 'class',
  theme: {
    fontSize: {
      xs: ['0.75rem', '0.875rem'],
      sm: ['0.875rem', '1.0625rem'],
      base: ['1rem', '1.5rem'],
      lg: ['1.25rem', '1.5625rem'],
      xl: ['1.5rem', '1.875rem'],
      '2xl': ['2rem', '2.5rem'],
      '3xl': ['2.5rem', '3.125rem'],
      '4xl': ['3rem', '3.625rem'],
      '5xl': ['3.5rem', '4.1875rem'],
    },
    fontFamily: {
      main: ['Poppins', 'sans-serif'],
      sub: ['Arkhip', 'sans-serif'],
    },
    fontWeight: {
      light: '300',
      regular: '400',
      'semi-bold': '500',
      bold: '600',
    },
    colors: {
      transparent: 'transparent',
      white: '#FFFFFF',
      light: {
        400: '#F8FAFC',
        500: '#F1F5F9',
        600: '#CBD5E1',
      },
      black: '#000000',
      dark: {
        400: '#171717',
        500: '#262626',
        600: '#404040',
      },
      primary: {
        400: '#8BDAD4',
        500: '#37B1A7',
        600: '#29706A',
      },
      success: {
        400: '#89E774',
        500: '#4AD42B',
        600: '#2598EB',
      },
      warning: {
        400: '#F0CD42',
        500: '#ECC113',
        600: '#D7B942',
      },
      alert: {
        400: '#F24067',
        500: '#E11D48',
        600: '#C02650',
      },
    },
  },
}
