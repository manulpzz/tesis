import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(request, response) {
  let data
  const { id } = request.query

  if (request.method === "GET") {
    data = await prisma.grupomodelo.findUnique({
      select: {
        id: true,
        name: true,
      },
      where: { id },
    })
  } else if (request.method === "PATCH") {
    const { name } = request.body
    await prisma.grupomodelo.update({
      data: {
        name,
      },
      where: { id },
    })
  } else if (request.method === "DELETE") {
    await prisma.grupomodelo.delete({
      where: { id },
    })
  }

  return response.status(200).json(data)
}