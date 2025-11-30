'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { orpc } from '@/lib/orpc-client';
import { transformSuppliers, type SupplierSchemaType } from '@workspace/orpc';
import { Card, CardContent } from '@workspace/ui/components/card';
import { AlertCircle, Loader2 } from 'lucide-react';

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<SupplierSchemaType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch todos on mount
  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await orpc.supplier.list();
      setSuppliers(transformSuppliers(data) as SupplierSchemaType[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch todos');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Suppliers List</h1>
        <p className="text-muted-foreground">
          list of plant, vehicles,and machinery suppliers
        </p>
      </div>

      <div className="grid gap-8">
        {error && (
          <Card className="border-destructive">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-destructive">
                <AlertCircle className="h-5 w-5" />
                <span>{error}</span>
              </div>
            </CardContent>
          </Card>
        )}
        {isLoading ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
              <p className="text-muted-foreground mt-4">Loading todos...</p>
            </CardContent>
          </Card>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {suppliers.map(supplier => (
              <Card key={supplier.id} className="col-span-1">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    {supplier.image ? (
                      <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={supplier.image.path}
                          alt={supplier.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl font-bold text-muted-foreground">
                          {supplier.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="font-bold text-lg">{supplier.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {supplier.createdAt.toLocaleString()}
                      </div>
                      {supplier.description && (
                        <div className="text-sm mt-1 line-clamp-2">
                          {supplier.description}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
