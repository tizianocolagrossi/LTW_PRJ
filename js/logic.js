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
	//dato il codice della carta d'identità (precedentemente controllato), controllare da file se la password è associata a quell'ID
	console.log("---TODO password---")
	return true;
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
		if(validatePW(ID_value, PW_value)){
			console.log("Succesfully logged");
			error("---TODO login---");
			//window.location("url-pagina-loggata");
			
		}else error("Password non valida");
	}else error("Carta d'Identità non valida");
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
							console.log("Succesfully registered");
							console.log("---TODO salvataggio dei dati---");
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
