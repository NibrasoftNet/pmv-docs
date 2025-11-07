# FileUpload Decorator Enhancement - Implementation Summary

## Overview

Extended the `@FileUpload` decorator to support multiple FormData fields including files and JSON objects, enabling endpoints like the todo creation with file upload.

## Changes Made

### 1. Decorator Enhancement (`file-upload.decorator.ts`)

**Added:**
- `AdditionalField` interface for defining extra FormData fields
- Support for field types: `string`, `number`, `boolean`, `object`, `array`
- Schema references for complex object types
- Required/optional field configuration
- Field descriptions for documentation

**New Interface:**
```typescript
export interface AdditionalField {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'object' | 'array';
  required?: boolean;
  description?: string;
  schema?: any; // For complex objects, reference to DTO class
}
```

**Updated FileUploadMetadata:**
```typescript
export interface FileUploadMetadata {
  fieldName: string;
  isArray: boolean;
  maxItems?: number;
  additionalFields?: AdditionalField[];  // NEW
}
```

### 2. OpenAPI Configuration (`openapi-file-upload.util.ts`)

**Enhanced:**
- `configureFileUploadOpenAPI` function to process additional fields
- Automatic schema registration in OpenAPI components
- Proper handling of JSON strings in FormData (since FormData can only send strings for non-file fields)
- Field descriptions and type information in generated spec

**Key Logic:**
- Object fields are documented as `type: 'string'` with description indicating JSON format
- Simple types (string, number, boolean) are documented with their native types
- Required fields are properly marked in the OpenAPI schema
- Schema references are generated for complex DTOs

### 3. Example Implementation (todos.controller.ts)

**Before:**
```typescript
@FileUpload('file')
@UseInterceptors(FileInterceptor('file'))
@Post('todos/with-file')
createTodoWithFile(@UploadedFile() file?: Express.Multer.File) {
  // Only file upload
}
```

**After:**
```typescript
@FileUpload('file', {
  additionalFields: [
    {
      name: 'data',
      type: 'object',
      schema: CreateTodoWithFileDto,
      required: true,
      description: 'Todo data as JSON string',
    },
  ],
})
@UseInterceptors(FileInterceptor('file'))
@Post('todos/with-file')
createTodoWithFile(
  @Body('data', ParseFormdataPipe) data: any,
  @UploadedFile() file?: Express.Multer.File,
) {
  // File upload + JSON data
}
```

## Features

### 1. Multiple Field Types Support

```typescript
@FileUpload('file', {
  additionalFields: [
    { name: 'title', type: 'string', required: true },
    { name: 'priority', type: 'number', required: false },
    { name: 'isPublic', type: 'boolean', required: false },
    { name: 'metadata', type: 'object', schema: MetadataDto, required: false },
  ],
})
```

### 2. Automatic OpenAPI Documentation

The decorator automatically generates:
- Proper `multipart/form-data` content type
- File upload fields with binary format
- Additional fields with correct types
- Required/optional indicators
- Field descriptions
- Schema references for DTOs

### 3. Integration with Scalar UI

The generated OpenAPI spec works seamlessly with Scalar UI at `/api-docs`:
- Interactive form with file upload
- Text inputs for additional fields
- Proper validation and type hints
- Example values from schemas

## Usage Pattern

### 1. Define Your DTO

```typescript
// create-todo-with-file.dto.ts
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const CreateTodoWithFileSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  completed: z.boolean().optional().default(false),
});

export class CreateTodoWithFileDto extends createZodDto(CreateTodoWithFileSchema) {}
```

### 2. Apply the Decorator

```typescript
@FileUpload('file', {
  additionalFields: [
    {
      name: 'data',
      type: 'object',
      schema: CreateTodoWithFileDto,
      required: true,
      description: 'Todo data as JSON string',
    },
  ],
})
@UseInterceptors(FileInterceptor('file'))
@Post('todos/with-file')
createTodoWithFile(
  @Body('data', ParseFormdataPipe) data: CreateTodoWithFileDto,
  @UploadedFile() file?: Express.Multer.File,
) {
  // Implementation
}
```

### 3. Client-Side Usage

```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);
formData.append('data', JSON.stringify({
  title: 'My Todo',
  description: 'Description',
  completed: false,
}));

await fetch('/api/todos/with-file', {
  method: 'POST',
  body: formData,
});
```

## Benefits

1. **No Manual OpenAPI Configuration**: Decorator handles everything
2. **Type Safety**: Use DTOs for validation
3. **Reusable**: Same pattern across all file upload endpoints
4. **Flexible**: Support any combination of fields
5. **Well-Documented**: Automatic API documentation
6. **Consistent**: Single source of truth for endpoint configuration

## Files Modified

1. `/apps/backend/src/utils/open-api/file-upload.decorator.ts`
   - Added `AdditionalField` interface
   - Extended `FileUploadMetadata` interface
   - Updated `FileUpload` decorator signature

2. `/apps/backend/src/utils/open-api/openapi-file-upload.util.ts`
   - Enhanced `configureFileUploadOpenAPI` function
   - Added schema registration logic
   - Improved field type handling

3. `/apps/backend/src/todos/todos.controller.ts`
   - Updated `createTodoWithFile` to use new decorator features
   - Added `@Body` decorator with `ParseFormdataPipe`

## Documentation Created

1. `/apps/backend/src/utils/open-api/FILE_UPLOAD_DECORATOR_GUIDE.md`
   - Comprehensive usage guide
   - Examples for all field types
   - Client-side integration examples

2. `/apps/backend/src/utils/open-api/IMPLEMENTATION_SUMMARY.md`
   - This document

## Testing

Test the endpoint using:

1. **Scalar UI**: Visit `http://localhost:3001/api-docs`
2. **cURL**: 
   ```bash
   curl -X POST http://localhost:3001/api/todos/with-file \
     -F "file=@test.pdf" \
     -F 'data={"title":"Test","completed":false}'
   ```
3. **Postman**: Use form-data with file and data fields

## Future Enhancements

Potential improvements:
- Array field support with item schemas
- Nested object validation
- Custom validators per field
- File field validation (size, type) in decorator
- Multiple file fields in single request
