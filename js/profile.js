function buildProfileName(){
	var campo_nome = document.getElementById('Nome');
	campo_nome.innerHTML = JSON.parse(localStorage.getItem('logged_user'))[3] + " " + JSON.parse(localStorage.getItem('logged_user'))[4];
	
}

function buildProfileCid(){
	var campo_cid = document.getElementById('Cid');
	campo_cid.innerHTML = "ID: " + JSON.parse(localStorage.getItem('logged_user'))[0];
}

function buildProfileMun(){
	var campo_mun = document.getElementById('Mun');
	campo_mun.innerHTML = "MUNICIPIO: " + JSON.parse(localStorage.getItem('logged_user'))[6];
}

