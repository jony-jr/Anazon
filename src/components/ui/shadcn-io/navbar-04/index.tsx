"use client";

import * as React from "react";
import { useEffect, useState, useRef, useId, useContext } from "react";
import { Button } from "../../button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../../navigation-menu";
import { Popover, PopoverContent, PopoverTrigger } from "../../popover";
import { cn } from "../../../../lib/utils";
import type { ComponentProps } from "react";
import logo from "@images/logo.png";
import Link from "next/link";
import Image from "next/image";
import { BsBox2Heart } from "react-icons/bs";
import { GiShoppingCart } from "react-icons/gi";
import { IoIosLogIn } from "react-icons/io";
import { signOut, useSession } from "next-auth/react";
import { getUserCart } from "@/app/_Services/cart.service";
import { cartContext } from "@/app/_Components/Contexts/CartCountContext";

// Simple logo component for the navbar
const Logo = (props: React.SVGAttributes<SVGElement>) => {
  return (
    <Link
      scroll
      href="/"
      className="flex items-center space-x-3 rtl:space-x-reverse"
    >
      <Image
        priority
        draggable={"false"}
        src={logo}
        alt="anazone"
        width={110}
        height={25}
        className="w-full h-auto object-contain"
      />
    </Link>
  );
};

// Hamburger icon component
const HamburgerIcon = ({
  className,
  ...props
}: React.SVGAttributes<SVGElement>) => (
  <svg
    className={cn("pointer-events-none", className)}
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4 12L20 12"
      className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
    />
    <path
      d="M4 12H20"
      className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
    />
    <path
      d="M4 12H20"
      className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
    />
  </svg>
);

// Types
export interface Navbar04NavItem {
  href?: string;
  label: string;
}

export interface Navbar04Props extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  logoHref?: string;
  navigationLinks?: Navbar04NavItem[];
  signInText?: string;
  signInHref?: string;
  cartText?: string;
  cartHref?: string;
  cartCount?: number;
  searchPlaceholder?: string;
  onSignInClick?: () => void;
  onCartClick?: () => void;
  onSearchSubmit?: (query: string) => void;
}

// Default navigation links
const defaultNavigationLinks: Navbar04NavItem[] = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/about",
    label: "About",
  },
  {
    href: "/brands",
    label: "Brands",
  },
  {
    href: "/allorders",
    label: "My orders",
  },
];

export const Navbar04 = React.forwardRef<HTMLElement, Navbar04Props>(
  (
    {
      className,
      logo = <Logo />,
      logoHref = "#",
      navigationLinks = defaultNavigationLinks,
      signInText = "Sign In",
      signInHref = "#signin",
      cartText = "Cart",
      cartHref = "#cart",
      cartCount = 0,
      searchPlaceholder = "Search...",
      onSignInClick,
      onCartClick,
      onSearchSubmit,
      ...props
    },
    ref
  ) => {
    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef<HTMLElement>(null);
    const searchId = useId();

    function handleSignOut() {
      signOut({ redirect: true, callbackUrl: "/login" });
    }
    useEffect(() => {
      const checkWidth = () => {
        if (containerRef.current) {
          const width = containerRef.current.offsetWidth;
          setIsMobile(width < 768); // 768px is md breakpoint
        }
      };

      checkWidth();

      const resizeObserver = new ResizeObserver(checkWidth);
      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
      }

      return () => {
        resizeObserver.disconnect();
      };
    }, []);


    // const [initialCount, setInitialCount] = useState(0);
    // useEffect(function (){
    //   const cartCount = getUserCart().then((res) => res?.numOfCartItems);
    //   console.log("🚀 ~ cartCount:", cartCount)
    //   setInitialCount(cartCount)
    // },[])


    const combinedRef = React.useCallback(
      (node: HTMLElement | null) => {
        containerRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref]
    );

    const { cartCount: contextCartCount } = useContext(cartContext);

    const sessionObj = useSession();
    // console.log("🚀 ~ sessionObj:", sessionObj)
    const { data, status } = sessionObj;
    //  update Login & cart btn
    const [isLoading, setisLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    useEffect(
      function () {
        if (status === "unauthenticated") {
          setIsAuthenticated(false);
        } else if (status === "authenticated") {
          setIsAuthenticated(true);
        } else if (status === "loading") {
          setisLoading(false);
        }
      },
      [status]
    );

    return (
      <header
        ref={combinedRef}
        className={cn(
          " fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6 [&_*]:no-underline",
          className
        )}
        {...props}
      >
        <div className="container mx-auto md:px-10 flex h-16 max-w-screen-2xl items-center justify-between gap-4">
          {/* Left side */}
          <div className="flex flex-1 items-center gap-2">
            {/* Mobile menu trigger */}
            {isMobile && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className="group h-9 w-9 hover:bg-accent hover:text-accent-foreground"
                    variant="ghost"
                    size="icon"
                  >
                    <HamburgerIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-64 p-1">
                  <NavigationMenu className="max-w-none">
                    <NavigationMenuList className="flex-col items-start gap-0">
                      {navigationLinks.map((link, index) => (
                        <NavigationMenuItem key={index} className="w-full">
                          <Link
                            href={link.href as string}
                            scroll={true}
                            className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer no-underline"
                          >
                            {link.label}
                          </Link>
                        </NavigationMenuItem>
                      ))}

                      {/* Underline in mobile menu */}
                      <NavigationMenuItem
                        className="w-full"
                        role="presentation"
                        aria-hidden={true}
                      >
                        <div
                          role="separator"
                          aria-orientation="horizontal"
                          className="bg-border -mx-1 my-1 h-px"
                        />
                      </NavigationMenuItem>
                      {isAuthenticated && !isLoading && (
                        <>
                          <li>
                            <span
                              onClick={handleSignOut}
                              className="select-none cursor-pointer  text-shadow-2xs  rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-amber-800 md:p-0  md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                            >
                              Logout
                            </span>
                          </li>
                        </>
                      )}
                      {!isAuthenticated && !isLoading && (
                        <>
                          <NavigationMenuItem className="w-full">
                            <Link
                              scroll
                              href="/login"
                              className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer no-underline"
                            >
                              Login
                            </Link>
                          </NavigationMenuItem>
                          <NavigationMenuItem className="w-full">
                            <Link
                              scroll
                              href="/signup"
                              className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer no-underline"
                            >
                              Signup
                            </Link>
                          </NavigationMenuItem>
                        </>
                      )}
                    </NavigationMenuList>
                  </NavigationMenu>
                </PopoverContent>
              </Popover>
            )}

            {/* Main nav */}
            <div className="flex flex-1 items-center gap-6 max-md:justify-between">
              <button
                onClick={(e) => e.preventDefault()}
                className="flex items-center space-x-2 text-primary hover:text-primary/90 transition-colors cursor-pointer"
              >
                <div className="text-2xl">{logo}</div>
              </button>
              {/* Navigation menu */}
              {!isMobile && (
                <NavigationMenu className="flex mx-auto ">
                  <NavigationMenuList className="gap-2 ">
                    {navigationLinks.map((link, index) => (
                      <NavigationMenuItem key={index}>
                        <Link
                          href={link.href as string}
                          scroll
                          className="text-muted-foreground hover:text-primary  font-medium transition-colors cursor-pointer group inline-flex h-10 w-max items-center justify-center rounded-md bg-background/50 px-4 py-2 text-sm focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                        >
                          {link.label}
                        </Link>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              )}
            </div>
          </div>

          {/* Right side */}
          <ul className="flex gap-4 md:gap-0 items-center justify-center p-4 md:p-0 font-medium border border-gray-50 rounded-lg  md:space-x-8 rtl:space-x-reverse  md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {isAuthenticated && !isLoading && (
              <>
                <li>
                  <Link
                    scroll
                    href="/wishlist"
                    className="   text-shadow-2xs  rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 hover:text-amber-800 md:p-0  md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    <BsBox2Heart />
                  </Link>
                </li>
                <li>
                  <Link
                    scroll
                    href="/cart"
                    className="  relative text-shadow-2xs  rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-amber-800 md:p-0  md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    <GiShoppingCart size={21} />

                    <span className="font-light text-sm select-none absolute top-0  -translate-y-3 -translate-x-1 left-1/2 text-amber-600 ">
                      {contextCartCount != 0 ? contextCartCount : " "}
                    </span>
                  </Link>
                </li>
                <li>
                  <span
                    onClick={handleSignOut}
                    className="select-none cursor-pointer  text-shadow-2xs  rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-amber-800 md:p-0  md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Logout
                  </span>
                </li>
              </>
            )}
            {!isMobile && !isAuthenticated && !isLoading && (
              <>
                <li>
                  <Link
                    scroll
                    href="/login"
                    className="   text-shadow-2xs  rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-amber-800 md:p-0  md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    <IoIosLogIn size={20} />
                  </Link>
                </li>

                <li>
                  <Link
                    scroll
                    href="/signup"
                    className="   text-shadow-2xs  rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-amber-800 md:p-0  md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </header>
    );
  }
);

Navbar04.displayName = "Navbar04";

export { Logo, HamburgerIcon };
