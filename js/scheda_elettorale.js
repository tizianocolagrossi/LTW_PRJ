/*
**=
**===   /----------------\
**=====  Global variables
**===   \----------------/
**=
*/


var recap_voto = "";


/*
**=
**===   /--------------------\
**=====  Validation functions
**===   \--------------------/
**=
*/

function validateScheda(){
	var lista_scelta=null;
	var candidato_scelto=null;
	
	var liste = document.getElementsByName("lista");
	for(i=0; i<liste.length; i++){
		if(liste[i].checked) lista_scelta = liste[i];
	}
	var candidati = document.getElementsByName("candidi");
	for(i=0; i< candidati.length; i++){
		if(candidati[i].checked) candidato_scelto = candidati[i];
	}
	/*  ----- Debug ----- 
	console.log("lista scelta: ");
	console.log(lista_scelta);
	console.log("candidato scelto: ");
	console.log(candidato_scelto);
	console.log("classe parent candidato: "+candidato_scelto.parentElement.className);
	console.log(candidato_scelto.parentElement.className[13]);
	*/
	
	if(lista_scelta != null){
		recap_voto = "Hai scelto la lista " + lista_scelta.value;
		if(candidato_scelto != null){
			recap_voto += " della quale hai scelto il candidato " + candidato_scelto.value;
			var numero_lista_candidato = candidato_scelto.parentElement.className[13]; // <----- implementazione stile Luca Giurato
			if(lista_scelta.value == numero_lista_candidato){
				recap_voto += ".\nVuoi confermare il voto?";
				return true;
			}
			else{
				recap_voto = "";
				return false;
			}
		}
		else recap_voto += " senza esprimere nessuna preferenza";
		recap_voto += ".\nVuoi confermare il voto?";
		return true;
	}
	else{
		recap_voto = "";
		return false;
	}
	
}	


/*
**=
**===   /-----------------\
**=====  Service functions 
**===   \-----------------/
**=
*/


function inviaVoto(){
	var scheda_valida = validateScheda();
	if(scheda_valida){
		console.log("scheda valida");
		if(window.confirm(recap_voto)){
			console.log("voto confermato");
			window.location.href = "voto_success.html";
		}
		else console.log("voto non confermato");
	}
	else error("La scheda non è valida");
}

function error(error_message){
	window.alert(error_message);
}
