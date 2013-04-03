/*jshint bitwise: true, camelcase: true, curly: true, eqeqeq: true, forin: true, immed: true, latedef: true, newcap: true, noarg: true, noempty: true, nonew: false, plusplus: false, quotmark: "double", regexp: true, undef: true, unused: true, strict: true, trailing: true, indent: 4, maxparams: 3, maxdepth: 2, maxstatements: 10, maxcomplexity: 3, maxlen: 128 asi: false, boss: false, debug: false, eqnull: false, es5: false, esnext: false, evil: false, expr: false, globalstrict: false, funcscope: false, iterator: false, lastsemic: false, laxbreak: false, laxcomma: false, loopfunc: false, multistr: false, onecase: false, proto: false, regexdash: false, scripturl: false, smarttabs: false, shadow: false, sub: false, supernew: false, browser: true*/
/*jshint maxstatements: 10*/

(function () {
	Linda.definirPropriedades({
		privadoInstanciaDeTipoPrimitivo: Linda.propriedadesDeAtributos,
		privadoInstanciaDeDiretaOuIndireta: Linda.propriedadesDeAtributos,
		privadoHabilitarTelaCheia: Linda.propriedadesDeAtributos,
		privadoHabilitarTelaCheiaChrome: Linda.propriedadesDeAtributos,
		privadoHabilitarTelaCheiaFirefox: Linda.propriedadesDeAtributos,
		privadoDesabilitarTelaCheia: Linda.propriedadesDeAtributos,
		privadoDesabilitarTelaCheiaChrome: Linda.propriedadesDeAtributos,
		privadoDesabilitarTelaCheiaFirefox: Linda.propriedadesDeAtributos
	});
	
	Object.prototype.definirPropriedades({
		definirPropriedade: Linda.propriedadesDeAtributos,
		definirPropriedades: Linda.propriedadesDeAtributos,
		privadoDefinirPropriedade: Linda.propriedadesDeAtributos,
		fornecerPropriedades: Linda.propriedadesDeAtributos,
		fornecerPropriedadesEnumeraveis: Linda.propriedadesDeAtributos,
		fundir: Linda.propriedadesDeAtributos,
		observar: Linda.propriedadesDeAtributos,
		observarAtualizacao: Linda.propriedadesDeAtributos,
		observarCriacao: Linda.propriedadesDeAtributos,
		observarReconfiguracao: Linda.propriedadesDeAtributos,
		observarRemocao: Linda.propriedadesDeAtributos,
		desobservar: Linda.propriedadesDeAtributos,
		paraCada: Linda.propriedadesDeAtributosGravaveis,
		possuiPropriedade: Linda.propriedadesDeAtributos,
		possuiPropriedadePropria: Linda.propriedadesDeAtributos,
		prototipoDe: Linda.propriedadesDeAtributos
	});
	
	Function.prototype.definirPropriedades({
		aplicarComEscopo: Linda.propriedadesDeAtributos,
		chamarComEscopo: Linda.propriedadesDeAtributos,
		estender: Linda.propriedadesDeAtributos,
		implementar: Linda.propriedadesDeAtributos,
		vincularEscopo: Linda.propriedadesDeAtributos
	});
	
	Array.prototype.definirPropriedades({
		contem: Linda.propriedadesDeAtributos,
		dentroDosLimites: Linda.propriedadesDeAtributos,
		embaralhar: Linda.propriedadesDeAtributos,
		fornecerIndice: Linda.propriedadesDeAtributos,
		fundir: Linda.propriedadesDeAtributos,
		paraCada: Linda.propriedadesDeAtributos,
		primeiro: Linda.propriedadesDeAtributos,
		primeiroIndice: Linda.propriedadesDeAtributos,
		quantidadeMenorQue: Linda.propriedadesDeAtributos,
		quantidadeMenorIgualQue: Linda.propriedadesDeAtributos,
		quantidadeMaiorQue: Linda.propriedadesDeAtributos,
		quantidadeMaiorIgualQue: Linda.propriedadesDeAtributos,
		quantidadeIgual: Linda.propriedadesDeAtributos,
		primeiro: Linda.propriedadesDeAtributos,
		reduzir: Linda.propriedadesDeAtributos,
		removerPosicao: Linda.propriedadesDeAtributos,
		removerElemento: Linda.propriedadesDeAtributos,
		ultimo: Linda.propriedadesDeAtributos,
		ultimoIndice: Linda.propriedadesDeAtributos,
		vazio: Linda.propriedadesDeAtributos
	});
	
	String.prototype.definirPropriedades({
		paraInteiro: Linda.propriedadesDeAtributos,
		paraFlutuante: Linda.propriedadesDeAtributos
	});
	
	String.definirPropriedades({
		concatenar: Linda.propriedadesDeAtributos,
		concatenarComEspaco: Linda.propriedadesDeAtributos,
		formatar: Linda.propriedadesDeAtributos
	});
	
	Number.definirPropriedades({
		naoNumero: Linda.propriedadesDeAtributos,
		sortear: Linda.propriedadesDeAtributos,
		sortearInteiro: Linda.propriedadesDeAtributos
	});
}());
