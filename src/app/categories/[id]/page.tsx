import { getAllCategoryProducts } from '@/app/_Services/categories.service'
import { propsType } from '@/app/products/[id]/page'
import Image from 'next/image'
import React from 'react'
import wishLogo from '@images/wish-img.png'
import ProductCard from '@/app/_Components/ProductCard/ProductCard'

export default async function CategoryDetails(props: propsType) {
    const allCategoryProducts = await getAllCategoryProducts(props.params.id)
    return (
        <>
            <section className='container md:px-10 mx-auto'>
                {allCategoryProducts?.length === 0 && (<>
                    <div className="min-h-dvh -mt-20 flex flex-col justify-center items-center">
                        <h1 className="select-none text-xl font-semibold md:text-4xl lg:text-6xl md:font-extrabold text-blue-950">
                            Products will added soon
                        </h1>
                        <figure className="w-3/4 md:w-full my-5 select-none flex justify-center items-center">
                            <Image src={wishLogo} width={300} className="select-none" draggable={'false'} alt='cart logo' sizes="(max-width: 768px) 50vw, 100vw" />
                        </figure>
                    </div>
                </>
                )}
                {allCategoryProducts?.length != 0 && (<>
                    <h1 className="px-5 container mx-auto select-none text-center md:text-start font-semibold text-4xl lg:text-6xl md:font-extrabold text-blue-950">
                        {allCategoryProducts[0]?.category.name}
                    </h1>
                    <div className="p-5 pb-0 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-5">
                        {allCategoryProducts?.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                </>
                )}
            </section>
        </>
    )
}
