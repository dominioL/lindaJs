/*global module*/
/*global test*/
/*global ok*/
/*global Linda*/
/*jshint bitwise: true, camelcase: true, curly: true, eqeqeq: true, forin: true, immed: true, latedef: true, newcap: true, noarg: true, noempty: true, nonew: false, plusplus: false, quotmark: "double", regexp: true, undef: true, unused: true, strict: true, trailing: true, indent: 4, maxparams: 3, maxdepth: 2, maxstatements: 15, maxcomplexity: 3, maxlen: 128 asi: false, boss: false, debug: false, eqnull: false, es5: false, esnext: false, evil: false, expr: false, globalstrict: false, funcscope: false, iterator: false, lastsemic: false, laxbreak: false, laxcomma: false, loopfunc: false, multistr: false, onecase: false, proto: false, regexdash: false, scripturl: false, smarttabs: false, shadow: false, sub: false, supernew: false, browser: true*/

(function () {
	"use strict";
	
	module("tipoDe");
	
	test("Object.", function () {
		ok(!Linda.tipoDe(function () {}, Object), "function () {} não é do tipo Object.");
		ok(!Linda.tipoDe(Object, Object), "Oject não é do tipo Object.");
		ok(!Linda.tipoDe(Function, Object), "Function não é do tipo Object.");
		ok(!Linda.tipoDe(Array, Object), "Array não é do tipo Object.");
		ok(Linda.tipoDe({}, Object), "{} é do tipo Object.");
		ok(Linda.tipoDe([], Object), "[] é do tipo Object.");
		ok(Linda.tipoDe(null, Object), "null é do tipo Object.");
		ok(!Linda.tipoDe("texto", Object), "'texto' não é do tipo Object.");
		ok(!Linda.tipoDe(10, Object), "10 não é do tipo Object.");
		ok(!Linda.tipoDe(true, Object), "true não é do tipo Object.");
		ok(!Linda.tipoDe(false, Object), "false não é do tipo Object.");
		ok(!Linda.tipoDe(undefined, Object), "undefined não é do tipo Object.");
	});
	
	test("Function.", function () {
		ok(Linda.tipoDe(function () {}, Function), "function () {} é do tipo Function.");
		ok(Linda.tipoDe(Object, Function), "Oject é do tipo Function.");
		ok(Linda.tipoDe(Function, Function), "Oject é do tipo Function.");
		ok(Linda.tipoDe(Array, Function), "Array é do tipo Function.");
		ok(!Linda.tipoDe({}, Function), "{} não é do tipo Function.");
		ok(!Linda.tipoDe([], Function), "[] não é do tipo Function.");
		ok(!Linda.tipoDe(null, Function), "null não é do tipo Function.");
		ok(!Linda.tipoDe("texto", Function), "'texto' não é do tipo Function.");
		ok(!Linda.tipoDe(10, Function), "10 não é do tipo Function.");
		ok(!Linda.tipoDe(true, Function), "true não é do tipo Function.");
		ok(!Linda.tipoDe(false, Function), "false não é do tipo Function.");
		ok(!Linda.tipoDe(undefined, Function), "undefined não é do tipo Function.");
	});
	
	test("String.", function () {
		ok(!Linda.tipoDe(function () {}, String), "function () {} não é do tipo String.");
		ok(!Linda.tipoDe(Object, String), "Oject não é do tipo String.");
		ok(!Linda.tipoDe(Array, String), "Array não é do tipo String.");
		ok(!Linda.tipoDe({}, String), "{} não é do tipo String.");
		ok(!Linda.tipoDe([], String), "[] não é do tipo String.");
		ok(!Linda.tipoDe(null, String), "null não é do tipo String.");
		ok(Linda.tipoDe("texto", String), "'texto' é do tipo String.");
		ok(!Linda.tipoDe(10, String), "10 não é do tipo String.");
		ok(!Linda.tipoDe(true, String), "true não é do tipo String.");
		ok(!Linda.tipoDe(false, String), "false não é do tipo String.");
		ok(!Linda.tipoDe(undefined, String), "undefined não é do tipo String.");
	});
	
	test("Number.", function () {
		ok(!Linda.tipoDe(function () {}, Number), "function () {} não é do tipo Number.");
		ok(!Linda.tipoDe(Object, Number), "Oject não é do tipo Number.");
		ok(!Linda.tipoDe(Array, Number), "Array não é do tipo Number.");
		ok(!Linda.tipoDe({}, Number), "{} não é do tipo Number.");
		ok(!Linda.tipoDe([], Number), "[] não é do tipo Number.");
		ok(!Linda.tipoDe(null, Number), "null não é do tipo Number.");
		ok(!Linda.tipoDe("texto", Number), "'texto' não é do tipo Number.");
		ok(Linda.tipoDe(10, Number), "10 é do tipo Number.");
		ok(!Linda.tipoDe(true, Number), "true não é do tipo Number.");
		ok(!Linda.tipoDe(false, Number), "false não é do tipo Number.");
		ok(!Linda.tipoDe(undefined, Number), "undefined não é do tipo Number.");
	});
	
	test("Boolean.", function () {
		ok(!Linda.tipoDe(function () {}, Boolean), "function () {} não é do tipo Boolean.");
		ok(!Linda.tipoDe(Object, Boolean), "Oject não é do tipo Boolean.");
		ok(!Linda.tipoDe(Array, Boolean), "Array não é do tipo Boolean.");
		ok(!Linda.tipoDe({}, Boolean), "{} não é do tipo Boolean.");
		ok(!Linda.tipoDe([], Boolean), "[] não é do tipo Boolean.");
		ok(!Linda.tipoDe(null, Boolean), "null não é do tipo Boolean.");
		ok(!Linda.tipoDe("texto", Boolean), "'texto' não é do tipo Boolean.");
		ok(!Linda.tipoDe(10, Boolean), "10 não é do tipo Boolean.");
		ok(Linda.tipoDe(true, Boolean), "true é do tipo Boolean.");
		ok(Linda.tipoDe(false, Boolean), "false é do tipo Boolean.");
		ok(!Linda.tipoDe(undefined, Boolean), "undefined não é do tipo Boolean.");
	});
	
	test("undefined.", function () {
		ok(!Linda.tipoDe(function () {}, undefined), "function () {} não é do tipo undefined.");
		ok(!Linda.tipoDe(Object, undefined), "Oject não é do tipo undefined.");
		ok(!Linda.tipoDe(Array, undefined), "Array não é do tipo undefined.");
		ok(!Linda.tipoDe({}, undefined), "{} não é do tipo undefined.");
		ok(!Linda.tipoDe([], undefined), "[] não é do tipo undefined.");
		ok(!Linda.tipoDe(null, undefined), "null não é do tipo undefined.");
		ok(!Linda.tipoDe("texto", undefined), "'texto' não é do tipo undefined.");
		ok(!Linda.tipoDe(10, undefined), "10 não é do tipo undefined.");
		ok(!Linda.tipoDe(true, undefined), "true não é do tipo undefined.");
		ok(!Linda.tipoDe(false, undefined), "false não é do tipo undefined.");
		ok(Linda.tipoDe(undefined, undefined), "undefined é do tipo undefined.");
	});
	
	test("Tipos diferentes de Object, Function, String, Number, Boolean e undefined.", function () {
		ok(!Linda.tipoDe(Function, Array), "Function não é um tipo de Array.");
		ok(!Linda.tipoDe(Function, String), "Function não é um tipo de String.");
		ok(!Linda.tipoDe(Function, Number), "Function não é um tipo de Number.");
		ok(!Linda.tipoDe(Function, Boolean), "Function não é um tipo de Boolean.");
		ok(!Linda.tipoDe(Function, Array), "Function não é um tipo de Array.");
		ok(!Linda.tipoDe(Object, {}), "Object não é um tipo de [].");
		ok(!Linda.tipoDe(Object, []), "Object não é um tipo de {}.");
		ok(!Linda.tipoDe(Object, null), "Object não é um tipo de null.");
		ok(!Linda.tipoDe(String, "texto"), "String não é um tipo de 'texto'.");
		ok(!Linda.tipoDe(Number, 10), "Number não é um tipo de 10.");
		ok(!Linda.tipoDe(Boolean, true), "Boolean não é um tipo de true.");
	});
}());

(function () {
	"use strict";
	
	module("instanciaDe");
	
	test("Object.", function () {
		ok(Linda.instanciaDe(Object, Object), "Object é uma instância de Object.");
		ok(Linda.instanciaDe(Function, Object), "Function é uma instância de Object.");
		ok(Linda.instanciaDe(Array, Object), "Array é uma instância de Object.");
		ok(Linda.instanciaDe(String, Object), "String é uma instância de Object.");
		ok(Linda.instanciaDe(Number, Object), "Number é uma instância de Object.");
		ok(Linda.instanciaDe(Boolean, Object), "Boolean é uma instância de Object.");
		ok(Linda.instanciaDe(function () {}, Object), "function () {} é uma instância de Object.");
		ok(Linda.instanciaDe({}, Object), "{} é uma instância de Object.");
		ok(Linda.instanciaDe([], Object), "[] é uma instância de Object.");
		ok(!Linda.instanciaDe(null, Object), "null não é uma instância de Object.");
		ok(!Linda.instanciaDe("texto", Object), "'texto' não é uma instância de Object.");
		ok(!Linda.instanciaDe(10, Object), "10 não é uma instância de Object.");
		ok(!Linda.instanciaDe(true, Object), "true não é uma instância de Object.");
		ok(!Linda.instanciaDe(undefined, Object), "undefined não é uma instância de Object.");
	});
	
	test("Function.", function () {
		ok(Linda.instanciaDe(Object, Function), "Object é uma instância de Function.");
		ok(Linda.instanciaDe(Function, Function), "Function é uma instância de Function.");
		ok(Linda.instanciaDe(Array, Function), "Array é uma instância de Function.");
		ok(Linda.instanciaDe(String, Function), "String é uma instância de Function.");
		ok(Linda.instanciaDe(Number, Function), "Number é uma instância de Function.");
		ok(Linda.instanciaDe(Boolean, Function), "Boolean é uma instância de Function.");
		ok(Linda.instanciaDe(function () {}, Function), "function () {} é uma instância de Function.");
		ok(!Linda.instanciaDe({}, Function), "{} não é uma instância de Function.");
		ok(!Linda.instanciaDe([], Function), "[] não é uma instância de Function.");
		ok(!Linda.instanciaDe(null, Function), "null não é uma instância de Function.");
		ok(!Linda.instanciaDe("texto", Function), "'texto' não é uma instância de Function.");
		ok(!Linda.instanciaDe(10, Function), "10 não é uma instância de Function.");
		ok(!Linda.instanciaDe(true, Function), "true não é uma instância de Function.");
		ok(!Linda.instanciaDe(undefined, Function), "undefined não é uma instância de Function.");
	});
	
	test("Array.", function () {
		ok(!Linda.instanciaDe(Object, Array), "Object não é uma instância de Array.");
		ok(!Linda.instanciaDe(Function, Array), "Function não é uma instância de Array.");
		ok(!Linda.instanciaDe(Array, Array), "Array não é uma instância de Array.");
		ok(!Linda.instanciaDe(String, Array), "String não é uma instância de Array.");
		ok(!Linda.instanciaDe(Number, Array), "Number não é uma instância de Array.");
		ok(!Linda.instanciaDe(Boolean, Array), "Boolean não é uma instância de Array.");
		ok(!Linda.instanciaDe(function () {}, Array), "function () {} não é uma instância de Array.");
		ok(!Linda.instanciaDe({}, Array), "{} não é uma instância de Array.");
		ok(Linda.instanciaDe([], Array), "[] é uma instância de Array.");
		ok(!Linda.instanciaDe(null, Array), "null não é uma instância de Array.");
		ok(!Linda.instanciaDe("texto", Array), "'texto' não é uma instância de Array.");
		ok(!Linda.instanciaDe(10, Array), "10 não é uma instância de Array.");
		ok(!Linda.instanciaDe(true, Array), "true não é uma instância de Array.");
		ok(!Linda.instanciaDe(undefined, Array), "undefined não é uma instância de Array.");
	});
	
	test("String.", function () {
		ok(!Linda.instanciaDe(Object, String), "Object não é uma instância de String.");
		ok(!Linda.instanciaDe(Function, String), "Function não é uma instância de String.");
		ok(!Linda.instanciaDe(Array, String), "Array não é uma instância de String.");
		ok(!Linda.instanciaDe(String, String), "String não é uma instância de String.");
		ok(!Linda.instanciaDe(Number, String), "Number não é uma instância de String.");
		ok(!Linda.instanciaDe(Boolean, String), "Boolean não é uma instância de String.");
		ok(!Linda.instanciaDe(function () {}, String), "function () {} não é uma instância de String.");
		ok(!Linda.instanciaDe({}, String), "{} não é uma instância de String.");
		ok(!Linda.instanciaDe([], String), "[] não é uma instância de String.");
		ok(!Linda.instanciaDe(null, String), "null não é uma instância de String.");
		ok(Linda.instanciaDe("texto", String), "'texto' é uma instância de String.");
		ok(!Linda.instanciaDe(10, String), "10 não é uma instância de String.");
		ok(!Linda.instanciaDe(true, String), "true não é uma instância de String.");
		ok(!Linda.instanciaDe(undefined, String), "undefined não é uma instância de String.");
	});
	
	test("Number.", function () {
		ok(!Linda.instanciaDe(Object, Number), "Object não é uma instância de Number.");
		ok(!Linda.instanciaDe(Function, Number), "Function não é uma instância de Number.");
		ok(!Linda.instanciaDe(Array, Number), "Array não é uma instância de Number.");
		ok(!Linda.instanciaDe(String, Number), "String não é uma instância de Number.");
		ok(!Linda.instanciaDe(Number, Number), "Number não é uma instância de Number.");
		ok(!Linda.instanciaDe(Boolean, Number), "Boolean não é uma instância de Number.");
		ok(!Linda.instanciaDe(function () {}, Number), "function () {} não é uma instância de Number.");
		ok(!Linda.instanciaDe({}, Number), "{} não é uma instância de Number.");
		ok(!Linda.instanciaDe([], Number), "[] não é uma instância de Number.");
		ok(!Linda.instanciaDe(null, Number), "null não é uma instância de Number.");
		ok(!Linda.instanciaDe("texto", Number), "'texto' não é uma instância de Number.");
		ok(Linda.instanciaDe(10, Number), "10 é uma instância de Number.");
		ok(!Linda.instanciaDe(true, Number), "true não é uma instância de Number.");
		ok(!Linda.instanciaDe(undefined, Number), "undefined não é uma instância de Number.");
	});
	
	test("Boolean.", function () {
		ok(!Linda.instanciaDe(Object, Boolean), "Object não é uma instância de Boolean.");
		ok(!Linda.instanciaDe(Function, Boolean), "Function não é uma instância de Boolean.");
		ok(!Linda.instanciaDe(Array, Boolean), "Array não é uma instância de Boolean.");
		ok(!Linda.instanciaDe(String, Boolean), "String não é uma instância de Boolean.");
		ok(!Linda.instanciaDe(Number, Boolean), "Number não é uma instância de Boolean.");
		ok(!Linda.instanciaDe(Boolean, Boolean), "Boolean não é uma instância de Boolean.");
		ok(!Linda.instanciaDe(function () {}, Boolean), "function () {} não é uma instância de Boolean.");
		ok(!Linda.instanciaDe({}, Boolean), "{} não é uma instância de Boolean.");
		ok(!Linda.instanciaDe([], Boolean), "[] não é uma instância de Boolean.");
		ok(!Linda.instanciaDe(null, Boolean), "null não é uma instância de Boolean.");
		ok(!Linda.instanciaDe("texto", Boolean), "'texto' não é uma instância de Boolean.");
		ok(!Linda.instanciaDe(10, Boolean), "10 não é uma instância de Boolean.");
		ok(Linda.instanciaDe(true, Boolean), "true é uma instância de Boolean.");
		ok(!Linda.instanciaDe(undefined, Boolean), "undefined não é uma instância de Boolean.");
	});
	
	test("{} não é instância de funções não construtoras.", function () {
		ok(!Linda.instanciaDe({}, function () {}), "{} não é uma instância de function () {}.");
		ok(!Linda.instanciaDe({}, {}), "{} não é uma instância de {} .");
		ok(!Linda.instanciaDe({}, []), "{} não é uma instância de [].");
		ok(!Linda.instanciaDe({}, null), "{} não é uma instância de null.");
		ok(!Linda.instanciaDe({}, "texto"), "{} não é uma instância de 'texto'.");
		ok(!Linda.instanciaDe({}, 10), "{} não é uma instância de 10.");
		ok(!Linda.instanciaDe({}, true), "{} não é uma instância de true.");
		ok(!Linda.instanciaDe({}, undefined), "{} não é uma instância de undefined.");
	});
	
	test("[] não é instância de funções não construtoras.", function () {
		ok(!Linda.instanciaDe([], function () {}), "[] não é uma instância de function () {}.");
		ok(!Linda.instanciaDe([], {}), "[] não é uma instância de {} .");
		ok(!Linda.instanciaDe([], []), "[] não é uma instância de [].");
		ok(!Linda.instanciaDe([], null), "[] não é uma instância de null.");
		ok(!Linda.instanciaDe([], "texto"), "[] não é uma instância de 'texto'.");
		ok(!Linda.instanciaDe([], 10), "[] não é uma instância de 10.");
		ok(!Linda.instanciaDe([], true), "[] não é uma instância de true.");
		ok(!Linda.instanciaDe([], undefined), "[] não é uma instância de undefined.");
	});
	
	test("null não é instância de funções não construtoras.", function () {
		ok(!Linda.instanciaDe(null, function () {}), "null não é uma instância de function () {}.");
		ok(!Linda.instanciaDe(null, {}), "null não é uma instância de {} .");
		ok(!Linda.instanciaDe(null, []), "null não é uma instância de [].");
		ok(!Linda.instanciaDe(null, null), "null não é uma instância de null.");
		ok(!Linda.instanciaDe(null, "texto"), "null não é uma instância de 'texto'.");
		ok(!Linda.instanciaDe(null, 10), "null não é uma instância de 10.");
		ok(!Linda.instanciaDe(null, true), "null não é uma instância de true.");
		ok(!Linda.instanciaDe(null, undefined), "null não é uma instância de undefined.");
	});
	
	test("'texto' não é instância de funções não construtoras.", function () {
		ok(!Linda.instanciaDe("texto", function () {}), "'texto' não é uma instância de function () {}.");
		ok(!Linda.instanciaDe("texto", {}), "'texto' não é uma instância de {} .");
		ok(!Linda.instanciaDe("texto", []), "'texto' não é uma instância de [].");
		ok(!Linda.instanciaDe("texto", null), "'texto' não é uma instância de null.");
		ok(!Linda.instanciaDe("texto", "texto"), "'texto' não é uma instância de 'texto'.");
		ok(!Linda.instanciaDe("texto", 10), "'texto' não é uma instância de 10.");
		ok(!Linda.instanciaDe("texto", true), "'texto' não é uma instância de true.");
		ok(!Linda.instanciaDe("texto", undefined), "'texto' não é uma instância de undefined.");
	});
	
	test("10 não é instância de funções não construtoras.", function () {
		ok(!Linda.instanciaDe(10, function () {}), "10 não é uma instância de function () {}.");
		ok(!Linda.instanciaDe(10, {}), "10 não é uma instância de {} .");
		ok(!Linda.instanciaDe(10, []), "10 não é uma instância de [].");
		ok(!Linda.instanciaDe(10, null), "10 não é uma instância de null.");
		ok(!Linda.instanciaDe(10, "texto"), "10 não é uma instância de 'texto'.");
		ok(!Linda.instanciaDe(10, 10), "10 não é uma instância de 10.");
		ok(!Linda.instanciaDe(10, true), "10 não é uma instância de true.");
		ok(!Linda.instanciaDe(10, undefined), "10 não é uma instância de undefined.");
	});
	
	test("true não é instância de funções não construtoras.", function () {
		ok(!Linda.instanciaDe(true, function () {}), "true não é uma instância de function () {}.");
		ok(!Linda.instanciaDe(true, {}), "true não é uma instância de {} .");
		ok(!Linda.instanciaDe(true, []), "true não é uma instância de [].");
		ok(!Linda.instanciaDe(true, null), "true não é uma instância de null.");
		ok(!Linda.instanciaDe(true, "texto"), "true não é uma instância de 'texto'.");
		ok(!Linda.instanciaDe(true, 10), "true não é uma instância de 10.");
		ok(!Linda.instanciaDe(true, true), "true não é uma instância de true.");
		ok(!Linda.instanciaDe(true, undefined), "true não é uma instância de undefined.");
	});
	
	test("undefined não é instância de funções não construtoras.", function () {
		ok(!Linda.instanciaDe(undefined, function () {}), "undefined não é uma instância de function () {}.");
		ok(!Linda.instanciaDe(undefined, {}), "undefined não é uma instância de {} .");
		ok(!Linda.instanciaDe(undefined, []), "undefined não é uma instância de [].");
		ok(!Linda.instanciaDe(undefined, null), "undefined não é uma instância de null.");
		ok(!Linda.instanciaDe(undefined, "texto"), "undefined não é uma instância de 'texto'.");
		ok(!Linda.instanciaDe(undefined, 10), "undefined não é uma instância de 10.");
		ok(!Linda.instanciaDe(undefined, true), "undefined não é uma instância de true.");
		ok(!Linda.instanciaDe(undefined, undefined), "undefined não é uma instância de undefined.");
	});
	
	test("Prototipação.", function () {
		/*jshint maxstatements: 133*/
		function A() {}
		function B() {}
		function C() {}
		function D() {}
		function E() {}
		function F() {}
		function G() {}
		function H() {}
		function I() {}
		function J() {}
		function K() {}
		new K();
		C.prototype.propriedadeC = "propriedadeC";
		D.prototype.propriedadeD = "propriedadeD";
		E.prototype = new C();
		F.prototype = D.prototype;
		G.prototype = new C();
		G.prototype.propriedadeG = "propriedadeG";
		H.prototype = D.prototype;
		H.prototype.propriedadeH = "propriedadeH";
		I.prototype = new G();
		J.prototype = H.prototype;
		var a = new A();
		var b = new B();
		var c = new C();
		var d = new D();
		var e = new E();
		var f = new F();
		var g = new G();
		var h = new H();
		var i = new I();
		var j = new J();
		ok(Linda.instanciaDe(a, A), "new A() é uma instância de function A() {}.");
		ok(!Linda.instanciaDe(b, A), "new B() não é uma instância de function A() {}.");
		ok(!Linda.instanciaDe(c, A), "new C() não é uma instância de function A() {}.");
		ok(!Linda.instanciaDe(d, A), "new D() não é uma instância de function A() {}.");
		ok(!Linda.instanciaDe(e, A), "new E() não é uma instância de function A() {}.");
		ok(!Linda.instanciaDe(f, A), "new F() não é uma instância de function A() {}.");
		ok(!Linda.instanciaDe(g, A), "new G() não é uma instância de function A() {}.");
		ok(!Linda.instanciaDe(h, A), "new H() não é uma instância de function A() {}.");
		ok(!Linda.instanciaDe(i, A), "new I() não é uma instância de function A() {}.");
		ok(!Linda.instanciaDe(j, A), "new J() não é uma instância de function A() {}.");
		ok(!Linda.instanciaDe(a, B), "new A() não é uma instância de function B() {}.");
		ok(Linda.instanciaDe(b, B), "new B() é uma instância de function B() {}.");
		ok(!Linda.instanciaDe(c, B), "new C() não é uma instância de function B() {}.");
		ok(!Linda.instanciaDe(d, B), "new D() não é uma instância de function B() {}.");
		ok(!Linda.instanciaDe(e, B), "new E() não é uma instância de function B() {}.");
		ok(!Linda.instanciaDe(f, B), "new F() não é uma instância de function B() {}.");
		ok(!Linda.instanciaDe(g, B), "new G() não é uma instância de function B() {}.");
		ok(!Linda.instanciaDe(h, B), "new H() não é uma instância de function B() {}.");
		ok(!Linda.instanciaDe(i, B), "new I() não é uma instância de function B() {}.");
		ok(!Linda.instanciaDe(j, B), "new J() não é uma instância de function B() {}.");
		ok(!Linda.instanciaDe(a, C), "new A() não é uma instância de function C() {}.");
		ok(!Linda.instanciaDe(b, C), "new B() não é uma instância de function C() {}.");
		ok(Linda.instanciaDe(c, C), "new C() é uma instância de function C() {}.");
		ok(!Linda.instanciaDe(d, C), "new D() não é uma instância de function C() {}.");
		ok(Linda.instanciaDe(e, C), "new E() é uma instância de function C() {}.");
		ok(!Linda.instanciaDe(f, C), "new F() não é uma instância de function C() {}.");
		ok(Linda.instanciaDe(g, C), "new G() é uma instância de function C() {}.");
		ok(!Linda.instanciaDe(h, C), "new H() não é uma instância de function C() {}.");
		ok(Linda.instanciaDe(i, C), "new I() é uma instância de function C() {}.");
		ok(!Linda.instanciaDe(j, C), "new J() não é uma instância de function C() {}.");
		ok(!Linda.instanciaDe(a, D), "new A() não é uma instância de function D() {}.");
		ok(!Linda.instanciaDe(b, D), "new B() não é uma instância de function D() {}.");
		ok(!Linda.instanciaDe(c, D), "new C() não é uma instância de function D() {}.");
		ok(Linda.instanciaDe(d, D), "new D() é uma instância de function D() {}.");
		ok(!Linda.instanciaDe(e, D), "new E() não é uma instância de function D() {}.");
		ok(Linda.instanciaDe(f, D), "new F() é uma instância de function D() {}.");
		ok(!Linda.instanciaDe(g, D), "new G() não é uma instância de function D() {}.");
		ok(Linda.instanciaDe(h, D), "new H() é uma instância de function D() {}.");
		ok(!Linda.instanciaDe(i, D), "new I() não é uma instância de function D() {}.");
		ok(Linda.instanciaDe(j, D), "new J() é uma instância de function D() {}.");
		ok(!Linda.instanciaDe(a, E), "new A() não é uma instância de function E() {}.");
		ok(!Linda.instanciaDe(b, E), "new B() não é uma instância de function E() {}.");
		ok(!Linda.instanciaDe(c, E), "new C() não é uma instância de function E() {}.");
		ok(!Linda.instanciaDe(d, E), "new D() não é uma instância de function E() {}.");
		ok(Linda.instanciaDe(e, E), "new E() é uma instância de function E() {}.");
		ok(!Linda.instanciaDe(f, E), "new F() não é uma instância de function E() {}.");
		ok(!Linda.instanciaDe(g, E), "new G() não é uma instância de function E() {}.");
		ok(!Linda.instanciaDe(h, E), "new H() não é uma instância de function E() {}.");
		ok(!Linda.instanciaDe(i, E), "new I() não é uma instância de function E() {}.");
		ok(!Linda.instanciaDe(j, E), "new J() não é uma instância de function E() {}.");
		ok(!Linda.instanciaDe(a, F), "new A() não é uma instância de function F() {}.");
		ok(!Linda.instanciaDe(b, F), "new B() não é uma instância de function F() {}.");
		ok(!Linda.instanciaDe(c, F), "new C() não é uma instância de function F() {}.");
		ok(Linda.instanciaDe(d, F), "new D() é uma instância de function F() {}.");
		ok(!Linda.instanciaDe(e, F), "new E() não é uma instância de function F() {}.");
		ok(Linda.instanciaDe(f, F), "new F() é uma instância de function F() {}.");
		ok(!Linda.instanciaDe(g, F), "new G() não é uma instância de function F() {}.");
		ok(Linda.instanciaDe(h, F), "new H() é uma instância de function F() {}.");
		ok(!Linda.instanciaDe(i, F), "new I() não é uma instância de function F() {}.");
		ok(Linda.instanciaDe(j, F), "new J() é uma instância de function F() {}.");
		ok(!Linda.instanciaDe(a, G), "new A() não é uma instância de function G() {}.");
		ok(!Linda.instanciaDe(b, G), "new B() não é uma instância de function G() {}.");
		ok(!Linda.instanciaDe(c, G), "new C() não é uma instância de function G() {}.");
		ok(!Linda.instanciaDe(d, G), "new D() não é uma instância de function G() {}.");
		ok(!Linda.instanciaDe(e, G), "new E() não é uma instância de function G() {}.");
		ok(!Linda.instanciaDe(f, G), "new F() não é uma instância de function G() {}.");
		ok(Linda.instanciaDe(g, G), "new G() é uma instância de function G() {}.");
		ok(!Linda.instanciaDe(h, G), "new H() não é uma instância de function G() {}.");
		ok(Linda.instanciaDe(i, G), "new I() é uma instância de function G() {}.");
		ok(!Linda.instanciaDe(j, G), "new J() não é uma instância de function G() {}.");
		ok(!Linda.instanciaDe(a, H), "new A() não é uma instância de function H() {}.");
		ok(!Linda.instanciaDe(b, H), "new B() não é uma instância de function H() {}.");
		ok(!Linda.instanciaDe(c, H), "new C() não é uma instância de function H() {}.");
		ok(Linda.instanciaDe(d, H), "new D() é uma instância de function H() {}.");
		ok(!Linda.instanciaDe(e, H), "new E() não é uma instância de function H() {}.");
		ok(Linda.instanciaDe(f, H), "new F() é uma instância de function H() {}.");
		ok(!Linda.instanciaDe(g, H), "new G() não é uma instância de function H() {}.");
		ok(Linda.instanciaDe(h, H), "new H() é uma instância de function H() {}.");
		ok(!Linda.instanciaDe(i, H), "new I() não é uma instância de function H() {}.");
		ok(Linda.instanciaDe(j, H), "new J() é uma instância de function H() {}.");
		ok(!Linda.instanciaDe(a, I), "new A() não é uma instância de function I() {}.");
		ok(!Linda.instanciaDe(b, I), "new B() não é uma instância de function I() {}.");
		ok(!Linda.instanciaDe(c, I), "new C() não é uma instância de function I() {}.");
		ok(!Linda.instanciaDe(d, I), "new D() não é uma instância de function I() {}.");
		ok(!Linda.instanciaDe(e, I), "new E() não é uma instância de function I() {}.");
		ok(!Linda.instanciaDe(f, I), "new F() não é uma instância de function I() {}.");
		ok(!Linda.instanciaDe(g, I), "new G() não é uma instância de function I() {}.");
		ok(!Linda.instanciaDe(h, I), "new H() não é uma instância de function I() {}.");
		ok(Linda.instanciaDe(i, I), "new I() é uma instância de function I() {}.");
		ok(!Linda.instanciaDe(j, I), "new J() não é uma instância de function I() {}.");
		ok(!Linda.instanciaDe(a, J), "new A() não é uma instância de function J() {}.");
		ok(!Linda.instanciaDe(b, J), "new B() não é uma instância de function J() {}.");
		ok(!Linda.instanciaDe(c, J), "new C() não é uma instância de function J() {}.");
		ok(Linda.instanciaDe(d, J), "new D() é uma instância de function J() {}.");
		ok(!Linda.instanciaDe(e, J), "new E() não é uma instância de function J() {}.");
		ok(Linda.instanciaDe(f, J), "new F() é uma instância de function J() {}.");
		ok(!Linda.instanciaDe(g, J), "new G() não é uma instância de function J() {}.");
		ok(Linda.instanciaDe(h, J), "new H() é uma instância de function J() {}.");
		ok(!Linda.instanciaDe(i, J), "new I() não é uma instância de function J() {}.");
		ok(Linda.instanciaDe(j, J), "new J() é uma instância de function J() {}.");
	});
}());

(function () {
	"use strict";
	
	module("nuloOuIndefinido");
	
	test("Funções.", function () {
		ok(!Linda.nuloOuIndefinido(Function), "Function não é nulo nem indefinido.");
		ok(!Linda.nuloOuIndefinido(Object), "Object não é nulo nem indefinido.");
		ok(!Linda.nuloOuIndefinido(function () {}), "function () {} não é nulo nem indefinido.");
	});
	
	test("Object, Array, String, Number e Boolean.", function () {
		ok(!Linda.nuloOuIndefinido({}), "{} não é nulo nem indefinido.");
		ok(!Linda.nuloOuIndefinido([]), "[] não é nulo nem indefinido.");
		ok(!Linda.nuloOuIndefinido("texto"), "'texto' não é nulo nem indefinido.");
		ok(!Linda.nuloOuIndefinido(10), "10 não é nulo nem indefinido.");
		ok(!Linda.nuloOuIndefinido(true), "true não é nulo nem indefinido.");
	});
	
	test("null, undefined, variáveis não inicializadas e atributos inexistentes são nulos ou indefinidos.", function () {
		var variavelNaoInicializada;
		ok(Linda.nuloOuIndefinido(null), "null é nulo ou indefinido.");
		ok(Linda.nuloOuIndefinido(undefined), "undefined é nulo ou indefinido.");
		ok(Linda.nuloOuIndefinido(variavelNaoInicializada), "var variavelNaoInicializada; é nulo ou indefinido.");
		ok(Linda.nuloOuIndefinido({}.atributoNaoExistente), "{}.atributoNaoExistente é nulo ou indefinido.");
	});
}());

(function () {
	"use strict";
	
	module("nulo");
	
	test("null, undefined, variáveis não inicializadas e atributos inexistentes.", function () {
		var variavelNaoInicializada;
		ok(Linda.nulo(null), "null é nulo.");
		ok(!Linda.nulo(variavelNaoInicializada), "var variavelNaoInicializada; não é nulo.");
		ok(!Linda.nulo(undefined), "undefined não é nulo.");
		ok(!Linda.nulo({}.atributoNaoExistente), "{}.atributoNaoExistente não é nulo.");
	});
}());

(function () {
	"use strict";
	
	module("indefinido");
	
	test("null, undefined, e atributos inexistentes.", function () {
		var variavelNaoInicializada;
		ok(!Linda.indefinido(null), "null não é indefinido.");
		ok(Linda.indefinido(variavelNaoInicializada), "var variavelNaoInicializada; é indefinido.");
		ok(Linda.indefinido(undefined), "undefined é indefinido.");
		ok(Linda.indefinido({}.atributoNaoExistente), "{}.atributoNaoExistente é indefinido.");
	});
}());

