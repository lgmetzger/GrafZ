function verifica_visitados(_visitados, _qtd){
    for (var x = 0; x < _qtd; x++) {
        if (!_visitados[x]) {
            return false;
        }
    }
    return true;
}

function primeiro_nao_visitado(_visitados, _qtd){
    for (var x = 0; x < _qtd; x++) {
        if (!_visitados[x]) {
            return x;
        }
    }
    return -1;
}

function percorreDfs(inicial, matriz) {
	var qtd = vertices.length;
    var concluido = false;

    var visitados = new Array(qtd);
	var pilha = new Array();

    for (var i = 0; i < qtd; i++) {
        visitados[i] = false;
    }

    visitados[inicial] = true;
    //insere_pilha(pilha, inicial);
	pilha.push(inicial);

	alert("Visitado: " + (inicial+1));

    while (!verifica_visitados(visitados, qtd)) {
        for (var i = 0; i < qtd; i++) {
            if (matriz[inicial][i] == 1) {
                if (!visitados[i]) {
                    visitados[i] = true;
                    //insere_pilha(pilha, i);
					pilha.push(i);

                    //cout << "visitado: " << i+1 << "\n";
					alert("Visitado: " + (i+1));

                    inicial = i;

                    break;
                }
            }

            if (i == qtd-1) {
                //remove_pilha(pilha);
				pilha.pop();
				
                //inicial = topo_pilha(pilha);
				inicial = pilha[pilha.length-1];

                if (pilha.length == 0) {
                    inicial = primeiro_nao_visitado(visitados, qtd);
                    visitados[inicial] = true;
                    //insere_pilha(pilha, inicial);
					pilha.push(inicial);
                    //cout << "visitado: " << inicial+1 << "\n";
					alert("Visitado: " + (inicial+1));

                    if (inicial < 0) {
                        concluido = true;
                        break;
                    }
                }
            }
        }

        if (concluido) {
            break;
        }
    }

    alert("Concluido");
}

function percorreBfs(inicial, matriz){
	alert("chegou");

	var qtd = vertices.length;
	var concluido = false;

    var visitados = new Array(qtd);
    var fila = new Array();

    for (var i = 0; i < qtd; i++) {
        visitados[i] = false;
    }

    visitados[inicial] = true;
    //insere_fila(fila, inicial);
	fila.push( inicial );

    //cout << "visitado: " << inicial + 1 << "\n";
	alert("Visitado: " + (inicial+1));

    while (!verifica_visitados(visitados, qtd)) {
        for (var i = 0; i < qtd; i++) {
            if (matriz[inicial][i] == 1) {
                if (!visitados[i]) {
                    visitados[i] = true;
                    //insere_fila(fila, i);
					fila.push( i );

                    //cout << "visitado: " << i+1 << "\n";
					
					alert("Visitado: " + (i+1));

                    //inicial = i;

                    //break;
                }
            }

            if (i == qtd-1) {
                //remove_fila(fila);
				fila.shift();
                //inicial = inicio_fila(fila);
				inicial = fila[0];
				
                //

                if (fila.length == 0) {
                    inicial = primeiro_nao_visitado(visitados, qtd);
                    visitados[inicial] = true;
                    //insere_fila(fila, inicial);
					fila.push(inicial);
                    //cout << "visitado: " << inicial+1 << "\n";
					alert("Visitado: " + (inicial+1));

                    if (inicial < 0) {
                        concluido = true;
                        break;
                    }
                }
            }
        }

        if (concluido) {
            break;
        }
    }

    alert("concluido");
}