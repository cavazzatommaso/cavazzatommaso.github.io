var utente={};

$(document).ready(function() {
               checkStudente();
	$("#modificaUtente").click(function(){
	     showForm(true);
	     $("#SkillCard").val($("#SkillCardLabel").text());
	     $("#Nome").val($("#NomeLabel").text());
	  $("#Cognome").val($("#CognomeLabel").text());
	});

	$("#salvaUtente").click(function(){
		utente.SkillCard=$("#SkillCard").val();
		utente.Nome=$("#Nome").val();
		utente.Cognome=$("#Cognome").val();
		//console.log(utente);
		localStorage.setItem("studente", JSON.stringify(utente));
		checkStudente();
	});
	$("#annullaUtente").click(function(){
		showForm(false);
	});	
});

function checkStudente(){
	if(localStorage.getItem("studente")){
	utente=$.parseJSON(localStorage.getItem("studente"));  //usare JSON.parse
	$("#SkillCardLabel").text(utente.SkillCard);
	$("#NomeLabel").text(utente.Nome);
	$("#CognomeLabel").text(utente.Cognome);
		showForm(false);
	}else{
		showForm(true);
	}
}

function showForm(val){
	if(val){
		$(".userForm").show();
		$(".userLabel").hide();
	}else{
		$(".userForm").hide();
		$(".userLabel").show();
	}
}

$(document).ready(function() {
 
	$("#calcola").click(function(){	
			
		if( $("#numero1").val()!="" && $("#numero2").val()!="" )
                            {
                                  if($("#somma").is(':checked')){
			        n1=$("#numero1").val()*1;
	               	        n2=$("#numero2").val()*1;
	                                    tot=n1+n2; 
		       }
                       
                                  if($("#sottrai").is(':checked')){
			        n1=$("#numero1").val()*1;
	                                    n2=$("#numero2").val()*1;
	                                   tot=n1-n2;   
                                  }
                       
                                   if($("#moltiplica").is(':checked')){
				n1=$("#numero1").val()*1;
	               	              n2=$("#numero2").val()*1;
	                                           tot=n1*n2;          
		       }
                       
                                   if($("#dividi").is(':checked')){
			        n1=$("#numero1").val()*1;
	                                    n2=$("#numero2").val()*1;
	                                    tot=n1/n2;    
                          }

                          $("#totale").text(tot);
	 
                     }
				
	 else  {
			alert("Non hai inserito i dati");
	          }
		
	});
		
});

