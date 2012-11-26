/*global Linda*/
/*jshint bitwise: true, camelcase: true, curly: true, eqeqeq: true, forin: true, immed: true, latedef: true, newcap: true, noarg: true, noempty: true, nonew: false, plusplus: false, quotmark: "double", regexp: true, undef: true, unused: true, strict: true, trailing: true, indent: 4, maxparams: 3, maxdepth: 2, maxstatements: 10, maxcomplexity: 3, maxlen: 128 asi: false, boss: false, debug: false, eqnull: false, es5: false, esnext: false, evil: false, expr: false, globalstrict: false, funcscope: false, iterator: false, lastsemic: false, laxbreak: false, laxcomma: false, loopfunc: false, multistr: false, onecase: false, proto: false, regexdash: false, scripturl: false, smarttabs: false, shadow: false, sub: false, supernew: false, browser: true*/

(function () {
	"use strict";
	
	Object.implementar({
		definirPropriedade: function (atributo, definicao) {
			var propriedades = {};
			this.privadoDefinirPropriedade(propriedades, "value", definicao.valor);
			this.privadoDefinirPropriedade(propriedades, "get", definicao.funcaoFornecer);
			this.privadoDefinirPropriedade(propriedades, "set", definicao.funcaoFixar);
			this.privadoDefinirPropriedade(propriedades, "writable", definicao.gravavel);
			this.privadoDefinirPropriedade(propriedades, "enumerable", definicao.enumeravel);
			this.privadoDefinirPropriedade(propriedades, "configurable", definicao.configuravel);
			Object.defineProperty(this, atributo, propriedades);
		},
		
		privadoDefinirPropriedade: function (propriedades, chave, valor) {
			if (!Linda.indefinido(valor)) {
				propriedades[chave] = valor;
			}
		},
		
		fornecerPropriedades: function () {
			return Object.getOwnPropertyNames(this);
		},
		
		fornecerPropriedadesEnumeraveis: function () {
			return Object.keys(this);
		},
		
		paraCada: function (funcaoDeIteracao, escopo) {
			funcaoDeIteracao = funcaoDeIteracao.vincularEscopo(escopo);
			for (var chave in this) {
				if (this.hasOwnProperty(chave)) {
					funcaoDeIteracao(this[chave], chave);
				}
			}
		},
		
		possuiPropriedade: function (propriedade) {
			return (propriedade in this);
		},
		
		possuiPropriedadePropria: function (propriedade) {
			return this.hasOwnProperty(propriedade);
		},
		
		prototipoDe: function (prototipado) {
			return this.isPrototypeOf(prototipado);
		}
	});
}(this));

