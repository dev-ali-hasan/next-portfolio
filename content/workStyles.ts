import {
  MessageSquare,
  Zap,
  CheckCircle,
  Rocket,
  LucideIcon,
} from "lucide-react";

interface WorkStyles {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export const workStyles: WorkStyles[] = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Clear Communication",
    description:
      "Regular updates, transparent progress reports, and quick responses. I keep you informed every step of the way.",
  },
  {
    number: "02",
    icon: Rocket,
    title: "Agile & Flexible",
    description:
      "Iterative development approach. Easy to adapt requirements and pivot when needed while maintaining project timeline.",
  },
  {
    number: "03",
    icon: CheckCircle,
    title: "Quality Assurance",
    description:
      "Thorough testing, code reviews, and performance audits before delivery. Pixel-perfect implementation guaranteed.",
  },
  {
    number: "04",
    icon: Zap,
    title: "Efficient Delivery",
    description:
      "Streamlined workflows and optimized processes. You get high-quality results in reasonable timelines without compromises.",
  },
];
