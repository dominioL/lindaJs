/*global Classe*/
/*global Document*/
/*global Documento*/
/*global Element*/
/*global Elemento*/
/*global HTMLCollection*/
/*global Janela*/
/*global Linda*/
/*global Node*/
/*global NodeList*/
/*global Nodo*/
/*global Notificavel*/
/*global Window*/

(function (global) {
	"use strict";

	var Dom = Classe.criarSingleton({
		inicializar: function () {
			this.janela = window;
			this.documento = this.janela.document;
			this.historico = this.janela.history;
			this.localizacao = this.janela.location;
			this.janelaDom = this.encapsular(this.janela);
			this.documentoDom = this.encapsular(this.documento);
		},

		encapsular: function (elementoDom) {
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
		},

		paraCada: function (tratador, escopo) {
			for (var indice = 0; indice < this.elementosDom.length; indice++) {
				tratador.chamarComEscopo(escopo, Dom.encapsular(this.elementosDom.item(indice), indice));
			}
		}
	});

	global.Dom = Dom;
	global.ListaDom = ListaDom;
	global.documento = Dom.documento;
	global.janela = Dom.janela;
}(this));
