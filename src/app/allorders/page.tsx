import { getUserOrders } from "../_Services/allUserOrders.service"
import React from "react";
import Image from "next/image";
import { josefinSans } from "../layout";
import cartLogo from '@images/cart-logo.png'
import NotFoundBtn from "../_Components/Btn/OrangeBtn"; 1
import Link from "next/link";
import ViewOrderDetailsBtn from "../_Components/Btn/ViewOrderDetailsBtn";
import imgLogo from '@images/icon.png'
import OrderCard from "../_Components/OrderCard/OrderCard";

export default async function AllOrders() {
  const userOrders = await getUserOrders()
  const reversedUserOrders = structuredClone(userOrders)?.reverse()
  const numberOfOrders = userOrders?.length
  return (
    <>
      <section className="bg-gray-200 min-h-dvh -mt-7 pt-5 pb-5">
        <div className="container mx-auto px-5 md:px-10">
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

                   <OrderCard key={order._id} order={order}/>

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
