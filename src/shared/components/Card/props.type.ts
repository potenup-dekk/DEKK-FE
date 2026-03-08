interface ProductItem {
  productId: number;
  brand: string;
  name: string;
  productImageUrl: string;
  productUrl: string;
}

interface FrontFaceProps {
  imageUrl: string;
}

interface BackFaceProps {
  height: number | null;
  weight: number | null;

  products: ProductItem[] | null;
  tags: string[] | null;
}

export type { BackFaceProps, FrontFaceProps };
