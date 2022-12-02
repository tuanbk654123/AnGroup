module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#041662',
        secondary: '#6C757D',
        error: '#EB2323',
        warning: '#FFA900',
        danger: '#DC3545',
        cancel: '#C2C2C2',
        btn: {
          primary: '#4200FF',
          secondary: '#6C757D',
          cancel: '#C2C2C2',
          danger: '#DC3545',
          'cancel-text': '#8E8E8E',
        },
      },
      fontFamily: {
        body: ['"Inter"'],
        'body-medium': ['"Inter Medium"'],
        'body-semibold': ['"Inter SemiBold"'],
        'body-bold': ['"Inter Bold"'],
      },
      backgroundImage: {
        backgroundLogin: "url('/public/assets/login/background_portal.jpg')",
      },
    },
    borderRadius: {
      small: '4px',
      medium: '1.5625rem',
      large: '2.5rem',
      select: '0.75rem',
      button: '0.75rem',
    },
  },
  plugins: [],
}
