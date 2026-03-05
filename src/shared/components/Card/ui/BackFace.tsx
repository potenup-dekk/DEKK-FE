"use client";

import React from "react";
import { BackFaceProps } from "../props.type";
import { motion } from "framer-motion";
import { Product } from "../../Product";
import { Tag } from "../../Badge";

const BackFace = ({}: BackFaceProps) => {
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
        <div className="flex flex-col flex-1 gap-4">
          <Product
            brandName={"종원아뜰리에"}
            productName={"Italy Ziand 1955 No.1"}
            productImageUrl={""}
            productOriginUrl={""}
          />
          <Product
            brandName={"종원아뜰리에"}
            productName={"Fukuoka Ai 1955 No.2"}
            productImageUrl={""}
            productOriginUrl={""}
          />
          <Product
            brandName={"종원아뜰리에"}
            productName={"드몽샤를리앙 팬츠"}
            productImageUrl={""}
            productOriginUrl={""}
          />
          <Product
            brandName={"종원아뜰리에"}
            productName={"USA Levi's 1955 No.3"}
            productImageUrl={""}
            productOriginUrl={""}
          />
        </div>

        <div className="line-clamp-2">
          <Tag label={"청바지"} />
          <Tag label={"데님"} />
          <Tag label={"팬츠"} />
        </div>
      </div>
    </motion.div>
  );
};

export default BackFace;
