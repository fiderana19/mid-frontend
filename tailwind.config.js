/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lato: ['Lato', 'sans'],
        geist: ['Geist','sans'],
        hostgrotesk: ['HostGrotesk','sans'],
      },
      colors: {
        'primary': '#B4D4FF',
        'second': '#86B6F6',
        'third': '#176B87',
        'four':'#EEF5FF',
        'five':'rgba(0,0,0,.25)',
        'six':'#B2BEB5',
        'seven':'#E5E4E2',
      },
      keyframes: {
        wrapper: {
          '50%': { transform: 'translateY(-48px)' },
          '100%': {  transform: 'translateY(-96px)'},
        }
      },
      animation: {
        wrapper: 'wrapper 5s ease-in-out infinite alternate',
      },
      gridTemplateColumns: {
        customized: 'repeat(auto-fill , minmax(280px,295px))',
        customizedAudience: 'repeat(auto-fill , minmax(310px,320px))',
      },
    },
    clipPath: {
      mypolygon: "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)",
    },
  },
  plugins: [
    require('tailwind-clip-path'),
  ],
}