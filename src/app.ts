import express from 'express'
import cors from 'cors';
import morgan from 'morgan';
import passport from 'passport'
import passportMiddleware from './middlewares/passport';
import authRoutes from "./routes/auth.routes";
import privateroutes from "./routes/private.routes"
//inicio
const app = express();

// settings
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
passport.use(passportMiddleware);


app.get('/', (req, res) => {
  return res.send(`La API esta en http://localhost:${app.get('port')}`);
})

app.use(authRoutes);
app.use(privateroutes);


export default app;