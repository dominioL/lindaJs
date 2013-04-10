/*global Linda*/

(function () {
	"use strict";

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
		clonar: Linda.propriedadesDeAtributos,
		contem: Linda.propriedadesDeAtributos,
		dentroDosLimites: Linda.propriedadesDeAtributos,
		embaralhar: Linda.propriedadesDeAtributos,
		fornecerIndice: Linda.propriedadesDeAtributos,
		fundir: Linda.propriedadesDeAtributos,
		paraCada: Linda.propriedadesDeAtributos,
		quantidadeMenorQue: Linda.propriedadesDeAtributos,
		quantidadeMenorIgualQue: Linda.propriedadesDeAtributos,
		quantidadeMaiorQue: Linda.propriedadesDeAtributos,
		quantidadeMaiorIgualQue: Linda.propriedadesDeAtributos,
		quantidadeIgual: Linda.propriedadesDeAtributos,
		reduzir: Linda.propriedadesDeAtributos,
		reduzirSemPrimeiro: Linda.propriedadesDeAtributos,
		reduzirSemUltimo: Linda.propriedadesDeAtributos,
		removerPosicao: Linda.propriedadesDeAtributos,
		removerElemento: Linda.propriedadesDeAtributos,
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
