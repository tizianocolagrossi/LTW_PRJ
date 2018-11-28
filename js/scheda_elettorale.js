/*
**=
**===   /----------------\
**=====  Global variables
**===   \----------------/
**=
*/


var recap_voto = "";
var lista_scelta = "";
var candidato_scelto = "";
var ID_scheda = document.getElementById("id-scheda").innerText;


/*
**=
**===   /------------------\
**=====  Database functions
**===   \------------------/
**=
*/


function checkTimbro(){
	if(!votoPossibile){
		console.log("ue");
		var timbro = document.getElementById("timbro");
		timbro.style = "visibility:visible";
	}
}

function votoPossibile(){
	var current_user = JSON.parse(localStorage.getItem('logged_user'));
	var votazioni_utente = current_user[7];
	for(i=0; i<votazioni_utente.length; i++){
		if(votazioni_utente[i][0] == ID_scheda) return false;
	}
	return true;
	
}

function addVoto(id, risultato){
	var local_db = JSON.parse(localStorage.getItem('db'));
	var current_user = JSON.parse(localStorage.getItem('logged_user'));
	var nuova_votazione = new Array(id, risultato);
	var votazioni_utente = current_user[7];
	
	if(votoPossibile()){
		if(votazioni_utente.length == 0) votazioni_utente = new Array(nuova_votazione);  // non so se è necessario, data com'è fatta
		else votazioni_utente[votazioni_utente.length] = nuova_votazione;                // la registrazione di un nuovo utente
		current_user[7] = votazioni_utente;
		
		for(i=0; i<local_db.length; i++){
			if(local_db[i][0] == current_user[0]) {
				local_db[i] = current_user;
				break;
			}
		}
	
		localStorage.setItem('logged_user', JSON.stringify(current_user));
		localStorage.setItem('db', JSON.stringify(local_db));
		return true;
		
	}else return false;
}


/*
**=
**===   /--------------------\
**=====  Validation functions
**===   \--------------------/
**=
*/

function validateScheda(){
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
	
	if(lista_scelta != ""){
		recap_voto = "Hai scelto la lista " + lista_scelta.value;
		if(candidato_scelto != ""){
			recap_voto += " della quale hai scelto il candidato " + candidato_scelto.value;
			var numero_lista_candidato = candidato_scelto.parentElement.className[13]; // <----- implementazione stile Luca Giurato
			if(lista_scelta.value == numero_lista_candidato){
				recap_voto += ".\nVuoi confermare il voto?";
				return true;
			}
			else{
				recap_voto = "";
				lista_scelta = "";
				candidato_scelto = "";
				return false;
			}
		}
		else recap_voto += " senza esprimere nessuna preferenza";
		recap_voto += ".\nVuoi confermare il voto?";
		return true;
	}
	else{
		recap_voto = "";
		lista_scelta = "";
		candidato_scelto = "";
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
			var preferenza;
			if(candidato_scelto != "") preferenza = candidato_scelto.value;
			else preferenza = "noPreferenze";
			if(addVoto(ID_scheda, lista_scelta.value + preferenza)){
				console.log("voto confermato");
				window.location.href = "voto_success.html";
			}else error("Hai già inviato il tuo voto!"); 
		}else console.log("voto non confermato");
	}else error("La scheda non è valida");
}

function inviaVotoNullo(){
	var recap_voto = "Il tuo voto verrà annullato e non sarà assegnato a nessuno";
	recap_voto += ".\nVuoi confermare il voto?";
	if(window.confirm(recap_voto)){
		if(addVoto(ID_scheda, "votoNullo")){
			console.log("voto confermato");
			window.location.href = "voto_success.html";
		}else error("Hai già inviato il tuo voto!"); 
	}else console.log("voto non confermato");
}

function inviaVotoAstenuto(){
	var recap_voto = "Il tuo voto verrà dato alla maggioranza, qualunque essa sia";
	recap_voto += ".\nVuoi confermare il voto?";
	if(window.confirm(recap_voto)){
		if(addVoto(ID_scheda, "astenuto")){
			console.log("voto confermato");
			window.location.href = "voto_success.html";
		}else error("Hai già inviato il tuo voto!"); 
	}else console.log("voto non confermato");
}

function error(error_message){
	window.alert(error_message);
}
