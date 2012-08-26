function primeiro(){
	var x = document.getElementById("canvas");
	canvas = x.getContext("2d");
	canvas.font = "36px Tahoma";
	canvas.textAlign = "end";
	
	botaoAtivo = 1;
	movimentandoVertice = false;
	criandoArco = false;
	criandoAresta = false;
	
	vertices = new Array();
	arcos = new Array();
	arestas = new Array();
	
	//document.onmousedown = OnMouseDown;
	//document.onmouseup = OnMouseUp;
	
	window.addEventListener("mousemove", movimentou, false);
	window.addEventListener("click", clicou, false);
	window.addEventListener("mouseup", OnMouseUp, false);
}

function movimentou(e){
	canvas.clearRect(0, 0, 870, 600);
	drawObjects();
	
	var xPos = e.clientX;
	var yPos = e.clientY;

	if (botaoAtivo == 2) {
		drawCircle(xPos, yPos);
	}
	
	if (movimentandoVertice) {
		vertices[circuloClicado].posX = xPos;
		vertices[circuloClicado].posY = yPos;
	}
	
	if (criandoArco) {
		canvas.beginPath();
		canvas.moveTo(arcos[arcos.length-1].verticeInicial.posX-200, arcos[arcos.length-1].verticeInicial.posY-130);
		canvas.lineTo(xPos-210, yPos-160);
		canvas.stroke();
	} else if (criandoAresta) {
		canvas.beginPath();
		canvas.moveTo(arestas[arestas.length-1].verticeInicial.posX-200, arestas[arestas.length-1].verticeInicial.posY-130);
		canvas.lineTo(xPos-210, yPos-160);
		canvas.stroke();
	}
	
}

function clicou(e) {	
	var target = e.target;
	
	// Verifica se o click esta dentro do canvas
	if (target.id == "canvas") {
		var xPos = e.clientX;
		var yPos = e.clientY;
		
		canvas.clearRect(0, 0, 870, 600);
		
		drawObjects();
		
		//var circuloClicado = clickDentroDoVertice(xPos, yPos, 35);
		circuloClicado = clickDentroDoVertice(xPos, yPos, 35);
		
		if (circuloClicado >= 0 || botaoAtivo == 2) {
		
			if (botaoAtivo == 1) {
				movimentandoVertice = !movimentandoVertice;
				criandoArco = false;
				criandoAresta = false;
			} else if (botaoAtivo == 2) {
				var verticeObj = new Vertice(xPos, yPos, vertices.length);

				vertices.push( verticeObj );
				
				movimentandoVertice = false;
				criandoArco = false;
				criandoAresta = false;
				
			} else if (botaoAtivo == 3) {
			
				
				if (!criandoArco) {
					
					var arcObj = new Arco(vertices[circuloClicado]);
					
					criandoArco = true;
					
					arcos.push( arcObj );
					
				} else {
				
					var arcoAtual = arcos[arcos.length-1];
					
					arcoAtual.verticeFinal = vertices[circuloClicado];
					criandoArco = false;
				}
			
				movimentandoVertice = false;
				criandoAresta = false;
			} else if (botaoAtivo == 4) {
			
				
				
				if (!criandoAresta) {
					
					var arestaObj = new Aresta(vertices[circuloClicado]);
					
					criandoAresta = true;
					
					arestas.push( arestaObj );
					
				} else {
				
					var arestaAtual = arestas[arestas.length-1];
					
					arestaAtual.verticeFinal = vertices[circuloClicado];
					criandoAresta = false;
				}
				
				movimentandoVertice = false;
				criandoArco = false;
			} else if (botaoAtivo == 5) {
				excluirObjeto(circuloClicado, 1);
				movimentandoVertice = false;
				criandoArco = false;
				criandoAresta = false;
			}
		} else {
			criandoArco = false;
			criandoAresta = false;
		}
	}
}

function drawObjects() {
	if (vertices.length > 0) {
		for (var i = 0; i < vertices.length; i++) {
			var vert = vertices[i];
			vert.draw(canvas, i+1);
		}
		
		if (arcos.length > 0) {
			for (var i = 0; i < arcos.length; i++) {
				var arco = arcos[i];
				arco.draw(canvas);
			}
		} else if (arestas.length > 0) {
		
		for (var i = 0; i < arestas.length; i++) {
			var aresta = arestas[i];
			aresta.draw(canvas);
		}
		}
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
	var btnAntes = botaoAtivo;
	botaoAtivo = _btnPressionado;
	
	if (botaoAtivo == 1) {
		desativaBotoes();
		ativaBotao("btn_seta");
		
		document.body.style.cursor = 'default';
	} else if (botaoAtivo == 2) {
		desativaBotoes();
		ativaBotao("btn_vertice");
		
		document.body.style.cursor = 'default';
	} else if (botaoAtivo == 3) {
		desativaBotoes();
		ativaBotao("btn_arco");
	
		document.body.style.cursor = 'crosshair';
	} else if (botaoAtivo == 4) {
		desativaBotoes();
		ativaBotao("btn_aresta");
	
		document.body.style.cursor = 'crosshair';
	} else if (botaoAtivo == 5) {
		desativaBotoes();
		ativaBotao("btn_excluir");
	
		document.body.style.cursor = 'default';
	} else if (botaoAtivo == 6) {
		botaoAtivo = btnAntes;
		for (var i = 0; i < vertices.length; i++) {
			excluirObjeto(i, vertices.length);
		}
		
		if (arcos.length > 0) {
			for (var i = 0; i < arcos.length; i++) {
				excluirArco(i, arcos.length);
			}
		} else if (arestas.length > 0) {
			for (var i = 0; i < arestas.length; i++) {
				excluirAresta(i, arestas.length);
			}
		}
	}
}

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

// verificar a exclusao dos vertices, pois deveria excluir tambem todos os arcos/arestas conectados a ele
function excluirObjeto(_i, _x) {
	vertices.splice(_i, _x);
	
	for (var i = 0; i < arcos.length; i++) {
		if (arcos[i].verticeInicial.indice == _i || arcos[i].verticeFinal.indice == _i) {
			arcos.splice(i, 1);
		}
	}
}

function excluirArco(_i, _x){
	arcos.splice(_i, _x);
}

function excluirAresta(_i, _x) {
	arestas.splice(_i, _x);
}

function ativaBotao(_botao){
	var elem = document.getElementById(_botao);
	
	var classeAnt = elem.getAttribute("class");
	
	elem.setAttribute("class", classeAnt + " btn-info");
}

function desativaBotoes(){
	document.getElementById("btn_seta").setAttribute("class", "btn");
	document.getElementById("btn_vertice").setAttribute("class", "btn");
	document.getElementById("btn_arco").setAttribute("class", "btn");
	document.getElementById("btn_aresta").setAttribute("class", "btn");
	document.getElementById("btn_excluir").setAttribute("class", "btn");
	document.getElementById("btn_limpar").setAttribute("class", "btn");
}

function gerarMatriz(){
	var qtd = vertices.length;
	
	// por enquanto, a matriz eh global
	matrizAdj = new Array(qtd);
	
	for (var i = 0; i < qtd; i++) {
		matrizAdj[i] = new Array(qtd);
	}
	
	for (var i = 0; i < qtd; i++) {
		for (var j = 0; j < qtd; j++) {
			matrizAdj[i][j] = 0;
		}
	}
	
	if (arcos.length > 0) {
		for (var i = 0; i < arcos.length; i++) {
			if (arcos[i].verticeInicial) {
				matrizAdj[arcos[i].verticeInicial.indice][arcos[i].verticeFinal.indice] = 1;
			}
		}
	} else if (arestas.length > 0) {
		for (var i = 0; i < arestas.length; i++) {
			if (arestas[i].verticeInicial) {
				matrizAdj[arestas[i].verticeInicial.indice][arestas[i].verticeFinal.indice] = 1;
				matrizAdj[arestas[i].verticeFinal.indice][arestas[i].verticeInicial.indice] = 1;
			}
		}
	}
	
	alert(matrizAdj);
}

window.addEventListener("load", primeiro, false);