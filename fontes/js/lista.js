/*jshint bitwise: true, camelcase: true, curly: true, eqeqeq: true, forin: true, immed: true, latedef: true, newcap: true, noarg: true, noempty: true, nonew: false, plusplus: false, quotmark: "double", regexp: true, undef: true, unused: true, strict: true, trailing: true, indent: 4, maxparams: 3, maxdepth: 2, maxstatements: 10, maxcomplexity: 3, maxlen: 128 asi: false, boss: false, debug: false, eqnull: false, es5: false, esnext: false, evil: false, expr: false, globalstrict: false, funcscope: false, iterator: false, lastsemic: false, laxbreak: false, laxcomma: false, loopfunc: false, multistr: false, onecase: false, proto: false, regexdash: false, scripturl: false, smarttabs: false, shadow: false, sub: false, supernew: false, browser: true*/

(function () {
	"use strict";
	
	Array.implementar({
		contem: function (valor) {
			return (this.indexOf(valor) >= 0);
		},
		
		fornecerIndice: function (elemento) {
			return this.indexOf(elemento);
		},
		
		paraCada: function (funcaoDeIteracao, escopo) {
			funcaoDeIteracao = funcaoDeIteracao.vincularEscopo(escopo);
			for (var indice = 0; indice < this.length; indice++) {
				funcaoDeIteracao(this[indice], indice);
			}
		},
		
		removerPosicao: function (posicao) {
			this.splice(posicao, 1);
		},
		
		removerElemento: function (elemento) {
			this.removerPosicao(this.fornecerIndice(elemento));
		},
		
		vazio: function () {
			return (this.length > 0);
		}
	});
} ());

