/*global Document*/
/*global Element*/
/*global HTMLCollection*/
/*global Node*/
/*global NodeList*/
/*global Window*/

(function (contexto) {
	"use strict";

	var Linda = contexto.Linda;
	var Classe = contexto.Classe;

	var Dom = Classe.criarSingleton({
		inicializar: function () {
			this.janela = window;
			this.documento = this.janela.document;
			this.historico = this.janela.history;
			this.localizacao = this.janela.location;
		},

		carregarComponentes: function () {
			this.janelaDom = this.encapsular(this.janela);
			this.documentoDom = this.encapsular(this.documento);
		},

		encapsular: function (elementoDom) {
			var Documento = contexto.Documento;
			var Elemento = contexto.Elemento;
			var Janela = contexto.Janela;
			var Nodo = contexto.Nodo;
			var Notificavel = contexto.Notificavel;
			if (Linda.instanciaDe(elementoDom, NodeList)) {
				return new ListaDom(elementoDom);
			} else if (Linda.instanciaDe(elementoDom, HTMLCollection)) {
				return new ListaDom(elementoDom);
			} else if (Linda.instanciaDe(elementoDom, Element)) {
				return new Elemento(elementoDom);
			} else if (Linda.instanciaDe(elementoDom, Document)) {
				return new Documento(elementoDom);
			} else if (Linda.instanciaDe(elementoDom, Node)) {
				return new Nodo(elementoDom);
			} else if (Linda.instanciaDe(elementoDom, Window)) {
				return new Janela(elementoDom);
			} else {
				return new Notificavel(elementoDom);
			}
		},

		extrair: function (suplementoDom) {
			return suplementoDom.elementoDom;
		},

		$: function (seletorOuElemento) {
			if (Linda.instanciaDe(seletorOuElemento, String)) {
				return this.documentoDom.selecionar(seletorOuElemento);
			}
			return this.encapsular(seletorOuElemento);
		},

		$$: function (seletorOuElemento) {
			if (Linda.instanciaDe(seletorOuElemento, String)) {
				return this.documentoDom.selecionarTodos(seletorOuElemento);
			}
			return this.encapsular(seletorOuElemento);
		}
	}).instancia();

	var ListaDom = Classe.criar({
		inicializar: function (elementosDom) {
			this.elementosDom = elementosDom;
			this.elementoDom = elementosDom;
		},

		paraCada: function (tratador, escopo) {
			for (var indice = 0; indice < this.elementosDom.length; indice++) {
				tratador.chamarComEscopo(escopo, Dom.encapsular(this.elementosDom.item(indice), indice));
			}
		}
	});

	contexto.addEventListener("load", function () {
		Dom.carregarComponentes();
	});

	contexto.Dom = Dom;
	contexto.ListaDom = ListaDom;
	contexto.documento = Dom.documento;
	contexto.janela = Dom.janela;
}(this));
