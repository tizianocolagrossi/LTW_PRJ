var ID_reg_expression = /[A-Z][A-Z]\d{7} || C[A-Z]\d{5}[A-Z][A-Z]/;

function inizializeDB(){
	var file = new File([txt], "database.txt", {type: "application/octet-stream"});
	//var blobUrl = (URL || webkitURL).createObjectURL(file);
}

function validateID(ID_value){
	var ret_boolean = ID_reg_expression.test(ID_value);
	if(ret_boolean) validatePW(ID_value);
	else error("Codice non valido");
}

function validatePW(ID_value){
	error("password");
	//dato il codice della carta d'identità (precedentemente controllato), controllare da file se la password è associata a quell'ID
}

function register(){
	var ID_value = document.getElementByName("ID").value;
	if(validateID(ID_value)){
		
	}
}

function error(error_message){
	window.alert(error_message)
}
