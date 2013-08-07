/*global HTMLCollection*/
/*global HTMLTemplateElement*/
/*global Linda*/
/*global NodeList*/
/*global TratadorDeAlteracao*/
/*global TratadorDeMouse*/
/*global TratadorDePagina*/
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

		tratadorDeClique: function (tratador) {
			return new TratadorDeMouse(this).paraClique(tratador);
		},

		tratadorDeCarregamento: function (tratador) {
			return new TratadorDePagina(this).paraCarregamento(tratador);
		},

		tratadorDeAlteracaoNoHistorico: function (tratador) {
			return new TratadorDePagina(this).paraAlteracaoNoHistorico(tratador);
		},

		tratadorDeTeclaPressionada: function (tratador, tecla) {
			return new TratadorDeTeclado(this, tecla).paraTeclaPressionada(tratador);
		},

		tratadorDeTeclaSolta: function (tratador, tecla) {
			return new TratadorDeTeclado(this, tecla).paraTeclaSolta(tratador);
		},

		tratadorDeCaractereDigitado: function (tratador) {
			return new TratadorDeTeclado(this).paraQualquerCaractere(tratador);
		},

		tratadorDeAlteracao: function (tratador) {
			return new TratadorDeAlteracao(this).paraAlteracao(tratador);
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
