(function (contexto) {
	"use strict";

	var Dom = contexto.Dom;
	var Nodo = contexto.Nodo;
	var Classe = contexto.Classe;

	var Elemento = Classe.criar({
		SuperClasse: Nodo,

		inicializar: function (elementoDom) {
			Nodo.prototipo.inicializar.chamarComEscopo(this, elementoDom);
		},

		fornecerAtributo: function (nome) {
			return Dom.extrair(this).getAttribute(nome);
		},

		fixarAtributo: function (nome, valor) {
			Dom.extrair(this).setAttribute(nome, valor);
		},

		removerAtributo: function (nome) {
			Dom.extrair(this).removeAttribute(nome);
		},

		possuiAtributo: function (nome) {
			return Dom.extrair(this).hasAttribute(nome);
		},

		combina: function (seletor) {
			return Dom.extrair(this).matches(seletor);
		},

		rolarParaTopo: function () {
			Dom.extrair(this).scrollIntoView(true);
		},

		rolarParaBase: function () {
			Dom.extrair(this).scrollIntoView(false);
		},

		selecionar: function (selecao) {
			return Dom.encapsular(Dom.extrair(this).querySelector(selecao));
		},

		selecionarTodos: function (selecao) {
			return Dom.encapsular(Dom.extrair(this).querySelectorAll(selecao));
		},

		obterPelaClasse: function (classe) {
			return Dom.encapsular(Dom.extrair(this).getElementsByClassName(classe).item(0));
		},

		obterTodosPelaClasse: function (classe) {
			return Dom.encapsular(Dom.extrair(this).getElementsByClassName(classe));
		},

		obterPeloNome: function (nome) {
			return Dom.encapsular(Dom.extrair(this).getElementsByName(nome).item(0));
		},

		obterTodosPeloNome: function (nome) {
			return Dom.encapsular(Dom.extrair(this).getElementsByName(nome));
		},

		obterPeloIdentificador: function (identificador) {
			return Dom.encapsular(Dom.extrair(this).getElementById(identificador));
		},

		adicionarClasse: function (classe) {
			Dom.extrair(this).classList.add(classe);
		},

		removerClasse: function (classe) {
			Dom.extrair(this).classList.remove(classe);
		}
	});

	Elemento.prototype.definirPropriedades({
		filhos: {
			fornecer: function () {
				return Dom.encapsular(Dom.extrair(this).children);
			}
		},

		primeiroFilho: {
			fornecer: function () {
				return Dom.encapsular(Dom.extrair(this).firstElementChild);
			}
		},

		ultimoFilho: {
			fornecer: function () {
				return Dom.encapsular(Dom.extrair(this).lastElementChild);
			}
		},

		identificador: {
			fornecer: function () {
				return Dom.extrair(this).id;
			},

			fixar: function (novoIdentificador) {
				Dom.extrair(this).id = novoIdentificador;
			}
		},

		classe: {
			fornecer: function () {
				return Dom.extrair(this).className;
			},

			fixar: function (novaClasse) {
				Dom.extrair(this).className = novaClasse;
			}
		},

		htmlInterno: {
			fornecer: function () {
				return Dom.extrair(this).innerHTML;
			},

			fixar: function (html) {
				Dom.extrair(this).innerHTML = html;
			}
		},

		htmlExterno: {
			fornecer: function () {
				return Dom.extrair(this).outerHTML;
			},

			fixar: function (html) {
				Dom.extrair(this).outerHTML = html;
			}
		},

		valor: {
			fornecer: function () {
				return Dom.extrair(this).value;
			},

			fixar: function (valor) {
				Dom.extrair(this).value = valor;
			}
		}
	});

	contexto.Elemento = Elemento;
}(this));
