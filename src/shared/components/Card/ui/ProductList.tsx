import Product from "../../Product";
import type { MockProductItem } from "../model/mockProducts";

interface CardProductItem {
  productId: number;
  brand: string;
  name: string;
  productImageUrl: string;
  productUrl: string;
}

interface ProductListProps {
  items: CardProductItem[] | MockProductItem[];
  useCdn?: boolean;
}

const CDN_BASE_URL =
  "https://dekk-crawling-bucket.s3.ap-northeast-2.amazonaws.com/";

const resolveImage = (imageUrl: string, useCdn: boolean) => {
  if (!useCdn) {
    return imageUrl;
  }

  return `${CDN_BASE_URL}${imageUrl}`;
};

const ProductList = ({ items, useCdn = false }: ProductListProps) => {
  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => {
        const brandName = "brand" in item ? item.brand : item.brandName;
        const productName = "name" in item ? item.name : item.productName;
        const productOriginUrl =
          "productUrl" in item ? item.productUrl : item.productOriginUrl;

        return (
          <Product
            key={item.productId}
            productId={item.productId}
            brandName={brandName}
            productName={productName}
            productOriginUrl={productOriginUrl}
            productImageUrl={resolveImage(item.productImageUrl, useCdn)}
          />
        );
      })}
    </div>
  );
};

export default ProductList;
