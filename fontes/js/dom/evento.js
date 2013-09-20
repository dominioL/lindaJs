/*global Tratador*/
/*global TratadorDeCarregamento*/
/*global TratadorDeMouse*/
/*global TratadorDeTeclado*/

(function () {
	"use strict";

	Node.implementar = Function.prototype.implementar;

	Node.implementar({
		tratarAlteracao: function (tratador, escopo) {
			return new Tratador(this).paraAlteracao(tratador, escopo);
		},

		tratarAlteracaoNoHistorico: function (tratador, escopo) {
			return new Tratador(this).paraAlteracaoNoHistorico(tratador, escopo);
		},

		tratarErro: function (tratador, escopo) {
			return new Tratador(this).paraErro(tratador, escopo);
		},

		tratarCarregamento: function (tratador, escopo) {
			return new TratadorDeCarregamento(this).paraCarregamento(tratador, escopo);
		},

		tratarCarregamentoIniciado: function (tratador, escopo) {
			return new TratadorDeCarregamento(this).paraCarregamentoIniciado(tratador, escopo);
		},

		tratarCarregamentoFinalizado: function (tratador, escopo) {
			return new TratadorDeCarregamento(this).paraCarregamentoFinalizado(tratador, escopo);
		},

		tratarProgresso: function (tratador, escopo) {
			return new TratadorDeCarregamento(this).paraProgresso(tratador, escopo);
		},

		tratarAborto: function (tratador, escopo) {
			return new TratadorDeCarregamento(this).paraAborto(tratador, escopo);
		},

		tratarEstouroDeTempo: function (tratador, escopo) {
			return new TratadorDeCarregamento(this).paraEstouroDeTempo(tratador, escopo);
		},

		tratarClique: function (tratador, escopo) {
			return new TratadorDeMouse(this).paraClique(tratador, escopo);
		},

		tratarCliqueDuplo: function (tratador, escopo) {
			return new TratadorDeMouse(this).paraCliqueDuplo(tratador, escopo);
		},

		tratarTeclaPressionada: function (tecla, tratador, escopo) {
			return new TratadorDeTeclado(this).paraTeclaPressionada(tecla, tratador, escopo);
		},

		tratarTeclaSolta: function (tecla, tratador, escopo) {
			return new TratadorDeTeclado(this).paraTeclaSolta(tecla, tratador, escopo);
		},

		tratarQualquerTeclaPressionada: function (tratador, escopo) {
			return new TratadorDeTeclado(this).paraQualquerTeclaPressionada(tratador, escopo);
		},

		tratarQualquerTeclaSolta: function (tratador, escopo) {
			return new TratadorDeTeclado(this).paraQualquerTeclaSolta(tratador, escopo);
		}
	});
}(this));
