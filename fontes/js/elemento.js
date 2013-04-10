/*global HTMLCollection*/
/*global HTMLTemplateElement*/
/*global Linda*/
/*global NodeList*/
/*global TratadorDeMouse*/
/*global TratadorDePagina*/
/*global TratadorDeTeclado*/

(function () {
	"use strict";

	Node.implementar = Function.prototype.implementar;
	NodeList.implementar = Function.prototype.implementar;
	HTMLCollection.implementar = Function.prototype.implementar;

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

		tratadorDeTeclaPressionada: function (tecla, tratador) {
			return new TratadorDeTeclado(tecla, this).paraTeclaPressionada(tratador);
		},

		tratadorDeTeclaSolta: function (tecla, tratador) {
			return new TratadorDeTeclado(tecla, this).paraTeclaSolta(tratador);
		}
	});

	NodeList.implementar({
		paraCada: Array.prototype.paraCada
	});

	HTMLCollection.implementar({
		paraCada: Array.prototype.paraCada
	});
}(this));
