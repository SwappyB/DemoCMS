import { PrismaClient } from '@prisma/client';

declare global {
    // eslint-disable-next-line no-var
    var cachedPrisma: PrismaClient
}

// if (process.env.NODE_ENV === 'production') {
//     prisma = new PrismaClient()
// } else {
if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient()
}

const prisma: PrismaClient = global.cachedPrisma
// }

export const db = prisma;