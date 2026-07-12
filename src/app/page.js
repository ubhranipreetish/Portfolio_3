import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Pipeline from "@/components/Pipeline";
import WorkSection from "@/components/WorkSection";
// import ProjectSphere from "@/components/ProjectSphere"; // 3D sphere — disabled for now
import Experience from "@/components/Experience";
import Capabilities from "@/components/Capabilities";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Navbar />
      <main id="main">
        <Hero />
        <Pipeline />
        <WorkSection />
        {/* <ProjectSphere /> */}
        <Experience />
        <Capabilities />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
