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

    const items = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
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
    const { id, name } = request.body
    await prisma.category.create({
      data: {
        id,
        name,
      },
    })
  }

  return response.status(200).json(data)
}