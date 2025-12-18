import AboutUsComponent from "@/component/home/AboutUs";
import ContactComponent from "@/component/home/Contact";
import HeroComponent from "@/component/home/HeroComponent";
import SkillComponent from "@/component/home/SkillComponent";
import ProjectComponent from "@/component/home/Project";
import ClientHappy from "@/component/home/ClientHappy";
import ReviewComponent from "@/component/home/Review";

export default function HomePage() {
  return (
    <div>
      <HeroComponent />
      <AboutUsComponent />
      <ClientHappy />
      <SkillComponent />
      <ProjectComponent />
      <ReviewComponent />
      <ContactComponent />
    </div>
  );
}
