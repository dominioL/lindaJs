/*global Classe*/
/*global Dom*/
/*global Tecla*/

(function (global) {
	"use strict";

	var Notificavel = Classe.criar({
		inicializar: function (elementoDom) {
			this.elementoDom = elementoDom;
		},

		tratarAlteracao: function (tratador, escopo) {
			tratador = tratador.vincularEscopo(escopo);
			Dom.extrair(this).addEventListener("change", tratador);
			return tratador;
		},

		tratarAlteracaoNoHistorico: function (tratador, escopo) {
			tratador = tratador.vincularEscopo(escopo);
			Dom.extrair(this).addEventListener("popstate", tratador);
			return tratador;
		},

		tratarErro: function (tratador, escopo) {
			tratador = tratador.vincularEscopo(escopo);
			Dom.extrair(this).addEventListener("error", tratador);
			return tratador;
		},

		tratarCarregamento: function (tratador, escopo) {
			tratador = tratador.vincularEscopo(escopo);
			Dom.extrair(this).addEventListener("load", tratador);
			return tratador;
		},

		tratarCarregamentoIniciado: function (tratador, escopo) {
			tratador = tratador.vincularEscopo(escopo);
			Dom.extrair(this).addEventListener("loadstart", tratador);
			return tratador;
		},

		tratarCarregamentoFinalizado: function (tratador, escopo) {
			tratador = tratador.vincularEscopo(escopo);
			Dom.extrair(this).addEventListener("loadend", tratador);
			return tratador;
		},

		tratarProgresso: function (tratador, escopo) {
			tratador = tratador.vincularEscopo(escopo);
			Dom.extrair(this).addEventListener("progress", tratador);
			return tratador;
		},

		tratarAborto: function (tratador, escopo) {
			tratador = tratador.vincularEscopo(escopo);
			Dom.extrair(this).addEventListener("abort", tratador);
			return tratador;
		},

		tratarEstouroDeTempo: function (tratador, escopo) {
			tratador = tratador.vincularEscopo(escopo);
			Dom.extrair(this).addEventListener("timeout", tratador);
			return tratador;
		},

		tratarClique: function (tratador, escopo) {
			tratador = tratador.vincularEscopo(escopo);
			Dom.extrair(this).addEventListener("click", tratador);
			return tratador;
		},

		tratarCliqueDuplo: function (tratador, escopo) {
			tratador = tratador.vincularEscopo(escopo);
			Dom.extrair(this).addEventListener("dbclick", tratador);
			return tratador;
		},

		tratarTeclaPressionada: function (tecla, tratador, escopo) {
			var tratadorPersonalizado = function (evento) {
				if (tecla === evento.keyCode) {
					tratador.chamarComEscopo(escopo);
				}
			};
			Dom.extrair(this).addEventListener("keydown", tratadorPersonalizado);
			return tratadorPersonalizado;
		},

		tratarTeclaSolta: function (tecla, tratador, escopo) {
			var tratadorPersonalizado = function (evento) {
				if (tecla === evento.keyCode) {
					tratador.chamarComEscopo(escopo);
				}
			};
			Dom.extrair(this).addEventListener("keyup", tratadorPersonalizado);
			return tratadorPersonalizado;
		},

		tratarQualquerTeclaPressionada: function (tratador, escopo) {
			var tratadorPersonalizado = function (evento) {
				if (Tecla.APAGAR !== evento.keyCode) {
					tratador.chamarComEscopo(escopo);
				}
			};
			Dom.extrair(this).addEventListener("keydown", tratadorPersonalizado);
			return tratadorPersonalizado;
		},

		tratarQualquerTeclaSolta: function (tratador, escopo) {
			var tratadorPersonalizado = function (evento) {
				if (Tecla.APAGAR !== evento.keyCode) {
					tratador.chamarComEscopo(escopo);
				}
			};
			Dom.extrair(this).addEventListener("keyup", tratadorPersonalizado);
			return tratadorPersonalizado;
		}
	});

	global.Notificavel = Notificavel;
}(this));
