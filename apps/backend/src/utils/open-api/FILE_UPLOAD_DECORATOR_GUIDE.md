# FileUpload Decorator Guide

## Overview

The `@FileUpload` decorator automatically configures OpenAPI/Swagger documentation for file upload endpoints with support for:
- Single file uploads
- Multiple file uploads
- File uploads with additional FormData fields (strings, numbers, JSON objects)

## Basic Usage

### Simple File Upload

```typescript
@FileUpload('file')
@UseInterceptors(FileInterceptor('file'))
@Post('upload')
uploadFile(@UploadedFile() file: Express.Multer.File) {
  // Handle file upload
}
```

### Multiple Files Upload

```typescript
@FileUpload('files', { isArray: true, maxItems: 10 })
@UseInterceptors(FilesInterceptor('files', 10))
@Post('upload-multiple')
uploadMultipleFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
  // Handle multiple files
}
```

## Advanced Usage: File Upload with Additional FormData Fields

### Example: File Upload with JSON Data

```typescript
import { FileUpload } from '../utils/open-api/file-upload.decorator.js';
import { ParseFormdataPipe } from '../utils/pipes/parse-formdata.pipe.js';
import { CreateTodoDto } from './dto/create-todo.dto.js';

@FileUpload('file', {
  additionalFields: [
    {
      name: 'data',
      type: 'object',
      schema: CreateTodoDto,
      required: true,
      description: 'Todo data as JSON string',
    },
  ],
})
@UseInterceptors(FileInterceptor('file'))
@Post('todos/with-file')
createTodoWithFile(
  @Body('data', ParseFormdataPipe) data: CreateTodoDto,
  @UploadedFile() file?: Express.Multer.File,
) {
  // data is automatically parsed from JSON string
  // file contains the uploaded file
}
```

### Example: File Upload with Multiple Fields

```typescript
@FileUpload('file', {
  additionalFields: [
    {
      name: 'title',
      type: 'string',
      required: true,
      description: 'Document title',
    },
    {
      name: 'category',
      type: 'string',
      required: false,
      description: 'Document category',
    },
    {
      name: 'metadata',
      type: 'object',
      schema: DocumentMetadataDto,
      required: false,
      description: 'Additional metadata as JSON',
    },
  ],
})
@UseInterceptors(FileInterceptor('file'))
@Post('documents/upload')
uploadDocument(
  @Body('title') title: string,
  @Body('category') category?: string,
  @Body('metadata', ParseFormdataPipe) metadata?: DocumentMetadataDto,
  @UploadedFile() file?: Express.Multer.File,
) {
  // Handle document upload with metadata
}
```

## Decorator Options

### FileUpload Parameters

```typescript
@FileUpload(fieldName: string, options?: {
  isArray?: boolean;           // Set to true for multiple files
  maxItems?: number;           // Maximum number of files (for arrays)
  additionalFields?: Array<{   // Additional FormData fields
    name: string;              // Field name in FormData
    type: 'string' | 'number' | 'boolean' | 'object' | 'array';
    required?: boolean;        // Whether field is required
    description?: string;      // Field description for docs
    schema?: any;              // DTO class for object types
  }>;
})
```

## Additional Field Types

### String Field
```typescript
{
  name: 'title',
  type: 'string',
  required: true,
  description: 'Title of the item',
}
```

### Number Field
```typescript
{
  name: 'priority',
  type: 'number',
  required: false,
  description: 'Priority level (1-5)',
}
```

### Boolean Field
```typescript
{
  name: 'isPublic',
  type: 'boolean',
  required: false,
  description: 'Whether the item is public',
}
```

### Object Field (JSON)
```typescript
{
  name: 'data',
  type: 'object',
  schema: CreateTodoDto,  // Reference to your DTO class
  required: true,
  description: 'Todo data as JSON string',
}
```

**Important**: Object fields must be sent as JSON strings in FormData and parsed using `ParseFormdataPipe`.

## Using ParseFormdataPipe

The `ParseFormdataPipe` automatically parses JSON strings from FormData fields:

```typescript
import { ParseFormdataPipe } from '../utils/pipes/parse-formdata.pipe.js';

@Post('upload')
uploadWithData(
  @Body('data', ParseFormdataPipe) data: CreateTodoDto,
  @UploadedFile() file?: Express.Multer.File,
) {
  // data is automatically parsed from JSON string to object
}
```

## Client-Side Usage

### Using Fetch API

```javascript
const formData = new FormData();

// Add file
formData.append('file', fileInput.files[0]);

// Add simple fields
formData.append('title', 'My Document');
formData.append('priority', '5');

// Add JSON object as string
const todoData = {
  title: 'My Todo',
  description: 'Description here',
  completed: false,
};
formData.append('data', JSON.stringify(todoData));

// Send request
const response = await fetch('/api/todos/with-file', {
  method: 'POST',
  body: formData,
});
```

### Using cURL

```bash
curl -X POST http://localhost:3001/api/todos/with-file \
  -F "file=@/path/to/file.pdf" \
  -F 'data={"title":"My Todo","description":"Description","completed":false}'
```

### Using Postman

1. Set method to `POST`
2. Set URL to your endpoint
3. Go to "Body" tab
4. Select "form-data"
5. Add fields:
   - `file` (type: File) - Select your file
   - `data` (type: Text) - Enter JSON: `{"title":"My Todo","completed":false}`

## OpenAPI/Swagger Integration

The decorator automatically generates proper OpenAPI documentation:

- Content type: `multipart/form-data`
- File upload fields with binary format
- Additional fields with proper types and descriptions
- Required/optional field indicators
- Schema references for complex objects

The documentation will appear in Scalar UI at `/api-docs` with proper form fields for testing.

## Benefits

1. **Automatic Documentation**: OpenAPI spec is generated automatically
2. **Type Safety**: Use DTOs for validation
3. **Flexible**: Support for multiple field types
4. **Clean Code**: No manual OpenAPI decorators needed
5. **Consistent**: Same pattern across all file upload endpoints

## Notes

- File uploads are optional by default (use `file?` parameter)
- Object fields in FormData must be JSON strings
- Use `ParseFormdataPipe` to automatically parse JSON fields
- The decorator scans routes at application startup
- All file type restrictions are configured in `main.ts`
