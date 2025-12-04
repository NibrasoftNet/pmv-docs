/**
 * @workspace/orpc
 * Shared oRPC contracts for type-safe API communication
 */
// Re-export useful types from @orpc packages for convenience
export type { ContractRouter } from '@orpc/contract';

// Export schemas
export * from './schemas/todo.schema';
export * from './schemas/file.schema';
export * from './schemas/mail.schema';
export * from './schemas/supplier.schema';
export * from './schemas/address.schema';
export * from './schemas/country.schema';
export * from './schemas/language.schema';
export * from './schemas/manufacturer.schema';

// Export contracts
export * from './contracts/todo.contract';
export * from './contracts/file.contract';
export * from './contracts/mail.contract';
export * from './contracts/supplier.contract';
export * from './contracts/manufacturer.contract';

// Export main contract router
export { contract, type Contract } from './contract';

// Export utilities
export * from './utils/transform';

// Export domains
export * from './domains/articles-reference-type.enum';
