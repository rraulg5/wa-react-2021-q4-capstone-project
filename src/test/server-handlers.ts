import { rest } from 'msw';
import { API_BASE_URL } from '../utils/constants';
import apiRefMock from '../../mocks/apiRefMock.json';
import featuredBannersMock from '../../mocks/en-us/featured-banners.json';
import categoriesMock from '../../mocks/en-us/product-categories.json';
import productsMock from '../../mocks/en-us/products.json';

const endPoints = {
  banners: '[[at(document.type, "banner")]]',
  categories: '[[at(document.type, "category")]]',
  products: '[[at(document.type, "product")]]',
};

const handlers = [
  rest.get(API_BASE_URL, (req, res, ctx) => {
    return res(ctx.json(apiRefMock));
  }),
  rest.get(`${API_BASE_URL}/documents/search`, (req, res, ctx) => {
    const query = req.url.searchParams;
    const ref = query.get('ref');
    const q = query.get('q');
    const lang = query.get('lang');
    const pageSize = query.get('pageSize');

    switch (q) {
      case endPoints.banners:
        return res(ctx.json(featuredBannersMock));
      case endPoints.categories:
        return res(ctx.json(categoriesMock));
      case endPoints.products:
        return res(ctx.json(productsMock));
      default:
        return res(ctx.status(500), ctx.json({ error: 'Bad API Endpoint' }));
    }
  }),
];

export { handlers };
