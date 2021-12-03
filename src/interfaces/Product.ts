import { AlternateLanguage, MainImage } from './shared';

export interface Product {
  id: string;
  uid: null;
  url: null;
  type: string;
  href: string;
  tags: string[];
  first_publication_date: string;
  last_publication_date: string;
  slugs: string[];
  linked_documents: [];
  lang: string;
  alternate_languages: AlternateLanguage[];
  data: Data;
}

export interface Data {
  name: string;
  sku: string;
  category: CategoryLinked;
  mainimage: MainImage;
  short_description: string;
  description: Description[];
  specs: Spec[];
  images: Images[];
  stock: number;
  price: number;
}

interface Images {
  image: MainImage;
}

interface CategoryLinked {
  id: string;
  type: string;
  tags: [];
  slug: string;
  lang: string;
  first_publication_date: string;
  last_publication_date: string;
  link_type: string;
  isBroken: boolean;
}

interface Description {
  type: string;
  text: string;
  spans: [];
}

interface Spec {
  spec_name: string;
  spec_value: string;
}
