/*global HTMLCollection*/
/*global HTMLTemplateElement*/
/*global Linda*/
/*global NodeList*/
/*global Tratador*/
/*global TratadorDeCarregamento*/
/*global TratadorDeMouse*/
/*global TratadorDeTeclado*/

(function () {
	"use strict";

	Node.implementar = Function.prototype.implementar;
	NodeList.implementar = Function.prototype.implementar;
	HTMLCollection.implementar = Function.prototype.implementar;
	HTMLButtonElement.implementar = Function.prototype.implementar;

	Node.implementar({
		limpar: function () {
			var nodosFilhos = this.children;
			for (var indice = 0; indice < nodosFilhos.length; indice++) {
				var nodoFilho = nodosFilhos[indice];
				if (!Linda.instanciaDe(nodoFilho, HTMLTemplateElement)) {
					this.removeChild(nodoFilho);
					indice--;
				}
			}
		},

		selecionar: function (selecao) {
			return this.querySelector(selecao);
		},

		selecionarTodos: function (selecao) {
			return this.querySelectorAll(selecao);
		},

		tratadorDeAlteracao: function (tratador, escopo) {
			return new Tratador(this).paraAlteracao(tratador, escopo);
		},

		tratadorDeAlteracaoNoHistorico: function (tratador, escopo) {
			return new Tratador(this).paraAlteracaoNoHistorico(tratador, escopo);
		},

		tratadorDeErro: function (tratador, escopo) {
			return new Tratador(this).paraErro(tratador, escopo);
		},

		tratadorDeCarregamento: function (tratador, escopo) {
			return new TratadorDeCarregamento(this).paraCarregamento(tratador, escopo);
		},

		tratadorDeCarregamentoIniciado: function (tratador, escopo) {
			return new TratadorDeCarregamento(this).paraCarregamentoIniciado(tratador, escopo);
		},

		tratadorDeCarregamentoFinalizado: function (tratador, escopo) {
			return new TratadorDeCarregamento(this).paraCarregamentoFinalizado(tratador, escopo);
		},

		tratadorDeProgresso: function (tratador, escopo) {
			return new TratadorDeCarregamento(this).paraProgresso(tratador, escopo);
		},

		tratadorDeAbortado: function (tratador, escopo) {
			return new TratadorDeCarregamento(this).paraAbortado(tratador, escopo);
		},

		tratadorDeEstouroDeTempo: function (tratador, escopo) {
			return new TratadorDeCarregamento(this).paraEstouroDeTempo(tratador, escopo);
		},

		tratadorDeClique: function (tratador, escopo) {
			return new TratadorDeMouse(this).paraClique(tratador, escopo);
		},

		tratadorDeCliqueDuplo: function (tratador, escopo) {
			return new TratadorDeMouse(this).paraCliqueDuplo(tratador, escopo);
		},

		tratadorDeTeclaPressionada: function (tecla, tratador, escopo) {
			return new TratadorDeTeclado(this).paraTeclaPressionada(tecla, tratador, escopo);
		},

		tratadorDeTeclaSolta: function (tecla, tratador, escopo) {
			return new TratadorDeTeclado(this).paraTeclaSolta(tecla, tratador, escopo);
		},

		tratadorDeQualquerTeclaPressionada: function (tratador, escopo) {
			return new TratadorDeTeclado(this).paraQualquerTeclaPressionada(tratador, escopo);
		},

		tratadorDeQualquerTeclaSolta: function (tratador, escopo) {
			return new TratadorDeTeclado(this).paraQualquerTeclaSolta(tratador, escopo);
		}
	});

	NodeList.implementar({
		paraCada: Array.prototype.paraCada
	});

	HTMLCollection.implementar({
		paraCada: Array.prototype.paraCada
	});

	HTMLButtonElement.implementar({
		bloquear: function () {
			this.setAttribute("disabled", "disabled");
		},

		desbloquear: function () {
			this.removeAttribute("disabled");
		}
	});
}(this));
