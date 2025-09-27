import logo from "@images/logo.png";
import Image from "next/image";
import notFoundCart from "@images/notFoundCart.png";
import Link from "next/link";
import NotFoundBtn from "./_Components/Btn/OrangeBtn";

export default function NotFound() {
  return (
    <main>
      <section className="flex items-center justify-center flex-col">
        <Image
          className="select-none"
          src={logo}
          width={200}
          height={30}
          alt="anazon"
          draggable={"false"}
        />
        <div className="my-5 text-center">
          <h1 className="font-extrabold text-7xl text-[#273866]">404</h1>
          <p className="text-[#273866] font-semibold uppercase">
            page not found
          </p>
        </div>
        <Image
          draggable={"false"}
          className="select-none"
          src={notFoundCart}
          width={200}
          height={30}
          alt="not found"
        />
        <div className="my-5 text-center">
          <p className="text-[#273866] font-bold text-3xl  capitalize">
            where did my cart go?
          </p>
          <p className="text-[#273866] text-xl">
            it seems this page is out of stock.
          </p>
        </div>
        <Link href="/">
          <NotFoundBtn name="back to home" />
        </Link>
        <p className="mt-3 text-amber-600">Shop Smart. Live Better</p>
      </section>
    </main>
  );
}
