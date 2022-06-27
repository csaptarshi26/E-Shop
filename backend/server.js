import dotenv from 'dotenv';
import express from 'express';
import connectDb from './config/db.js';
import productRoutes from './routes/productRoute.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import addressRoutes from './routes/addressRoute.js';
import colors from 'colors'
import { errorHandler, notFound } from './middleware/errorMiddleWare.js';
import path from 'path'
import morgan from 'morgan'


dotenv.config();
connectDb();
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan('dev'))
}
app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/address', addressRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))


const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));
  
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
} else {

  app.get('/', (req, res) => res.send('API is Running '))
}

app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 8100;
app.listen(PORT, () => {
  console.log(`Server Running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold)
})