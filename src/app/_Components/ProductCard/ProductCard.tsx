"use client";
import * as motion from "motion/react-client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { productType } from "@/app/_interfaces/products.type";
import Link from "next/link";
import AddToCartBtn from "../Btn/AddToCartBtn";
import AddToWishBtn from "@/app/wishlist/_wishListBtn/AddToWishBtn";
import DelHeartWish from "@/app/wishlist/_wishListBtn/DelHeartWish";
import { WishListContext } from "../Contexts/WishListContext";

export default function ProductCard({ product }: { product: productType }) {
  const { wishListIdes } = useContext(WishListContext);
  const [isRedheart, setIsRedheart] = useState<boolean>(false);

  useEffect(() => {
    setIsRedheart(wishListIdes.includes(product._id));
  }, [wishListIdes, product._id]);

  return (
    <motion.div
      whileHover={{ scale: 1.02, transitionDuration: 0.5 }}
      className="w-full max-w-sm relative bg-white border border-gray-200 rounded-2xl shadow-sm dark:bg-gray-800 dark:border-gray-700"
    >
      {product.priceAfterDiscount ? (
        <div className="select-none bg-amber-600 px-7 absolute z-10 py-1 rounded-br-3xl rounded-tl-2xl w-fit">
          <p className="text-sm text-white">
            {Math.floor(((product.price - product.priceAfterDiscount) / product.price) * 100)}%
          </p>
        </div>
      ) : ' '}
      <Link scroll href={`/products/${product._id}`}>
        <div className="h-80 md:h-60 relative">
          <Image
            fill
            draggable={false}
            className="rounded-t-2xl object-cover"
            src={product.imageCover}
            alt={product.title}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </Link>
      <div className="px-5 py-5">
        <Link href={`/brands/${product.brand._id}`} className="hover:underline text-gray-400 capitalize text-sm">
          {product.brand.name}
        </Link>
        <Link scroll href={`/products/${product._id}`}>
          <h5 className="line-clamp-2 cursor-pointer lg:h-13 text-lg font-semibold tracking-tight text-gray-800 dark:text-white">
            {product.title}
          </h5>
        </Link>
        <div className="flex items-center justify-between mt-2.5 mb-5">
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            {Array.from({ length: Math.floor(product.ratingsAverage || 0) }, (_, i) => (
              <FaStar key={i} className="text-amber-400" />
            ))}
          </div>
          <span className="bg-gray-50 me-auto text-amber-500 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">
            {product.ratingsAverage?.toFixed(1) || "0.0"}
          </span>
          {isRedheart ? <DelHeartWish productId={product._id} /> : <AddToWishBtn productId={product._id} />}
        </div>
        <div className="flex items-center justify-between">
          {product.priceAfterDiscount ? (
            <div>
              <span className="text-xl font-bold text-amber-800 dark:text-white">
                {product.priceAfterDiscount}$
              </span>
              <span className="ms-2 mb-2 -translate-y-full text-sm line-through font-bold text-gray-400 dark:text-white">
                {product.price}$
              </span>
            </div>
          ) : (
            <span className="text-xl font-bold text-amber-800 dark:text-white">{product.price}$</span>
          )}
          <AddToCartBtn productId={product._id} />
        </div>
      </div>
    </motion.div>
  );
}
