require('babel-polyfill');

const Koa = require('koa');
const KoaViews = require('koa-views');
const React = require('react');
const { renderToString } = require('react-dom/server');
const path = require('path');

const PORT = 8200;
const app = new Koa();

app.set('view engine', {
  map: { html: 'ejs' }
});

app.use(KoaViews(path.resolve(__dirname, './view'), {
  extension: 'ejs',
}));

app.use(async (ctx) => {
  let title = 'hello koa2'
  await ctx.render('index', {
    title,
  })
});

app.use(require('koa-static')(__dirname + '/dist'));

app.use(ctx => {
  let stringHTML = renderToString(require('./src/containers/Login/index.js'));
  ctx.body = stringHTML;
});

app.listen(PORT, () => {
  console.log('listening on port ' + PORT);
});