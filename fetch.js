// import { Selector } from 'testcafe';

// fixture `Get started`
//   .page `http://devexpress.github.io/testcafe/example`;

// test('First test', async t => {
//   // test code
// });


// https://github.com/tmpvar/jsdom

let str = '';
let imgUrl = '';
let url = 'https://www.christiantoday.com/';
let $;

const http = require('http');
const https = require('https');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;


JSDOM.fromURL('https://www.christiantoday.com/').then(dom => {
  // const document = dom.window.document;
  // const bodyEl = document.body; // implicitly created
  // const pEl = document.querySelector("p");
  // const textNode = pEl.firstChild;
  // const imgEl = document.querySelector("img");
  let nav = dom.window.document.querySelectorAll('.site-nav--desktop a');
  [].forEach.call(nav, function (el) {
    JSDOM.fromURL(el.getAttribute('href')).then(dom => {
      let document = dom.window.document;
      let main = document.querySelector('.home-main-right');
      let imgs = main.querySelectorAll('img');
      [].forEach.call(imgs, function (el) {
        imgUrl += el.getAttribute('src') + '\n';
        console.log(imgUrl);
      })
    });
  });
}).then(() => {
});

// callback = function(response) {
//   response.on('data', function (chunk) {
//     str += chunk;
//   });
//   response.on('end', function () {
//     // console.log(str);
//     $ = cheerio.load(str);
//     let nav = $('.site-nav--desktop a');
//     console.log(nav.get(0).innerHTML);

//     let newHttps = https.get()
//   });
// }

// https.get(url, callback).end();
