import { PrismaClient } from '../generated/prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

// Temporarily use the accelerate URL for this script
const accelerateUrl = "prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiMTEyNzE3M2ItNGIyNC00NjcwLTgzNjAtM2VkYTRmM2U2ZWY3IiwidGVuYW50X2lkIjoiMzcyMjY0MTZhZGU0Nzc4NzJjNDUxODVkNTM5MmJhNTQ0YjY1N2I3OTkyNjRlMTExOTZjMDViY2FlMjEwNTNlNiIsImludGVybmFsX3NlY3JldCI6ImQxZTg3NDAzLTQxOTctNDljZi04MDE4LWY4NTlkMGZiYTdiYiJ9.j-O_q5FkAJLm4gVaK_XrRy0WrLvt69Z5i7kkvfH8Lhs";

const prisma = new PrismaClient({
  accelerateUrl,
}).$extends(withAccelerate());

async function updateUserRole() {
  try {
    const user = await prisma.user.update({
      where: {
        email: 'ainebyoonaatiidu@gmail.com',
      },
      data: {
        role: 'ADMIN',
      },
    });

    console.log('User updated successfully:', user);
  } catch (error) {
    console.error('Error updating user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateUserRole();
