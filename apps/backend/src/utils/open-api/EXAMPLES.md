# FileUpload Decorator - Real-World Examples

## Example 1: Simple File Upload (Existing Pattern)

```typescript
@FileUpload('file')
@UseInterceptors(FileInterceptor('file'))
@Post('files/upload')
uploadFile(@UploadedFile() file: Express.Multer.File) {
  return this.filesService.uploadFile(file);
}
```

**Client Usage:**
```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);
await fetch('/api/files/upload', { method: 'POST', body: formData });
```

---

## Example 2: File Upload with JSON Object (Todo Example)

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
  const todo = await this.todosService.create(data);
  return { ...todo, file: file ? { name: file.originalname } : null };
}
```

**Client Usage:**
```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);
formData.append('data', JSON.stringify({
  title: 'My Todo',
  description: 'Description here',
  completed: false,
}));
await fetch('/api/todos/with-file', { method: 'POST', body: formData });
```

---

## Example 3: Document Upload with Metadata

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
      description: 'Document category (e.g., "invoice", "contract")',
    },
    {
      name: 'version',
      type: 'number',
      required: false,
      description: 'Document version number',
    },
    {
      name: 'isPublic',
      type: 'boolean',
      required: false,
      description: 'Whether document is publicly accessible',
    },
  ],
})
@UseInterceptors(FileInterceptor('file'))
@Post('documents/upload')
uploadDocument(
  @Body('title') title: string,
  @Body('category') category?: string,
  @Body('version') version?: number,
  @Body('isPublic') isPublic?: boolean,
  @UploadedFile() file?: Express.Multer.File,
) {
  return this.documentsService.create({
    title,
    category,
    version,
    isPublic,
    file,
  });
}
```

**Client Usage:**
```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);
formData.append('title', 'Q4 Financial Report');
formData.append('category', 'invoice');
formData.append('version', '2');
formData.append('isPublic', 'false');
await fetch('/api/documents/upload', { method: 'POST', body: formData });
```

---

## Example 4: Profile Picture Upload with User Data

```typescript
@FileUpload('avatar', {
  additionalFields: [
    {
      name: 'userId',
      type: 'string',
      required: true,
      description: 'User ID',
    },
    {
      name: 'displayName',
      type: 'string',
      required: false,
      description: 'User display name',
    },
    {
      name: 'preferences',
      type: 'object',
      schema: UserPreferencesDto,
      required: false,
      description: 'User preferences as JSON',
    },
  ],
})
@UseInterceptors(FileInterceptor('avatar'))
@Post('users/update-profile')
updateProfile(
  @Body('userId') userId: string,
  @Body('displayName') displayName?: string,
  @Body('preferences', ParseFormdataPipe) preferences?: UserPreferencesDto,
  @UploadedFile() avatar?: Express.Multer.File,
) {
  return this.usersService.updateProfile({
    userId,
    displayName,
    preferences,
    avatar,
  });
}
```

**Client Usage:**
```javascript
const formData = new FormData();
formData.append('avatar', avatarFile);
formData.append('userId', '12345');
formData.append('displayName', 'John Doe');
formData.append('preferences', JSON.stringify({
  theme: 'dark',
  notifications: true,
  language: 'en',
}));
await fetch('/api/users/update-profile', { method: 'POST', body: formData });
```

---

## Example 5: Product Creation with Image

```typescript
@FileUpload('image', {
  additionalFields: [
    {
      name: 'productData',
      type: 'object',
      schema: CreateProductDto,
      required: true,
      description: 'Product information as JSON',
    },
    {
      name: 'tags',
      type: 'string',
      required: false,
      description: 'Comma-separated tags',
    },
  ],
})
@UseInterceptors(FileInterceptor('image'))
@Post('products')
createProduct(
  @Body('productData', ParseFormdataPipe) productData: CreateProductDto,
  @Body('tags') tags?: string,
  @UploadedFile() image?: Express.Multer.File,
) {
  const tagArray = tags ? tags.split(',').map(t => t.trim()) : [];
  return this.productsService.create({
    ...productData,
    tags: tagArray,
    image,
  });
}
```

**Client Usage:**
```javascript
const formData = new FormData();
formData.append('image', productImage);
formData.append('productData', JSON.stringify({
  name: 'Wireless Mouse',
  description: 'Ergonomic wireless mouse',
  price: 29.99,
  stock: 100,
}));
formData.append('tags', 'electronics, accessories, wireless');
await fetch('/api/products', { method: 'POST', body: formData });
```

---

## Example 6: Multiple Files with Metadata

```typescript
@FileUpload('files', {
  isArray: true,
  maxItems: 5,
  additionalFields: [
    {
      name: 'albumName',
      type: 'string',
      required: true,
      description: 'Photo album name',
    },
    {
      name: 'description',
      type: 'string',
      required: false,
      description: 'Album description',
    },
  ],
})
@UseInterceptors(FilesInterceptor('files', 5))
@Post('photos/album')
createAlbum(
  @Body('albumName') albumName: string,
  @Body('description') description?: string,
  @UploadedFiles() files?: Array<Express.Multer.File>,
) {
  return this.photosService.createAlbum({
    name: albumName,
    description,
    photos: files,
  });
}
```

**Client Usage:**
```javascript
const formData = new FormData();
// Add multiple files
fileInputs.forEach(file => {
  formData.append('files', file);
});
formData.append('albumName', 'Vacation 2024');
formData.append('description', 'Summer vacation photos');
await fetch('/api/photos/album', { method: 'POST', body: formData });
```

---

## Example 7: Complex Nested Object

```typescript
// DTO Definition
export class OrderMetadataDto {
  @IsString()
  customerNotes?: string;

  @IsObject()
  shippingAddress?: {
    street: string;
    city: string;
    zipCode: string;
  };

  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}

// Controller
@FileUpload('invoice', {
  additionalFields: [
    {
      name: 'orderId',
      type: 'string',
      required: true,
      description: 'Order ID',
    },
    {
      name: 'metadata',
      type: 'object',
      schema: OrderMetadataDto,
      required: false,
      description: 'Order metadata including shipping and notes',
    },
  ],
})
@UseInterceptors(FileInterceptor('invoice'))
@Post('orders/attach-invoice')
attachInvoice(
  @Body('orderId') orderId: string,
  @Body('metadata', ParseFormdataPipe) metadata?: OrderMetadataDto,
  @UploadedFile() invoice?: Express.Multer.File,
) {
  return this.ordersService.attachInvoice(orderId, invoice, metadata);
}
```

**Client Usage:**
```javascript
const formData = new FormData();
formData.append('invoice', invoiceFile);
formData.append('orderId', 'ORD-12345');
formData.append('metadata', JSON.stringify({
  customerNotes: 'Please handle with care',
  shippingAddress: {
    street: '123 Main St',
    city: 'New York',
    zipCode: '10001',
  },
  tags: ['urgent', 'fragile'],
}));
await fetch('/api/orders/attach-invoice', { method: 'POST', body: formData });
```

---

## Testing with cURL

### Simple File Upload
```bash
curl -X POST http://localhost:3001/api/files/upload \
  -F "file=@document.pdf"
```

### File with JSON Data
```bash
curl -X POST http://localhost:3001/api/todos/with-file \
  -F "file=@attachment.pdf" \
  -F 'data={"title":"My Todo","description":"With attachment","completed":false}'
```

### File with Multiple Fields
```bash
curl -X POST http://localhost:3001/api/documents/upload \
  -F "file=@report.pdf" \
  -F "title=Q4 Report" \
  -F "category=financial" \
  -F "version=2" \
  -F "isPublic=false"
```

### Multiple Files with Metadata
```bash
curl -X POST http://localhost:3001/api/photos/album \
  -F "files=@photo1.jpg" \
  -F "files=@photo2.jpg" \
  -F "files=@photo3.jpg" \
  -F "albumName=Vacation 2024" \
  -F "description=Summer photos"
```

---

## Key Points

1. **Object fields must be JSON strings** - Use `JSON.stringify()` on the client
2. **Use ParseFormdataPipe** - Automatically parses JSON strings to objects
3. **File is optional** - Use `file?` parameter unless file is required
4. **Multiple files** - Use `isArray: true` and `FilesInterceptor`
5. **Type safety** - Define DTOs for complex objects
6. **Automatic docs** - OpenAPI spec is generated automatically

## Common Patterns

### Pattern 1: Optional File with Required Data
```typescript
@FileUpload('file', {
  additionalFields: [
    { name: 'data', type: 'object', schema: MyDto, required: true }
  ],
})
```

### Pattern 2: Required File with Optional Metadata
```typescript
@FileUpload('file', {
  additionalFields: [
    { name: 'metadata', type: 'object', schema: MetadataDto, required: false }
  ],
})
```

### Pattern 3: Multiple Simple Fields
```typescript
@FileUpload('file', {
  additionalFields: [
    { name: 'title', type: 'string', required: true },
    { name: 'category', type: 'string', required: false },
    { name: 'priority', type: 'number', required: false },
  ],
})
```
