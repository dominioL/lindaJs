/*global QUnit*/

(function () {
	"use strict";

	QUnit.module("formatar");

	QUnit.test("Substitui campos de acordo com a ordem dos argumentos.", function () {
		QUnit.equal(String
				.formatar("Os %@ bebem %@, fumam %@ e criam %@.", "alemães", "cerveja", "Dunhill", "cachorros"),
				"Os alemães bebem cerveja, fumam Dunhill e criam cachorros.",
				"Substitui os campos por argumentos.");
		QUnit.equal(String
				.formatar("Os %@ bebem %@, fumam %@ e criam %@.", "suecos", "leite", "Prince", "gatos", "amarela"),
				"Os suecos bebem leite, fumam Prince e criam gatos.",
				"Ignora os argumentos extras.");
		QUnit.equal(String
				.formatar("Os %@ bebem %@, fumam %@ e criam %@ em uma casa %@.", "ingleses", "chá", "Blends", "cavalos"),
				"Os ingleses bebem chá, fumam Blends e criam cavalos em uma casa .",
				"Elimina os campos extras.");
	});

	QUnit.test("Substitui campos de acordo com o indíce dos campos.", function () {
		QUnit.equal(String
				.formatar("Os %1 bebem %2, fumam %3 e criam %4.", "alemães", "cerveja", "Dunhill", "cachorros"),
				"Os alemães bebem cerveja, fumam Dunhill e criam cachorros.",
				"Substitui os campos por argumentos.");
		QUnit.equal(String
				.formatar("Os %1 bebem %2, fumam %3 e criam %4.", "suecos", "leite", "Prince", "gatos", "amarela"),
				"Os suecos bebem leite, fumam Prince e criam gatos.",
				"Ignora os argumentos extras.");
		QUnit.equal(String
				.formatar("Os %1 bebem %2, fumam %3 e criam %4 em uma casa %5.", "ingleses", "chá", "Blends", "cavalos"),
				"Os ingleses bebem chá, fumam Blends e criam cavalos em uma casa .",
				"Elimina os campos extras.");
		QUnit.equal(String
				.formatar("Os %4 bebem %1, fumam %2 e criam %3.", "noroegueses", "café", "Bluemaster", "passáros"),
				"Os passáros bebem noroegueses, fumam café e criam Bluemaster.",
				"Ordem depende do indíce do campo.");
		QUnit.equal(String
				.formatar("Os %1 bebem %2, fumam %2 e criam %1.", "dinamarqueses", "água", "Pall Mall", "pexes"),
				"Os dinamarqueses bebem água, fumam água e criam dinamarqueses.",
				"Campos podem ser repetidos.");
	});

	QUnit.test("Substitui campos de acordo com a ordem dos argumentos e indíce dos campos.", function () {
		QUnit.equal(String
				.formatar("Os %1 bebem %@, fumam %3 e criam %@.", "alemães", "cerveja", "Dunhill", "cachorros"),
				"Os alemães bebem alemães, fumam Dunhill e criam cerveja.",
				"Substitui os campos por argumentos.");
		QUnit.equal(String
				.formatar("Os %@ bebem %@, fumam %3 e criam %5.", "suecos", "leite", "Prince", "amarela", "gatos"),
				"Os suecos bebem leite, fumam Prince e criam gatos.",
				"Ignora os argumentos extras.");
		QUnit.equal(String
				.formatar("Os %@ bebem %@, fumam %3 e criam %4 em uma casa %@ de %9.", "ingleses", "chá", "Blends", "cavalos"),
				"Os ingleses bebem chá, fumam Blends e criam cavalos em uma casa Blends de .",
				"Elimina os campos extras.");
		QUnit.equal(String
				.formatar("Os %4 bebem %1, fumam %2 e criam %@.", "noroegueses", "café", "Bluemaster", "passáros"),
				"Os passáros bebem noroegueses, fumam café e criam noroegueses.",
				"Ordem depende do indíce do campo.");
		QUnit.equal(String
				.formatar("Os %@ bebem %@, fumam %3 e criam %3.", "dinamarqueses", "água", "Pall Mall", "pexes"),
				"Os dinamarqueses bebem água, fumam Pall Mall e criam Pall Mall.",
				"Campos podem ser repetidos.");
	});
}());

