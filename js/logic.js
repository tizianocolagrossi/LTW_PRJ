/*====== Global variables =======*/

var ID_reg_expression = /[A-Z][A-Z]\d{7}||C[A-Z]\d{5}[A-Z][A-Z]/;
var Email_reg_expression = /[A-Z||a-z||0-9]+@[A-Z||a-z]+\.[A-Z||a-z]/
var CF_reg_expression = /[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]/

function inizializeDB(){
	var file = new File([txt], "database.txt", {type: "application/octet-stream"});
	//var blobUrl = (URL || webkitURL).createObjectURL(file);
}

/*====== Validate functions ======*/

function validateID(ID_value){
	var ret_boolean = ID_reg_expression.test(ID_value);
	if(!ret_boolean) error("Carta d'identità non valida");
	return ret_boolean;
}

function validatePW(ID_value, PW_value){
	//dato il codice della carta d'identità (precedentemente controllato), controllare da file se la password è associata a quell'ID
	error("---TODO password---");
	return true;
}

function validateEmail(Email_value){
	var ret_boolean = Email_reg_expression.test(Email_value);
	if(!ret_boolean) error("E-mail non valida");
	return ret_boolean;
}

function validateCF(CF_value){
	var ret_boolean = CF_reg_expression.test(CF_value);
	if(!ret_boolean) error("Codice fiscale non valido");
	return ret_boolean;
}

/*====== Service functions ======*/

function login(){
	var ID_value = document.getElementsByName('name')[0].value;
	var PW_value = document.getElementsByName('password')[0].value;
	if( validateID(ID_value) && validatePW(ID_value, PW_value) ){
		error("---TODO login---");
		//window.location("url-pagina-loggata");
	}
}

function register(){
	var nome = document.getElementsByName("nome")[0].value;
	var cognome = document.getElementsByName("cognome")[0].value;
	var ID_value = document.getElementsByName("cid")[0].value;
	var CF_value = document.getElementsByName("cf")[0].value;
	var email = document.getElementsByName("email")[0].value;
	var password = document.getElementsByName("password")[0].value;
	var confirm_pw = document.getElementsByName("confirmpw")[0].value;
	
	if(nome != ""){
		if(cognome != ""){
			if(validateID(ID_value)){
				if(validateCF(CF_value){
					if(password == confirm_pw){
						error("---TODO salvataggio dei dati---");
						//window.location("url-pagina-successo");
						
					}else error("Le password inserite non sono uguali");
				}
			}
		}else error("Cognome non valido");
	}else error("Nome non valido");
	
}

function error(error_message){
	window.alert(error_message);
}
