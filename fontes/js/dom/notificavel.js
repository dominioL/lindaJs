(function (contexto) {
	"use strict";

	var Dom = contexto.Dom;
	var Classe = contexto.Classe;
	var Tecla = contexto.Tecla;

	var Notificavel = Classe.criar({
		inicializar: function (elementoDom) {
			this.elementoDom = elementoDom;
		},

		deixarDeTratar: function (evento, funcao) {
			Dom.extrair(this).removeEventListener(evento, funcao);
		},

		tratarAlteracao: function (tratador, escopo) {
			tratador = tratador.vincularEscopo(escopo);
			Dom.extrair(this).addEventListener("change", tratador);
			return tratador;
		},

		deixarDeTratarAlteracao: function (funcao) {
			this.deixarDeTratar("change", funcao);
		},

		tratarAlteracaoNoHistorico: function (tratador, escopo) {
			tratador = tratador.vincularEscopo(escopo);
			Dom.extrair(this).addEventListener("popstate", tratador);
			return tratador;
		},

		deixarDeTratarAlteracaoNoHistorico: function (funcao) {
			this.deixarDeTratar("popstate", funcao);
		},

		tratarErro: function (tratador, escopo) {
			tratador = tratador.vincularEscopo(escopo);
			Dom.extrair(this).addEventListener("error", tratador);
			return tratador;
		},

		deixarDeTratarErro: function (funcao) {
			this.deixarDeTratar("error", funcao);
		},

		tratarCarregamento: function (tratador, escopo) {
			tratador = tratador.vincularEscopo(escopo);
			Dom.extrair(this).addEventListener("load", tratador);
			return tratador;
		},

		deixarDeTratarCarregamento: function (funcao) {
			this.deixarDeTratar("load", funcao);
		},

		tratarCarregamentoIniciado: function (tratador, escopo) {
			tratador = tratador.vincularEscopo(escopo);
			Dom.extrair(this).addEventListener("loadstart", tratador);
			return tratador;
		},

		deixarDeTratarCarregamentoIniciado: function (funcao) {
			this.deixarDeTratar("loadstart", funcao);
		},

		tratarCarregamentoFinalizado: function (tratador, escopo) {
			tratador = tratador.vincularEscopo(escopo);
			Dom.extrair(this).addEventListener("loadend", tratador);
			return tratador;
		},

		deixarDeTratarCarregamentoFinalizado: function (funcao) {
			this.deixarDeTratar("loadend", funcao);
		},

		tratarProgresso: function (tratador, escopo) {
			tratador = tratador.vincularEscopo(escopo);
			Dom.extrair(this).addEventListener("progress", tratador);
			return tratador;
		},

		deixarDeTratarProgresso: function (funcao) {
			this.deixarDeTratar("progress", funcao);
		},

		tratarAborto: function (tratador, escopo) {
			tratador = tratador.vincularEscopo(escopo);
			Dom.extrair(this).addEventListener("abort", tratador);
			return tratador;
		},

		deixarDeTratarAborto: function (funcao) {
			this.deixarDeTratar("abort", funcao);
		},

		tratarEstouroDeTempo: function (tratador, escopo) {
			tratador = tratador.vincularEscopo(escopo);
			Dom.extrair(this).addEventListener("timeout", tratador);
			return tratador;
		},

		deixarDeTratarEstouroDeTempo: function (funcao) {
			this.deixarDeTratar("timeout", funcao);
		},

		tratarClique: function (tratador, escopo) {
			tratador = tratador.vincularEscopo(escopo);
			Dom.extrair(this).addEventListener("click", tratador);
			return tratador;
		},

		deixarDeTratarClique: function (funcao) {
			this.deixarDeTratar("click", funcao);
		},

		tratarCliqueDuplo: function (tratador, escopo) {
			tratador = tratador.vincularEscopo(escopo);
			Dom.extrair(this).addEventListener("dbclick", tratador);
			return tratador;
		},

		deixarDeTratarCliqueDuplo: function (funcao) {
			this.deixarDeTratar("dbclick", funcao);
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

		deixarDeTratarTeclaPressionada: function (funcao) {
			this.deixarDeTratar("keydown", funcao);
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

		deixarDeTratarTeclaSolta: function (funcao) {
			this.deixarDeTratar("keyup", funcao);
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

	contexto.Notificavel = Notificavel;
}(this));
