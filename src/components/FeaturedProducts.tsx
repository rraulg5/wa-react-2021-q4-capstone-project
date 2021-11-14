import { useFetch } from '../hooks/useFetch';
import { Loading } from './Loading';
import { Product } from '../interfaces/Product';
import { ProductItem } from './ProductItem';

export const FeaturedProducts = () => {
  const endPoint = `${encodeURIComponent(
    '[[at(document.type, "product")]]'
  )}&q=${encodeURIComponent(
    '[[at(document.tags, ["Featured"])]]'
  )}&lang=en-us&pageSize=16`;

  const { data, isLoading } = useFetch('featuredProducts', endPoint);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        data?.results.map((product: Product) => (
          <ProductItem product={product} key={product.id} />
        ))
      )}
    </>
  );
};
