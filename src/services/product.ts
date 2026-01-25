import { dataFetcher } from "@/lib/utils/fetcher";

export async function getProducts() {
    const response = await dataFetcher(`${process.env.BACKEND_URL}/products`, {
        revalidate: 60,
    });

    const data = await response?.json();
    console.log("Products: ", data);

    return data || [];
}
