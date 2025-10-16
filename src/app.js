import express from 'express';
import cors from 'cors';
import eventrouter from './routes/EventRoutes.js';
import userrouter from './routes/UserRoutes.js';


const app = express();
// 
app.use(cors());
// for parsing application/json
app.use(express.json());
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
//routes
app.use('/api',eventrouter)
app.use('/api',userrouter)
app.get('/', (req, res) => {
    res.send('hello world')
})





export default app