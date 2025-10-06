import { productType } from "@/app/_interfaces/products.type";
import { getSpecificProduct } from "@/app/_Services/products.service";
import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa";
import { GiShoppingCart } from "react-icons/gi";
import { FaRegHeart } from "react-icons/fa";
import AddToCartBtn from "@/app/_Components/Btn/AddToCartBtn";
import AddToWishBtn from "@/app/wishlist/_wishListBtn/AddToWishBtn";
import MainSlider from "@/app/(Home)/_Sliders/MainSlider/MainSlider";
import Link from "next/link";

export type propsType = {
  params: { id: string };
};
export default async function productDetails(props: propsType) {
  const product = await getSpecificProduct(props.params.id);
  if (product == null) {
    return;
  }
  return (
    <main>
      <div className="container mx-auto grid md:grid-cols-2 gap-5  px-10 md:px-15 ">
        {/* image */}

        <div className="overflow-hidden ">
          <MainSlider imgsList={product.images} imgAlt={product.title} />
        </div>

        {/* content */}
        <div className="mt-5 flex flex-col justify-between " >
          {/* Title */}
          <h2 className="text-2xl sm:text-4xl  text-gray-800">
            {product?.title}
          </h2>
          {/* RAting */}
          <div className="flex items-center mt-2.5 mb-5">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              {Array.from(
                { length: Math.floor(product.ratingsAverage) },
                (_, i) => (
                  <FaStar key={i} className="text-amber-400" />
                )
              )}
            </div>
            <span className="bg-gray-50 text-amber-500 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">
              {product.ratingsAverage}
            </span>
          </div>
          {/* Price */}
          <div>
            {product.priceAfterDiscount ? (
              <div className="flex gap-3">
                <span className="text-6xl font-bold text-amber-800 dark:text-white">
                  {product.priceAfterDiscount}$
                </span>
                <div className="flex flex-col justify-center">
                  <span className="text-xs  font-semibold text-amber-400 ">
                    {Math.floor(
                      ((product.price - product.priceAfterDiscount) /
                        product.price) *
                      100
                    )}
                    % off
                  </span>
                  <span className="text-lg line-through font-bold text-gray-400 dark:text-white">
                    {product.price}
                  </span>
                </div>
              </div>
            ) : (
              <span className=" lg:text-6xl font-bold text-amber-800 dark:text-white">
                {product.price}$
              </span>
            )}
          </div>
          {/* Description */}
          <h3 className="text-gray-600 my-3">{product.description}</h3>
          {/* Counter & Add To cart & heart */}
          <div className="flex gap-3 items-center">

            <AddToCartBtn productId={product._id} isSingle className="w-50 sm:w-3xs  lg:w-sm" />
            <AddToWishBtn productId={product._id} />
          </div>
          {/* info */}
          <div className="grid lg:grid-cols-2 items-center justify-between my-5">
            <p className="text-amber-700 capitalize"> <span className="text-gray-400">Type:</span> {product.subcategory[0].name}</p>
            <p className="capitalize text-amber-700"><span className="text-gray-400">Stock:</span> {product.quantity} items in stock </p>
            <div className="capitalize text-amber-700"><span className="text-gray-400">Category: </span>
              <Link href={`/categories/${product.category._id}`} className="hover:underline">
                {product.category.name}
              </Link>
            </div>
            <div className="capitalize text-amber-700"><span className="text-gray-400">Brand: </span>
              <Link href={`/brands/${product.brand._id}`} className="hover:underline">
                {product.brand.name}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
