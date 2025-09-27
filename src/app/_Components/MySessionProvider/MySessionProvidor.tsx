"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { CartCountProvider } from "../Contexts/CartCountContext";
import { WishlistIdProvider } from "../Contexts/WishListContext";

export default function MySessionProvidor({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SessionProvider>
      <WishlistIdProvider>
        <CartCountProvider>
          {children}
        </CartCountProvider>
      </WishlistIdProvider>
    </SessionProvider>
  );
}