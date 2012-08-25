// Classe para as arestas
// Herda da classe objeto_grafico

Aresta.prototype = new ObjetoGrafico();
Aresta.prototype.constructor = Aresta;

function Aresta(_verticeInicial){
	this.verticeInicial = _verticeInicial;
	//this.verticeFinal = _verticeFinal;
	
	this.verticeFinal = function setVerticeFinal(_verticeFinal) {
		
	}
}