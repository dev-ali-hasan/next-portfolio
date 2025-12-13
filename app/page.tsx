
import AboutUsComponent from "@/component/home/AboutUs";
import ContactComponent from "@/component/home/Contact";
import HeroComponent from "@/component/home/HeroComponent";
import SkillComponent from "@/component/home/SkillComponent";

export default function HomePage() {
  return (
    <div>
      <HeroComponent />
      <AboutUsComponent />
      <SkillComponent />
      <ContactComponent />
    </div>
  );
}
