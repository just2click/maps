const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express()
const http = require('http').createServer(app);

// routes
const authRoutes = require('./api/auth/auth.routes');
const userRoutes = require('./api/user/user.routes');   
const coordinateRoutes = require('./api/coordinate/coordinate.routes');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  }),
);

// server settings
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')));
} else {
    const corsOptions = {
        origin: 'http://localhost:3000', 
        credentials: true
    };
    app.use(cors(corsOptions));
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

// use routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/coordinate', coordinateRoutes);

app.use(express.static('public'));

const port = 3030;
http.listen(port, () => {
    console.info('Server is running on port: ' + port)
});