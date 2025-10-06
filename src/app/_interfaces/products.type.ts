export type metaProductType = {
    results: number,
    metadata: PagemetaDataType,
    data: productType[]
}

export type PagemetaDataType = {
    currentPage: number,
    numberOfPages: number,
    limit: number,
    prevPage: number,
    nextPage: number,
}
export type productType = {
    _id: string,
    title: string,
    slug: string,
    description: string,
    quantity: number,
    price: number,
    imageCover: string,
    category: categoryType,
    subcategory: subcategoryType[],
    brand: brandType,
    ratingsAverage: number,
    priceAfterDiscount?: number,
    images: string[],
}
export type categoryType = {
    _id: string,
    name: string,
    image: string,
    slug: string
}
export type brandType = {
    _id: string,
    name: string,
    image: string,
    slug: string
}
export type subcategoryType = {
    _id: string,
    name: string,
    image: string,
    category: string
}

// Cart Type
export type cartItemType = {
    cartId: string,
    numOfCartItems: number,
    data: cartDataType,
}
type cartDataType = {
    cartOwnerId: string,
    totalCartPrice: number,
    cartId: string,
    products: itemsType[],
}
type itemsType = {
    count: number
    price: number,
    product: productType
}

// shipping Address
export type shippingAddressType = {
    details: string,
    phone: string,
    city: string

}

/// WishList Type
export type wishListType = {
    count: number,
    data: productType[]
}

// 
export type metaBrandType = {
    results: number,
    metadata: PagemetaDataType,
    data: brandType[]
}