(function (contexto) {
	"use strict";

	var Dom = contexto.Dom;
	var Notificavel = contexto.Notificavel;
	var Classe = contexto.Classe;

	var Janela = Classe.criar({
		SuperClasse: Notificavel,

		inicializar: function (elementoDom) {
			Notificavel.prototipo.inicializar.chamarComEscopo(this, elementoDom);
		},

		iniciarTemporizador: function (tratador, tempo, escopo) {
			return Dom.extrair(this).setTimeout(tratador.vincularEscopo(escopo), tempo);
		},

		iniciarTemporizadorContinuo: function (tratador, tempo, escopo) {
			return Dom.extrair(this).setInterval(tratador.vincularEscopo(escopo), tempo);
		},

		iniciarTemporizadorImediato: function (tratador, tempo, escopo) {
			return Dom.extrair(this).setImmediate(tratador.vincularEscopo(escopo), tempo);
		},

		cancelarTemporizador: function (identificador) {
			Dom.extrair(this).clearTimeout(identificador);
		},

		cancelarTemporizadorContinuo: function (identificador) {
			Dom.extrair(this).clearInterval(identificador);
		},

		cancelarTemporizadorImediato: function (identificador) {
			Dom.extrair(this).clearImediate(identificador);
		}
	});

	contexto.Janela = Janela;
}(this));
