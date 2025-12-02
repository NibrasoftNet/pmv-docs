import { oc } from '@orpc/contract';
import { todoContract } from './contracts/todo.contract.js';
import { fileContract } from './contracts/file.contract.js';
import { mailContract } from './contracts/mail.contract.js';
import { supplierContract } from './contracts/supplier.contract.js';
import { manufacturerContract } from './contracts/manufacturer.contract.js';

/**
 * Main contract router
 * Combines all API contracts
 */
export const contract = oc.router({
  todo: todoContract,
  file: fileContract,
  mail: mailContract,
  supplier: supplierContract,
  manufacturer: manufacturerContract,
});

/**
 * Export contract type for type inference
 */
export type Contract = typeof contract;
