'use client'
import { changeCartCountPerItem } from "@/app/cart/cart.action";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import * as motion from "motion/react-client";

export default function CartCounterBtn({ isInc = false, count, productId }: { productId: string, isInc?: boolean, count: number }) {
      const [isLoading, setIsLoading] = useState(false)
    
    async function hadleCounter() {
        setIsLoading(true)
        const res =await changeCartCountPerItem(productId, count)
        if(res){
            setIsLoading(false)
        }else{
            setIsLoading(false)
        }
    }
    return (
        <>
            <motion.div  whileTap={{ scale: 0.9 }}>
                <Button onClick={hadleCounter} disabled={count == 0 || isLoading} className="select-none text-gray-900 bg-gray-300 cursor-pointer hover:bg-gray-400">
                    {isInc ? "+" : "-"}
                </Button>
            </motion.div>
        </>
    );
}
