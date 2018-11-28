/*
**=            /##################################################################################\
**===         /#########____######_____####_____####_____####____####_____####____####____#########\
**=====      /#########|  _ \####|  _  |##|_   _|##|  _  |##|  _ \##|  _  |##|  __|##|  __|#########\
**=======    ##########| | \ \###| |_| |####| |####| |_| |##| |_|/##| |_| |##| |__###| |_  ##########
**=========  ##########| | |  |##|  _  |####| |####|  _  |##|  _ |##|  _  |##|__  |##|  _|###########
**=======    ##########| |_/ /###| | | |####| |####| | | |##| |_|\##| | | |###__| |##| |__###########
**=====      \#########|____/####|_| |_|####|_|####|_| |_|##|____/##|_| |_|##|____|##|____|#########/
**===         \####################################################################################/
**=            \##################################################################################/
*/
               


/*     Formato informazione:

	   database :   [ utente1, utente2, ... utenteN ] 
	   utente:      [ CID, password, e-mail, nome, cognome, CF, municipio , Array-Votazioni ]
	   votazione:   [ ID, voto:stringa ]
*/

var votazione1 = new Array(new Array(1, "lista1 nopreferenze"))
var votazione2 = new Array(new Array(2, "lista4 nome cognome2"))
var utente1 = new Array("AX1234567", "utente1", "dicampi@gmail.com", "Davide", "Di Campi", "DCMDDB97B04H501R", "5", votazione1)
var utente2 = new Array("CX12345AB", "utente2", "colagrossi@gmail.com", "Tiziano", "Colagrossi", "CLGTZN97L29L182J", "1", votazione2) 


/*
**=      ____  _         _____                 _   _                 
**==    |  _ \| |__     |  ___|   _ _ __   ___| |_(_) ___  _ __  ___ 
**===   | | | | '_ \    | |_ | | | | '_ \ / __| __| |/ _ \| '_ \/ __|
**===   | |_| | |_) |   |  _|| |_| | | | | (__| |_| | (_) | | | \__ \
**==    |____/|_.__/    |_|   \__,_|_| |_|\___|\__|_|\___/|_| |_|___/
**=                                                                
*/


export function inizializeDB(){
	db = new Array(utente1, utente2);
	refreshDB(db);
}

export function getDB(){
	return JSON.parse(localStorage.getItem('db'));
}

export function refreshDB(localDb){
	localStorage.setItem('db', JSON.stringify(localDb));
}

export function eraseDB(){
	localStorage.clear();
}

export function printDB(){
	console.log(getDB());
}

export function containsDB(ID_value){
	var localDb = getDB();
	for(i=0; i<localDb.length; i++){
		if(localDb[i][0] == ID_value) return true;
	}
	return false;
}

function addEntry(CID, pw, email, nome, cognome, CF, mun){
	var new_entry = new Array(CID, pw, email, nome, cognome, CF, mun, new Array());
	addUser(new_entry);
}

function addUser(user){
	var localDb = getDB();
	if(localDb == null) {
		inizializeDB();
		addUser(user);
	}
	else{
		localDb[localDb.length] = user;
		refreshDB(localDb);
	}
}

function getUser(ID_value){
	var localDb = getDB();
	for(i=0; i<localDb.length; i++){
		if(localDb[i][0] == ID_value) return localDb[i];
	}
	return null;
}

function setUser(ID_value, userToSet){
	var local_db = getDB();
	for(i=0; i<localDb.length; i++){
		if(localDb[i][0] == ID_value) {
			localDb[i] = userToSet;
			break;
		}
	}
}

function getLoggedUser(){
	return JSON.parse(localStorage.getItem('logged_user'));
}

function refreshLoggedUser(user){
	localStorage.setItem('logged_user', JSON.stringify(user));
}

function addVoto(id, risultato){
	var local_db = getDB();
	var current_user = getLoggedUser();
	var nuova_votazione = new Array(id, risultato);
	var votazioni_utente = current_user[7];
	
	if(votazioni_utente.length == 0) votazioni_utente = new Array(nuova_votazione);  // non so se è necessario, data com'è fatta
	else votazioni_utente[votazioni_utente.length] = nuova_votazione;                // la registrazione di un nuovo utente
	current_user[7] = votazioni_utente;
	setUser(current_user[0], current_user);
	
	refreshLoggedUser(current_user);
	refreshDB(local_db);
}


/*
**=            /#######################################################\
**===         /#############_# #_####_____####__  __####_###############\
**=====      /#############| | | |##|_   _|##|  \/  |##| |###############\
**=======    ##############| |_| |####| |####|      |##| |################
**=========  ##############|  _  |####| |####| |\/| |##| |################
**=======    ##############| | | |####| |####| |  | |##| |__##############
**=====      \#############|_| |_|####|_|####|_|  |_|##|____|############/
**===         \#########################################################/
**=            \#######################################################/
*/



/*
**=       ____ _       _           _                     _       _     _           
**==     / ___| | ___ | |__   __ _| |   __   ____ _ _ __(_) __ _| |__ | | ___  ___ 
**===   | |  _| |/ _ \| '_ \ / _` | |   \ \ / / _` | '__| |/ _` | '_ \| |/ _ \/ __|
**===   | |_| | | (_) | |_) | (_| | |    \ V / (_| | |  | | (_| | |_) | |  __/\__ \
**==     \____|_|\___/|_.__/ \__,_|_|     \_/ \__,_|_|  |_|\__,_|_.__/|_|\___||___/
**=                                                                              
*/


var ID_reg_expression = /[A-Z][A-Z]\d{7}|C[A-Z]\d{5}[A-Z][A-Z]/;
var Email_reg_expression = /[A-Z||a-z||0-9]+@[A-Z||a-z]+\.[A-Z||a-z]/;
var CF_reg_expression = /[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]/;


/*
**=     __     __    _ _     _       _   _                  __                  _   _                 
**==    \ \   / /_ _| (_) __| | __ _| |_(_) ___  _ __      / _|_   _ _ __   ___| |_(_) ___  _ __  ___ 
**===    \ \ / / _` | | |/ _` |/ _` | __| |/ _ \| '_ \    | |_| | | | '_ \ / __| __| |/ _ \| '_ \/ __|
**===     \ V / (_| | | | (_| | (_| | |_| | (_) | | | |   |  _| |_| | | | | (__| |_| | (_) | | | \__ \
**==       \_/ \__,_|_|_|\__,_|\__,_|\__|_|\___/|_| |_|   |_|  \__,_|_| |_|\___|\__|_|\___/|_| |_|___/
**=                                                                                                 
*/


function validateID(ID_value){
	if(ID_value == "") return false;
	var ret_boolean = ID_reg_expression.test(ID_value);
	return ret_boolean;
}

function validatePW(ID_value, PW_value){
	if(PW_value == "") return -3;
	var db = JSON.parse(localStorage.getItem("db"));
	
	for(i=0; i<db.length; i++){
		if(db[i][0] == ID_value){
			if(db[i][1] == PW_value) return 1;
			else{
				return -2;
			}
		}
	}
	return -1;
}

function validateEmail(Email_value){
	if(Email_value == "") return false;
	var ret_boolean = Email_reg_expression.test(Email_value);
	return ret_boolean;
}

function validateCF(CF_value){
	if(CF_value == "") return false;
	var ret_boolean = CF_reg_expression.test(CF_value);
	return ret_boolean;
}

function validateSecretCode(secret_code){
	//controllo del codice da implementare
	console.log("----TODO codice segreto----");
	return (secret_code != "");
}


/*
**=      ____                  _               __                  _   _                 
**==    / ___|  ___ _ ____   _(_) ___ ___     / _|_   _ _ __   ___| |_(_) ___  _ __  ___ 
**===   \___ \ / _ \ '__\ \ / / |/ __/ _ \   | |_| | | | '_ \ / __| __| |/ _ \| '_ \/ __|
**===    ___) |  __/ |   \ V /| | (_|  __/   |  _| |_| | | | | (__| |_| | (_) | | | \__ \
**==    |____/ \___|_|    \_/ |_|\___\___|   |_|  \__,_|_| |_|\___|\__|_|\___/|_| |_|___/
**=                                                                                    
*/


function log_in(){
	console.log("Trying login");
	var ID_value = document.getElementsByName('name')[0].value;
	var PW_value = document.getElementsByName('password')[0].value;
	if(validateID(ID_value)){
		var log_ret = validatePW(ID_value, PW_value);
		switch(log_ret){
			case 1: 
				var current_user = getUser(ID_value);
				localStorage.setItem('logged_user', JSON.stringify(current_user)); 
				console.log("Succesfully logged");
				window.location.href = "profilo.html";
				break;
			case -1:
				error("Carta d'Identità non registrata");
				break;
			case -2:
				error("Password non corretta");
				break;
			case -3:
				error("La password non può essere vuota");
				break;
			default:
				error("Errore irreparabile del Kernel");
		}
	}else error("Carta d'Identità non valida");
}

function log_out(){
	localStorage.setItem('logged_user', JSON.stringify(null));
	window.location.href = "index.html";
}

function register(){
	console.log("Trying registration");
	var nome = document.getElementsByName("nome")[0].value;
	var cognome = document.getElementsByName("cognome")[0].value;
	var ID_value = document.getElementsByName("cid")[0].value;
	var CF_value = document.getElementsByName("cf")[0].value;
	var email = document.getElementsByName("email")[0].value;
	var password = document.getElementsByName("pw")[0].value;
	var confirm_pw = document.getElementsByName("confirmpw")[0].value;
	var municipio = document.getElementsByName("municipio")[0].value;
	
	if(nome != ""){
		if(cognome != ""){
			if(validateID(ID_value)){
				if(validateCF(CF_value)){
					if(password != ""){
						if(password == confirm_pw){
							if(!containsDB(ID_value)){
								var new_user = new Array(ID_value, password, email, nome, cognome, CF_value, municipio, new Array());
								addUser(new_user); 
								console.log("Succesfully registered");
								window.location.href=("reg_success.html");
							}else error("Carta d'Identità già registrata");						
						}else error("Le password inserite non corrispondono");
					}else error("Password non valida")
				}else error("Codice fiscale non valido");
			}else error("Carta d'Identità non valida");
		}else error("Cognome non valido");
	}else error("Nome non valido");
}

function recoverPw(){
	console.log("Trying to recover pw");
	var ID_value = document.getElementsByName("cid")[0].value;
	if(validateID(ID_value)){
		var hidden_div = document.getElementById("hiddenText");
		hidden_div.removeAttribute("hidden");
	}else error("Carta d'Identità non valida");
}

function insertSecretCode(){
	var secret_code = document.getElementsByName("code")[0].value;
	if(validateSecretCode(secret_code)){
		console.log("Succesfully recovered");
		window.location.href=("recpw_success.html");
	}else error("Codice inserito non valido");
}

function modifyPassword(){
	var localDb = getDB();
	var current_user = getLoggedUser();
	var old_pw = document.getElementById("old_pw").value;
	var new_pw = document.getElementById("new_pw").value;
	var confirm_pw = document.getElementById("confirm_pw").value;
	
	if(validatePW(current_user[0], old_pw)){
		if(new_pw == confirm_pw){
			for(i=0; i<localDb.length; i++){
				if(localDb[i][0] == current_user[0]){
					current_user[1] = new_pw;
					localDb[i][1] = new_pw;
					break;
				}
			}
		}else error("Le nuove password inserite non corrispondono");
	}else error("Password non corretta");
	
	refreshLoggedUser(current_user);
	refreshDB(localDb);
	window.location.href = "change_pw_success.html";
}

function modifyEmail(){
	var localDb = getDB();
	var current_user = getLoggedUser();
	var pw = document.getElementById("e-pw").value;
	var new_email = document.getElementById("email").value;
	
	if(validatePW(current_user[0], pw)){
		for(i=0; i<localDb.length; i++){
			if(localDb[i][0] == current_user[0]){
				current_user[2] = new_email;
				localDb[i][2] = new_email;
				break;
			}
		}
	}else error("Password non corretta");
	
	refreshLoggedUser(current_user);
	refreshDB(localDb);
	window.location.href = "change_email_success.html";
}

function error(error_message){
	window.alert(error_message);
}
