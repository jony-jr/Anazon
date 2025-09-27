import MySwiper from "@/app/_Components/MySwiper/MySwiper";
import { getAllCategories } from "@/app/_Services/categories.service";
import React from "react";

export default async function CategorySlider() {
  const allCategories = await getAllCategories();
  if (allCategories == null) {
    return;
  }
  return (
    <>
    
      
        <MySwiper categoryList={allCategories} />
   
    </>
  );
}
