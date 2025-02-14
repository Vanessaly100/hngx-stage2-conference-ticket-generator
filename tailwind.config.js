/** @type {import('tailwindcss').Config} */
export default {
 content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        //  backgroundColor:'radial-gradient(52.52% 32.71% at 50% 97.66%, rgba(36, 160, 181, 0.20) 0%, rgba(36, 160, 181, 0.00) 100%), #02191D',
        MainBackgroundColor: '#02191D',
        MainBackgroundColorBorder: '#0e464f',
        MainBackgroundColor2: '#041E23', 
        MainBackgroundColor3: '#08252B',
        AddedColor: '#24A0B5',
        AddedColor2: '#08252B',
        SelectTicketBorder: '#2BA4B9',
        customBorder: "rgba(36, 160, 181, 0.50)"
        
      },
      
      backdropBlur: {
        'custom': '10px', // Custom blur amount
      },
      fontFamily: {
        roadRage: ["Road Rage", "serif"],
        alatsi: ["Alatsi", "sans-serif"],
        jeju: ["Jeju Myeongjo", "serif"],
        roboto: ["Roboto", "serif"],
      },
    },
  },
  plugins: [],
}

