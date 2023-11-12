import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(request, response) {
  let data
  const { id } = request.query

  if (request.method === "GET") {
    data = await prisma.product.findUnique({
      select: {
        id: true,
        name: true,
        quantity: true,
        price: true,
        brand_id: true,
        category_id: true,
      },
      where: { id },
    })
  } else if (request.method === "PATCH") {
    const { name, quantity, price, brand_id, category_id } = request.body

    const brand = await prisma.brand.findFirst({
      where: {
        id: {
          equals: brand_id,
          mode: "insensitive",
        }
      },
    })

    const category = await prisma.category.findFirst({
      where: {
        id: {
          equals: category_id,
          mode: "insensitive",
        }
      },
    })

    await prisma.product.update({
      data: {
        name,
        quantity,
        price,
        brand_id: brand.id,
        category_id: category.id,
      },
      where: { id },
    })
  } else if (request.method === "DELETE") {
    await prisma.product.delete({
      where: { id },
    })
  }

  return response.status(200).json(data)
}