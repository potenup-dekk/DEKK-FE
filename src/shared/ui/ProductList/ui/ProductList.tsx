import Product from "@/shared/ui/Product";
import type { ProductListProps } from "../model/props.type";

const CDN_BASE_URL =
  "https://dekk-api-dev-crawl-bucket.s3.ap-northeast-2.amazonaws.com/";

const resolveImage = (imageUrl: string, useCdn: boolean) => {
  if (!useCdn) {
    return imageUrl;
  }

  return `${process.env.NEXT_PUBLIC_BUCKET_URL}${imageUrl}`;
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
