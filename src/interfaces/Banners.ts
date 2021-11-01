import { Description } from './Description';
import { MainImage } from './MainImage';

export interface Banners {
  title: string;
  description: Description[];
  cta_link: string;
  cta_target: string;
  main_image: MainImage;
}
