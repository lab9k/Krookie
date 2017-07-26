/* Thermometer */
var btns = document.querySelectorAll(".buttons button");
var thermo = document.getElementsByClassName("thermo")[0];
var inside = document.getElementsByClassName("cls-2")[0];
for (i = 0; i < btns.length; i++) {
	btns[i].addEventListener("click", thermometer);
}

function thermometer() {
	if( this.getAttribute("data-add")) {
			thermo.classList.add(this.getAttribute("data-add"));
			thermo.classList.add(this.getAttribute("data-height"))
	}
	if( this.getAttribute("data-remove") || this.getAttribute("data-delete")) {
			thermo.classList.remove(this.getAttribute("data-remove"));
			thermo.classList.remove(this.getAttribute("data-delete"));
			thermo.classList.remove(this.getAttribute("data-height-remove"));
			thermo.classList.remove(this.getAttribute("data-height-delete"));
	}

	document.getElementById('redButton').addEventListener('click',function(){
  		//$('#inside')[0].setAttribute("d", "M1.81,12.8V5.73A.61.61,0,0,1,3,5.73V12.8");
  		$('#inside')[0].setAttribute("d", "M6.63,47.7V14A2.25,2.25,0,0,1,11,14V47.7"); 
      $('#background--effect').removeClass('background--green');
  		$('#background--effect').removeClass('background--orange');
      $('#background--effect').removeClass('background--blue');
  		$('.thermo').addClass('shake');
  		$('#background--effect').addClass('background--effect background--red');
  		$('.avatar__text p').html("Mmmm, lekker warm");
  		$('.gevonden__button').css("visibility", "visible");
	},false);
	document.getElementById('blueButton').addEventListener('click',function(){
  		$('#inside')[0].setAttribute("d", "M6.6,47.8V29.4c0.3-1.2,1.4-2,2.6-1.7c0.8,0.2,1.5,0.8,1.7,1.7v18.4");
      $('#background--effect').removeClass('background--green');
  		$('#background--effect').removeClass('background--orange');
      $('#background--effect').removeClass('background--red');
  		$('.thermo').removeClass("shake");
  		$('#background--effect').addClass('background--effect background--darkblue');
  		$('.avatar__text p').html("Brrrr, het is hier koud...");
  		$('.gevonden__button').css("visibility", "hidden");
	},false);
	document.getElementById('orangeButton').addEventListener('click',function(){
  		$('#inside')[0].setAttribute("d", "M6.63,47.7V21.58a2.25,2.25,0,0,1,4.4,0V47.7");
      $('#background--effect').removeClass('background--green');
  		$('#background--effect').removeClass('background--red');
      $('#background--effect').removeClass('background--blue');
  		$('.thermo').removeClass("shake");
  		$('#background--effect').addClass('background--effect background--orange');
  		$('.avatar__text p').html("It's getting hot in here");
  		$('.gevonden__button').css("visibility", "hidden");
	},false);
}