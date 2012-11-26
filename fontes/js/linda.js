/*jshint
	bitwise: true,
	camelcase: true,
	curly: true,
	eqeqeq: true,
	forin: true,
	immed: true,
	latedef: true,
	newcap: true,
	noarg: true,
	noempty: true,
	nonew: false,
	plusplus: false,
	quotmark: "double",
	regexp: true,
	undef: true,
	unused: true,
	strict: true,
	trailing: true,
	indent: 4,
	maxparams: 3,
	maxdepth: 2,
	maxstatements: 10,
	maxcomplexity: 3,
	maxlen: 128
	asi: false,
	boss: false,
	debug: false,
	eqnull: false,
	es5: false,
	esnext: false,
	evil: false,
	expr: false,
	globalstrict: false,
	funcscope: false,
	iterator: false,
	lastsemic: false,
	laxbreak: false,
	laxcomma: false,
	loopfunc: false,
	multistr: false,
	onecase: false,
	proto: false,
	regexdash: false,
	scripturl: false,
	smarttabs: false,
	shadow: false,
	sub: false,
	supernew: false,
	browser: true
*/

(function (global) {
	"use strict";
	
	var ExcecaoLinda = function (mensagem) {
		this.mensagem = mensagem;
		this.message = mensagem;
	};
	
	ExcecaoLinda.prototype.comoTexto = function () {
		return "ExcecaoLinda: " + this.mensagem;
	};
	
	ExcecaoLinda.prototype.toString = function () {
		return this.comoTexto();
	};
	
	var Linda = {
		documento: document,
		janela: window,
		historico: window.history,
		localizacao: window.location,
		global: global,
		
		propriedadesDeAtributos: {
			configuravel: false,
			enumeravel: false,
			gravavel: false,
			funcaoFornecer: undefined,
			funcaoFixar: undefined,
			valor: undefined
		},
		
		propriedadesDeAtributosGravaveis: {
			configuravel: false,
			enumeravel: false,
			gravavel: true,
			funcaoFornecer: undefined,
			funcaoFixar: undefined,
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
		
		fornecerPrototipoDe: function (objeto) {
			return Object.getPrototypeOf(objeto);
		},
		
		instanciaDe: function (objeto, tipo) {
			if (!this.tipoDe(tipo, Function)) {
				return false;
			}
			return this.privadoInstanciaDeTipoPrimitivo(objeto, tipo);
		},
		
		privadoInstanciaDeTipoPrimitivo: function (objeto, tipo) {
			if (this.tipoDe(objeto, String) ||
					this.tipoDe(objeto, Number) ||
					this.tipoDe(objeto, Boolean) ||
					this.tipoDe(objeto, undefined)) {
				return this.tipoDe(objeto, tipo);
			}
			return this.privadoInstanciaDeDiretaOuIndireta(objeto, tipo);
		},
		
		privadoInstanciaDeDiretaOuIndireta: function (objeto, tipo) {
			while (!this.nulo(objeto) && (objeto !== tipo.prototype)) {
				objeto = this.fornecerPrototipoDe(objeto);
			}
			return (objeto === tipo.prototype);
		},
		
		tipoDe: function (tipo, tipoComparado) {
			/*jshint maxcomplexity: 7*/
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
		
		assegureQue: function (condicao) {
			if (!condicao) {
				throw new ExcecaoLinda("Asserção inválida. Quebra de contrato.");
			}
		},
		
		assegureQueNao: function (condicao) {
			this.assegureQue(!condicao);
		},
		
		selecionar: function (selecao) {
			return document.querySelector(selecao);
		},
		
		selecionarTodos: function (selecao) {
			return document.querySelectorAll(selecao);
		},
		
		obterPelaClasse: function (classe) {
			return document.getElementsByClassName(classe)[0];
		},
		
		obterTodosPelaClasse: function (classe) {
			return document.getElementsByClassName(classe);
		},
		
		obterPeloNome: function (nome) {
			return document.getElementsByName(nome)[0];
		},
		
		obterTodosPeloNome: function (nome) {
			return document.getElementsByName(nome);
		},
		
		obterPeloIdentificador: function (identificador) {
			return document.getElementById(identificador);
		},
		
		habilitarTelaCheia: function () {
			this.privadoHabilitarTelaCheia();
			this.privadoHabilitarTelaCheiaChrome();
			this.privadoHabilitarTelaCheiaFirefox();
		},
		
		privadoHabilitarTelaCheia: function () {
			if (this.instanciaDe(document.documentElement.requestFullScreen, Function)) {
				document.documentElement.requestFullScreen();
			}
		},
		
		privadoHabilitarTelaCheiaChrome: function () {
			if (this.instanciaDe(document.documentElement.mozRequestFullScreen, Function)) {
				document.documentElement.mozRequestFullScreen();
			}
		},
		
		privadoHabilitarTelaCheiaFirefox: function () {
			if (this.instanciaDe(document.documentElement.webkitRequestFullScreen, Function)) {
				document.documentElement.webkitRequestFullScreen();
			}
		},
		
		desabilitarTelaCheia: function () {
			this.privadoDesabilitarTelaCheia();
			this.privadoDesabilitarTelaCheiaChrome();
			this.privadoDesabilitarTelaCheiaFirefox();
		},
		
		privadoDesabilitarTelaCheia: function () {
			if (this.instanciaDe(document.cancelFullScreen, Function)) {
				document.cancelFullScreen();
			}
		},
		
		privadoDesabilitarTelaCheiaChrome: function () {
			if (this.instanciaDe(document.webkitCancelFullScreen, Function)) {
				document.webkitCancelFullScreen();
			}
		},
		
		privadoDesabilitarTelaCheiaFirefox: function () {
			if (this.instanciaDe(document.mozCancelFullScreen, Function)) {
				document.mozCancelFullScreen();
			}
		}
	};
	
	global.Linda = Linda;
}(this));

