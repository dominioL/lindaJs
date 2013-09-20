(function () {
	"use strict";

	Node.implementar = Function.prototype.implementar;
	NodeList.implementar = Function.prototype.implementar;

	Node.implementar({
		adicionarNodo: function (nodo) {
			return this.appendChild(nodo);
		},

		adicionarNodoNoInicio: function (nodo) {
			return this.insertBefore(nodo, this.primeiroFilho);
		},

		adicionarNodoAntesDe: function (nodo, nodoReferencia) {
			return this.insertBefore(nodo, nodoReferencia);
		},

		clonarNodo: function (clonarFilhos) {
			return this.cloneNode(clonarFilhos);
		},

		normalizarNodos: function () {
			this.normalize();
		},

		possuiAtributos: function () {
			return this.hasAttributes();
		},

		possuiNodos: function () {
			return this.hasChildNodes();
		},

		possuiNodo: function (nodo) {
			return this.contains(nodo);
		},

		removerNodo: function (nodo) {
			return this.removeChild(nodo);
		},

		substituirNodo: function (nodoNovo, nodoAntigo) {
			return this.replaceChild(novoNodo, nodoAntigo);
		}
	});

	Node.prototype.definirPropriedades({
		texto: {
			fornecer: function () {
				return this.textContent;
			},

			fixar: function (valor) {
				this.textContent = valor;
			}
		},

		nodoFilhos: {
			fornecer: function () {
				return this.childNodes;
			}
		},

		primeiroNodoFilho: {
			fornecer: function () {
				return this.firstChild;
			}
		},

		ultimoNodoFilho: {
			fornecer: function () {
				return this.lastChild;
			}
		},

		nodoPai: {
			fornecer: function () {
				return this.parentNode;
			}
		}
	});

	NodeList.implementar({
		padaCada: function (tratador, escopo) {
			for (var indice = 0; indice < this.length; indice++) {
				tratador.chamarComEscopo(escopo, this.item(indice), indice);
			}
		}
	});
}(this));
