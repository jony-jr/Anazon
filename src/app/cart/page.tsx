import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { TbHttpDelete } from "react-icons/tb";
import { getUserCart } from "../_Services/cart.service";
import { cartItemType } from "../_interfaces/products.type";
import Image from "next/image";
import { josefinSans } from "../layout";
import DeleteItemFromCartBtn from "../_Components/Btn/DeleteItemFromCart";
import DeleteAllCartBtn from "../_Components/Btn/DeleteAllCart";
import cartLogo from '@images/cart-logo.png'
import NotFoundBtn from "../_Components/Btn/OrangeBtn";1
import Link from "next/link";
import CartCounterBtn from "../_Components/Btn/CartCounterBtn";
import OrangeBtn from "../_Components/Btn/OrangeBtn";

export default async function Cart() {
  const userCartData = await getUserCart();
  // console.log("🚀 ~ Cart ~ userCartData:", userCartData)
  const cartItems = userCartData?.data.products;
  const totalCartPrice = userCartData?.data.totalCartPrice;
  const numberOfCartItems = userCartData?.numOfCartItems;

  return (
    <>
      <section className="bg-gray-200 min-h-dvh -mt-7 pt-5 pb-5">
        <div className="container mx-auto px-10">
          {numberOfCartItems === 0 && (<>
            <div className="min-h-dvh -mt-10 flex flex-col justify-center items-center">
              <h1 className="select-none text-4xl md:text-6xl font-extrabold text-blue-950">
                Your cart is empty
              </h1>
              <p className=" select-none text-xl font-sans text-blue-950 mt-1">Time to fill it with amazing finds!</p>
              <figure className="my-5 select-none flex justify-center items-center">
                <Image src={cartLogo} width={500} className="select-none" alt='cart logo' />
              </figure>
              <Link scroll href='/'>
                <NotFoundBtn name="START SHOPPING NOW" />
              </Link>
            </div>
          </>
          )}

          {numberOfCartItems != 0 && (
            <>
              <h1
                className={`text-blue-950 text-4xl md:text-6xl my-3 font-extrabold  ${josefinSans.className}`}
              >
                Shopping Cart
              </h1>
              <div className="grid md:grid-cols-8 gap-4 mt-5">
                <div className="md:col-span-5 flex flex-col gap-3  ">
                  <div className="flex justify-between items-center ps-3">
                    <p className=" font-bold">
                      cart items: {numberOfCartItems}
                    </p>
                    <DeleteAllCartBtn />
                  </div>
                  {/* products Card */}
                  {cartItems?.map(({ product, count, price }) => (

                    <div
                      key={product._id}
                      className="relative grid grid-cols-8 gap-3  bg-white rounded-2xl px-5 py-5 pt-7"
                    >
                      <DeleteItemFromCartBtn id={product._id} />
                      {/* item image */}
                      <figure className="relative col-span-2 max-h-30  xl:col-span-1 bg-blue-500 text-blue-800">
                        <Image
                          src={product.imageCover}
                          fill
                          alt={product.title}
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </figure>
                      {/* item Details */}
                      <div className=" col-span-6 xl:col-span-7">
                        {/* items name & price */}
                        <div className="flex justify-between mb-3 ">
                          <p className="text-sm md:text-2xl text-blue-950 font-semibold">
                            {product.title.split(" ", 5).join(" ")}
                          </p>
                          <p className="text-amber-600 font-extrabold">
                            {count * price}$
                          </p>
                        </div>
                        {/* items counter */}
                        <div className="flex justify-between ">
                          <p className="text-gray-600">
                            item price: {price}$
                          </p>
                          <div className="flex bg-gray-200 rounded-xl">
                            <CartCounterBtn productId={product._id} count={count-1} />
                            <span className="select-none w-7  flex justify-center items-center">
                              {count}
                            </span>
                            <CartCounterBtn isInc productId={product._id} count={count + 1} />

                          </div>
                        </div>
                      </div>
                    </div>

                  ))}
                </div>
                {/* money card */}
                <div className="md:mt-13 md:col-span-3 self-start bg-blue-950 rounded-2xl py-5 px-5 text-gray-200">
                  <h2 className="mb-5 font-bold capitalize text-2xl">
                    Order summary
                  </h2>
                  <div className="flex flex-col gap-3 text-gray-400">
                    <div className="flex justify-between">
                      <p className="">Subtotal</p>
                      <p className="font-semibold">{totalCartPrice}$</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="">Shipping</p>
                      <p className="font-semibold">0$</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="">Taxes</p>
                      <p className="font-semibold">0$</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-3 pt-3 border-t-2 border-t-gray-600 ">
                    <p className="text-2xl font-bold">Order Total</p>
                    <p className="font-extrabold text-xl">{totalCartPrice}$</p>
                  </div>
                  <div className="mt-8 text-center">
                    <Link href='/cart/payment'>
                   <OrangeBtn myStyles={'w-11/12'} name="Proceed to Checkout" />
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
