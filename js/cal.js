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
var display_anno = anno;
var oggi = giorno + " / " + mese + " / " + anno;
var monthText = ["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"];


/*
**=      _____                 _       
**==    | ____|_   _____ _ __ | |_ ___ 
**===   |  _| \ \ / / _ \ '_ \| __/ __|
**===   | |___ \ V /  __/ | | | |_\__ \
**==    |_____| \_/ \___|_| |_|\__|___/
**=                                   
*/

//   Evento = [ giorno, mese: 0-11, anno,  descrizione:String ]

var evento1 = new Array(22, 11, 2018, "Fine delle lezioni");
var evento2 = new Array(3, 0, 2019, "Elezioni E Lezioni - The Movie");
var evento3 = new Array(1, 0, 2020, "Fine del mondo");
var evento4 = new Array(14, 11, 2018, "Primo giorno utile per la consegna del progetto di Linguaggi e Tecnologie per il Web. Questo testo è appositamente lungo per testare la visualizzazione in caso di descrizione più lunga e accurata di un particolare evento.");
var evento5 = new Array(5, 10, 2018, "Lorem ipsum tu matrem ea magnam baldraccam, id est ea faciat bocchinos cumsque.");
var lista_eventi = new Array(evento1, evento2, evento3, evento4, evento5);

function fillEvento(year, month, day, giorno){
	var lista_classi = giorno.classList;
	for(k=0; k<lista_eventi.length; k++){
		var evento = lista_eventi[k];
		if(evento[0] == day && evento[1] == month && evento[2] == year) {
			lista_classi.add("ev");
			giorno.addEventListener("click", showInAgenda(giorno, evento));
		}
	}
}

function showInAgenda(giorno, evento){
	var current_event = evento;
	var current_giorno = giorno;
	return function writeAgenda() {
		removeSelected();
		var descr = current_event[3];
		var container = document.getElementById("event-container");
		container.innerHTML = '<div class="evento"><div class="day"> <p class="tcv">' + current_event[0] +'<br>'+
								monthText[current_event[1]] + '</p></div>' + '<div class="info"><p>' + descr + '</p></div></div>';
								
		document.getElementsByClassName("info")[0].addEventListener("click", aggiungiPreferiti(current_event));
		
		this.classList.add("sel");  // --> per mantenere il colore
		
		var close_btn = document.getElementById("close");
		close_btn.style = "visibility: visible";
		close_btn.addEventListener("click", closeAgendaEvent(this));
	}
}

function closeAgendaEvent(cella){
	return function closeAux(){
		cella.classList.remove("sel");
		var close_btn = document.getElementById("close");
		close_btn.style = "visibility: hidden";
		close_btn.removeEventListener("click", closeAux)
		loadPreferiti();
	}
}

function eventoInPreferiti(evento){
	var local_preferiti = JSON.parse(localStorage.getItem("eventiPreferiti"));
	if(local_preferiti == null) return false;
	for(i=0; i<local_preferiti.length; i++){
		var current = local_preferiti[i];
		if(current[0] == evento[0] && current[1] == evento[1] && current[2] == evento[2] && current[3] == evento[3]) return true;
	}
	return false;
}

function aggiungiPreferiti(evento){
	var local_event = evento;
	return function(){
		var local_preferiti = JSON.parse(localStorage.getItem("eventiPreferiti"));
		if(local_preferiti == null) local_preferiti = new Array(local_event);
		else {
			if(!eventoInPreferiti(local_event)) local_preferiti[local_preferiti.length] = local_event;
		}
		localStorage.setItem("eventiPreferiti", JSON.stringify(local_preferiti));
	}
}

function loadPreferiti(){
	var local_preferiti = JSON.parse(localStorage.getItem("eventiPreferiti"));
	var container = document.getElementById("event-container");
	container.innerHTML = "";
	if(local_preferiti == null) return;
	for(i=0; i<local_preferiti.length; i++){
		var evento = local_preferiti[i];
		container.innerHTML += '<div class="evento"><div class="day"> <p class="tcv">' + evento[0] +'<br>'+
							monthText[evento[1]] + '</p></div>' + '<div class="info"><p>' +
							evento[3] + '</p></div></div>';
	}
}

function clearPreferiti(){
	localStorage.setItem("eventiPreferiti", JSON.stringify(null));
}

function rimuoviPreferiti(evento){
	//---TODO---
}

function removeSelected(){
	var selezionati = document.getElementsByClassName("sel");
	for(s=0; s<selezionati.length; s++){
		selezionati[s].classList.remove("sel");
	}
}


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

function isBisestile(year){
	if(year/400) return true;
	else if(year/100) return false;
	else if(year/4) return true;
	else return false;
}

function getLastDay(year, month){
	switch(month+1){
		case 1: return 31;
		case 2:
			if(isBisestile(year)) return 29; 
			else return 28;
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
	var last_day = getLastDay(year, month);
	var active_month = false; 
	var counter = (new Date(year, month, 2 - (first_day)) ).getDate();
	var giorno;
	var index;
	removeSelected();
	
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
			
			if(active_month) {
				lista_classi.remove("no-mo");
				lista_classi.remove("ev");
				fillEvento(year, month, counter, giorno);
			}
			else {
				lista_classi.add("no-mo");
				lista_classi.remove("ev");
				giorno.removeEventListener("click", showInAgenda);
			}
			
			giorno.innerText = counter;
			
			counter++;
		}
	}
}

function buildMonth(){
	displayMonth(anno, mese-1);
}

function displayMonth(year, month){
	var campo_mese = document.getElementById("mese");
	campo_mese.innerHTML = monthText[month].toUpperCase() + " " + year;
	display_mese = month + 1;
	buildDays(year, month);
}

function nextMonth(){
	var indice = display_mese - 1;
	indice++;
	if(indice%12 == 0) display_anno++;
	displayMonth(display_anno, indice%12)
}

function prevMonth(){
	var indice = display_mese - 1;
	indice--;
	if(indice < 0){
		indice = 11;
		display_anno--;
	}
	displayMonth(display_anno, indice%12)
}

function log_out(){
	if(window.confirm("Vuoi disconnetterti?")){
		localStorage.setItem('logged_user', JSON.stringify(null));
		window.location.href = "index.html"
	}
}


