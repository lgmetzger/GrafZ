// Classe para os vértices
// Herda da classe objeto_grafico

Vertice.prototype = new ObjetoGrafico();
Vertice.prototype.constructor = Vertice;

function Vertice(_x, _y, _i){
	this.posX = _x;
	this.posY = _y;
	this.indice = _i;
	
	this.draw = function draw(_canvas, _i){

		_canvas.beginPath();
		_canvas.arc(this.posX-200, this.posY-130, 35, 0 , 2 * Math.PI, false);
		_canvas.fillStyle = "#8ED6FF";
		_canvas.fill();
		_canvas.lineWidth = 2;
		_canvas.strokeStyle = "black";
		_canvas.stroke();
		
		if (_i) {
			var offSetX = (_i >= 10) ? 183 : 190;
		
			_canvas.fillStyle = "black";
			_canvas.fillText(_i, this.posX - offSetX, this.posY-120);
			_canvas.fillStyle = "#8ED6FF";
		}
	}
}