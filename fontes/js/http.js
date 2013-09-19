/*global AtributoHttp*/
/*global Classe*/
/*global CodigoHttp*/
/*global Linda*/
/*global MetodoHttp*/
/*global Tratador*/
/*global TratadorDeCarregamento*/
/*global TipoDeMidia*/
/*global TipoDeResposta*/

(function (global) {
	"use strict";

	var RequisicaoHttp = Classe.criar({
		inicializar: function (uri, tipoDeResposta) {
			this.requisicaoXml = new XMLHttpRequest();
			this.requisicaoXml.responseType = tipoDeResposta;
			this.uri = uri;
			this.usuario = null;
			this.senha = null;
			this.codigoDeEstado = null;
			this.cabecalho = [];
			this.tratadorDeCarregamento = new TratadorDeCarregamento(this.requisicaoXml);
			this.tratador = new Tratador(this.requisicaoXml);
		},

		enviar: function (metodo, dados, sincrono) {
			var assincrono = !sincrono;
			metodo = MetodoHttp.mapear(metodo);
			this.requisicaoXml.open(metodo, this.uri, assincrono, this.usuario, this.senha);
			this.cabecalho.paraCada(function (atributo) {
				this.requisicaoXml.setRequestHeader(atributo.nome, atributo.valor);
			}, this);
			this.requisicaoXml.send(dados);
			if (!assincrono) {
				return this.fornecerResposta();
			}
		},

		enviarGet: function (sincrono) {
			return this.enviar(MetodoHttp.GET, null, sincrono);
		},

		enviarPut: function (dados, sincrono) {
			return this.enviar(MetodoHttp.PUT, dados, sincrono);
		},

		enviarPost: function (dados, sincrono) {
			return this.enviar(MetodoHttp.POST, dados, sincrono);
		},

		envirDelete: function (sincrono) {
			return this.enviar(MetodoHttp.DELETE, null, sincrono);
		},

		tratarInicio: function (tratador, escopo) {
			this.tratadorDeCarregamento.paraCarregamentoIniciado(tratador, escopo);
			return this;
		},

		tratarProgresso: function (tratador, escopo) {
			this.tratadorDeCarregamento.paraProgresso(tratador, escopo);
			return this;
		},

		tratarTermino: function (tratador, escopo) {
			this.tratadorDeCarregamento.paraCarregamentoFinalizado(tratador, escopo);
			return this;
		},

		tratarAborto: function (tratador, escopo) {
			this.tratadorDeCarregamento.paraAborto(tratador, escopo);
			return this;
		},

		tratarEstouroDeTempo: function (tratador, escopo) {
			this.tratadorDeCarregamento.paraEstouroDeTempo(tratador, escopo);
			return this;
		},

		tratarErro: function (tratador, escopo) {
			this.tratador.paraErro(tratador, escopo);
			return this;
		},

		tratarResposta: function (tratador, escopo) {
			this.tratadorDeCarregamento.paraCarregamento(function () {
				tratador.chamarComEscopo(escopo, this.fornecerResposta(), this.fornecerCodigoDeEstado());
			}, this);
			return this;
		},

		tratarRedirecionamento: function (tratador, escopo) {
			this.tratadorDeCarregamento.paraCarregamento(function () {
				var codigoDeEstado = this.fornecerCodigoDeEstado();
				if (codigoDeEstado.redirecionamento()) {
					tratador.chamarComEscopo(escopo, this.fornecerResposta(), codigoDeEstado);
				}
			}, this);
			return this;
		},

		tratarSucesso: function (tratador, escopo) {
			this.tratadorDeCarregamento.paraCarregamento(function () {
				var codigoDeEstado = this.fornecerCodigoDeEstado();
				if (codigoDeEstado.sucesso()) {
					tratador.chamarComEscopo(escopo, this.fornecerResposta(), codigoDeEstado);
				}
			}, this);
			return this;
		},

		tratarErroDoCliente: function (tratador, escopo) {
			this.tratadorDeCarregamento.paraCarregamento(function () {
				var codigoDeEstado = this.fornecerCodigoDeEstado();
				if (codigoDeEstado.erroDoCliente()) {
					tratador.chamarComEscopo(escopo, this.fornecerResposta(), codigoDeEstado);
				}
			}, this);
			return this;
		},

		tratarErroDoServidor: function (tratador, escopo) {
			this.tratadorDeCarregamento.paraCarregamento(function () {
				var codigoDeEstado = this.fornecerCodigoDeEstado();
				if (codigoDeEstado.erroDoServidor()) {
					tratador.chamarComEscopo(escopo, this.fornecerResposta(), codigoDeEstado);
				}
			}, this);
			return this;
		},

		abortar: function () {
			this.requisicaoXml.abort();
			return this;
		},

		fixarAtributoDeCabecalho: function (nome, valor) {
			this.cabecalho.push({nome: nome, valor: valor});
			return this;
		},

		fixarAutenticacao: function (usuario, senha) {
			this.usuario = usuario;
			this.senha = senha;
			return this;
		},

		fixarTempoLimite: function (tempoLimite) {
			this.requisicaoXml.timeout = tempoLimite;
			return this;
		},

		fornecerResposta: function () {
			return this.requisicaoXml.response;
		},

		fornecerCodigoDeEstado: function () {
			if (Linda.nulo(this.codigoDeEstado)) {
				this.codigoDeEstado = CodigoHttp.mapear(this.requisicaoXml.status);
			}
			return this.codigoDeEstado;
		}
	});

	var RequisicaoJson = Classe.criar({
		SuperClasse: RequisicaoHttp,

		inicializar: function (uri) {
			this.super(uri, TipoDeResposta.JSON);
			this.fixarAtributoDeCabecalho(AtributoHttp.ACCEPT, TipoDeMidia.JSON.comoTexto());
		},

		enviaJson: function () {
			this.fixarAtributoDeCabecalho(AtributoHttp.CONTENT_TYPE, TipoDeMidia.JSON.comoTexto());
		},

		fornecerResposta: function () {
			return JSON.parse(this.requisicaoXml.response);
		}
	});

	var RequisicaoHtml = Classe.criar({
		SuperClasse: RequisicaoHttp,

		inicializar: function (uri) {
			this.super(uri, TipoDeResposta.DOCUMENTO);
			this.fixarAtributoDeCabecalho(AtributoHttp.ACCEPT, TipoDeMidia.HTML.comoTexto());
		},
	});

	var RequisicaoDocumento = Classe.criar({
		SuperClasse: RequisicaoHttp,

		inicializar: function (uri) {
			this.super(uri, TipoDeResposta.DOCUMENTO);
		}
	});

	var RequisicaoTexto = Classe.criar({
		SuperClasse: RequisicaoHttp,

		inicializar: function (uri) {
			this.super(uri, TipoDeResposta.TEXTO);
		}
	});

	global.RequisicaoJson = RequisicaoJson;
	global.RequisicaoHtml = RequisicaoHtml;
	global.RequisicaoDocumento = RequisicaoDocumento;
	global.RequisicaoTexto = RequisicaoTexto;
}(this));
