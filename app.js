var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose=require('mongoose')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const errorHandler = require('./middleware/errorHandler');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/contacts', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(errorHandler)

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });


// MONGOOSE SETUP
// const PORT = process.env.PORT || 6000
// mongoose.connect(process.env.MONGO_URL,{
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// } ).then(()=> {
//   app.listen(PORT,()=> console.log(`Server Port : ${PORT}`));
// }).catch((error)=> console.log(`${error} did not connect`));


const connectDb = async () => {
  try{
      const connect = await mongoose.connect(process.env.CONNECTION_STRING);
      console.log(
          "Database connected: ",
          connect.connection.host,
          connect.connection.name); 
  }catch(err){
      console.log(err);
      process.exit(1);
  }
}

connectDb();

module.exports = app;
