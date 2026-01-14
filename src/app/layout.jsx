import "./globals.css";
import Navbar from "../components/layouts/NavBar";
import Footer from "../components/layouts/Footer";
import { Inter, Poppins } from 'next/font/google';

const poppins = Poppins (
  {
    subsets: ["latin"],
    weight: ["100", "200", "400", "600", "800"],
    variable: "--font-poppins",
  }
)

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Care.io",
  description: "A web application that allows users to access reliable and trusted care services for children, the elderly or sick people.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body className="font-inter">
        <header className="py-2 md:w-11/12 mx-auto">
          <Navbar /> 
        </header>
        
        <main className="py-2 md:w-11/12 mx-auto min-h-[calc(100vh -302px)]">
          {children}
        </main>

        <Footer>
          <Footer />
        </Footer>
      </body>
    </html>
  );
}
