"use client";

import React from "react";
import { BackFaceProps } from "../props.type";
import { motion } from "framer-motion";
import Tag from "../../Badge";
import { useCardAuth } from "../model/cardAuthContext";
import { backFaceMotionStyle } from "../model/animate";
import { MOCK_PRODUCTS } from "../model/mockProducts";
import ProductList from "@/shared/components/ProductList";
import { GoogleLoginButton, KakaoLoginButton } from "../../Button";

const BackFace = ({ products, tags }: BackFaceProps) => {
  const { isLoggedIn } = useCardAuth();
  const guestPreviewProducts = MOCK_PRODUCTS.slice(0, 1);

  return (
    <motion.div
      className="absolute inset-0 flex p-6 text-white bg-white rounded-lg"
      style={backFaceMotionStyle}
    >
      <div className="flex flex-col flex-1 gap-5">
        {!isLoggedIn ? (
          <div className="flex flex-col flex-1 w-full gap-3">
            <div className="relative overflow-hidden rounded-md">
              <div className="h-11 overflow-hidden">
                <ProductList items={guestPreviewProducts} />
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-linear-to-b from-transparent via-white/70 to-white" />
            </div>

            <p className="text-center text-sm font-bold text-primary">
              로그인 후 코디 상세 정보를 확인할 수 있어요!
            </p>

            <div className="flex flex-col items-center gap-2">
              <GoogleLoginButton />
              <KakaoLoginButton />
            </div>
          </div>
        ) : (
          <div className="flex flex-col flex-1">
            {products ? <ProductList items={products} useCdn /> : null}
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
