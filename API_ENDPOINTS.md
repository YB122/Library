# Library Back - API Endpoints

**Base URL**: `http://localhost:3000`

---

## Users API

### Register User

```
POST http://localhost:3000/api/users/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123",
  "role": "member"
}
```

### Login

```
POST http://localhost:3000/api/users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get All Users (Auth Required)

```
GET http://localhost:3000/api/users/users
Authorization: Bearer <token>
```

### Ban User (Auth Required)

```
PUT http://localhost:3000/api/users/ban-user/:id
Authorization: Bearer <token>
```

### Unban User (Auth Required)

```
PUT http://localhost:3000/api/users/unban-user/:id
Authorization: Bearer <token>
```

---

## Books API

### Create Book (Auth Required)

```
POST http://localhost:3000/api/books
Content-Type: application/json
Authorization: Bearer <token>

{
  "title": "Book Title",
  "author": "Author Name",
  "isbn": "1234567890",
  "quantity": 10,
  "available": 10
}
```

### Edit Book (Auth Required)

```
PUT http://localhost:3000/api/books/:id
Content-Type: application/json
Authorization: Bearer <token>

{
  "title": "Updated Title",
  "author": "Updated Author",
  "quantity": 15
}
```

### Get All Books

```
GET http://localhost:3000/api/books
```

### Search Books

```
GET http://localhost:3000/api/books/search?query=searchterm
```

### Get Book by ID (Auth Required)

```
GET http://localhost:3000/api/books/:id
Authorization: Bearer <token>
```

### Delete Book (Auth Required)

```
DELETE http://localhost:3000/api/books/:id
Authorization: Bearer <token>
```

### Ban Book (Auth Required)

```
PUT http://localhost:3000/api/books/ban-book/:id
Authorization: Bearer <token>
```

### Unban Book (Auth Required)

```
PUT http://localhost:3000/api/books/unban-book/:id
Authorization: Bearer <token>
```

---

## Transactions API

### Borrow Book (Auth Required)

```
POST http://localhost:3000/api/transactions/borrow/:userId/:bookId
Authorization: Bearer <token>
```

### Return Book (Auth Required)

```
PUT http://localhost:3000/api/transactions/return/:transactionId
Authorization: Bearer <token>
```

### Get User Transactions (Auth Required)

```
GET http://localhost:3000/api/transactions/user
Authorization: Bearer <token>
```

### Get All Transactions - Admin (Auth Required)

```
GET http://localhost:3000/api/transactions/admin
Authorization: Bearer <token>
```

---

## Quick Test with cURL

```bash
# Register
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","password":"password123","confirmPassword":"password123"}'

# Login
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password123"}'

# Get Books
curl http://localhost:3000/api/books

# Search Books
curl "http://localhost:3000/api/books/search?query=keyword"

# Create Book (replace TOKEN)
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"title":"New Book","author":"Author","isbn":"123456","quantity":5}'

# Borrow Book (replace TOKEN, USER_ID, BOOK_ID)
curl -X POST http://localhost:3000/api/transactions/borrow/USER_ID/BOOK_ID \
  -H "Authorization: Bearer TOKEN"

# Return Book (replace TOKEN, TRANSACTION_ID)
curl -X PUT http://localhost:3000/api/transactions/return/TRANSACTION_ID \
  -H "Authorization: Bearer TOKEN"
```

