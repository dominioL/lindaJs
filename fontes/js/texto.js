/*global Linda*/

(function () {
	"use strict";

	String.implementar({
		paraInteiro: function () {
			return Linda.global.parseInt(this);
		},

		paraFlutuante: function () {
			return Linda.global.parseFloat(this);
		}
	});

	String.estender({
		concatenar: function () {
			var texto = "";
			for (var indice = 0; indice < arguments.length; indice++) {
				texto = texto + arguments[indice];
			}
			return texto;
		},

		concatenarComEspaco: function () {
			var texto = "";
			for (var indice = 0; indice < arguments.length; indice++) {
				texto = texto + " " + arguments[indice];
			}
			return (arguments.length > 0) ? texto.substr(1, texto.length - 1) : texto;
		},

		formatar: function (mensagem) {
			for (var indice = 1; indice < arguments.length; indice++) {
				mensagem = mensagem.replace(new RegExp("%@"), arguments[indice]);
				mensagem = mensagem.replace(new RegExp("%" + indice, "g"), arguments[indice]);
			}
			mensagem = mensagem.replace(new RegExp("%@", "g"), "");
			mensagem = mensagem.replace(new RegExp("%[1-9]", "g"), "");
			return mensagem;
		}
	});
}());
