/*global Classe*/
/*global Linda*/

(function (global) {
	"use strict";

	var Dom = Classe.criarSingleton({
		inicializar: function () {
			this.global = global;
			this.janela = (window || global);
			this.documento = this.janela.document;
			this.historico = this.janela.history;
			this.localizacao = this.janela.location;
			this.performance = this.janela.performance;
		},

		criarComentario: function (comentario) {
			return this.documento.createComment(comentario);
		},

		criarElemento: function (elemento) {
			return this.documento.createElement(elemento);
		},

		criarTexto: function (texto) {
			return this.documento.createTextNode(texto);
		},

		selecionar: function (seletor) {
			return this.documento.querySelector(seletor);
		},

		selecionarTodos: function (seletor) {
			return this.documento.querySelectorAll(seletor);
		},

		avaliar: function (texto) {
			return this.janela.eval(texto);
		},

		habilitarTelaCheia: function () {
			if (Linda.instanciaDe(this.documento.documentElement.requestFullScreen, Function)) {
				this.documento.documentElement.requestFullScreen();
			} else if (Linda.instanciaDe(this.documento.documentElement.mozRequestFullScreen, Function)) {
				this.documento.documentElement.mozRequestFullScreen();
			} else if (Linda.instanciaDe(this.documento.documentElement.webkitRequestFullScreen, Function)) {
				this.documento.documentElement.webkitRequestFullScreen();
			}
		},

		desabilitarTelaCheia: function () {
			if (Linda.instanciaDe(this.documento.cancelFullScreen, Function)) {
				this.documento.cancelFullScreen();
			} else if (Linda.instanciaDe(this.documento.webkitCancelFullScreen, Function)) {
				this.documento.webkitCancelFullScreen();
			} else if (Linda.instanciaDe(this.documento.mozCancelFullScreen, Function)) {
				this.documento.mozCancelFullScreen();
			}
		}
	}).instancia();

	var $ = function (seletor) {
		return Dom.selecionar(seletor);
	};

	var $$ = function (seletor) {
		return Dom.selecionarTodos(seletor);
	};

	global.Dom = Dom;
	global.$ = $;
	global.$$ = $$;
}(this));
