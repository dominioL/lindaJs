(function () {
	"use strict";

	Function.prototype.implementar = function (implementacoes) {
		for (var implementacao in implementacoes) {
			if (implementacoes.hasOwnProperty(implementacao)) {
				this.prototype[implementacao] = implementacoes[implementacao];
			}
		}
	};

	Function.implementar({
		aplicarComEscopo: function (escopo, argumentos) {
			return this.apply(escopo, argumentos);
		},

		chamarComEscopo: function (escopo) {
			arguments.removerPosicao(0);
			return this.aplicarComEscopo(escopo, arguments);
		},

		estender: function (implementacoes) {
			for (var implementacao in implementacoes) {
				if (implementacoes.hasOwnProperty(implementacao)) {
					this[implementacao] = implementacoes[implementacao];
				}
			}
		},

		vincularEscopo: function (escopo) {
			var essaFuncao = this;
			var funcaoComEscopoVinculado = function () {
				return essaFuncao.aplicarComEscopo(escopo, arguments);
			};
			return funcaoComEscopoVinculado;
		}
	});
}(this));
