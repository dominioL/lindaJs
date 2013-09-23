(function (global) {
	"use strict";

	var ExcecaoLinda = function (mensagem) {
		this.mensagem = mensagem;
		this.message = mensagem;
	};

	ExcecaoLinda.prototype.comoTexto = function () {
		return ("ExcecaoLinda: " + this.mensagem);
	};

	var Linda = {
		propriedadesDeAtributos: {
			configuravel: false,
			enumeravel: false,
			gravavel: false,
			fornecer: undefined,
			fixar: undefined,
			valor: undefined
		},

		propriedadesDeAtributosGravaveis: {
			configuravel: false,
			enumeravel: false,
			gravavel: true,
			fornecer: undefined,
			fixar: undefined,
			valor: undefined
		},

		propriedadesDeAtributosGravaveisConfiguraveis: {
			configuravel: true,
			enumeravel: false,
			gravavel: true,
			fornecer: undefined,
			fixar: undefined,
			valor: undefined
		},

		tipos: {
			OBJETO: "object",
			FUNCAO: "function",
			TEXTO: "string",
			NUMERO: "number",
			BOOLEANO: "boolean",
			INDEFINIDO: "undefined"
		},

		instanciaDe: function (objeto, tipo) {
			if (!this.tipoDe(tipo, Function) || this.nulo(objeto)) {
				return false;
			}
			if (this.tipoPrimitivo(objeto)) {
				return this.tipoDe(objeto, tipo);
			}
			return objeto.instanciaDe(tipo);
		},

		tipoPrimitivo: function (valor) {
			return (
				this.tipoDe(valor, String) ||
				this.tipoDe(valor, Number) ||
				this.tipoDe(valor, Boolean) ||
				this.tipoDe(valor, undefined)
			);
		},

		tipoDe: function (tipo, tipoComparado) {
			var tipoComparadoTextual = "";
			if (tipoComparado === Object) {
				tipoComparadoTextual = this.tipos.OBJETO;
			} else if (tipoComparado === Function) {
				tipoComparadoTextual = this.tipos.FUNCAO;
			} else if (tipoComparado === String) {
				tipoComparadoTextual = this.tipos.TEXTO;
			} else if (tipoComparado === Number) {
				tipoComparadoTextual = this.tipos.NUMERO;
			} else if (tipoComparado === Boolean) {
				tipoComparadoTextual = this.tipos.BOOLEANO;
			} else if (tipoComparado === undefined) {
				tipoComparadoTextual = this.tipos.INDEFINIDO;
			}
			return (typeof tipo === tipoComparadoTextual);
		},

		nuloOuIndefinido: function (valor) {
			return (valor === null || valor === undefined);
		},

		nulo: function (valor) {
			return (valor === null);
		},

		indefinido: function (valor) {
			return (valor === undefined);
		},

		existe: function (valor) {
			return (valor !== null && valor !== undefined);
		},

		assegureQue: function (condicao) {
			if (!condicao) {
				throw new ExcecaoLinda("Asserção inválida. Quebra de contrato.");
			}
		},

		assegureQueNao: function (condicao) {
			this.assegureQue(!condicao);
		}
	};

	global.Linda = Linda;
}(this));
