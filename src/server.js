// src/server.js
import express from 'express';
import dotenv from 'dotenv';
import codeReviewRoutes from './routes/codeReview.js';

dotenv.config();
const app = express();
app.use(express.json());

app.use('/api/code-review', codeReviewRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});