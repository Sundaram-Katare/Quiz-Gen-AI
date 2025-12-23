// import { currentUser } from '@clerk/nextjs/server';
// import { prisma } from './prisma';

// export async function getOrCreateUser() {
// const clerkUser = await currentUser();
// if (!clerkUser) return null;

// const data = {
// clerkId: clerkUser.id,
// email: clerkUser.emailAddresses?.emailAddress || null,
// name: ${clerkUser.firstName || ''} ${clerkUser.lastName || ''}.trim() || null,
// imageUrl: clerkUser.imageUrl || null,
// };

// const user = await prisma.user.upsert({
// where: { clerkId: clerkUser.id },
// update: data,
// create: data,
// });

// return user;
// }