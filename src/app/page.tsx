import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";


export default function Home() {
  return (
    <>
      <div className="overflow-x-hidden bg-gradient-to-b from-black to-teal-950/20">
        <Navbar />
        <Hero />
      </div>
      <Footer />
    </>
  );
}
