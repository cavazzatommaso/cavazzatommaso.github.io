var ct = 0;

document.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("btn_aggiungi").click();
    }
});

function aggiungi(){
  console.log("function aggiungi");
  ct = ct + 1;
  //take the table
  var table = document.getElementById('tabella');
  //Create a new Row
	var newRow = document.createElement('tr');
  //Create the 4 collumn
  var colProduct = document.createElement('td');
  var colQuantity = document.createElement('td');
  var colPrice = document.createElement('td');
  var btnCancell = document.createElement('input');
  //Some style for the button
  btnCancell.setAttribute("type","button");
	btnCancell.setAttribute("value","Elimina");
  btnCancell.setAttribute("id","btn");
  btnCancell.setAttribute("onclick","cancella('"+ct+"c')");
  newRow.setAttribute("id",ct+"c");
  //btnCancell.setAttribute("style","width:100%");
  //Bring the text from the form
	var formProduct = document.getElementById("product").value;
	var formQuantity = document.getElementById("quantity").value;
	var formPrice = document.getElementById("price").value;
  //Add the text to the new collumn
	colProduct.innerHTML = formProduct;
	colQuantity.innerHTML = formQuantity;
	colPrice.innerHTML = formPrice;
  //Append the new collumn to the row
	newRow.appendChild(colProduct);
  newRow.appendChild(colQuantity);
  newRow.appendChild(colPrice);
  newRow.appendChild(btnCancell);
  //append the new row on the table
	table.appendChild(newRow);
}

function cancella(idTr)
			{
				var c = document.getElementById(idTr);
        console.log(c);
				tabella.removeChild(c);
			}
