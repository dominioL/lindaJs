/*global Classe*/
/*global Dom*/
/*global Linda*/
/*global Nodo*/

(function (global) {
	"use strict";

	var Documento = Classe.criar({
		SuperClasse: Nodo,

		inicializar: function (elementoDom) {
			Nodo.prototipo.inicializar.chamarComEscopo(this, elementoDom);
		},

		criarComentario: function (comentario) {
			return Dom.encapsular(Dom.extrair(this).createComment(comentario));
		},

		criarElemento: function (elemento) {
			return Dom.encapsular(Dom.extrair(this).createElement(elemento));
		},

		criarTexto: function (texto) {
			return Dom.encapsular(Dom.extrair(this).createTextNode(texto));
		},

		selecionar: function (seletor) {
			return Dom.encapsular(Dom.extrair(this).querySelector(seletor));
		},

		selecionarTodos: function (seletor) {
			return Dom.encapsular(Dom.extrair(this).querySelectorAll(seletor));
		},

		habilitarTelaCheia: function () {
			if (Linda.instanciaDe(Dom.extrair(this).documentElement.requestFullScreen, Function)) {
				Dom.extrair(this).documentElement.requestFullScreen();
			} else if (Linda.instanciaDe(Dom.extrair(this).documentElement.mozRequestFullScreen, Function)) {
				Dom.extrair(this).documentElement.mozRequestFullScreen();
			} else if (Linda.instanciaDe(Dom.extrair(this).documentElement.webkitRequestFullScreen, Function)) {
				Dom.extrair(this).documentElement.webkitRequestFullScreen();
			}
		},

		desabilitarTelaCheia: function () {
			if (Linda.instanciaDe(Dom.extrair(this).cancelFullScreen, Function)) {
				Dom.extrair(this).cancelFullScreen();
			} else if (Linda.instanciaDe(Dom.extrair(this).webkitCancelFullScreen, Function)) {
				Dom.extrair(this).webkitCancelFullScreen();
			} else if (Linda.instanciaDe(Dom.extrair(this).mozCancelFullScreen, Function)) {
				Dom.extrair(this).mozCancelFullScreen();
			}
		}
	});

	global.Documento = Documento;
}(this));
