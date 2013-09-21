/*global AtributoHttp*/
/*global Classe*/
/*global CodigoHttp*/
/*global Dom*/
/*global Linda*/
/*global MetodoHttp*/
/*global TipoDeMidia*/
/*global TipoDeResposta*/

(function (global) {
	"use strict";

	var RequisicaoHttp = Classe.criar({
		inicializar: function (uri, assincrono, tipoDeResposta) {
			this.requisicaoXml = new XMLHttpRequest();
			this.uri = uri;
			this.usuario = null;
			this.senha = null;
			this.codigoDeEstado = null;
			this.assincrono = Linda.indefinido(assincrono) ? true : !!assincrono;
			this.cabecalho = [];
			if (this.assincrono) {
				this.requisicaoXml.responseType = tipoDeResposta;
			}
		},

		enviar: function (metodo, dados) {
			metodo = MetodoHttp.mapear(metodo);
			this.requisicaoXml.open(metodo, this.uri, this.assincrono, this.usuario, this.senha);
			this.cabecalho.paraCada(function (atributo) {
				this.requisicaoXml.setRequestHeader(atributo.nome, atributo.valor);
			}, this);
			this.requisicaoXml.send(dados);
			if (!this.assincrono) {
				return this.fornecerResposta();
			}
		},

		get: function (dados) {
			return this.enviar(MetodoHttp.GET, dados);
		},

		put: function (dados) {
			return this.enviar(MetodoHttp.PUT, dados);
		},

		post: function (dados) {
			return this.enviar(MetodoHttp.POST, dados);
		},

		delete: function (dados) {
			return this.enviar(MetodoHttp.DELETE, dados);
		},

		tratarInicio: function (tratador, escopo) {
			Dom.$(this.requisicaoXml).tratarCarregamento(tratador, escopo);
			return this;
		},

		tratarProgresso: function (tratador, escopo) {
			Dom.$(this.requisicaoXml).tratarProgresso(tratador, escopo);
			return this;
		},

		tratarTermino: function (tratador, escopo) {
			Dom.$(this.requisicaoXml).tratarCarregamentoFinalizado(tratador, escopo);
			return this;
		},

		tratarAborto: function (tratador, escopo) {
			Dom.$(this.requisicaoXml).tratarAborto(tratador, escopo);
			return this;
		},

		tratarEstouroDeTempo: function (tratador, escopo) {
			Dom.$(this.requisicaoXml).tratarEstouroDeTempo(tratador, escopo);
			return this;
		},

		tratarErro: function (tratador, escopo) {
			Dom.$(this.requisicaoXml).tratarErro(tratador, escopo);
			return this;
		},

		tratarResposta: function (tratador, escopo) {
			Dom.$(this.requisicaoXml).tratarCarregamento(function () {
				tratador.chamarComEscopo(escopo, this.fornecerResposta(), this.fornecerCodigoDeEstado());
			}, this);
			return this;
		},

		tratarRedirecionamento: function (tratador, escopo) {
			Dom.$(this.requisicaoXml).tratarCarregamento(function () {
				var codigoDeEstado = this.fornecerCodigoDeEstado();
				if (codigoDeEstado.redirecionamento()) {
					tratador.chamarComEscopo(escopo, this.fornecerResposta(), codigoDeEstado);
				}
			}, this);
			return this;
		},

		tratarSucesso: function (tratador, escopo) {
			Dom.$(this.requisicaoXml).tratarCarregamento(function () {
				var codigoDeEstado = this.fornecerCodigoDeEstado();
				if (codigoDeEstado.sucesso()) {
					tratador.chamarComEscopo(escopo, this.fornecerResposta(), codigoDeEstado);
				}
			}, this);
			return this;
		},

		tratarErroDoCliente: function (tratador, escopo) {
			Dom.$(this.requisicaoXml).tratarCarregamento(function () {
				var codigoDeEstado = this.fornecerCodigoDeEstado();
				if (codigoDeEstado.erroDoCliente()) {
					tratador.chamarComEscopo(escopo, this.fornecerResposta(), codigoDeEstado);
				}
			}, this);
			return this;
		},

		tratarErroDoServidor: function (tratador, escopo) {
			Dom.$(this.requisicaoXml).tratarCarregamento(function () {
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

		inicializar: function (uri, assincrono) {
			this.super(uri, assincrono, TipoDeResposta.JSON);
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

		inicializar: function (uri, assincrono) {
			this.super(uri, assincrono, TipoDeResposta.DOCUMENTO);
			this.fixarAtributoDeCabecalho(AtributoHttp.ACCEPT, TipoDeMidia.HTML.comoTexto());
		},
	});

	var RequisicaoDocumento = Classe.criar({
		SuperClasse: RequisicaoHttp,

		inicializar: function (uri, assincrono) {
			this.super(uri, assincrono, TipoDeResposta.DOCUMENTO);
		}
	});

	var RequisicaoTexto = Classe.criar({
		SuperClasse: RequisicaoHttp,

		inicializar: function (uri, assincrono) {
			this.super(uri, assincrono, TipoDeResposta.TEXTO);
		}
	});

	global.RequisicaoJson = RequisicaoJson;
	global.RequisicaoHtml = RequisicaoHtml;
	global.RequisicaoDocumento = RequisicaoDocumento;
	global.RequisicaoTexto = RequisicaoTexto;
}(this));
