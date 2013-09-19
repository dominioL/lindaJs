/*global QUnit*/

(function () {
	"use strict";

	QUnit.module("fornecerPropriedades");

	QUnit.test("Itera sobre todas propriedades.", function () {
		function O() {}
		O.prototype.he = "HE";
		O.prototype.definirPropriedade("hi", {valor: "HI", enumeravel: false});
		var o = new O();
		o.pe = "PE";
		o.definirPropriedade("pi", {valor: "PI", enumeravel: false});

		QUnit.deepEqual(o.fornecerPropriedadesProprias(), ["pe", "pi"], "Fornecer propriedades próprias.");
		QUnit.deepEqual(o.fornecerPropriedadesPropriasEnumeraveis(), ["pe"], "Fornecer propriedades próprias enumeráveis");
		QUnit.deepEqual(o.fornecerPropriedadesPropriasInvisiveis(), ["pi"], "Fornecer propriedades próprias invisíveis");
	});
}());
