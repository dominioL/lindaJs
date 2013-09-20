/*global Element*/
/*global HTMLCollection*/

(function () {
	"use strict";

	Element.implementar = Function.prototype.implementar;
	HTMLCollection.implementar = Function.prototype.implementar;

	Element.implementar({
		fornecerAtributo: function (nome) {
			return this.getAttribute(nome);
		},

		fixarAtributo: function (nome, valor) {
			this.setAttribute(nome, valor);
		},

		removerAtributo: function (nome) {
			this.removeAttribute(nome);
		},

		possuiAtributo: function (nome) {
			return this.hasAttribute(nome);
		},

		combina: function (seletor) {
			return this.matches(seletor);
		},

		rolarParaTopo: function () {
			this.scrollIntoView(true);
		},

		rolarParaBase: function () {
			this.scrollIntoView(false);
		},

		selecionar: function (selecao) {
			return this.querySelector(selecao);
		},

		selecionarTodos: function (selecao) {
			return this.querySelectorAll(selecao);
		},

		obterPelaClasse: function (classe) {
			return this.getElementsByClassName(classe)[0];
		},

		obterTodosPelaClasse: function (classe) {
			return this.getElementsByClassName(classe);
		},

		obterPeloNome: function (nome) {
			return this.getElementsByName(nome)[0];
		},

		obterTodosPeloNome: function (nome) {
			return this.getElementsByName(nome);
		},

		obterPeloIdentificador: function (identificador) {
			return this.getElementById(identificador);
		}
	});

	Element.prototype.definirPropriedades({
		filhos: {
			fornecer: function () {
				return this.children;
			}
		},

		primeiroFilho: {
			fornecer: function () {
				return this.firstElementChild;
			}
		},

		ultimoFilho: {
			fornecer: function () {
				return this.lastElementChild;
			}
		},

		identificador: {
			fornecer: function () {
				return this.id;
			},

			fixar: function (novoIdentificador) {
				this.id = novoIdentificador;
			}
		},

		classe: {
			fornecer: function () {
				return this.className;
			},

			fixar: function (novaClasse) {
				this.className = novaClasse;
			}
		},

		htmlInterno: {
			fornecer: function () {
				return this.innerHTML;
			},

			fixar: function (html) {
				this.innerHTML = html;
			}
		},

		htmlExterno: {
			fornecer: function () {
				return this.outerHTML;
			},

			fixar: function (html) {
				this.outerHTML = html;
			}
		}
	});

	HTMLCollection.implementar({
		padaCada: function (tratador, escopo) {
			for (var indice = 0; indice < this.length; indice++) {
				tratador.chamarComEscopo(escopo, this.item(indice), indice);
			}
		}
	});
}(this));
