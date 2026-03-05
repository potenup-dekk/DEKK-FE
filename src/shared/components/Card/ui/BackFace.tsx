"use client";

import React from "react";
import { BackFaceProps } from "../props.type";
import { motion } from "framer-motion";
import { Product } from "../../Product";
import { Tag } from "../../Badge";

const BackFace = ({ isLoggedIn = false, products, tags }: BackFaceProps) => {
  return (
    <motion.div
      className="absolute inset-0 flex p-6 text-white bg-white rounded-lg "
      style={{
        rotateY: 180,
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
    >
      <div className="flex flex-col flex-1">
        {!isLoggedIn ? (
          <div className="flex items-center justify-center flex-1 text-black text-lg font-semibold">
            로그인을 해주세요
          </div>
        ) : (
          <>
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
                      productImageUrl={productImageUrl}
                    />
                  ),
                )}
            </div>

            <div className="line-clamp-2">
              {tags &&
                tags.map((tag, index) => <Tag key={index} label={tag} />)}
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default BackFace;
