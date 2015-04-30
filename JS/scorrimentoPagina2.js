/*	scorrimentoPagina2.js

*** LA SEGUENTE FUNZIONE VA INVOCATA:
var obj = new ScrollPage('1000', 100, 'freccia_sali', 300);
obj.showFreccia();
obj.clickScroll();

- OPPURE	COL METODO 'call()':
var obj = {};
ScrollPage.call(obj, 1000, 100, 'freccia_sali', 300);
obj.showFreccia();
obj.clickScroll();
*/

var ScrollPage = function (tempoScroll, frame, freccia, valShowFreccia){
	this.tempo = tempoScroll;							// tempo max di scorrimento
	this.frame = frame;									// i frame (interruzioni) 										
	this.freccia = freccia;								// la freccia nera 
	this.mostra = valShowFreccia;						// valore in px oltre il quale viene visualizzata la freccia nera	

	var sto = this;

	this.rp = function (){
		return	this.tempo / this.frame;	
	}	

	this.getScrollTop = function ()	{
		return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
	}

	this.clickScroll = function ()	{
		var frecciaNera = document.getElementById(this.freccia);
		frecciaNera.addEventListener('click', sto.vaiSu );
	}

	this.vaiSu = function ()	{
		if(sto.getScrollTop() <= sto.rp() )	{ 
			window.pageYOffset = 0;
			document.documentElement.scrollTop = 0;
			document.body.scrollTop = 0;
		}
		if(sto.getScrollTop() == 0){ return;}
		valScorrimentoX = sto.getScrollTop() - ( sto.getScrollTop() / sto.rp()); 
		window.pageYOffset = valScorrimentoX;
		document.documentElement.scrollTop = valScorrimentoX;
		document.body.scrollTop = valScorrimentoX;
		setTimeout(sto.vaiSu, sto.rp());
	}

	this.showFreccia = function (){
		var frecciaNera = document.getElementById(this.freccia);		
		window.addEventListener('scroll', 
			function ()	{
				if(sto.getScrollTop() > sto.mostra)
					frecciaNera.style.display = "block";
				else

					frecciaNera.style.display = "none";
			}
		);	
	}
} // "ScrollPage"

// Funzione che blocca la propagazione dei link 'a'.
function bloccaPropagazione(){
	var link = document.querySelectorAll('a');
	for(var i=0; i< link.length; i++){
//		Core.addEventListener(link[i], "click",
		link[i].addEventListener("click",
		function (event){
			event.stopPropagation();
		});			
	}
} // "bloccaPropagazione()"




