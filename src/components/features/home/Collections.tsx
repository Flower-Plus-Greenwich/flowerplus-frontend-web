import { getCollections } from '@/services/collection';
import { Suspense } from 'react';
import CollectionsSkeleton from './CollectionsSkeleton';
import { CollectionClient } from './CollectionClient';

export default async function Collections() {
  const collections = await getCollections();
    
    // Empty collections message
    if (!collections || collections.length === 0) {
        return (
            <section className="w-full py-24 overflow-hidden">
                <div className="container mx-auto px-6 text-center">
                    <p 
                        className="font-cormorant text-4xl font-medium text-gray-600"
                    >No collections found.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="w-full py-24 overflow-hidden">
            <div className="container mx-auto px-6">
                <Suspense fallback={<CollectionsSkeleton />}>
                  <CollectionClient collections={collections} />
                </Suspense>
            </div>
        </section>
    );
}