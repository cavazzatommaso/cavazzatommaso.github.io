var ct = 0;

function aggiungi(){
  console.log("function aggiungi");
  ct = ct + 1;
  //take the table
  var table = document.getElementById('tabella');
  //Create a new Row
	var newRow = document.createElement('tr');
  //Create the 4 collumn
  var colText = document.createElement('td');
  var colCopy = document.createElement('td');
  var colCancell = document.createElement('td');
  var colCopyText = document.createElement('td');
  //Create the element
  var inputText = document.createElement('input');
  var btnCopy = document.createElement('input');
  var btnCancell = document.createElement('input');
  var inputCopy = document.createElement('input');
  //Some style for the button
  btnCancell.setAttribute("type","button");
	btnCancell.setAttribute("value","Cancella");
  btnCancell.setAttribute("class","btn");
  btnCancell.setAttribute("onclick","cancella(this.parentNode)");
  btnCopy.setAttribute("type","button");
  btnCopy.setAttribute("value","Copia");
  btnCopy.setAttribute("id",ct);
  btnCopy.setAttribute("class","btn copia");
  btnCopy.setAttribute("onclick","copia(this)");
  //Style for the input
  inputText.setAttribute("placeholder","Inserisci il testo");
  inputText.setAttribute("id","inputText"+ct);
  inputText.setAttribute("class","input");
  inputCopy.setAttribute("placeholder","Premi copia per incollare qui il testo");
  inputCopy.setAttribute("id","inputCopy"+ct);
  inputCopy.setAttribute("class","input");
  //Append the new element to the collumn
  colText.appendChild(inputText);
  colCopy.appendChild(btnCopy);
  colCancell.appendChild(btnCancell);
  colCopyText.appendChild(inputCopy);
  //Append the new collumn to the row
	newRow.appendChild(colText);
  newRow.appendChild(colCopy);
  newRow.appendChild(colCancell);
  newRow.appendChild(colCopyText);
  //append the new row on the table
	table.appendChild(newRow);
}

function cancella(riga)
			{
        console.log("function cancella");
        console.log(riga);
        riga.parentNode.remove(riga);
			}

function copia(riga){
    console.log("function copia");
    console.log(riga);
    var inputText = document.getElementById("inputText"+riga.id).value;
    document.getElementById("inputCopy"+riga.id).setAttribute("value",inputText);
}
