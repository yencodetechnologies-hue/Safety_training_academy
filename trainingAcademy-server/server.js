const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const companyRoutes = require("./routes/companyRoutes");


dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/enrollments", require("./routes/enrollmentRoutes"));
app.use("/api/schedules", require("./routes/scheduleRoutes"))
app.use("/api/enrollment-form", require("./routes/enrollmentFormRoutes"));
app.use("/api/companies", companyRoutes);


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`);
});