// Classe para os arcos
// Herda da classe objeto_grafico

Arco.prototype = new ObjetoGrafico();
Arco.prototype.constructor = Arco;

function Arco(_verticeInicial){
	this.verticeInicial = _verticeInicial;
	
	this.verticeFinal = function verticeFinal(_verticeFinal) {
		this.verticeFinal = _verticeFinal;
	}
	
	this.draw = function draw(_canvas){
		_canvas.beginPath();
		_canvas.strokeStyle = "red";
		
		// linha
		_canvas.moveTo(this.verticeInicial.posX-200, this.verticeInicial.posY-130);
		_canvas.lineTo(this.verticeFinal.posX-200, this.verticeFinal.posY-130);
		
		
		// seta
		/*
		_canvas.moveTo(this.verticeFinal.posX-260, this.verticeFinal.posY-130);
		_canvas.lineTo(this.verticeFinal.posX-210, this.verticeFinal.posY-140);
		_canvas.moveTo(this.verticeFinal.posX-260, this.verticeFinal.posY-130);
		_canvas.lineTo(this.verticeFinal.posX-190, this.verticeFinal.posY-120);
		*/
		
		_canvas.stroke();
		
		_canvas.strokeStyle = "black";
	}
}