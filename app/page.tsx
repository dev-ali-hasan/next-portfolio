import HeroComponent from "@/component/home/HeroComponent";
import AboutUsComponent from "@/component/home/AboutUs";
import ClientHappy from "@/component/home/ClientHappy";
import SkillComponent from "@/component/home/SkillComponent";
import ProjectComponent from "@/component/home/Project";
import ReviewComponent from "@/component/home/Review";
import ContactComponent from "@/component/home/Contact";

export default function HomePage() {
  return (
      <>
        <HeroComponent />
        <AboutUsComponent />
        <ClientHappy />
        <SkillComponent />
        <ProjectComponent />
        <ReviewComponent />
        <ContactComponent />
      </>
  );
}
