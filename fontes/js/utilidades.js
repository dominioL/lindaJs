/*global AtributoHttp*/
/*global Classe*/
/*global CodigoHttp*/
/*global Evento*/
/*global Linda*/
/*global MetodoHttp*/
/*global TipoDeMidia*/
/*global TipoDeResposta*/
/*global Tecla*/

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

	var Tratador = Classe.criar({
		inicializar: function (elemento) {
			this.elemento = elemento || Linda.janela;
			this.eventosTratadores = [];
		},

		adicionar: function (evento, tratador) {
			var eventoTratador = {
				evento: evento,
				tratador: tratador
			};
			this.eventosTratadores.push(eventoTratador);
			this.elemento.addEventListener(evento, tratador);
		},

		remover: function () {
			this.eventosTratadores.paraCada(function (eventoTratador) {
				this.elemento.removeEventListener(eventoTratador.evento, eventoTratador.tratador);
			}, this);
		},

		paraAlteracao: function (tratador, escopo) {
			this.adicionar(Evento.ALTERADO, tratador.vincularEscopo(escopo));
			return this;
		},

		paraAlteracaoNoHistorico: function (tratador, escopo) {
			this.adicionar(Evento.HISTORICO_ALTERADO, tratador.vincularEscopo(escopo));
			return this;
		},

		paraErro: function (tratador, escopo) {
			this.adicionar(Evento.ERRO, tratador.vincularEscopo(escopo));
			return this;
		}
	});

	var TratadorDeCarregamento = Classe.criar({
		SuperClasse: Tratador,

		inicializar: function (elemento) {
			this.super(elemento);
		},

		paraCarregamento: function (tratador, escopo) {
			this.adicionar(Evento.CARREGADO, tratador.vincularEscopo(escopo));
			return this;
		},

		paraCarregamentoIniciado: function (tratador, escopo) {
			this.adicionar(Evento.CARREGAMENTO_INICIADO, tratador.vincularEscopo(escopo));
			return this;
		},

		paraCarregamentoFinalizado: function (tratador, escopo) {
			this.adicionar(Evento.CARREGAMENTO_FINALIZADO, tratador.vincularEscopo(escopo));
			return this;
		},

		paraProgresso: function (tratador, escopo) {
			this.adicionar(Evento.PROGRESSO, tratador.vincularEscopo(escopo));
			return this;
		},

		paraAbortado: function (tratador, escopo) {
			this.adicionar(Evento.ABORTADO, tratador.vincularEscopo(escopo));
			return this;
		},

		paraEstouroDeTempo: function (tratador, escopo) {
			this.adicionar(Evento.ESTOURO_DE_TEMPO, tratador.vincularEscopo(escopo));
			return this;
		}
	});

	var TratadorDeTeclado = Classe.criar({
		SuperClasse: Tratador,

		inicializar: function (elemento) {
			this.super(elemento);
		},

		paraTeclaPressionada: function (tecla, tratador, escopo) {
			this.adicionar(Evento.TECLA_PRESSIONADA, this.adicionarTratadorDeTeclado(tecla, tratador, escopo));
			return this;
		},

		paraTeclaSolta: function (tecla, tratador, escopo) {
			this.adicionar(Evento.TECLA_SOLTA, this.adicionarTratadorDeTeclado(tecla, tratador, escopo));
			return this;
		},

		paraQualquerTeclaPressionada: function (tratador, escopo) {
			this.adicionar(Evento.TECLA_PRESSIONADA, this.adicionarTratadorDeTecladoParaQualquer(tratador, escopo));
			return this;
		},

		paraQualquerTeclaSolta: function (tratador, escopo) {
			this.adicionar(Evento.TECLA_SOLTA, this.adicionarTratadorDeTecladoParaQualquer(tratador, escopo));
			return this;
		},

		adicionarTratadorDeTeclado: function (tecla, tratador, escopo) {
			return function (evento) {
				if (tecla === evento.keyCode) {
					tratador.chamarComEscopo(escopo);
				}
			};
		},

		adicionarTratadorDeTecladoParaQualquer: function (tratador, escopo) {
			return function (evento) {
				if (Tecla.APAGAR !== evento.keyCode) {
					tratador.chamarComEscopo(escopo);
				}
			};
		}
	});

	var TratadorDeMouse = Classe.criar({
		SuperClasse: Tratador,

		inicializar: function (elemento) {
			this.super(elemento);
		},

		paraClique: function (tratador, escopo) {
			this.adicionar(Evento.CLIQUE, tratador.vincularEscopo(escopo));
			return this;
		},

		paraDuploClique: function (tratador, escopo) {
			this.adicionar(Evento.DUPLO_CLIQUE, tratador.vincularEscopo(escopo));
			return this;
		}
	});

	global.RequisicaoJson = RequisicaoJson;
	global.RequisicaoHtml = RequisicaoHtml;
	global.RequisicaoDocumento = RequisicaoDocumento;
	global.RequisicaoTexto = RequisicaoTexto;
	global.Tratador = Tratador;
	global.TratadorDeCarregamento = TratadorDeCarregamento;
	global.TratadorDeTeclado = TratadorDeTeclado;
	global.TratadorDeMouse = TratadorDeMouse;
}(this));
