import { Description } from './Description';
import { MainImage } from './MainImage';

export interface Products {
  name: string;
  sku: string;
  category: Category;
  mainimage: MainImage;
  short_description: string;
  description: Description[];
  specs: Spec[];
  images: ImageElement[];
  stock: number;
  price: number;
}

export interface Category {
  id: string;
  type: string;
  tags: any[];
  slug: string;
  lang: string;
  first_publication_date: string;
  last_publication_date: string;
  link_type: string;
  isBroken: boolean;
}

export interface Spec {
  spec_name: string;
  spec_value: string;
}

export interface ImageElement {
  image: MainImage;
}
