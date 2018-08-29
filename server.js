require('babel-core/register')()

require('babel-polyfill');

const Koa = require('koa');
const React = require('react');
const { renderToString } = require('react-dom/server');
const views = 'koa-views';
const app = new Koa();
const PORT = 8200;


app.use(require('koa-static')(__dirname + '/dist'))
// 将ejs设置为我们的模板引擎
app.use(views(path.resolve(__dirname, './public'), { map: { html: 'ejs' } }))

// response
app.use(ctx => {
  let stringHTML = renderToString(require('./src/containers/Users/index.js'));

  ctx.body = stringHTML;
})

app.listen(PORT, () => {
  console.log('listening on port ' + PORT);
});