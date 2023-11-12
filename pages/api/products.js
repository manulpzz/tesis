import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(request, response) {
  const data = []

  if (request.method === "GET") {
    const { _end: limit, _start: offset, id } = request.query

    const where = {}
    if (id) {
      if (Array.isArray(id)) {
        where.id = { in: id.map(String) }
      } else {
        where.id = id
      }
    }

    const items = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        quantity: true,
        price: true,
        brand_id: true,
        category_id: true,
      },
      where,
      orderBy: {
        id: "asc",
      },
      take: limit ? Number(limit) : undefined,
      skip: offset ? Number(offset) : undefined,
    })

    items.forEach(element => {
      data.push(element)
    })
  } else if (request.method === "POST") {
    const { id, name, quantity, price, brand_id, category_id } = request.body
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

    const brandModel = await prisma.brandModel.findFirst({})
    const brandModelVersion = await prisma.brandModelVersion.findFirst({})
    const manufacturer = await prisma.manufacturer.findFirst({})

    await prisma.product.create({
      data: {
        id,
        name,
        quantity,
        price,
        brand: {
          connect: { id: brand.id },
        },
        category: {
          connect: { id: category.id },
        },
        brandModel: {
          connect: { id: brandModel.id },
        },
        brandModelVersion: {
          connect: { id: brandModelVersion.id },
        },
        manufacturer: {
          connect: { id: manufacturer.id },
        },
      },
    })
  }

  return response.status(200).json(data)
}