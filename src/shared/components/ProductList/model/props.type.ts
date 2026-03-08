import type { MockProductItem } from "@/shared/components/Card/model/mockProducts";

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

export type { CardProductItem, ProductListProps };
