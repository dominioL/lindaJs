/*global module*/
/*global test*/
/*global equal*/
/*jshint bitwise: true, camelcase: true, curly: true, eqeqeq: true, forin: true, immed: true, latedef: true, newcap: true, noarg: true, noempty: true, nonew: false, plusplus: false, quotmark: "double", regexp: true, undef: true, unused: true, strict: true, trailing: true, indent: 4, maxparams: 3, maxdepth: 2, maxstatements: 15, maxcomplexity: 3, maxlen: 128 asi: false, boss: false, debug: false, eqnull: false, es5: false, esnext: false, evil: false, expr: false, globalstrict: false, funcscope: false, iterator: false, lastsemic: false, laxbreak: false, laxcomma: false, loopfunc: false, multistr: false, onecase: false, proto: false, regexdash: false, scripturl: false, smarttabs: false, shadow: false, sub: false, supernew: false, browser: true*/

(function () {
	"use strict";
	
	module("formatar");
	
	test("Substitui campos de acordo com a ordem dos argumentos.", function () {
		equal(String
				.formatar("Os %@ bebem %@, fumam %@ e criam %@.", "alemães", "cerveja", "Dunhill", "cachorros"),
				"Os alemães bebem cerveja, fumam Dunhill e criam cachorros.",
				"Substitui os campos por argumentos.");
		equal(String
				.formatar("Os %@ bebem %@, fumam %@ e criam %@.", "suecos", "leite", "Prince", "gatos", "amarela"),
				"Os suecos bebem leite, fumam Prince e criam gatos.",
				"Ignora os argumentos extras.");
		equal(String
				.formatar("Os %@ bebem %@, fumam %@ e criam %@ em uma casa %@.", "ingleses", "chá", "Blends", "cavalos"),
				"Os ingleses bebem chá, fumam Blends e criam cavalos em uma casa .",
				"Elimina os campos extras.");
	});
	
	test("Substitui campos de acordo com o indíce dos campos.", function () {
		equal(String
				.formatar("Os %1 bebem %2, fumam %3 e criam %4.", "alemães", "cerveja", "Dunhill", "cachorros"),
				"Os alemães bebem cerveja, fumam Dunhill e criam cachorros.",
				"Substitui os campos por argumentos.");
		equal(String
				.formatar("Os %1 bebem %2, fumam %3 e criam %4.", "suecos", "leite", "Prince", "gatos", "amarela"),
				"Os suecos bebem leite, fumam Prince e criam gatos.",
				"Ignora os argumentos extras.");
		equal(String
				.formatar("Os %1 bebem %2, fumam %3 e criam %4 em uma casa %5.", "ingleses", "chá", "Blends", "cavalos"),
				"Os ingleses bebem chá, fumam Blends e criam cavalos em uma casa .",
				"Elimina os campos extras.");
		equal(String
				.formatar("Os %4 bebem %1, fumam %2 e criam %3.", "noroegueses", "café", "Bluemaster", "passáros"),
				"Os passáros bebem noroegueses, fumam café e criam Bluemaster.",
				"Ordem depende do indíce do campo.");
		equal(String
				.formatar("Os %1 bebem %2, fumam %2 e criam %1.", "dinamarqueses", "água", "Pall Mall", "pexes"),
				"Os dinamarqueses bebem água, fumam água e criam dinamarqueses.",
				"Campos podem ser repetidos.");
	});
	
	test("Substitui campos de acordo com a ordem dos argumentos e indíce dos campos.", function () {
		equal(String
				.formatar("Os %1 bebem %@, fumam %3 e criam %@.", "alemães", "cerveja", "Dunhill", "cachorros"),
				"Os alemães bebem alemães, fumam Dunhill e criam cerveja.",
				"Substitui os campos por argumentos.");
		equal(String
				.formatar("Os %@ bebem %@, fumam %3 e criam %5.", "suecos", "leite", "Prince", "amarela", "gatos"),
				"Os suecos bebem leite, fumam Prince e criam gatos.",
				"Ignora os argumentos extras.");
		equal(String
				.formatar("Os %@ bebem %@, fumam %3 e criam %4 em uma casa %@ de %9.", "ingleses", "chá", "Blends", "cavalos"),
				"Os ingleses bebem chá, fumam Blends e criam cavalos em uma casa Blends de .",
				"Elimina os campos extras.");
		equal(String
				.formatar("Os %4 bebem %1, fumam %2 e criam %@.", "noroegueses", "café", "Bluemaster", "passáros"),
				"Os passáros bebem noroegueses, fumam café e criam noroegueses.",
				"Ordem depende do indíce do campo.");
		equal(String
				.formatar("Os %@ bebem %@, fumam %3 e criam %3.", "dinamarqueses", "água", "Pall Mall", "pexes"),
				"Os dinamarqueses bebem água, fumam Pall Mall e criam Pall Mall.",
				"Campos podem ser repetidos.");
	});
}());

