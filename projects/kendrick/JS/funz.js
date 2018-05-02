// JavaScript Document
var es = 0;
var sE;
var distAlto, bioT, altezzaHeader;
var p1, p2;

//funzione che permette di spostarsi nella pagina in modo che l'header coincida con la grandezza effettiva del div
function linka(dove){
	var altezza = document.getElementById(dove).clientHeight;
	var head = document.getElementById("header").clientHeight;
	var he = document.getElementById(dove);
	var ofs = parseInt(he.offsetTop);

	/*
	console.log("Altezza header:" + head);
	console.log("Altezza sezione:" + altezza);
	console.log("offset TOP: " + ofs);
	*/

	window.scrollTo(0, (ofs-head));
}
/*
function goto(){
	/*var h = document.getElementById("header").clientHeight;
	var he = document.getElementById("bio");
	var ofs = parseInt(he.offsetTop);
	window.scrollTo(0, (ofs-h));
	
	//si rileva se lo scrollo viene effettuato verso il basso o verso l'alto
	bioT = document.getElementById("bio").offsetTop;
	distAlto = document.documentElement.scrollTop;
	console.log(distAlto);
	altezzaHeader = document.getElementById("header").clientHeight;
	sE = document.body;
	sE.addEventListener('wheel', findScrollDirectionOtherBrowsers);
	
	
}
*/
function findScrollDirectionOtherBrowsers(event){
        	var delta;
        	if (event.wheelDelta){
            	delta = event.wheelDelta;
            }else{
            	delta = -1 *event.deltaY;
            }
        	if (delta < 0){
            	console.log("giu");
				if(distAlto < bioT)
					{
						console.log("vediamo se funziona xd");
						window.scrollTo(0, (bioT-altezzaHeader))
					}
            }else if (delta > 0){
            	console.log("su");
            }
}

//semplice funzione che mantiene aggioranata la data del copyright
function cop(){
	var d = new Date()
	var anno = d.getFullYear();

	console.log(anno);

	document.getElementById("fsopra").innerHTML = "Copryrights © 4ai " + anno + "  all rights reserved";

}
/*
window.onscroll = function() {scrolla()};


function scrolla(){


	var winScroll = document.getElementsByClassName("articoli").scrollTop;
  	var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  	var scrolled = (winScroll / height) * 100;
	console.log(scrolled);

	document.getElementById("pr-bar").style.width = scrolled + "%";




}*/

function menuDiv() {
	var div = document.getElementById("mshow");
		if (div.style.display === "block") {
			div.style.display = "none";
			} else {
			div.style.display = "block";
			}
	}

function nascondi(){
	var div = document.getElementById("mshow");
	div.style.display = "none";
			}

function register(){
	var div = document.getElementById("registerform");
	document.getElementById("container").style.filter = "blur(3px)";
	div.style.display = "block";
			}

function mostra(){
	var div = document.getElementById("registerform");
	document.getElementById("container").style.filter = "blur(0px)";
	
	let n = document.getElementById("name");
	let lN = document.getElementById("lName");
	let mail = document.getElementById("mail");
	let phone = document.getElementById("tel");
	
	document.getElementById("nameErr").innerHTML = "";
	document.getElementById("lNameErr").innerHTML = "";
	document.getElementById("mailErr").innerHTML = "";
	document.getElementById("telErr").innerHTML = "";


	
	if(n.value === ""){
		document.getElementById("nameErr").innerHTML = "This field must not be blank";
	}
	
	if(lN.value === ""){
		document.getElementById("lNameErr").innerHTML = "This field must not be blank";
	}
	
	if(mail.value === ""){
		document.getElementById("mailErr").innerHTML = "This field must not be blank";
	}
	
	if(phone.value === ""){
		document.getElementById("telErr").innerHTML = "This field must not be blank";
	}
	
	p1 = document.getElementById("psw1");
	p2 = document.getElementById("psw2");
	
	document.getElementById("match").innerHTML =  "";
	p1.style.backgroundColor = "#212121";
	p2.style.backgroundColor = "#212121";
	
	if(p1.value != p2.value){
		document.getElementById("match").innerHTML =  "Passwords does not match";
		p1.style.backgroundColor = "#C9391D";
		p2.style.backgroundColor = "#C9391D";
	}
	
	if(p1.value.length < 8){
		document.getElementById("match").innerHTML =  "Password must be at least 8 characters long";
		p1.style.backgroundColor = "#C9391D";
		p2.style.backgroundColor = "#C9391D";
	}
	
	
	
	//div.style.display = "none";
}


function easteregg(){
	es += 1;
	if(es>5){
		es=0;
		alert("Created By Marian and Tommaso");
	}
}
