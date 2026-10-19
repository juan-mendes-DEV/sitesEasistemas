export type CategoryKey = "simples" | "institucionais" | "ecommerce" | "sistemas";

export type ProjectStatus = "em-desenvolvimento" | "disponivel";

export interface Category {
  key: CategoryKey;
  label: string;
  price: number;
  description: string;
  scope: string[];
  route: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: CategoryKey;
  price: number;
  features: string[];
  status: ProjectStatus;
  route: string;
}
