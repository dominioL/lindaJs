/*global Classe*/
/*global Dom*/
/*global Notificavel*/

(function (global) {
	"use strict";

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

	global.Janela = Janela;
}(this));
