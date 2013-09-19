/*global QUnit*/

(function () {
	"use strict";

	QUnit.module("fundir");

	QUnit.test("Lista vazia fundida com lista vazia permanece vazia.", function () {
		var listaA = [];
		var listaB = [];
		listaA.fundir(listaB);
		QUnit.deepEqual(listaA, listaB, "listaA fical igual listaB.");
		QUnit.deepEqual(listaA, [], "listaA fica vazia.");
		QUnit.deepEqual(listaB, [], "listaB é inalterada.");
	});

	QUnit.test("Lista vazia fundida com lista com elementos fica com os mesmos elementos da segunda lista.", function () {
		var listaA = [];
		var listaB = [1, 2, 3];
		listaA.fundir(listaB);
		QUnit.deepEqual(listaA, listaB, "listaA fica igual listaB.");
		QUnit.deepEqual(listaA, [1, 2, 3], "listaA fica com elementos da listaB.");
		QUnit.deepEqual(listaB, [1, 2, 3], "listaB é inalterada.");
	});

	QUnit.test("Lista com elementos fundida com lista vazia fica com os mesmos elementos da primeira lista.", function () {
		var listaA = [1, 2, 3];
		var listaB = [];
		listaA.fundir(listaB);
		QUnit.deepEqual(listaA, [1, 2, 3], "listaA fica com os seus elementos.");
		QUnit.deepEqual(listaB, [], "listaB é inalterada.");
	});

	QUnit.test("Lista com elementos fundida com lista com elementos fica com os elementos da primeira e da segunda lista.", function () {
		var listaA = [1, 2, 3];
		var listaB = [4, 5, 6];
		listaA.fundir(listaB);
		QUnit.deepEqual(listaA, [1, 2, 3, 4, 5, 6], "listaA fica com os seus elementos e com elementos da listaB.");
		QUnit.deepEqual(listaB, [4, 5, 6], "listaB é inalterada.");
	});

	QUnit.module("reduzir");

	QUnit.test("Somar valores de uma lista.", function () {
		var lista = [1, 2, 3, 4, 5];
		var soma = lista.reduzir(function (soma, valor) {
			return (soma + valor);
		});
		QUnit.deepEqual(lista, [1, 2, 3, 4, 5], "Lista não é alterada.");
		QUnit.equal(soma, 15, "Realiza a redução fornecendo o valor final.");
	});
}());
