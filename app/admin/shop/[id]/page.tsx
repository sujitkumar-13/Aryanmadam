

import ProductForm from "@/components/admin/ProductForm";
import { prisma } from "@/lib/prisma"; 




export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  
  const product = await prisma.product.findFirst({
    where: {
      id: id,
    },
  })
  console.log("server product: ", product)
  return (
    <ProductForm id={id} mode="update" product={product} />
  );
};

