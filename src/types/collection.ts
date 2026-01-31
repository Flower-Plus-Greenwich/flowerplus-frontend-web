export interface Collection {
    id: string;
    name: string;
    slug: string;
    description: string;
    thumbnail: string | null;
    type: string;
    parentId: string | null;
    children: Collection[];
}

import { Product } from "./product";

export interface QuickCategory {
    id: string;
    title: string;
    slug: string;
    description: string;
    products: Product[];
}