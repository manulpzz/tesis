import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(request, response) {
  let data
  const { id } = request.query

  if (request.method === "GET") {
    data = await prisma.manufacturers.findUnique({
      select: {
        id: true,
        name: true,
      },
      where: { id },
    })
  } else if (request.method === "PATCH") {
    const { name } = request.body
    await prisma.manufacturers.update({
      data: {
        name,
      },
      where: { id },
    })
  } else if (request.method === "DELETE") {
    await prisma.manufacturers.delete({
      where: { id },
    })
  }

  return response.status(200).json(data)
}