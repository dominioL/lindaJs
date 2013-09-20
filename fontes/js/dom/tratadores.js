/*global Classe*/
/*global Dom*/
/*global Evento*/
/*global Tecla*/

(function (global) {
	"use strict";

	var Tratador = Classe.criar({
		inicializar: function (elemento) {
			this.elemento = elemento || Dom.janela;
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

		paraAborto: function (tratador, escopo) {
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

	global.Tratador = Tratador;
	global.TratadorDeCarregamento = TratadorDeCarregamento;
	global.TratadorDeTeclado = TratadorDeTeclado;
	global.TratadorDeMouse = TratadorDeMouse;
}(this));
