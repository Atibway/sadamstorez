import { Product } from "@/types";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
  categoryId?: string;
  subcategoryId?: string;
  colorId?: string;
  sizeId?: string;
  isFeatured?: boolean;
  query?: string;
}

const getProducts = async (query: Query): Promise<Product[]> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      colorId: query.colorId,
      sizeId: query.sizeId,
      categoryId: query.categoryId,
      subcategoryId: query.subcategoryId,
      isFeatured: query.isFeatured,
      query: query.query,
    },
  });

  const res = await fetch(url);

  return res.json();
};

export default getProducts;
