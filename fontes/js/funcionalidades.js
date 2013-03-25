/*jshint bitwise: true, camelcase: true, curly: true, eqeqeq: true, forin: true, immed: true, latedef: true, newcap: true, noarg: true, noempty: true, nonew: false, plusplus: false, quotmark: "double", regexp: true, undef: true, unused: true, strict: true, trailing: true, indent: 4, maxparams: 3, maxdepth: 2, maxstatements: 10, maxcomplexity: 3, maxlen: 128 asi: false, boss: false, debug: false, eqnull: false, es5: false, esnext: false, evil: false, expr: false, globalstrict: false, funcscope: false, iterator: false, lastsemic: false, laxbreak: false, laxcomma: false, loopfunc: false, multistr: false, onecase: false, proto: false, regexdash: false, scripturl: false, smarttabs: false, shadow: false, sub: false, supernew: false, browser: true*/
/*jshint maxstatements: 10*/

(function () {
	Linda.definirPropriedade("privadoInstanciaDeTipoPrimitivo", Linda.propriedadesDeAtributos);
	Linda.definirPropriedade("privadoInstanciaDeDiretaOuIndireta", Linda.propriedadesDeAtributos);
	Linda.definirPropriedade("privadoHabilitarTelaCheia", Linda.propriedadesDeAtributos);
	Linda.definirPropriedade("privadoHabilitarTelaCheiaChrome", Linda.propriedadesDeAtributos);
	Linda.definirPropriedade("privadoHabilitarTelaCheiaFirefox", Linda.propriedadesDeAtributos);
	Linda.definirPropriedade("privadoDesabilitarTelaCheia", Linda.propriedadesDeAtributos);
	Linda.definirPropriedade("privadoDesabilitarTelaCheiaChrome", Linda.propriedadesDeAtributos);
	Linda.definirPropriedade("privadoDesabilitarTelaCheiaFirefox", Linda.propriedadesDeAtributos);
	
	Object.prototype.definirPropriedade("definirPropriedade", Linda.propriedadesDeAtributos);
	Object.prototype.definirPropriedade("privadoDefinirPropriedade", Linda.propriedadesDeAtributos);
	Object.prototype.definirPropriedade("fornecerPropriedades", Linda.propriedadesDeAtributos);
	Object.prototype.definirPropriedade("fornecerPropriedadesEnumeraveis", Linda.propriedadesDeAtributos);
	Object.prototype.definirPropriedade("paraCada", Linda.propriedadesDeAtributosGravaveis);
	Object.prototype.definirPropriedade("possuiPropriedade", Linda.propriedadesDeAtributos);
	Object.prototype.definirPropriedade("possuiPropriedadePropria", Linda.propriedadesDeAtributos);
	Object.prototype.definirPropriedade("prototipoDe", Linda.propriedadesDeAtributos);
	
	Function.prototype.definirPropriedade("aplicarComEscopo", Linda.propriedadesDeAtributos);
	Function.prototype.definirPropriedade("chamarComEscopo", Linda.propriedadesDeAtributos);
	Function.prototype.definirPropriedade("estender", Linda.propriedadesDeAtributos);
	Function.prototype.definirPropriedade("implementar", Linda.propriedadesDeAtributos);
	Function.prototype.definirPropriedade("vincularEscopo", Linda.propriedadesDeAtributos);
	
	Array.prototype.definirPropriedade("contem", Linda.propriedadesDeAtributos);
	Array.prototype.definirPropriedade("fornecerIndice", Linda.propriedadesDeAtributos);
	Array.prototype.definirPropriedade("paraCada", Linda.propriedadesDeAtributos);
	Array.prototype.definirPropriedade("removerPosicao", Linda.propriedadesDeAtributos);
	Array.prototype.definirPropriedade("removerElemento", Linda.propriedadesDeAtributos);
	
	String.prototype.definirPropriedade("paraInteiro", Linda.propriedadesDeAtributos);
	String.prototype.definirPropriedade("paraFlutuante", Linda.propriedadesDeAtributos);
	
	String.definirPropriedade("concatenar", Linda.propriedadesDeAtributos);
	String.definirPropriedade("concatenarComEspaco", Linda.propriedadesDeAtributos);
	String.definirPropriedade("formatar", Linda.propriedadesDeAtributos);
	
	HTMLElement.definirPropriedade("selecionar", Linda.propriedadesDeAtributos);
	HTMLElement.definirPropriedade("selecionarTodos", Linda.propriedadesDeAtributos);
	HTMLElement.definirPropriedade("tratadorDeTeclaPressionada", Linda.propriedadesDeAtributos);
	HTMLElement.definirPropriedade("tratadorDeTeclaSolta", Linda.propriedadesDeAtributos);
	HTMLElement.definirPropriedade("tratadorDeTeclaSolta", Linda.propriedadesDeAtributos);
	HTMLElement.definirPropriedade("tratadorDeClique", Linda.propriedadesDeAtributos);
	HTMLElement.definirPropriedade("tratadorDeCarregamento", Linda.propriedadesDeAtributos);
}());
