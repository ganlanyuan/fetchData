const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

function findEmails(doc) {
    var StrObj = doc.body.textContent;
    var separateEmailsBy = ", ";
    var email = ""; // if no match, use this
    var emailsArray = StrObj.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
    if (emailsArray) {
        email = "";
        for (var i = 0; i < emailsArray.length; i++) { if (i != 0) email += separateEmailsBy;
            email += emailsArray[i]; }
    }
    return email;
}

let urls = [
    ],
    myFile = 'email.txt';

// === clear file content before fetching ===
fs.truncate(myFile, 0, (err) => {
  if (err) { return console.log(err); }
  console.log('File content cleared. \n==============>');
})

// === fetching start ===
urls.forEach(function (url) {
  JSDOM.fromURL(url).then(dom => {
    let document = dom.window.document,
        email = findEmails(document);

    // write the string into file
    fs.appendFile(myFile, url + '\n' + email + '\n\n', (err) => {
      if (err) { return console.log(err); }
    });
  });
});