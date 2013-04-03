(function () {
	"use strict";

	Array.implementar({
		contem: function (valor) {
			return (this.indexOf(valor) >= 0);
		},

		embaralhar: function () {
			for (var indice = 0, tamanho = this.length - 1; indice <= tamanho; indice++) {
				var novoIndice = Number.sortearInteiro(0, tamanho);
				var valorSalvo = this[indice];
				this[indice] = this[novoIndice];
				this[novoIndice] = valorSalvo;
			}
		},

		dentroDosLimites: function (indice) {
			return (!this.vazio() && indice >= 0 && indice < this.length);
		},

		fornecerIndice: function (elemento) {
			return this.indexOf(elemento);
		},

		fundir: function (outra) {
			this.push.aplicarComEscopo(this, outra);
		},

		paraCada: function (funcaoDeIteracao, escopo) {
			funcaoDeIteracao = funcaoDeIteracao.vincularEscopo(escopo);
			for (var indice = 0; indice < this.length; indice++) {
				funcaoDeIteracao(this[indice], indice);
			}
		},

		primeiro: function () {
			return this[0];
		},

		primeiroIndice: function () {
			return 0;
		},

		quantidadeMenorQue: function (quantidade) {
			return (this.length < quantidade);
		},

		quantidadeMenorIgualQue: function (quantidade) {
			return (this.length <= quantidade);
		},

		quantidadeMaiorQue: function (quantidade) {
			return (this.length > quantidade);
		},

		quantidadeMaiorIgualQue: function (quantidade) {
			return (this.length >= quantidade);
		},

		quantidadeIgual: function (quantidade) {
			return (this.length === quantidade);
		},

		reduzir: function (funcaoDeReducao, valorAtual, escopo) {
			funcaoDeReducao = funcaoDeReducao.vincularEscopo(escopo);
			valorAtual = valorAtual || 0;
			for (var indice = 0; indice < this.length; indice++) {
				valorAtual = funcaoDeReducao(valorAtual, this[indice], indice);
			}
			return valorAtual;
		},

		removerPosicao: function (posicao) {
			this.splice(posicao, 1);
		},

		removerElemento: function (elemento) {
			this.removerPosicao(this.fornecerIndice(elemento));
		},

		ultimo: function () {
			return this[this.length - 1];
		},

		ultimoIndice: function () {
			return (this.length - 1);
		},

		vazio: function () {
			return (this.length === 0);
		}
	});
} ());
