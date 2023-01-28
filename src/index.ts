import app from './app'

app.listen(app.get('port'));
console.log(`inicio el server en el puerto`, app.get('port'));