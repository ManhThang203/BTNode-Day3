require("module-alias/register");

const express = require("express");

const { testConnection } = require("@/config/database");

// Import các Middlewares (phần mềm trung gian)
const responseFormat = require("@/middlewares/responseFormat"); // Định dạng response
const notFoundHandler = require("@/middlewares/notFoundHandler"); // Xử lý lỗi 404
const exceptionHandler = require("@/middlewares/exceptionHandler"); // Xử lý lỗi ngoại lệ
const { apiRateLimiter } = require("@/middlewares/rateLimiter"); // Giới hạn số request

// Import Routes (các tuyến đường API)
const taskRoutes = require("@/routes/task.routes");

// Tạo ứng dụng Express
const app = express();

// Lấy cổng từ biến môi trường, nếu không có thì dùng cổng 3000
const PORT = process.env.PORT || 3000;

// Middleware để phân tích dữ liệu JSON trong request body
app.use(express.json());

// Middleware để phân tích dữ liệu từ form HTML (URL-encoded)
app.use(express.urlencoded({ extended: true }));

// Áp dụng middleware định dạng response trước tiên
app.use(responseFormat);

// Áp dụng middleware giới hạn tốc độ request cho tất cả các route
app.use(apiRateLimiter);

// Các route để kiểm tra middleware hoạt động
app.get("/test-success", (req, res) => {
  // Trả về response thành công
  res.success({ message: "Xin chào thế giới" });
});

app.get("/test-error", (req, res) => {
  // Cố tình ném ra lỗi để test exception handler
  throw new Error("Lỗi thử nghiệm");
});

// Sử dụng các route cho tasks (nhiệm vụ)
app.use("/tasks", taskRoutes);

// Áp dụng middleware xử lý 404 và lỗi ngoại lệ ở cuối cùng
app.use(notFoundHandler); // Bắt các route không tồn tại
app.use(exceptionHandler); // Bắt tất cả các lỗi

// Hàm khởi động server
const startServer = async () => {
  try {
    // Kiểm tra kết nối database trước khi khởi động
    await testConnection();

    // Lắng nghe các request trên cổng đã định
    app.listen(PORT, () => {
      console.log(`Server đang chạy tại http://localhost:${PORT}`);
    });
  } catch (error) {
    // Nếu có lỗi, in ra console và thoát chương trình
    console.error("Không thể khởi động server:", error.message);
    process.exit(1); // Thoát với mã lỗi 1
  }
};

// Gọi hàm khởi động server
startServer();

// Xuất app để có thể sử dụng ở file khác (cho testing)
module.exports = app;
