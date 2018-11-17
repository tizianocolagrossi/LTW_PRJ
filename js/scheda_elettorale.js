function validateScheda(){
	var lista_scelta;
	var candidato_scelto;
	
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
	
	var numero_lista_candidato = candidato_scelto.parentElement.className[13]; 
	if(lista_scelta.value != numero_lista_candidato) return false;
	else return true;
	
}

function inviaVoto(){
	var scheda_valida = validateScheda();
	if(scheda_valida){
		console.log("scheda valida");
		//window.location.href="url-recap-voto";
	}
	else error("La scheda non è valida");
}

function error(error_message){
	window.alert(error_message);
}
