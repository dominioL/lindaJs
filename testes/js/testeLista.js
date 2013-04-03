/*global module*/
/*global test*/
/*global equal*/
/*jshint bitwise: true, camelcase: true, curly: true, eqeqeq: true, forin: true, immed: true, latedef: true, newcap: true, noarg: true, noempty: true, nonew: false, plusplus: false, quotmark: "double", regexp: true, undef: true, unused: true, strict: true, trailing: true, indent: 4, maxparams: 3, maxdepth: 2, maxstatements: 15, maxcomplexity: 3, maxlen: 128 asi: false, boss: false, debug: false, eqnull: false, es5: false, esnext: false, evil: false, expr: false, globalstrict: false, funcscope: false, iterator: false, lastsemic: false, laxbreak: false, laxcomma: false, loopfunc: false, multistr: false, onecase: false, proto: false, regexdash: false, scripturl: false, smarttabs: false, shadow: false, sub: false, supernew: false, browser: true*/

(function () {
	"use strict";
	
	module("fundir");
	
	test("Lista vazia fundida com lista vazia permanece vazia.", function () {
		var listaA = [];
		var listaB = [];
		listaA.fundir(listaB);
		deepEqual(listaA, listaB, "listaA fical igual listaB.");
		deepEqual(listaA, [], "listaA fica vazia.");
		deepEqual(listaB, [], "listaB é inalterada.");
	});
	
	test("Lista vazia fundida com lista com elementos fica com os mesmos elementos da segunda lista.", function () {
		var listaA = [];
		var listaB = [1, 2, 3];
		listaA.fundir(listaB)
		deepEqual(listaA, listaB, "listaA fica igual listaB.");
		deepEqual(listaA, [1, 2, 3], "listaA fica com elementos da listaB.");
		deepEqual(listaB, [1, 2, 3], "listaB é inalterada.");;
	});
	
	test("Lista com elementos fundida com lista vazia fica com os mesmos elementos da primeira lista.", function () {
		var listaA = [1, 2, 3];
		var listaB = [];
		listaA.fundir(listaB);
		deepEqual(listaA, [1, 2, 3], "listaA fica com os seus elementos.");
		deepEqual(listaB, [], "listaB é inalterada.");
	});
	
	test("Lista com elementos fundida com lista com elementos fica com os elementos da primeira e da segunda lista.", function () {
		var listaA = [1, 2, 3];
		var listaB = [4, 5, 6];
		listaA.fundir(listaB);
		deepEqual(listaA, [1, 2, 3, 4, 5, 6], "listaA fica com os seus elementos e com elementos da listaB.");
		deepEqual(listaB, [4, 5, 6], "listaB é inalterada.");
	});
	
	module("reduzir");
	
	test("Somar valores de uma lista.", function () {
		var lista = [1, 2, 3, 4, 5];
		var soma = lista.reduzir(function (soma, valor) {
			return (soma + valor);
		});
		deepEqual(lista, [1, 2, 3, 4, 5], "Lista não é alterada.");
		equal(soma, 15, "Realiza a redução fornecendo o valor final.");
	});
}());
