# BTNode-Day3 - Express.js REST API

Dự án Express.js với MySQL database, rate limiting, và chuẩn hóa response.

## Công nghệ sử dụng

- **Express.js** - Web framework cho Node.js
- **MySQL** - Database (mysql2 driver)
- **dotenv** - Quản lý biến môi trường
- **module-alias** - Alias đường dẫn (@/)

## Cấu trúc dự án

```
BTNode-Day3/
├── server.js                 # Entry point
├── package.json              # Dependencies
├── .env                      # Biến môi trường
├── .gitignore                # Git ignore rules
├── database.sql              # SQL script tạo database
├── README.md                 # Documentation
└── src/
    ├── config/
    │   └── database.js       # MySQL connection pool
    ├── middlewares/
    │   ├── responseFormat.js # res.success() & res.error()
    │   ├── notFoundHandler.js# 404 handler
    │   ├── exceptionHandler.js# Exception handler
    │   └── rateLimiter.js    # Rate limiting
    ├── models/
    │   └── task.model.js     # Task CRUD operations
    └── routes/
        └── task.routes.js    # Task API routes
```

## Cài đặt

```bash
# Clone project
cd BTNode-Day3

# Cài dependencies
npm install

# Tạo database
mysql < database.sql

# Chạy server
npm start
```

## Cấu hình biến môi trường

Tạo file `.env`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=todo_dev
PORT=3000
```

## API Endpoints

### Tasks API

| Method | Endpoint   | Mô tả            |
| ------ | ---------- | ---------------- |
| GET    | /tasks     | Lấy tất cả tasks |
| GET    | /tasks/:id | Lấy task theo ID |
| POST   | /tasks     | Tạo task mới     |
| PUT    | /tasks/:id | Cập nhật task    |
| DELETE | /tasks/:id | Xóa task         |

### Test Endpoints

| Method | Endpoint      | Mô tả                  |
| ------ | ------------- | ---------------------- |
| GET    | /test-success | Test success response  |
| GET    | /test-error   | Test exception handler |

## Response Format

### Success Response

```json
{
  "status": "success",
  "data": { ... }
}
```

### Error Response

```json
{
  "status": "error",
  "message": "Error message",
  "error": { ... }
}
```

## Ví dụ Request

### Tạo task mới

```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Học Express.js", "completed": false}'
```

### Lấy tất cả tasks

```bash
curl http://localhost:3000/tasks
```

### Cập nhật task

```bash
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Đã học xong Express", "completed": true}'
```

### Xóa task

```bash
curl -X DELETE http://localhost:3000/tasks/1
```

## Middleware

### responseFormat

Thêm 2 method vào `res` object:

- `res.success(data, status)` - Trả về success response
- `res.error(status, message, error)` - Trả về error response

### rateLimiter

Giới hạn request theo IP:

- 100 requests/phút
- Trả về 429 "Too many requests" khi vượt giới hạn

### notFoundHandler

Xử lý route không tồn tại, trả về 404.

### exceptionHandler

Xử lý uncaught exceptions, trả về 500.

## Database Schema

```sql
CREATE TABLE tasks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Alias Paths

Sử dụng `@` thay vì `./src/`:

```javascript
const Task = require("@/models/task.model");
const db = require("@/config/database");
```

## License

MIT
