import { Banners } from './Banners';
import { Categories } from './Categories';
import { Products } from './Products';

export interface APIResponse {
  page: number;
  results_per_page: number;
  results_size: number;
  total_results_size: number;
  total_pages: number;
  next_page: null;
  prev_page: null;
  results: Result[];
  version: string;
  license: string;
}

export interface Result {
  id: string;
  uid: null;
  url: null;
  type: string;
  href: string;
  tags: string[];
  first_publication_date: string;
  last_publication_date: string;
  slugs: string[];
  linked_documents: any[];
  lang: string;
  alternate_languages: AlternateLanguage[];
  data: Banners | Products | Categories;
}

export interface AlternateLanguage {
  id: string;
  type: string;
  lang: string;
}
