/*global Linda*/

(function (global) {
	"use strict";

	var Prototipo = function Prototipo(corpoDoPrototipo) {
		var inicializar = corpoDoPrototipo.inicializar;
		var inicializa = Linda.instanciaDe(inicializar, Function);
		var Estende = corpoDoPrototipo.Estende;
		var estende = Linda.instanciaDe(Estende, Function);
		var NovoPrototipo = function Objeto() {
			if (inicializa) {
				inicializar.aplicarComEscopo(this, arguments);
			}
		};
		if (estende) {
			NovoPrototipo.prototype = new Estende();
		}
		delete corpoDoPrototipo.inicializar;
		delete corpoDoPrototipo.Estende;
		NovoPrototipo.implementar(corpoDoPrototipo);
		return NovoPrototipo;
	};

	var PrototipoUnico = function PrototipoUnico(corpoDoPrototipo) {
		var novoPrototipoUnico = {
			instanciaUnica: null,

			instancia: function () {
				var NovoPrototipo = new Prototipo(corpoDoPrototipo);
				this.instanciaUnica = new NovoPrototipo();
				this.instanciaUnica.inicializarUnico.aplicarComEscopo(this.instanciaUnica, arguments);
				novoPrototipoUnico.definirPropriedade("instanciaUnica", Linda.propriedadesDeAtributos);
				novoPrototipoUnico.definirPropriedade("instancia", {
					configuravel: false,
					enumeravel: false,
					funcaoFornecer: function () {
						return this.instanciaUnica;
					}
				});
				return this.instanciaUnica;
			}
		};
		return novoPrototipoUnico;
	};

	var EnumeracaoDePrototipos = new Prototipo({
		inicializar: function (enumeracoes, corpoDoPrototipo) {
			var PrototipoDaEnumeracao = new Prototipo(corpoDoPrototipo);
			enumeracoes.paraCada(function (argumentos, enumeracao) {
				this[enumeracao] = new PrototipoDaEnumeracao();
				this[enumeracao].inicializarEnumeracao.aplicarComEscopo(this[enumeracao], argumentos);
			}, this);
		},

		mapear: function (chave) {
			var enumeracaoEncontrada = null;
			this.paraCada(function (enumeracao) {
				if (enumeracao.chave === chave) {
					enumeracaoEncontrada = enumeracao;
					return;
				}
			}, this);
			return enumeracaoEncontrada;
		},

		comoLista: function () {
			var lista = [];
			this.paraCada(function (enumeracao) {
				if (!Linda.nuloOuIndefinido(enumeracao.chave)) {
					lista.push(enumeracao);
				}
			}, this);
			return lista;
		}
	});

	var EnumeracaoDeConstantes = new Prototipo({
		inicializar: function (enumeracoes) {
			enumeracoes.paraCada(function (valor, enumeracao) {
				this[enumeracao] = valor;
			}, this);
		},

		mapear: function (chave) {
			var enumeracaoEncontrada = null;
			this.paraCada(function (enumeracao) {
				if (enumeracao === chave) {
					enumeracaoEncontrada = enumeracao;
					return;
				}
			}, this);
			return enumeracaoEncontrada;
		},

		comoLista: function () {
			var lista = [];
			this.paraCada(function (enumeracao) {
				lista.push(enumeracao);
			}, this);
			return lista;
		}
	});

	global.Prototipo = Prototipo;
	global.PrototipoUnico = PrototipoUnico;
	global.EnumeracaoDePrototipos = EnumeracaoDePrototipos;
	global.EnumeracaoDeConstantes = EnumeracaoDeConstantes;
}(this));
