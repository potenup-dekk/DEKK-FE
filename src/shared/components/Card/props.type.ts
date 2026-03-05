type Proudct = {
  productId: number;
  brand: string;
  name: string;
  productImageUrl: string;
  productUrl: string;
};

interface FrontFaceProps {
  imageUrl: string;
}

interface BackFaceProps {
  height: number | null;
  weight: number | null;

  products: Proudct[] | null;
  tags: string[] | null;
}

export type { FrontFaceProps, BackFaceProps };
