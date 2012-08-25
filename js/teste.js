function primeiro(){
	var x = document.getElementById("canvas");
	canvas = x.getContext("2d");
	canvas.font = "36px Tahoma";
	canvas.textAlign = "end";
	
	botaoAtivo = 1;
	
	vertices = new Array();
	
	//document.onmousedown = OnMouseDown;
	//document.onmouseup = OnMouseUp;
	
	window.addEventListener("mousemove", movimentou, false);
	window.addEventListener("click", clicou, false);
	window.addEventListener("mouseup", OnMouseUp, false);
}

function OnMouseUp(e){
	if (e.target.id == "canvas") {
		if (botaoAtivo == 3 || botaoAtivo == 4) {
			
		}
	}
}

function movimentou(e){
	canvas.clearRect(0, 0, 870, 600);
	drawObjects();
	
	var xPos = e.clientX;
	var yPos = e.clientY;

	if (botaoAtivo == 2) {
		drawCircle(xPos, yPos);
	}
	
}

function clicou(e) {	
	var target = e.target;
	
	// Verifica se o click esta dentro do canvas
	if (target.id == "canvas") {
		var xPos = e.clientX;
		var yPos = e.clientY;
	
		if (botaoAtivo != 1) {
			canvas.clearRect(0, 0, 870, 600);
			drawObjects();
			
			if (botaoAtivo == 2) {
				var verticeObj = new Vertice(xPos, yPos);
			
				vertices.push( verticeObj );
			}
		} else {
			var circuloClicado = clickDentroDoVertice(xPos, yPos, 35);
			if (circuloClicado >= 0) {
				alert('clicou no circulo ' + circuloClicado);
			}
		}
	}
}

function drawObjects() {
	for (var i = 0; i < vertices.length; i++) {
		var vert = vertices[i];
		vert.draw(canvas, i+1);
	}
}

function drawCircle(_x, _y){
	canvas.beginPath();
	canvas.arc(_x-200, _y-130, 35, 0 , 2 * Math.PI, false);
	canvas.fillStyle = "#8ED6FF";
	canvas.fill();
	canvas.lineWidth = 2;
	canvas.strokeStyle = "black";
	canvas.stroke();
}

function botaoPressionado(_btnPressionado) {
	botaoAtivo = _btnPressionado;
	
	if (botaoAtivo == 3 || botaoAtivo == 4) {
		document.body.style.cursor = 'crosshair';
	} else {
		document.body.style.cursor = 'default';
	}
}

// pra fazer o trabalho da clickDentro...
// verifica se a distancia do click eh maior que o raio do circulo considerando o ponto central
function clickDentroDoVertice(x, y, r) {

	for (var i = 0; i < vertices.length; i++) {
		var vert = vertices[i];
		
		var dx = x-vertices[i].posX-15;
		var dy = y-vertices[i].posY-30;
		
		if (dx*dx+dy*dy <= r*r) {
			return i;
		}
	}
	
	return -1;
}

window.addEventListener("load", primeiro, false);