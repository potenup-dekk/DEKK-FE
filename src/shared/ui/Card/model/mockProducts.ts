interface MockProductItem {
  productId: number;
  brandName: string;
  productName: string;
  productImageUrl: string;
  productOriginUrl: string;
}

const MOCK_PRODUCTS: MockProductItem[] = [
  {
    productId: 0,
    brandName: "무신사 스탠다드",
    productName: "릴렉스드 베이식 울 블레이저 [네이비]",
    productImageUrl: "/goods/top.webp",
    productOriginUrl: "",
  },
  {
    productId: 1,
    brandName: "무신사 스탠다드",
    productName: "울 테이퍼드 히든 밴딩 크롭 슬랙스 [네이비]",
    productImageUrl: "/goods/bottom.webp",
    productOriginUrl: "",
  },
  {
    productId: 2,
    brandName: "매너그램",
    productName: "프리미엄 울타이 다크네이비",
    productImageUrl: "/goods/shirts.webp",
    productOriginUrl: "",
  },
  {
    productId: 3,
    brandName: "본",
    productName: "레귤러 카라 드레스셔츠 블루",
    productImageUrl: "/goods/neck.webp",
    productOriginUrl: "",
  },
  {
    productId: 4,
    brandName: "위캔더스",
    productName: "카디건 L",
    productImageUrl: "/goods/sweater.webp",
    productOriginUrl: "",
  },
];

export { MOCK_PRODUCTS, type MockProductItem };
