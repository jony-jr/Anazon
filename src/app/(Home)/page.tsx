import { getAllProducts } from "../_Services/products.service";
import ProductCard from "../_Components/ProductCard/ProductCard";
import MainSlider from "./_Sliders/MainSlider/MainSlider";
// import CategorySlider from "./_Sliders/CategorySlider";
import { lazy, Suspense } from "react";
import Loader from "../_Components/Loader/Loader";
import { cookies } from "next/headers";
import { getUsetWishList } from "../_Services/wishList.service";
import NextPageBtn from "./_PaginationBtn/NextPage";
import Image from "next/image";
import sliderBg1 from "@images/sliderBg1.jpg";
import sliderBg2 from "@images/sliderBg2.jpg";
import sliderBg3 from "@images/sliderBg3.jpg";
import sliderBg4 from "@images/sliderBg4.jpg";
import sliderBg5 from "@images/sliderBg5.jpg";
import sliderBg6 from "@images/sliderBg6.jpg";
import sliderBg7 from "@images/sliderBg7.jpg";
import blog1 from "@images/blog1.jpg";
import blog2 from "@images/blog2.jpg";
const imgsList: string[] = [
  sliderBg1.src,
  sliderBg2.src,
  sliderBg3.src,
  sliderBg4.src,
  sliderBg5.src,
  sliderBg6.src,
  sliderBg7.src,
];
const CategorySliderLazy = lazy(() => import("./_Sliders/CategorySlider"));

export default async function Home({ searchParams }: { searchParams: { page?: string } }) {
  // Get the page number from the URL query parameter, default to 1
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  const allProductsData = await getAllProducts(page); // Pass the page number to the API
  const allProducts = allProductsData?.data;
  const PagemetaData = allProductsData?.metadata;


  return (
    <main className="container mx-auto  md:px-10 ">
      <div className="md:grid grid-cols-4 h-[200] md:h-[400] gap-1 px-5 rounded-2xl ">

        <div className="col-span-3 rounded-2xl">

          <MainSlider imgsList={imgsList} isMain />
        </div>
        <div className=" hidden md:block col-span-1 rounded-2xl ">
          <Image
            draggable={"false"}
            src={blog1}
            alt="blog1"
            className="select-none w-full h-[100] md:h-[200] rounded-tr-2xl"
          />
          <Image
            draggable={"false"}
            src={blog2}
            alt="blog2"
            className="select-none w-full h-[100] md:h-[200] rounded-br-2xl"
          />
        </div>
      </div>
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
      <div className="p-5 pb-0  grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-5">
        {allProducts?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}


      </div>
      <div className="my-10">
        {PagemetaData && <NextPageBtn metaInfo={PagemetaData} />}
      </div>
    </main>
  );
}
