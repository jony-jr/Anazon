import { getSpecificProduct } from "@/app/_Services/products.service";
import ProductDetails from "@/app/_Components/ProductDetails/ProductDetails";

export type propsType = {
  params: { id: string };
};
export default async function productDetails(props: propsType) {
  const product = await getSpecificProduct(props.params.id);
  if (product == null) {
    return;
  }
  return (
    <ProductDetails product={product}/>
  );
}
