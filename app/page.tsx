import HeroComponent from "@/component/home/HeroComponent";
import AboutUsComponent from "@/component/home/AboutUs";
import ClientHappy from "@/component/home/ClientHappy";
import SkillComponent from "@/component/home/SkillComponent";
import ProjectComponent from "@/component/home/Project";
import ReviewComponent from "@/component/home/Review";
import ContactComponent from "@/component/home/Contact";
import CteSection from "@/component/home/CteSection";
import WhyMeSection from "@/component/home/WhyMeSection";
import { SplitText } from "gsap/all";
import gsap from "gsap";
import Experience from "@/component/home/Expreience";
import ServicesSection from "@/component/home/ServicesSection";
import WorkStyleSection from "@/component/home/WorkStyleSection";

gsap.registerPlugin(SplitText);
export default function HomePage() {
  return (
    <>
      <HeroComponent />
      <AboutUsComponent />
      <ServicesSection />
      <SkillComponent />
      <WhyMeSection />
      <WorkStyleSection />
      <ProjectComponent />
      <ReviewComponent />
      <CteSection />
      <Experience />
      <ContactComponent />
    </>
  );
}
