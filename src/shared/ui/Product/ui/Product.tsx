import Image from "next/image";
import { ProductProps } from "../props.type";
import { ActionButton } from "../../Button";
import Link from "next/link";
import { productStyle } from "../style";

const Product = ({
  brandName,
  productName,
  productImageUrl,
  productOriginUrl,
}: ProductProps) => {
  const { root, image, content, brand, name } = productStyle();

  return (
    <div className={root()}>
      <Image
        className={image()}
        src={productImageUrl}
        width={40}
        height={40}
        alt={productName}
      />

      <div className={content()}>
        <span className={brand()}>{brandName}</span>
        <span className={name()}>{productName}</span>
      </div>

      <Link href={productOriginUrl} target="_blank">
        <ActionButton label="상품 보기" size="sm" />
      </Link>
    </div>
  );
};

export default Product;
