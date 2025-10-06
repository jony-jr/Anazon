import React from 'react'
import { josefinSans } from '../layout'
import { getAllBrands } from '../_Services/allBrands.service';
import Image from 'next/image';
import NextPageBtn from '../(Home)/_PaginationBtn/NextPage';
import Link from 'next/link';

export default async function Brands({ searchParams }: { searchParams: { page?: string } }) {
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  const allBrandsData = await getAllBrands(page); // Pass the page number to the API
  const allBrands = allBrandsData?.data;
  const PagemetaData = allBrandsData?.metadata;
  return (
    <section className='bg-gray-200 min-h-dvh -mt-7 pt-5 pb-5'>
      <div className='container mx-auto px-10 '>
        <h1 className={`text-blue-950 select-none text-4xl md:text-6xl my-3 lg:my-8 font-extrabold uppercase ${josefinSans.className}`}  >
          our brands
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 mb-10">
          {allBrands?.map(({ _id, image, name }) => (
            <Link key={_id} href={`brands/${_id}`}>
            <figure  className="cursor-pointer relative mx-auto w-[120] h-[120] md:w-[200] md:h-[200] shadow-xl rounded-full hover:scale-103 hover:duration-200">
              <Image
                fill
                src={image}
                alt={name}
                sizes="(max-width: 768px) 100vw, 50vw" // Adjust based on your layout
                className='rounded-full'
              />
            </figure>
            </Link>
          ))}
        </div>
        {PagemetaData && <NextPageBtn metaInfo={PagemetaData} />}
      </div>

    </section>
  )
}
