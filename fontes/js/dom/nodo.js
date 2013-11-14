(function (contexto) {
	"use strict";

	var Dom = contexto.Dom;
	var Notificavel = contexto.Notificavel;
	var Classe = contexto.Classe;

	var Nodo = Classe.criar({
		SuperClasse: Notificavel,

		inicializar: function (elementoDom) {
			Notificavel.prototipo.inicializar.chamarComEscopo(this, elementoDom);
		},

		adicionarNodo: function (nodo) {
			return Dom.extrair(this).appendChild(Dom.extrair(nodo));
		},

		adicionarNodoNoInicio: function (nodo) {
			return Dom.extrair(this).insertBefore(Dom.extrair(nodo), Dom.extrair(this.primeiroFilho));
		},

		adicionarNodoAntesDe: function (nodo, nodoReferencia) {
			return Dom.extrair(this).insertBefore(Dom.extrair(nodo), Dom.extrair(nodoReferencia));
		},

		clonarNodo: function (clonarFilhos) {
			return Dom.extrair(this).cloneNode(clonarFilhos);
		},

		normalizarNodos: function () {
			Dom.extrair(this).normalize();
		},

		possuiNodos: function () {
			return Dom.extrair(this).hasChildNodes();
		},

		possuiNodo: function (nodo) {
			return Dom.extrair(this).contains(Dom.extrair(nodo));
		},

		removerNodo: function (nodo) {
			return Dom.extrair(this).removeChild(Dom.extrair(nodo));
		},

		substituirNodo: function (nodoNovo, nodoAntigo) {
			return Dom.extrair(this).replaceChild(Dom.extrair(nodoNovo), Dom.extrair(nodoAntigo));
		}
	});

	Nodo.prototype.definirPropriedades({
		texto: {
			fornecer: function () {
				return Dom.extrair(this).textContent;
			},

			fixar: function (valor) {
				Dom.extrair(this).textContent = valor;
			}
		},

		nodoFilhos: {
			fornecer: function () {
				return Dom.encapsular(Dom.extrair(this).childNodes);
			}
		},

		primeiroNodoFilho: {
			fornecer: function () {
				return Dom.encapsular(Dom.extrair(this).firstChild);
			}
		},

		ultimoNodoFilho: {
			fornecer: function () {
				return Dom.encapsular(Dom.extrair(this).lastChild);
			}
		},

		nodoPai: {
			fornecer: function () {
				return Dom.encapsular(Dom.extrair(this).parentNode);
			}
		}
	});

	contexto.Nodo = Nodo;
}(this));
