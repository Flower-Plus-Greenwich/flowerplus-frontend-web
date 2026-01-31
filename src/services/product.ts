import { dataFetcher } from "@/lib/fetcher";

/**
 * Get all products
 */
export async function getProducts() {
    const response = await dataFetcher(`${process.env.BACKEND_URL}/products?page=1&size=5&sort=newest`, 
        { revalidate: 60 }
    );

    let data = [];

    if (response?.headers.get('Content-Type') === 'application/json') {
        const jsonData = await response?.json();
        data = jsonData?.data;
    }

    // console.log(data);

    return data;
}

/**
 * Get birthday products
 */
export async function getBirthdayProducts() {
    const response = await dataFetcher(`${process.env.BACKEND_URL}/products?categorySlug=sinh-nhat&page=1&size=5&sort=newest`, 
        { revalidate: 60 }
    );

    let data = [];

    if (response?.headers.get('Content-Type') === 'application/json') {
        const jsonData = await response?.json();
        data = jsonData?.data;
    }

    return data;
}

/**
 * Get valentine products
 */
export async function getValentineProducts() {
    const response = await dataFetcher(`${process.env.BACKEND_URL}/products?categorySlug=tinh-yeu&page=1&size=5&sort=newest`, 
        { revalidate: 60 }
    );

    let data = [];

    if (response?.headers.get('Content-Type') === 'application/json') {
        const jsonData = await response?.json();
        data = jsonData?.data;
    }

    return data;
}

/**
 * Get wedding products
 */
export async function getWeddingProducts() {
    const response = await dataFetcher(`${process.env.BACKEND_URL}/products?categorySlug=tiec-cuoi&page=1&size=5&sort=newest`, 
        { revalidate: 60 }
    );

    let data = [];

    if (response?.headers.get('Content-Type') === 'application/json') {
        const jsonData = await response?.json();
        data = jsonData?.data;
    }

    return data;
}

export async function getQuickCategoryProductsById(id: string) {
    const response = await dataFetcher(`${process.env.BACKEND_URL}/products?id=${id}&page=1&size=5&sort=newest`, 
        { revalidate: 60 }
    );

    let data = [];

    if (response?.headers.get('Content-Type') === 'application/json') {
        const jsonData = await response?.json();
        data = jsonData?.data;
    }

    return data;
}

/**
 * Get detail of a flower
 */
export async function getProductDetail(id: string) {
    const response = await dataFetcher(`${process.env.BACKEND_URL}/products/${id}`, 
        { revalidate: 60 }
    );

    let data = [];

    if (response?.headers.get('Content-Type') === 'application/json') {
        data = await response?.json();
    }

    // console.log(data);

    return data;

}