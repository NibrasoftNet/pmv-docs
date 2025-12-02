/**
 * Utilities for transforming API responses to match runtime types
 */

/**
 * Transform a single todo from API response (with string dates) to runtime type (with Date objects)
 */
export function transformTodo<T extends { createdAt: string | Date }>(
  todo: T,
): Omit<T, 'createdAt'> & { createdAt: Date } {
  return {
    ...todo,
    createdAt:
      typeof todo.createdAt === 'string'
        ? new Date(todo.createdAt)
        : todo.createdAt,
  };
}

export function transformSupplier<
  T extends { createdAt: string | Date; updatedAt: string | Date },
>(
  supplier: T,
): Omit<T, 'createdAt' | 'updatedAt'> & { createdAt: Date; updatedAt: Date } {
  return {
    ...supplier,
    createdAt:
      typeof supplier.createdAt === 'string'
        ? new Date(supplier.createdAt)
        : supplier.createdAt,
    updatedAt:
      typeof supplier.updatedAt === 'string'
        ? new Date(supplier.updatedAt)
        : supplier.updatedAt,
  };
}

export function transformManufacturer<
  T extends { createdAt: string | Date; updatedAt: string | Date },
>(
  manufacturer: T,
): Omit<T, 'createdAt' | 'updatedAt'> & { createdAt: Date; updatedAt: Date } {
  return {
    ...manufacturer,
    createdAt:
      typeof manufacturer.createdAt === 'string'
        ? new Date(manufacturer.createdAt)
        : manufacturer.createdAt,
    updatedAt:
      typeof manufacturer.updatedAt === 'string'
        ? new Date(manufacturer.updatedAt)
        : manufacturer.updatedAt,
  };
}

/**
 * Transform an array of todos from API response to runtime types
 */
export function transformTodos<T extends { createdAt: string | Date }>(
  todos: T[],
): Array<Omit<T, 'createdAt'> & { createdAt: Date }> {
  return todos.map(transformTodo);
}

/**
 * Transform an array of todos from API response to runtime types
 */
export function transformSuppliers<
  T extends { createdAt: string | Date; updatedAt: string | Date },
>(
  suppliers: T[],
): Array<
  Omit<T, 'createdAt' | 'updatedAt'> & { createdAt: Date; updatedAt: Date }
> {
  return suppliers.map(transformSupplier);
}

export function transformManufacturers<
  T extends { createdAt: string | Date; updatedAt: string | Date },
>(
  manufacturers: T[],
): Array<
  Omit<T, 'createdAt' | 'updatedAt'> & { createdAt: Date; updatedAt: Date }
> {
  return manufacturers.map(transformManufacturer);
}

/**
 * Generic date field transformer for any entity
 * Useful for entities with multiple date fields
 */
export function transformDateFields<
  T extends Record<string, any>,
  K extends keyof T,
>(obj: T, dateFields: K[]): T {
  const result = { ...obj };
  for (const field of dateFields) {
    if (typeof result[field] === 'string') {
      result[field] = new Date(result[field] as string) as T[K];
    }
  }
  return result;
}
