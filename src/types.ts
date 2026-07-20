import type { ComponentType, ReactNode, SVGProps } from "react";

export type AppView = "landing" | "terms" | "privacy";

export type NavLink = {
  name: string;
  href: string;
};

export type InfoCard = {
  title: string;
  description: string;
  question?: string;
  icon: ComponentType<
    { size?: number | string } & Pick<
      SVGProps<SVGSVGElement>,
      "aria-hidden" | "className" | "strokeWidth"
    >
  >;
};

export type TeamMember = {
  name: string;
  title: string;
  department: "Desarrollo" | "Dirección y Administración";
  image: string;
  alt: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type ToolDemo = {
  name: string;
  audience: string;
  description: string;
  tags: string[];
  cta: string;
  href?: string;
};

export type ContactItem = {
  label: string;
  value: string;
  href: string;
  type: "email" | "phone";
};

export type LegalSection = {
  id: string;
  title: string;
  text: string;
};

export type LegalPageContent = {
  eyebrow: string;
  title: string;
  description: string;
  updatedAt: string;
  intro: string;
  contactTitle: string;
  contactText: ReactNode;
  sections: LegalSection[];
};

export type SeoConfig = {
  title: string;
  description: string;
  path: string;
  robots?: string;
};
