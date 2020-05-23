const express = require('express');
const app = express();
const fs = require('fs');
const csv = require('csv-parser');
const results = [];
var emptyObj = {};

function isEmpty(obj) {
    for(var prop in obj) {
      if(obj.hasOwnProperty(prop)) {
        return false;
      }
    }
  
    return true;
  }

app.get('/comments', (req, res) => {
    fs.createReadStream('comments.csv')
        .pipe(csv())
        .on('data', (row) => {
            if (!isEmpty(row)){
                results.push(row);
            }
        })
        .on('end', () => {
            res.send({
                data:{
                    param: JSON.stringify(results)
                }
            });
        });
});


app.listen(3000);