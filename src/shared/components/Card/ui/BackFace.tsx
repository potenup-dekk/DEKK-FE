"use client";

import React from "react";
import { BackFaceProps } from "../props.type";
import { motion } from "framer-motion";
import Tag from "../../Badge";
import { useCardAuth } from "../model/cardAuthContext";
import { backFaceMotionStyle } from "../model/animate";
import { MOCK_PRODUCTS } from "../model/mockProducts";
import ProductList from "./ProductList";
import { GoogleLoginButton, KakaoLoginButton } from "../../Button";

const BackFace = ({ products, tags }: BackFaceProps) => {
  const { isLoggedIn } = useCardAuth();

  return (
    <motion.div
      className="absolute inset-0 flex p-6 text-white bg-white rounded-lg"
      style={backFaceMotionStyle}
    >
      <div className="flex flex-col flex-1 gap-5">
        {!isLoggedIn ? (
          <div className="flex relative flex-col flex-1 w-full">
            <ProductList items={MOCK_PRODUCTS} />
            <div className="flex flex-col justify-center items-center absolute text-primary size-full p-2 backdrop-blur-xs scale-105 bg-primary/30 rounded-md">
              <div className="flex flex-col text-white font-bold">
                로그인 후 코디 상세 정보를 확인할 수 있어요!
              </div>

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
