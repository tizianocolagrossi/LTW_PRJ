var ID_reg_expression = /[A-Z][A-Z]\d{7}/;
var regexpID = RegExp('[A-Z][A-Z]\d{7}');

function validateID(){
	var text_value = document.getElementByName("name").value;
	var ret_boolean = regexpID.test(text_value);
	console.log(ret_boolean);
	return ret_boolean;
}

function validatePW(ID_code){
	//dato il codice della carta d'identità (precedentemente controllato), controllare da file se la password è valida
}


