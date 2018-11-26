/*
**=       ____ _       _           _                     _       _     _           
**==     / ___| | ___ | |__   __ _| |   __   ____ _ _ __(_) __ _| |__ | | ___  ___ 
**===   | |  _| |/ _ \| '_ \ / _` | |   \ \ / / _` | '__| |/ _` | '_ \| |/ _ \/ __|
**===   | |_| | | (_) | |_) | (_| | |    \ V / (_| | |  | | (_| | |_) | |  __/\__ \
**==     \____|_|\___/|_.__/ \__,_|_|     \_/ \__,_|_|  |_|\__,_|_.__/|_|\___||___/
**=                                                                              
*/


var dateObj = new Date();
var mese = dateObj.getUTCMonth() + 1;
var display_mese = mese;
var giorno = dateObj.getUTCDate();
var anno = dateObj.getUTCFullYear();
var oggi = giorno + " / " + mese + " / " + anno;
var monthText = ["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"];


/*
**=      ____                  _               __                  _   _                 
**==    / ___|  ___ _ ____   _(_) ___ ___     / _|_   _ _ __   ___| |_(_) ___  _ __  ___ 
**===   \___ \ / _ \ '__\ \ / / |/ __/ _ \   | |_| | | | '_ \ / __| __| |/ _ \| '_ \/ __|
**===    ___) |  __/ |   \ V /| | (_|  __/   |  _| |_| | | | | (__| |_| | (_) | | | \__ \
**==    |____/ \___|_|    \_/ |_|\___\___|   |_|  \__,_|_| |_|\___|\__|_|\___/|_| |_|___/
**=                                                                                    
*/


function buildToday(){
	var campo_oggi = document.getElementById("oggi");
	campo_oggi.innerHTML = oggi;
}

function buildMonth(){
	displayMonth(mese-1);
}

function displayMonth(month){
	var campo_mese = document.getElementById("mese");
	campo_mese.innerHTML = monthText[month].toUpperCase();
	display_mese = month + 1;
}

function nextMonth(){
	var indice = display_mese - 1;
	indice++;
	displayMonth(indice%12)
}

function prevMonth(){
	var indice = display_mese - 1;
	indice--;
	if(indice < 0) indice = 11;
	displayMonth(indice%12)
}


