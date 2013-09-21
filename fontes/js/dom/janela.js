/*global Dom*/
/*global Notificavel*/

(function (global) {
	"use strict";

	var Janela = Classe.criar({
		SuperClasse: Notificavel,

		inicializar: function (elementoDom) {
			Notificavel.prototipo.inicializar.chamarComEscopo(this, elementoDom);
		},

		iniciarTemporizador: function (tratador, escopo, tempo) {
			return Dom.extrair(this).setTimeout(tratador.vincularEscopo(escopo));
		},

		iniciarTemporizadorContinuo: function (tratador, escopo, tempo) {
			return Dom.extrair(this).setInterval(tratador.vincularEscopo(escopo));
		},

		iniciarTemporizadorImediato: function (tratador, escopo, tempo) {
			return Dom.extrair(this).setImmediate(tratador.vincularEscopo(escopo));
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
