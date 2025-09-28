import { getUserOrders } from "../_Services/allUserOrders.service"
import React from "react";
import Image from "next/image";
import { josefinSans } from "../layout";
import cartLogo from '@images/cart-logo.png'
import NotFoundBtn from "../_Components/Btn/OrangeBtn"; 1
import Link from "next/link";
import ViewOrderDetailsBtn from "../_Components/Btn/ViewOrderDetailsBtn";
import imgLogo from '@images/icon.png'

export default async function AllOrders() {
  const userOrders = await getUserOrders()
  const reversedUserOrders = structuredClone(userOrders)?.reverse()
  const numberOfOrders = userOrders?.length
  return (
    <>
      <section className="bg-gray-200 min-h-dvh -mt-7 pt-5 pb-5">
        <div className="container mx-auto px-10">
          {numberOfOrders === 0 && (<>
            <div className="min-h-dvh -mt-10 flex flex-col justify-center items-center">
              <h1 className="select-none text-4xl md:text-6xl font-extrabold text-blue-950">
                Make your orders now
              </h1>
              <p className=" select-none text-xl font-sans text-blue-950 mt-1">Time to fill it with amazing finds!</p>
              <figure className="my-5 select-none flex justify-center items-center">
                <Image src={cartLogo} width={500} className="select-none " draggable={"false"} alt='cart logo' />
              </figure>
              <Link scroll href='/'>
                <NotFoundBtn name="START SHOPPING NOW" />
              </Link>
            </div>
          </>
          )}

          {numberOfOrders != 0 && (
            <>
              <h1
                className={`text-blue-950 select-none  ms-3 text-4xl capitalize md:text-6xl mt-3 font-extrabold  ${josefinSans.className}`}
              >
                All Orders
              </h1>
              <div className="grid  gap-4 ">
                <div className=" flex flex-col gap-3  ">
                  <div className="flex flex-col md:flex-row justify-between md:items-center px-3">
                    <p className=" text-gray-700">
                      Track your purchases and view history
                    </p>
                    <p className=" text-gray-400 ">
                      number of orders: {numberOfOrders}
                    </p>
                  </div>
                  {/* products Card */}
                  {reversedUserOrders?.map( order => (

                    <div
                      key={order._id}
                      className="relative grid grid-cols-12 gap-3  bg-white rounded-2xl px-5 py-5 pt-7"
                    >

                      {/* item image */}
                      <figure className="relative col-span-3 md:col-span-2 max-h-30  xl:col-span-1 ">
                        <Image
                          src={imgLogo}
                          fill
                          alt={'logo'}
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </figure>
                      {/* item Details */}
                      <div className="md:flex  justify-between md:col-span-10 items-center col-span-9 xl:col-span-11">
                        {/* Order number & Total price */}
                        <div className="flex flex-col md:gap-2  ">
                          <p className="text-sm md:text-xl text-blue-950 font-semibold">
                            Order number: #ANAZON{order.id}
                          </p>
                          <p className="text-sm md:text-xl text-gray-600">
                            Order date: {order.createdAt.split("T", 1)}
                          </p>
                        </div>
                        {/* Oder date & View Detail Btn */}
                        <div className="flex flex-col md:gap-3">
                          <p className="text-sm md:text-xl text-amber-600 font-bold md:font-extrabold">
                            Total: {order.totalOrderPrice}$
                          </p>
                          <ViewOrderDetailsBtn  userOders={order}/>
                        </div>
                      </div>
                    </div>

                  ))}
                </div>

              </div>
            </>
          )}
        </div>
      </section>
    </>
  )
}
