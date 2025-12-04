'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { orpc } from '@/lib/orpc-client';
import {
  transformManufacturers,
  type ManufacturerSchemaType,
} from '@workspace/orpc';
import { Card, CardContent } from '@workspace/ui/components/card';
import { AlertCircle, Loader2 } from 'lucide-react';

export default function ManufacturersPage() {
  const [manufacturers, setManufacturers] = useState<ManufacturerSchemaType[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch todos on mount
  useEffect(() => {
    fetchManufacturers();
  }, []);

  const fetchManufacturers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await orpc.manufacturer.list();
      setManufacturers(
        transformManufacturers(data) as ManufacturerSchemaType[],
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch todos');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Manufacturers List</h1>
        <p className="text-muted-foreground">
          list of plant, vehicles,and machinery manufacturers
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
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {manufacturers.map(manufacturer => (
              <Card key={manufacturer.id} className="col-span-1">
                <CardContent className="p-0">
                  <div className="flex flex-col items-center gap-4">
                    {manufacturer.image ? (
                      <div className="flex flex-col items-start gap-2 w-full">
                        <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src={manufacturer.image.path}
                            alt={manufacturer.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <p className="w-full text-center max-w-[50px]">
                          {manufacturer.image.path}
                        </p>
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl font-bold text-muted-foreground">
                          {manufacturer.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="font-bold text-lg">
                        {manufacturer.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {manufacturer.createdAt.toLocaleString()}
                      </div>
                      {manufacturer.description && (
                        <div className="text-sm mt-1 line-clamp-2">
                          {manufacturer.description}
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
