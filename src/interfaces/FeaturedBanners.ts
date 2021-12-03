import { AlternateLanguage, MainImage } from './shared';

export interface FeauturedBanners {
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
  title: string;
  description: Description[];
  cta_link: string;
  cta_target: string;
  main_image: MainImage;
}

interface Description {
  type: string;
  text: string;
  spans: [];
}
