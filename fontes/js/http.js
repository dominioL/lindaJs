(function (contexto) {
	"use strict";

	var Dom = contexto.Dom;
	var Linda = contexto.Linda;
	var Classe = contexto.Classe;
	var AtributoHttp = contexto.AtributoHttp;
	var CodigoHttp = contexto.CodigoHttp;
	var MetodoHttp = contexto.MetodoHttp;
	var TipoDeMidia = contexto.TipoDeMidia;
	var TipoDeResposta = contexto.TipoDeResposta;

	var RequisicaoHttp = Classe.criar({
		inicializar: function (uri, assincrono) {
			this.requisicaoXml = new XMLHttpRequest();
			this.uri = uri;
			this.usuario = null;
			this.senha = null;
			this.codigoDeEstado = null;
			this.metodo = null;
			this.respostaDecodificada = null;
			this.assincrono = Linda.indefinido(assincrono) ? true : !!assincrono;
			this.cabecalho = [];
		},

		aceita: function (tipoDeResposta, tipoDeMidia, decodificadorDeReposta) {
			if (this.assincrono) {
				this.requisicaoXml.responseType = tipoDeResposta;
			}
			this.fixarAtributoDeCabecalho(AtributoHttp.ACCEPT, tipoDeMidia);
			this.decodificarResposta = decodificadorDeReposta;
			return this;
		},

		aceitaJson: function () {
			this.aceita(TipoDeResposta.JSON, TipoDeMidia.JSON.comoTexto(), this.decodificarRespostaJson);
			return this;
		},

		aceitaHtml: function () {
			this.aceita(TipoDeResposta.DOCUMENTO, TipoDeMidia.HTML.comoTexto(), this.decodificarRespostaHtml);
			return this;
		},

		aceitaTexto: function () {
			this.aceita(TipoDeResposta.TEXTO, TipoDeMidia.TXT.comoTexto(), this.decodificarRespostaTexto);
			return this;
		},

		envia: function (tipoDeMidia, codificadorDeEnvio) {
			this.fixarAtributoDeCabecalho(AtributoHttp.CONTENT_TYPE, tipoDeMidia);
			this.codificarEnvio = codificadorDeEnvio;
			return this;
		},

		enviaJson: function () {
			this.envia(TipoDeMidia.JSON.comoTexto(), this.codificarEnvioJson);
			return this;
		},

		enviaHtml: function () {
			this.envia(TipoDeMidia.HTML.comoTexto(), this.codificarEnvioHtml);
			return this;
		},

		enviaTexto: function () {
			this.envia(TipoDeMidia.TXT.comoTexto(), this.codificarEnvioTexto);
			return this;
		},

		decodificarResposta: function (dado) {
			return dado;
		},

		decodificarRespostaJson: function (dado) {
			return JSON.parse(dado);
		},

		decodificarRespostaHtm: function (dado) {
			return dado;
		},

		decodificarRespostaTexto: function (dado) {
			return dado;
		},

		codificarEnvio: function (dado) {
			return dado;
		},

		codificarEnvioJson: function (dado) {
			return JSON.stringify(dado);
		},

		codificarEnvioHtm: function (dado) {
			return dado;
		},

		codificarEnvioTexto: function (dado) {
			return dado;
		},

		enviar: function (metodo, dados) {
			this.metodo = MetodoHttp.mapear(metodo);
			this.requisicaoXml.open(this.metodo, this.uri, this.assincrono, this.usuario, this.senha);
			this.cabecalho.paraCada(function (atributo) {
				this.requisicaoXml.setRequestHeader(atributo.nome, atributo.valor);
			}, this);
			this.requisicaoXml.send(this.codificarEnvio(dados));
			if (!this.assincrono) {
				return this.fornecerResposta();
			}
			return this;
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
				tratador.chamarComEscopo(escopo, this.fornecerResposta(), this.fornecerCodigoDeEstado(), this);
			}, this);
			return this;
		},

		tratarInformacao: function (tratador, escopo) {
			Dom.$(this.requisicaoXml).tratarCarregamento(function () {
				var codigoDeEstado = this.fornecerCodigoDeEstado();
				if (codigoDeEstado.informacao()) {
					tratador.chamarComEscopo(escopo, this.fornecerResposta(), codigoDeEstado, this);
				}
			}, this);
			return this;
		},

		tratarSucesso: function (tratador, escopo) {
			Dom.$(this.requisicaoXml).tratarCarregamento(function () {
				var codigoDeEstado = this.fornecerCodigoDeEstado();
				if (codigoDeEstado.sucesso()) {
					tratador.chamarComEscopo(escopo, this.fornecerResposta(), codigoDeEstado, this);
				}
			}, this);
			return this;
		},

		tratarRedirecionamento: function (tratador, escopo) {
			Dom.$(this.requisicaoXml).tratarCarregamento(function () {
				var codigoDeEstado = this.fornecerCodigoDeEstado();
				if (codigoDeEstado.redirecionamento()) {
					tratador.chamarComEscopo(escopo, this.fornecerResposta(), codigoDeEstado, this);
				}
			}, this);
			return this;
		},

		tratarErroDoCliente: function (tratador, escopo) {
			Dom.$(this.requisicaoXml).tratarCarregamento(function () {
				var codigoDeEstado = this.fornecerCodigoDeEstado();
				if (codigoDeEstado.erroDoCliente()) {
					tratador.chamarComEscopo(escopo, this.fornecerResposta(), codigoDeEstado, this);
				}
			}, this);
			return this;
		},

		tratarErroDoServidor: function (tratador, escopo) {
			Dom.$(this.requisicaoXml).tratarCarregamento(function () {
				var codigoDeEstado = this.fornecerCodigoDeEstado();
				if (codigoDeEstado.erroDoServidor()) {
					tratador.chamarComEscopo(escopo, this.fornecerResposta(), codigoDeEstado, this);
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
			if (Linda.nulo(this.respostaDecodificada)) {
				this.respostaDecodificada = this.decodificarResposta(this.requisicaoXml.response);
			}
			return this.respostaDecodificada;
		},

		fornecerCodigoDeEstado: function () {
			if (Linda.nulo(this.codigoDeEstado)) {
				this.codigoDeEstado = CodigoHttp.mapear(this.requisicaoXml.status);
			}
			return this.codigoDeEstado;
		}
	});

	contexto.RequisicaoHttp = RequisicaoHttp;
}(this));
