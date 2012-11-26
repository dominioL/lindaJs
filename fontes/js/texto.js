/*global Linda*/
/*jshint bitwise: true, camelcase: true, curly: true, eqeqeq: true, forin: true, immed: true, latedef: true, newcap: true, noarg: true, noempty: true, nonew: false, plusplus: false, quotmark: "double", regexp: true, undef: true, unused: true, strict: true, trailing: true, indent: 4, maxparams: 3, maxdepth: 2, maxstatements: 10, maxcomplexity: 3, maxlen: 128 asi: false, boss: false, debug: false, eqnull: false, es5: false, esnext: false, evil: false, expr: false, globalstrict: false, funcscope: false, iterator: false, lastsemic: false, laxbreak: false, laxcomma: false, loopfunc: false, multistr: false, onecase: false, proto: false, regexdash: false, scripturl: false, smarttabs: false, shadow: false, sub: false, supernew: false, browser: true*/

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

