require('@babel/register')()
require('babel-polyfill')

const Koa = require('koa');
const KoaViews = require('koa-views');
const KoaStatic = require('koa-static')
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { resolve } = require('path');

const Login = require('./src/containers/Login/index.js');
const login_build = require('./dist/login-v0.0.0.js');
const Users = require('./src/containers/Users/index.js');

const PORT = 8200;

const app = new Koa();
app.use(KoaStatic(resolve(__dirname, './dist')));
app.use(KoaViews(resolve(__dirname, './dist'), {
  extension: 'ejs',
  //map: { html: 'ejs' }
}));

// app.use(async (ctx) => {
//   let title = 'hello koa2'
//   await ctx.render('index', {
//     title,
//   })
// });

app.use(async ctx => {
  let stringHTML = ReactDOMServer.renderToString(require('./dist/login-v0.0.0.js'));
  await ctx.render('index', {
    main: stringHTML
  })
});

app.listen(PORT, () => {
  console.log('listening on port ' + PORT);
});