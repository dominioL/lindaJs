/*global deepEqual*/
/*global equal*/
/*global module*/
/*global test*/

(function () {
	"use strict";

	module("fornecerPropriedades");

	test("Itera sobre todas propriedades.", function () {
		function O() {}
		O.prototype.he = "HE";
		O.prototype.definirPropriedade("hi", {valor: "HI", enumeravel: false});
		var o = new O();
		o.pe = "PE";
		o.definirPropriedade("pi", {valor: "PI", enumeravel: false});

		deepEqual(o.fornecerPropriedadesProprias(), ["pe", "pi"], "Fornecer propriedades próprias.");
		deepEqual(o.fornecerPropriedadesPropriasEnumeraveis(), ["pe"], "Fornecer propriedades próprias enumeráveis");
		deepEqual(o.fornecerPropriedadesPropriasInvisiveis(), ["pi"], "Fornecer propriedades próprias invisíveis");
	});
}());
