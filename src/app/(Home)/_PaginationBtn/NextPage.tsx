'use client'
import { ChevronRightIcon, ChevronLeftIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { PagemetaDataType } from "@/app/_interfaces/products.type"
import { getAllProducts } from "@/app/_Services/products.service"
import { useRouter } from "next/navigation"


export default function NextPageBtn({ metaInfo }: { metaInfo: PagemetaDataType }) {
    const { currentPage, numberOfPages, prevPage, nextPage } = metaInfo
    const [isLoading, setisLoading] = useState(false)
    const router = useRouter();
    async function handleNextPage() {
        if (currentPage <= numberOfPages) {
            setisLoading(true)
            router.push(`?page=${nextPage}`);
            setisLoading(false)
        }

    }

    async function handlePrevPage() {
        if (currentPage > 1) {
            setisLoading(true)
            router.push(`?page=${prevPage}`);
            setisLoading(false)
        }
    }
    return (<div className="flex items-center justify-center mx-auto gap-5">
        <div className="  flex justify-center">
            <Button className="p-0 cursor-pointer" onClick={handlePrevPage} disabled={isLoading || currentPage === 1} variant="outline" size="icon">
                <ChevronLeftIcon />
            </Button>
        </div>
        <p className="text-gray-400 "> Page {currentPage}/{numberOfPages}</p>
        <div className="  flex justify-center">
            <Button className="p-0 cursor-pointer" onClick={handleNextPage} disabled={isLoading || currentPage === numberOfPages} variant="outline" size="icon">
                <ChevronRightIcon />
            </Button>
        </div>
    </div>
    )
}
