/*
**=
**===   /----------------\
**=====  Global variables
**===   \----------------/
**=
*/


var ID_scheda = document.getElementById("id-scheda").innerText;


/*
**=
**===   /------------------\
**=====  Database functions
**===   \------------------/
**=
*/


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
**===   /-----------------\
**=====  Service functions 
**===   \-----------------/
**=
*/


function inviaVoto(voto){
	var recap_voto = "Il tuo voto è: " + voto;
	recap_voto += ".\nVuoi confermare il voto?";
	if(window.confirm(recap_voto)){
		if(addVoto(ID_scheda, voto)){
			console.log("voto confermato");
			window.location.href = "voto_success.html";
		}else error("Hai già inviato il tuo voto!"); 
	}else console.log("voto non confermato");
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
