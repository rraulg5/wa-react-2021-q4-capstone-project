import { AlternateLanguage, MainImage } from './shared';

export interface Category {
  id: string;
  uid: null;
  url: null;
  type: string;
  href: string;
  tags: [];
  first_publication_date: string;
  last_publication_date: string;
  slugs: string[];
  linked_documents: [];
  lang: string;
  alternate_languages: AlternateLanguage[];
  data: Data;
}

interface Data {
  name: string;
  main_image: MainImage;
}
