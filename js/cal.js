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

function getLastDay(month){
	switch(month+1){
		case 1: return 31;
		case 2: return 28;
		case 3: return 31;
		case 4: return 30;
		case 5: return 31;
		case 6: return 30;
		case 7: return 31;
		case 8: return 31;
		case 9: return 30;
		case 10: return 31;
		case 11: return 30;
		case 12: return 31;
	}
}

function buildDays(year, month){
	var objDate =  new Date(year, month, 1);
	var first_day = objDate.getDay();
	if(first_day == 0) first_day = 7;
	var last_day = getLastDay(month);
	var active_month = false; 
	var counter = (new Date(year, month, 2 - (first_day)) ).getDate();
	var giorno;
	var index;
	
	//console.log(first_day);
	console.log(last_day);
	console.log(month);
	
	for(i=1; i<7; i++){
		for(j=1; j<8; j++){
		
			if(i==1 && j==first_day){
				active_month = true;
				counter = 1;
			}
			else if(i>=5 && counter==last_day+1){
				active_month = false;
				counter = 1;
			}
			
			index = i.toString()+"_"+j.toString();
			giorno = document.getElementById(index);
			var lista_classi = giorno.classList;
			
			//if(active_month) giorno.className -= " no-mo";
			//else giorno.className += " no-mo";
			
			if(active_month) lista_classi.remove("no-mo");
			else lista_classi.add("no-mo");
			
			giorno.innerText = counter;
			
			counter++;
		}
	}
}

function buildMonth(){
	displayMonth(mese-1);
}

function displayMonth(month){
	var campo_mese = document.getElementById("mese");
	campo_mese.innerHTML = monthText[month].toUpperCase();
	display_mese = month + 1;
	buildDays(2018, month);
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



