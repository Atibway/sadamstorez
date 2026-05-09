import { db } from "@/lib/prismadb";

const getCategories = async () => {
    try {
        const categories = await db.category.findMany({
            include: {
                billboard: {
                    include: {
                        BillboardImages: true,
                    },
                },
                subcategories: true,
            },
        });
        return categories;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}

export default getCategories;