import { PrismaClient } from "@/generated/prisma/client"
import { withAccelerate } from "@prisma/extension-accelerate"

const prismaClientSingleton = () =>
    new PrismaClient({
        accelerateUrl: process.env.DATABASE_URL!,
    }).$extends(withAccelerate())

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

declare global {
    var prisma: PrismaClientSingleton | undefined
}

export const db: PrismaClientSingleton = globalThis.prisma ?? prismaClientSingleton()
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;



