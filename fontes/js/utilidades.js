/*global CodigoHttp*/
/*global Evento*/
/*global Linda*/
/*global MetodoHttp*/
/*global Prototipo*/
/*global TipoDeResposta*/

(function (global) {
	"use strict";

	var RequisicaoHttp = new Prototipo({
		inicializarSuper: function (uri, tipoDeResposta) {
			this.requisicaoXml = new XMLHttpRequest();
			this.requisicaoXml.responseType = tipoDeResposta;
			this.uri = uri;
			this.usuario = null;
			this.senha = null;
			this.adicionarTratadoresDeEventos();
			this.cabecalho = [];
		},

		adicionarTratadoresDeEventos: function () {
			this.requisicaoXml.onloadstart = function (evento) {
				this.tratarInicio(evento.loaded, evento.total, evento.timeStamp);
			}.vincularEscopo(this);
			this.requisicaoXml.onprogress = function (evento) {
				this.tratarProgresso(evento.loaded, evento.total, evento.timeStamp);
			}.vincularEscopo(this);
			this.requisicaoXml.onloadend = function (evento) {
				this.tratarTermino(evento.loaded, evento.total, evento.timeStamp);
			}.vincularEscopo(this);
			this.requisicaoXml.onabort = function (evento) {
				this.tratarAborto(evento.loaded, evento.total, evento.timeStamp);
			}.vincularEscopo(this);
			this.requisicaoXml.onerror = function (evento) {
				this.tratarErro(evento.loaded, evento.total, evento.timeStamp);
			}.vincularEscopo(this);
			this.requisicaoXml.ontimeout = function (evento) {
				this.tratarEstouroDeTempo(evento.loaded, evento.total, evento.timeStamp);
			}.vincularEscopo(this);
			this.requisicaoXml.onload = function (evento) {
				var resposta = this.fornecerResposta();
				var codigoDeEstado = CodigoHttp.mapear(this.requisicaoXml.status);
				var carregado = evento.loaded;
				var total = evento.total;
				var estampaDeTempo = evento.timeStamp;
				if (codigoDeEstado.sucesso()) {
					this.tratarSucesso(resposta, codigoDeEstado, carregado, total, estampaDeTempo);
				} else if (codigoDeEstado.redirecionamento()) {
					this.tratarRedirecionamento(resposta, codigoDeEstado, carregado, total, estampaDeTempo);
				} else if (codigoDeEstado.erroDoCliente()) {
					this.tratarErroDoCliente(resposta, codigoDeEstado, carregado, total, estampaDeTempo);
				} else if (codigoDeEstado.erroDoServidor()) {
					this.tratarErroDoServidor(resposta, codigoDeEstado, carregado, total, estampaDeTempo);
				}
				this.tratarResposta(resposta, codigoDeEstado, carregado, total, estampaDeTempo);
			}.vincularEscopo(this);
		},

		enviar: function (metodo, dados, assincrono) {
			assincrono = !!assincrono;
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

		enviarGet: function (assincrono) {
			return this.enviar(MetodoHttp.GET, null, assincrono);
		},

		enviarPut: function (dados, assincrono) {
			return this.enviar(MetodoHttp.PUT, dados, assincrono);
		},

		enviarPost: function (dados, assincrono) {
			return this.enviar(MetodoHttp.POST, dados, assincrono);
		},

		envirDelete: function (assincrono) {
			return this.enviar(MetodoHttp.DELETE, null, assincrono);
		},

		tratarInicio: function () {},

		tratarProgresso: function () {},

		tratarTermino: function () {},

		tratarErro: function () {},

		tratarAborto: function () {},

		tratarEstouroDeTempo: function () {},

		tratarResposta: function () {},

		tratarRedirecionamento: function () {},

		tratarSucesso: function () {},

		tratarErroDoCliente: function () {},

		tratarErroDoServidor: function () {},

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
		}
	});

	var RequisicaoJson = new Prototipo({
		Estende: RequisicaoHttp,

		inicializar: function (uri) {
			this.inicializarSuper(uri, TipoDeResposta.JSON);
		},

		fornecerResposta: function () {
			return JSON.parse(this.requisicaoXml.response);
		}
	});

	var RequisicaoDocumento = new Prototipo({
		Estende: RequisicaoHttp,

		inicializar: function (uri) {
			this.inicializarSuper(uri, TipoDeResposta.DOCUMENTO);
		}
	});

	var RequisicaoTexto = new Prototipo({
		Estende: RequisicaoHttp,

		inicializar: function (uri) {
			this.inicializarSuper(uri, TipoDeResposta.TEXTO);
		}
	});

	var Tratador = new Prototipo({
		inicializarSuper: function (elemento) {
			this.elemento = (Linda.nuloOuIndefinido(elemento)) ? Linda.janela : elemento;
		},

		adicionar: function (evento, tratador) {
			this.elemento.addEventListener(evento, tratador);
		},

		remover: function (evento) {
			this.elemento.removeEventListener(evento);
		}
	});

	var TratadorDeTeclado = new Prototipo({
		Estende: Tratador,

		inicializar: function (tecla, elemento) {
			this.inicializarSuper(elemento);
			this.tecla = tecla;
		},

		paraTeclaPressionada: function (tratador) {
			this.adicionar(Evento.TECLA_PRESSIONADA, this.adicionarTratadorDeTeclado(tratador));
			return this;
		},

		paraTeclaSolta: function (tratador) {
			this.adicionar(Evento.TECLA_SOLTA, this.adicionarTratadorDeTeclado(tratador));
			return this;
		},

		adicionarTratadorDeTeclado: function (tratador) {
			return function (evento) {
				if (this.tecla === evento.keyCode) {
					tratador();
				}
			}.vincularEscopo(this);
		}
	});

	var TratadorDeMouse = new Prototipo({
		Estende: Tratador,

		inicializar: function (elemento) {
			this.inicializarSuper(elemento);
		},

		paraClique: function (tratador) {
			this.adicionar(Evento.CLIQUE, tratador);
			return this;
		}
	});

	var TratadorDePagina = new Prototipo({
		Estende: Tratador,

		inicializar: function (elemento) {
			this.inicializarSuper(elemento);
		},

		paraCarregamento: function (tratador) {
			this.adicionar(Evento.CARREGADO, tratador);
			return this;
		}
	});

	global.RequisicaoJson = RequisicaoJson;
	global.RequisicaoDocumento = RequisicaoDocumento;
	global.RequisicaoTexto = RequisicaoTexto;
	global.TratadorDeTeclado = TratadorDeTeclado;
	global.TratadorDeMouse = TratadorDeMouse;
	global.TratadorDePagina = TratadorDePagina;
}(this));
