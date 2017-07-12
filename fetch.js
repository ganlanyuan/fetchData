let url = 'website',
    urlBase = '',
    pages = 200,
    blockSelector = '.home-main-right',
    myFile = 'data.txt';

const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// === clear file content before fetching ===
fs.truncate(myFile, 0, (err) => {
  if (err) { return console.log(err); }
  console.log('File content cleared. \n==============>');
})

// === fetching start ===
JSDOM.fromURL(url).then(dom => {
  let linkElements = dom.window.document.querySelectorAll('.site-nav--desktop a');
  let pageCount = 1;

  // open all the pages
  // for (var i = 1; i <= pages; i++) {
  [].forEach.call(linkElements, function (el) {

    JSDOM.fromURL(el.getAttribute('href')).then(dom => {
      let document = dom.window.document,
          block = document.querySelector(blockSelector);

      // the main block which contains the data 
      if (block) {
        let items = block.querySelectorAll('article, li'),
            result = '';

        // concatenate the data to a single string
        [].forEach.call(items, function (el) {
          var img = el.querySelector('img');
          if (img) { 
            src = img.getAttribute('src');
            img = src.slice(0, src.indexOf('?')).replace('/thumb/', '/full/'); 
          }

          var heading = el.querySelector('h2') || el.querySelector('h3') || el.querySelector('h4');
          if (heading) { heading = heading.textContent; }

          result += 
              'Image: ' + img + '\n' +
              'Heading: ' + heading + '\n\n';
        })

        // write the string into file
        fs.appendFile(myFile, result, (err) => {
          if (err) { return console.log(err); }

          console.log('Page ' + pageCount + ' finished.')
          pageCount++;
        })

      // } else {
      //   console.log(document.location.href);
      }
    });
  });
  // }

});