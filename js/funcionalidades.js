(function (contexto) {
	"use strict";

	var Linda = contexto.Linda;

	Object.prototype.definirPropriedades({
		cadaPropriedade: Linda.propriedadesDeAtributos,
		cadaPropriedadeEnumeravel: Linda.propriedadesDeAtributos,
		cadaPropriedadeInvisivel: Linda.propriedadesDeAtributos,
		cadaPropriedadePropria: Linda.propriedadesDeAtributos,
		cadaPropriedadePropriaEnumeravel: Linda.propriedadesDeAtributos,
		cadaPropriedadePropriaInvisivel: Linda.propriedadesDeAtributos,
		cadaPropriedadeHerdada: Linda.propriedadesDeAtributos,
		cadaPropriedadeHerdadaEnumeravel: Linda.propriedadesDeAtributos,
		cadaPropriedadeHerdadaInvisivel: Linda.propriedadesDeAtributos,
		fornecerPropriedades: Linda.propriedadesDeAtributos,
		fornecerPropriedadesEnumeraveis: Linda.propriedadesDeAtributos,
		fornecerPropriedadesInvisiveis: Linda.propriedadesDeAtributos,
		fornecerPropriedadesProprias: Linda.propriedadesDeAtributos,
		fornecerPropriedadesPropriasEnumeraveis: Linda.propriedadesDeAtributos,
		fornecerPropriedadesPropriasInvisiveis: Linda.propriedadesDeAtributos,
		fornecerPropriedadesHerdadas: Linda.propriedadesDeAtributos,
		fornecerPropriedadesHerdadasEnumeraveis: Linda.propriedadesDeAtributos,
		fornecerPropriedadesHerdadasInvisiveis: Linda.propriedadesDeAtributos,
		possuiPropriedade: Linda.propriedadesDeAtributos,
		possuiPropriedadeEnumeravel: Linda.propriedadesDeAtributos,
		possuiPropriedadeInvisivel: Linda.propriedadesDeAtributos,
		possuiPropriedadePropria: Linda.propriedadesDeAtributos,
		possuiPropriedadePropriaEnumeravel: Linda.propriedadesDeAtributos,
		possuiPropriedadePropriaInvisivel: Linda.propriedadesDeAtributos,
		possuiPropriedadeHerdada: Linda.propriedadesDeAtributos,
		possuiPropriedadeHerdadaEnumeravel: Linda.propriedadesDeAtributos,
		possuiPropriedadeHerdadaInvisivel: Linda.propriedadesDeAtributos,
		instanciaDe: Linda.propriedadesDeAtributos,
		prototipadoDe: Linda.propriedadesDeAtributos,
		prototipoDe: Linda.propriedadesDeAtributos,
		fornecerPrototipo: Linda.propriedadesDeAtributos,
		fornecerDescritorDePropriedade: Linda.propriedadesDeAtributos,
		privadoFornecerDescritorDePropriedade: Linda.propriedadesDeAtributos,
		definirPropriedade: Linda.propriedadesDeAtributos,
		definirPropriedades: Linda.propriedadesDeAtributos,
		removerPropriedade: Linda.propriedadesDeAtributos,
		privadoDefinirPropriedade: Linda.propriedadesDeAtributos,
		fundir: Linda.propriedadesDeAtributos,
		observar: Linda.propriedadesDeAtributos,
		observarAtualizacao: Linda.propriedadesDeAtributos,
		observarCriacao: Linda.propriedadesDeAtributos,
		observarReconfiguracao: Linda.propriedadesDeAtributos,
		observarRemocao: Linda.propriedadesDeAtributos,
		desobservar: Linda.propriedadesDeAtributos,
		paraCada: Linda.propriedadesDeAtributosGravaveis
	});

	Function.prototype.definirPropriedades({
		aplicarComEscopo: Linda.propriedadesDeAtributos,
		chamarComEscopo: Linda.propriedadesDeAtributos,
		estender: Linda.propriedadesDeAtributos,
		implementar: Linda.propriedadesDeAtributos,
		vincularEscopo: Linda.propriedadesDeAtributos
	});

	Array.prototype.definirPropriedades({
		adicionar: Linda.propriedadesDeAtributos,
		adicionarNoInicio: Linda.propriedadesDeAtributos,
		clonar: Linda.propriedadesDeAtributos,
		contem: Linda.propriedadesDeAtributos,
		dentroDosLimites: Linda.propriedadesDeAtributos,
		embaralhar: Linda.propriedadesDeAtributos,
		fornecerIndice: Linda.propriedadesDeAtributos,
		fundir: Linda.propriedadesDeAtributos,
		juntarEmTexto: Linda.propriedadesDeAtributos,
		limpar: Linda.propriedadesDeAtributos,
		ordenar: Linda.propriedadesDeAtributos,
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
		vazio: Linda.propriedadesDeAtributos,
		tirar: Linda.propriedadesDeAtributos,
		tirarDoInicio: Linda.propriedadesDeAtributos
	});

	String.prototype.definirPropriedades({
		combinar: Linda.propriedadesDeAtributos,
		emBranco: Linda.propriedadesDeAtributos,
		formatarNumero: Linda.propriedadesDeAtributos,
		paraCaixaAlta: Linda.propriedadesDeAtributos,
		paraCaixaBaixa: Linda.propriedadesDeAtributos,
		paraFlutuante: Linda.propriedadesDeAtributos,
		paraInteiro: Linda.propriedadesDeAtributos,
		separar: Linda.propriedadesDeAtributos,
		substituir: Linda.propriedadesDeAtributos,
		substituirTodos: Linda.propriedadesDeAtributos
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
}(this));
