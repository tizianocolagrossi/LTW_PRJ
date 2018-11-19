/*
**=
**===   /---------------\
**=====     Database
**===   \---------------/
**=
*/


// formato informazione:   [CID, pw, e-mail, nome, cognome, CF, municipio]
var utente1 = new Array("AX1234567", "utente1", "dicampi@gmail.com", "Davide", "Di Campi", "DCMDDB97B04H501R", "5")
var utente2 = new Array("CX12345AB", "utente2", "colagrossi@gmail.com", "Tiziano", "Colagrossi", "CLGTZN97L29L182J", "1") 
var utente3;

var db = new Array(utente1, utente2);

function addEntry(CID, pw, email, nome, cognome, CF, mun){
	var new_entry = new Array(CID, pw, email, nome, cognome, CF, mun);
	db[db.length] = new_entry;
}

function addUser(user){
	db[db.length] = user;
}


/*
**=
**===   /----------------\
**=====  Global variables
**===   \----------------/
**=
*/

var ID_reg_expression = /[A-Z][A-Z]\d{7}|C[A-Z]\d{5}[A-Z][A-Z]/;
var Email_reg_expression = /[A-Z||a-z||0-9]+@[A-Z||a-z]+\.[A-Z||a-z]/;
var CF_reg_expression = /[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]/;

/*function inizializeDB(){
	var file = new File([txt], "database.txt", {type: "application/octet-stream"});
	var blobUrl = (URL || webkitURL).createObjectURL(file);
}
*/


/*
**=
**===   /--------------------\
**=====  Validation functions
**===   \--------------------/
**=
*/


function validateID(ID_value){
	if(ID_value == "") return false;
	var ret_boolean = ID_reg_expression.test(ID_value);
	return ret_boolean;
}

function validatePW(ID_value, PW_value){
	if(PW_value == "") return false;
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
	return (secret_code != "");
}


/*
**=
**===   /-----------------\
**=====  Service functions 
**===   \-----------------/
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
				console.log("Succesfully logged");
				window.location.href = "profilo.html";
				break;
			case -1:
				error("Carta d'Identità non registrata");
				break;
			case -2:
				error("Password sbagliata");
				break;
			default:
				error("Errore irreparabile del Kernel");
		}
	}else error("Carta d'Identità non valida");
		console.log(db);
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
							utente3 = new Array(ID_value, password, email, nome, cognome, CF_value, municipio);
							addUser(utente3);  // <------- non è permanente, diocà
							console.log("Succesfully registered");
							window.location.href=("reg_success.html");						
						}else error("Le password inserite non sono uguali");
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

function error(error_message){
	window.alert(error_message);
}
