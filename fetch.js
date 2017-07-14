let url = '',
    pages = 18,
    blockSelector = '#category_content',
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
// JSDOM.fromURL(url).then(dom => {
  // let linkElements = dom.window.document.querySelectorAll('.site-nav--desktop a');
  let pageCount = 1;

  // open all the pages
  for (var i = 1; i <= pages; i++) {
  // [].forEach.call(linkElements, function (el) {

    JSDOM.fromURL(url + i + '.html').then(dom => {
      let document = dom.window.document,
          block = document.querySelector(blockSelector);

      // the main block which contains the data 
      if (block) {
        let items = block.querySelectorAll('.regular_company, .sponsor_company'),
            result = '';

        // concatenate the data to a single string
        [].forEach.call(items, function (el) {
          let linkEl = el.querySelector('.company-title .map_link'), 
              detail = el.querySelector('.tag_text'),
              str = '',
              link = '',
              name = '',
              website = '',
              detailContent;

          if (linkEl) {
            name = linkEl.textContent;
          }
          
          if (detail) {
            detailContent = detail.textContent
              .replace('更多地址>>', '')
              .replace(/地址/g, '\n地址')
              .replace('电话', '\n电话')
              .replace('分类', '\n分类')
              .replace('华人律师>', '');
          }

          str = '\n\n' + name + detailContent;

          if (linkEl) {
            link = '' + linkEl.getAttribute('href');

            JSDOM.fromURL(link).then(dom => {
              let innerDocument = dom.window.document,
                  websiteLink = innerDocument.querySelector('.company_view_top .company_item a[itemprop="url"]');
              if (websiteLink) {
                website = '\n网址：' + websiteLink.textContent;
              }

              result = str + website;

              // write the string into file
              fs.appendFile(myFile, result, (err) => {
                if (err) { return console.log(err); }
              });
            });
          } else {
            result = str;
            console.log(result);

            // write the string into file
            fs.appendFile(myFile, result, (err) => {
              if (err) { return console.log(err); }
            });
          }

        });

      // } else {
      //   console.log(document.location.href);
      }
    });
  // });
  }

// });