(function () {
	"use strict";

	Number.estender({
		naoNumero: function (valor) {
			return (valor !== valor);
		},

		sortear: function (limiteA, limiteB) {
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
			fornecer: function () {
				return Number.MAX_VALUE;
			}
		},

		minimo: {
			fornecer: function () {
				return Number.MIN_VALUE;
			}
		},

		maisInfinito: {
			fornecer: function () {
				return Number.POSITIVE_INFINITY;
			},
		},

		menosInfinito: {
			fornecer: function () {
				return Number.NEGATIVE_INFINITY;
			}
		}
	});
}());
