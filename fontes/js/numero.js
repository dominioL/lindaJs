/*jshint bitwise: true, camelcase: true, curly: true, eqeqeq: true, forin: true, immed: true, latedef: true, newcap: true, noarg: true, noempty: true, nonew: false, plusplus: false, quotmark: "double", regexp: true, undef: true, unused: true, strict: true, trailing: true, indent: 4, maxparams: 3, maxdepth: 2, maxstatements: 10, maxcomplexity: 3, maxlen: 128 asi: false, boss: false, debug: false, eqnull: false, es5: false, esnext: false, evil: false, expr: false, globalstrict: false, funcscope: false, iterator: false, lastsemic: false, laxbreak: false, laxcomma: false, loopfunc: false, multistr: false, onecase: false, proto: false, regexdash: false, scripturl: false, smarttabs: false, shadow: false, sub: false, supernew: false, browser: true*/

(function () {
	"use strict";
	
	Number.estender({
		naoNumero: function (valor) {
			return (valor !== valor);
		},
		
		sortear: function () {
			var limiteInferior = Math.min(limiteA, limiteB);
			var limiteSuperior = Math.max(limiteA, limiteB);
			return (Math.random() * (limiteSuperior - limiteInferior) + limiteInferior);
		},
		
		sortearInteiro: function (limiteA, limiteB) {
			var limiteInferior = Math.min(limiteA, limiteB);
			var limiteSuperior = Math.max(limiteA, limiteB);
			return (Math.floor(Math.random() * (limiteSuperior - limiteInferior + 1)) + Math.floor(limiteInferior));
		}
	});
	
	Number.definirPropriedades({
		maximo: {
			funcaoFornecer: function () {
				return Number.MAX_VALUE;
			}
		},
		
		minimo: {
			funcaoFornecer: function () {
				return Number.MIN_VALUE;
			}
		},
		
		maisInfinito: {
			funcaoFornecer: function () {
				return Number.POSITIVE_INFINITY;
			},
		},
		
		menosInfinito: {
			funcaoFornecer: function () {
				return Number.NEGATIVE_INFINITY;
			}
		}
	});
}());
