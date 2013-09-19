/*global Classe*/
/*global Linda*/

(function (global) {
	"use strict";

	var Ambiente = Classe.criarSingleton({
		inicializar: function () {
			this.global = global;
			this.janela = (window || global);
			this.documento = this.janela.document;
			this.historico = this.janela.history;
			this.localizacao = this.janela.location;
			this.performance = this.janela.performance;
		},

		selecionar: function (selecao) {
			return this.documento.querySelector(selecao);
		},

		selecionarTodos: function (selecao) {
			return this.documento.querySelectorAll(selecao);
		},

		obterPelaClasse: function (classe) {
			return this.documento.getElementsByClassName(classe)[0];
		},

		obterTodosPelaClasse: function (classe) {
			return this.documento.getElementsByClassName(classe);
		},

		obterPeloNome: function (nome) {
			return this.documento.getElementsByName(nome)[0];
		},

		obterTodosPeloNome: function (nome) {
			return this.documento.getElementsByName(nome);
		},

		obterPeloIdentificador: function (identificador) {
			return this.documento.getElementById(identificador);
		},

		criarElemento: function (elemento) {
			return this.documento.createElement(elemento);
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

	global.Ambiente = Ambiente;
}(this));
