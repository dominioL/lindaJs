(function (contexto) {
	"use strict";

	var Linda = contexto.Linda;

	Array.implementar({
		adicionar: function () {
			this.push.aplicarComEscopo(this, arguments);
		},

		tirar: function () {
			return this.pop();
		},

		adicionarNoInicio: function () {
			this.unshift.aplicarComEscopo(this, arguments);
		},

		tirarDoInicio: function () {
			return this.shift();
		},

		clonar: function () {
			var clone = new Array(this.length);
			for (var indice = 0; indice < this.length; indice++) {
				var elemento = this[indice];
				if (Linda.tipoDe(elemento.clonar, Function)) {
					elemento = elemento.clonar();
				}
				clone[indice] = elemento;
			}
			return clone;
		},

		contem: function (valor) {
			return (this.indexOf(valor) >= 0);
		},

		embaralhar: function () {
			for (var indice = 0; indice < this.length; indice++) {
				var novoIndice = Number.sortearInteiro(0, this.length - 1);
				var valorSalvo = this[indice];
				this[indice] = this[novoIndice];
				this[novoIndice] = valorSalvo;
			}
		},

		dentroDosLimites: function (indice) {
			return (this.length !== 0 && indice >= 0 && indice < this.length);
		},

		fornecerIndice: function (elemento) {
			return this.indexOf(elemento);
		},

		fundir: function (outra) {
			this.push.aplicarComEscopo(this, outra);
		},

		limpar: function () {
			this.splice(0, this.length);
		},

		paraCada: function (funcaoDeIteracao, escopo) {
			funcaoDeIteracao = funcaoDeIteracao.vincularEscopo(escopo);
			for (var indice = 0; indice < this.length; indice++) {
				funcaoDeIteracao(this[indice], indice);
			}
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

		reduzirSemPrimeiro: function (funcaoDeReducao, valorAtual, escopo) {
			funcaoDeReducao = funcaoDeReducao.vincularEscopo(escopo);
			valorAtual = valorAtual || 0;
			for (var indice = 1; indice < this.length; indice++) {
				valorAtual = funcaoDeReducao(valorAtual, this[indice], indice);
			}
			return valorAtual;
		},

		reduzirSemUltimo: function (funcaoDeReducao, valorAtual, escopo) {
			funcaoDeReducao = funcaoDeReducao.vincularEscopo(escopo);
			valorAtual = valorAtual || 0;
			for (var indice = 0; indice < (this.length - 1); indice++) {
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

		vazio: function () {
			return (this.length === 0);
		}
	});

	Array.prototype.definirPropriedades({
		primeiro: {
			fornecer: function () {
				return this[0];
			}
		},

		primeiroIndice: {
			fornecer: function () {
				return 0;
			}
		},

		quantidade: {
			fornecer: function () {
				return this.length;
			}
		},

		ultimo: {
			fornecer: function () {
				return this[this.length - 1];
			}
		},

		ultimoIndice: {
			fornecer: function () {
				return (this.length - 1);
			}
		}
	});
} (this));
