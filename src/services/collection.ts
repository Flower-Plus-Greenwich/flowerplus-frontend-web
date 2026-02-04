import { dataFetcher } from "@/lib/fetcher";
import { getQuickCategoryProductsById } from "./product";
import { QuickCategory } from "@/types/collection";

export async function getCollections() {
    const response = await dataFetcher(`${process.env.BACKEND_URL}/categories`,
        { revalidate: 60 }
    );

    let data = [];

    if (response?.headers.get('Content-Type') === 'application/json') {
        const jsonData = await response?.json();
        data = jsonData?.data;
    }

    return data;
}

export async function getCollectionDetail(id: string) {
    const response = await dataFetcher(`${process.env.BACKEND_URL}/categories/${id}`,
        { revalidate: 60 }
    );

    let data = [];

    if (response?.headers.get('Content-Type') === 'application/json') {
        data = await response?.json();
    }

    return data;
}

export async function getQuickCategoriesData(ids: string[]): Promise<QuickCategory[]> {
    const categoriesData = await Promise.all(ids.map(async (id) => {
        const [categoryResponse, products] = await Promise.all([
            getCollectionDetail(id),
            getQuickCategoryProductsById(id)
        ]);

        const category = categoryResponse?.data;

        if (!category) return null;

        return {
            id: category.id,
            title: category.name,
            slug: category.slug,
            description: category.description,
            products: products.filter((product) => product.categories.some((category) => category.id === id))
        };
    }));


    return categoriesData.filter((category): category is QuickCategory => category !== null);
}
