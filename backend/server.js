import dotenv from 'dotenv';
import express from 'express';
import connectDb from './config/db.js';
import productRoutes from './routes/productRoute.js';
import userRoutes from './routes/userRoutes.js';
import colors from 'colors'
import { errorHandler, notFound } from './middleware/errorMiddleWare.js';

dotenv.config();
connectDb();
const app = express();

app.use(express.json())

app.get('/', (req, res) => res.send('API is Running '))
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 8100;
app.listen(PORT, () => {
  console.log(`Server Running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold)
})