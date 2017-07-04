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
	// if( this )
	// document.getElementById('redButton').addEventListener('click',function(){
 //  		$('#inside')[0].setAttribute("d", "M1.81,12.8V3.69A.61.61,0,0,1,3,3.69V12.8");
	// },false);
	// document.getElementById('blueButton').addEventListener('click',function(){
 //  		$('#inside')[0].setAttribute("d", "M1.81,12.8v-5A.61.61,0,0,1,3,7.78v5");
	// },false);
	document.getElementById('redButton').addEventListener('click',function(){
  		$('#inside')[0].setAttribute("d", "M1.81,12.8V5.73A.61.61,0,0,1,3,5.73V12.8");
  		$('#inside')[0].setAttribute("d", "M1.81,12.8V3.69A.61.61,0,0,1,3,3.69V12.8"); 
  		$('#container').removeClass();
  		$('#container').addClass('container background--red');
	},false);
	document.getElementById('blueButton').addEventListener('click',function(){
  		$('#inside')[0].setAttribute("d", "M1.81,12.8v-5A.61.61,0,0,1,3,7.78v5");
  		$('#container').removeClass();
  		$('#container').addClass('container background--darkblue');
	},false);
	document.getElementById('orangeButton').addEventListener('click',function(){
  		$('#inside')[0].setAttribute("d", "M1.81,12.8V5.73A.61.61,0,0,1,3,5.73V12.8");
  		$('#container').removeClass();
  		$('#container').addClass('container background--orange');
	},false);

}