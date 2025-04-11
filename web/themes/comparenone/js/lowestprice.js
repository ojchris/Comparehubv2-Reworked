//var tableDiv = document.getElementById("comparison-table"), minVal;
var table = document.querySelector("table").get(0), minVal;
var body = table.find('tbody');
//var rows = body.find('tr');
let minRow = 1;
let minCell = 0;
    for(var i = 0; i < table.body.rows.cells.length; i++)
    {
      // if its the first col get the value
      if(i === 0){
          minVal = table.body.rows[minRow].cells[i].innerHTML;

      }
     // test with the other values
     else if(minVal > table.body.rows[minRow].cells[i].innerHTML){
       minVal = table.body.rows[minRow].cells[i].innerHTML;
       minCell = i; 
     }
   }

//let row = table.body.rows[minRow];
//row.style.backgroundColor = 'red';

let alert = document.getElementById("table").rows[minRow].cells[minCell];
alert.style.backgroundColor = '#04AA6D';