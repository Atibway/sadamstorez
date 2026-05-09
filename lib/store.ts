import { db as prismadb } from "@/lib/prismadb";

export async function getDefaultStore() {
  // Get the first store from the database
  // For single-store architecture, we'll use the first available store
  const store = await prismadb.store.findFirst({
    orderBy: {
      createdAt: 'asc'
    }
  });
  
  if (!store) {
    throw new Error("No store found. Please create a store first.");
  }
  
  return store.id;
}
