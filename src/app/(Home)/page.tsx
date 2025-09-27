import { getAllProducts } from "../_Services/products.service";
import ProductCard from "../_Components/ProductCard/ProductCard";
import MainSlider from "./_Sliders/MainSlider/MainSlider";
// import CategorySlider from "./_Sliders/CategorySlider";
import { lazy, Suspense } from "react";
import Loader from "../_Components/Loader/Loader";
import { cookies } from "next/headers";
import { getUsetWishList } from "../_Services/wishList.service";
const CategorySliderLazy = lazy(() => import("./_Sliders/CategorySlider"));

export default async function Home() {
  const allProducts = await getAllProducts();


  return (
    <main className="container mx-auto  px-10 ">
      <MainSlider />
      {/* Category Slider */}
      <div className="px-5 my-10">
        <h2 className="text-2xl mb-2 font-bold text-amber-600 select-none">
          Categories
        </h2>
        <Suspense
          fallback={
            <div className="h-[100] md:h-[180] flex justify-center items-center">
              <Loader />
            </div>
          }
        >
          <CategorySliderLazy />
        </Suspense>
      </div>
      <div className="p-5 grid sm:grid-cols-3 xl:grid-cols-5 gap-5">
        {allProducts?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </main>
  );
}
