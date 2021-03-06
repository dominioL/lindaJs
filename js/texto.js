(function () {
	"use strict";

	String.implementar({
		combinar: function (padrao) {
			return this.match(padrao);
		},

		emBranco: function () {
			var padraoSemEspaco = /^\s*$/;
			return padraoSemEspaco.test(this);
		},

		formatarNumero: function (formato) {
			var formatado = formato;
			var padrao = /[^0-9]/g;
			var padraoDeSubstituicao = /#/;
			var vazio = "";
			var numeros = this.replace(padrao, vazio).split(vazio);
			for (var indice = 0, tamanho = numeros.length; indice < tamanho; indice++) {
				formatado = formatado.replace(padraoDeSubstituicao, numeros[indice]);
			}
			var proximaSubstituicao = formatado.search(padraoDeSubstituicao);
			if (proximaSubstituicao !== -1) {
				formatado = formatado.slice(0, proximaSubstituicao);
			}
			return formatado;
		},

		paraCaixaAlta: function () {
			return this.toUpperCase();
		},

		paraCaixaBaixa: function () {
			return this.toLowerCase();
		},

		paraInteiro: function () {
			return parseInt(this, 10);
		},

		paraFlutuante: function () {
			return parseFloat(this, 10);
		},

		separar: function (padrao) {
			return this.split(padrao);
		},

		substituir: function (padrao, novoTexto) {
			return this.replace(padrao, novoTexto);
		},

		substituirTodos: function (padrao, novoTexto) {
			padrao = new RegExp(padrao, "g");
			return this.replace(padrao, novoTexto);
		}
	});

	String.estender({
		concatenar: function () {
			var texto = "";
			for (var indice = 0, tamanho = arguments.length; indice < tamanho; indice++) {
				texto = texto + arguments[indice];
			}
			return texto;
		},

		concatenarComEspaco: function () {
			var texto = "";
			for (var indice = 0, tamanho = arguments.length; indice < tamanho; indice++) {
				texto = texto + " " + arguments[indice];
			}
			return (arguments.length > 0) ? texto.substr(1, texto.length - 1) : texto;
		},

		formatar: function (mensagem) {
			for (var indice = 1, tamanho = arguments.length; indice < tamanho; indice++) {
				mensagem = mensagem.replace(new RegExp("%@"), arguments[indice]);
				mensagem = mensagem.replace(new RegExp("%" + indice, "g"), arguments[indice]);
			}
			mensagem = mensagem.replace(new RegExp("%@", "g"), "");
			mensagem = mensagem.replace(new RegExp("%[1-9]", "g"), "");
			return mensagem;
		}
	});
}());
