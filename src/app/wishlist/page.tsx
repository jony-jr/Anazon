import React from "react";
import Image from "next/image";
import { josefinSans } from "../layout";
import wishLogo from '@images/wish-img.png'
import NotFoundBtn from "../_Components/Btn/OrangeBtn"; 1
import Link from "next/link";
import { getUsetWishList } from "../_Services/wishList.service";
import { FaStar } from "react-icons/fa";
import DeleteFromWishBtn from "./_wishListBtn/DeleteFromWishBtn";
import AddToCartBtn from "../_Components/Btn/AddToCartBtn";

export default async function WishList() {
  const userListData = await getUsetWishList();
  // console.log("🚀 ~ Cart ~ userListData:", userListData)
  const cartItems = userListData?.data;
  const numberOfListItems = userListData?.count;

  return (
    <>
      <section className="bg-gray-200 min-h-dvh -mt-7 pt-5 pb-5">
        <div className="container mx-auto px-10">
          {numberOfListItems === 0 && (<>
            <div className="min-h-dvh -mt-15 flex flex-col justify-center items-center">
              <h1 className="select-none text-4xl md:text-6xl font-extrabold text-blue-950">
                Your Wishlist
              </h1>
              <p className=" select-none text-xl font-sans text-blue-950 mt-1">No items saved yet. Start exploring!</p>
              <figure className="my-5 select-none flex justify-center items-center">
                <Image src={wishLogo} width={300} draggable={'false'} className="select-none" alt='cart logo' />
              </figure>
              <Link scroll href='/'>
                <NotFoundBtn name="PICK A WISH" />
              </Link>
            </div>
          </>
          )}

          {numberOfListItems != 0 && (
            <>
              <h1
                className={`text-blue-950 select-none text-4xl md:text-6xl my-3 font-extrabold uppercase ${josefinSans.className}`}
              >
                your wishlist
              </h1>
              <div className="flex justify-between items-center ps-3">
                <p className=" font-bold">
                  Wish list items: {numberOfListItems}
                </p>
              </div>
              <div className="grid md:grid-cols-12  gap-4 mt-5">
                {cartItems?.map(({ _id, imageCover, title, price, ratingsAverage }) => (
                  <div key={_id} className="md:col-span-4  flex flex-col gap-3  ">
                    {/* products Card */}

                    <div
                      key={_id}
                      className="relative grid grid-cols-12 gap-3  bg-white rounded-2xl p-4"
                    >
                      <DeleteFromWishBtn id={_id} />
                      {/* item image */}
                      <figure className="relative col-span-2 max-h-30  xl:col-span-3 bg-blue-500 text-blue-800">
                        <Image
                          src={imageCover}
                          fill
                          alt={title}
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </figure>
                      {/* item Details */}
                      <div className=" col-span-10 xl:col-span-9">
                        {/* items name & price */}
                        <div className="w-3/4 flex justify-between mb-3 ">
                          <Link href={`/products/${_id}`}>
                            <p className=" text-sm md:text-xl line-clamp-1 text-blue-950 font-semibold">
                              {title}
                            </p>
                          </Link>
                        </div>
                        <div className="flex items-center justify-between mt-2.5 mb-5">
                          <div className="flex items-center space-x-1 rtl:space-x-reverse">
                            {Array.from(
                              { length: Math.floor(ratingsAverage) },
                              (_, i) => (
                                <FaStar key={i} className="text-amber-400" />
                              )
                            )}
                          </div>
                          <span className="bg-gray-50 me-auto text-amber-500 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">
                            {ratingsAverage}
                          </span>
                          {/* <AddToWishBtn productId={product._id} /> */}
                        </div>
                        {/* items counter */}
                        <div className="flex justify-between ">
                          <p className="text-amber-600 font-extrabold">
                            {price}$
                          </p>
                          <AddToCartBtn className="-translate-y-3" productId={_id} />
                        </div>
                      </div>
                    </div>

                  </div>
                ))}

              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
