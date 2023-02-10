export default {
    jwtSecret: process.env.JWT_SECRET || 'somesecrettoken',
    DB:{
        URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/prueba' || 'mongodb://192.168.1.107:27017/prueba',
        USER: process.env.MONGODB_USER,
        PASSWORD: process.env.MONGODB_PASSWORD
    }//railway
}