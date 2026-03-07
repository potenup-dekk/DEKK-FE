"use client";

import React from "react";
import { BackFaceProps } from "../props.type";
import { motion } from "framer-motion";
import { Product } from "../../Product";
import { Tag } from "../../Badge";
import { useCardAuth } from "../model/cardAuthContext";
import {
  ActionButton,
  GoogleLoginButton,
  KakaoLoginButton,
} from "../../Button";

const BackFace = ({ products, tags }: BackFaceProps) => {
  const { isLoggedIn } = useCardAuth();

  return (
    <motion.div
      className="absolute inset-0 flex p-6 text-white bg-white rounded-lg"
      style={{
        rotateY: 180,
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
    >
      <div className="flex flex-col flex-1 gap-5">
        {!isLoggedIn ? (
          <div className="flex relative flex-col flex-1 w-full">
            <div className="flex flex-col gap-4">
              <Product
                productId={0}
                brandName={"무신사 스탠다드"}
                productName={"릴렉스드 베이식 울 블레이저 [네이비]"}
                productImageUrl={require("../../../../../public/goods/top.webp")}
                productOriginUrl={""}
              />
              <Product
                productId={0}
                brandName={"무신사 스탠다드"}
                productName={"울 테이퍼드 히든 밴딩 크롭 슬랙스 [네이비]"}
                productImageUrl={require("../../../../../public/goods/bottom.webp")}
                productOriginUrl={""}
              />
              <Product
                productId={0}
                brandName={"매너그램"}
                productName={"프리미엄 울타이 다크네이비"}
                productImageUrl={require("../../../../../public/goods/shirts.webp")}
                productOriginUrl={""}
              />
              <Product
                productId={0}
                brandName={"본"}
                productName={"레귤러 카라 드레스셔츠 블루"}
                productImageUrl={require("../../../../../public/goods/neck.webp")}
                productOriginUrl={""}
              />
              <Product
                productId={0}
                brandName={"위캔더스"}
                productName={"카디건 L"}
                productImageUrl={require("../../../../../public/goods/sweater.webp")}
                productOriginUrl={""}
              />
            </div>
            <div className="flex flex-col justify-center items-center absolute text-primary size-full p-2 backdrop-blur-xs scale-105 bg-primary/30 rounded-md">
              <div className="flex flex-col text-white font-bold">
                로그인 후 코디 상세 정보를 확인할 수 있어요!
              </div>

              <GoogleLoginButton />
              <KakaoLoginButton />
            </div>
          </div>
        ) : (
          <div className="flex flex-col flex-1 gap-4">
            {products &&
              products.map(
                ({ productId, brand, name, productImageUrl, productUrl }) => (
                  <Product
                    key={productId}
                    productId={productId}
                    brandName={brand}
                    productName={name}
                    productOriginUrl={productUrl}
                    productImageUrl={
                      "https://dekk-crawling-bucket.s3.ap-northeast-2.amazonaws.com/" +
                      productImageUrl
                    }
                  />
                ),
              )}
          </div>
        )}

        <div className="flex flex-wrap">
          {tags && tags.map((tag, index) => <Tag key={index} label={tag} />)}
        </div>
      </div>
    </motion.div>
  );
};

export default BackFace;
