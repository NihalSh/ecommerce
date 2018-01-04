const app = require('./app');

app.set('port', process.env.PORT || 60001);
app.listen(app.get('port'));
