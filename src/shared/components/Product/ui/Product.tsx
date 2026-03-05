import Image from "next/image";
import { ProductProps } from "../props.type";
import { ActionButton } from "../../Button";
import Link from "next/link";

const Product = ({
  brandName,
  productName,
  productImageUrl,
  productOriginUrl,
}: ProductProps) => {
  return (
    <div className="flex h-fit justify-center gap-3">
      <Image className="size-10 rounded-lg" src={productImageUrl} alt="" />

      <div className="flex flex-col flex-1 justify-between">
        <span className="text-sm font-bold text-black">{brandName}</span>
        <span className="text-[11px] text-black">{productName}</span>
      </div>

      <Link href={productOriginUrl} target="_blank">
        <ActionButton label="상품 보기" size="sm" />
      </Link>
    </div>
  );
};

export default Product;
