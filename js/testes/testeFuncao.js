(function (contexto) {
	"use strict";

	var QUnit = contexto.QUnit;

	QUnit.module("implementar");

	QUnit.test("Adiciona propriedades ao protótipo da função.", function () {
		var Carro = function () {};
		Carro.implementar({
			buzinar: function () {
				return "Bibi";
			}
		});
		var carro = new Carro();
		QUnit.equal(carro.buzinar(), "Bibi");
		QUnit.ok("buzinar" in Carro.prototype);
	});
}(this));
