"use client";
import { createContext, ReactNode, useState, useEffect } from "react";
import { getUsetWishList } from "@/app/_Services/wishList.service"; // Import your wishlist fetch function
import { useSession } from "next-auth/react";

// Define the context type
interface WishListContextType {
    wishListIdes: string[];
    updateWishesIdes: (newId: string) => void;
    delWishesIdes: (productId: string) => void;
}

// Create context with a default value
export const WishListContext = createContext<WishListContextType>({
    wishListIdes: [],
    updateWishesIdes: () => { },
    delWishesIdes: () => { },
});



export function WishlistIdProvider({ children }: { children: ReactNode; }) {
    const sessionObj = useSession();
    const { status } = sessionObj;
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    useEffect(
        function () {
            if (status === "unauthenticated") {
                setIsAuthenticated(false);
            } else if (status === "authenticated") {
                setIsAuthenticated(true);
            }
        },
        [status]
    );

    const [wishListIdes, setWishListIdes] = useState<string[]>([]);
    useEffect(() => {
        async function handleGetWishes() {
            const userListData = await getUsetWishList()
            const wishlistItemId = userListData?.data
            const wishesIds = wishlistItemId?.map(item => item._id)
            setWishListIdes([...wishesIds || ''])
        }
        handleGetWishes().then()
    }, [])


    function updateWishesIdes(newId: string) {
        if (isAuthenticated) {
            setWishListIdes([...wishListIdes, newId]); // Add new ID
        }
    }

    function delWishesIdes(productId: string) {
        if (isAuthenticated) {
            setWishListIdes(wishListIdes.filter(item => item !== productId)); // Remove ID
        }
    }

    return (
        <WishListContext.Provider value={{ wishListIdes, updateWishesIdes, delWishesIdes }}>
            {children}
        </WishListContext.Provider>
    );
}