/*global Linda*/

(function (global) {
	"use strict";

	var Objeto = function Objeto() {};

	Objeto.implementar({
		igual: function (outro) {
			return (this === outro);
		}
	});

	var Classe = function Classe() {};

	Classe.estender({
		criar: function (corpoDaClasse) {
			var SuperClasse = corpoDaClasse.estende;
			var estende = Linda.instanciaDe(SuperClasse, Function);
			var inicializa = Linda.instanciaDe(corpoDaClasse.inicializar, Function);
			var NovaClasse = function Objeto() { this.inicializar.aplicarComEscopo(this, arguments); };
			var prototipo = Objeto.prototype;
			if (estende) {
				prototipo = SuperClasse.prototype;
				delete corpoDaClasse.estende;
			}
			NovaClasse.prototype = Object.create(prototipo);
			NovaClasse.prototipo = NovaClasse.prototype;
			corpoDaClasse.inicializar = (inicializa) ? corpoDaClasse.inicializar : function () {};
			NovaClasse.implementar(corpoDaClasse);
			return NovaClasse;
		},

		criarSingleton: function(corpoDaClasse) {
			var NovaClasseUnica = Classe.criar(corpoDaClasse);
			NovaClasseUnica.estender({
				instanciaUnica: null,
				instancia: function () {
					this.instanciaUnica = Object.create(this.prototipo);
					this.aplicarComEscopo(this.instanciaUnica, arguments);
					this.definirPropriedades({
						instanciaUnica: Linda.propriedadesDeAtributos,
						instancia: {
							configuravel: false,
							enumeravel: false,
							funcaoFornecer: function () {
								return this.instanciaUnica;
							}
						}
					});
					return this.instanciaUnica;
				}
			});
			return NovaClasseUnica;
		},

		criarEnumeracao: function (enumeracoes, corpoDaClasse) {
			var ClasseEnumeracao = Classe.criar(corpoDaClasse);
			var NovaEnumeracao = new Enumeracao(ClasseEnumeracao);
			enumeracoes.paraCada(function (argumentos, enumeracao) {
				this[enumeracao] = Object.create(ClasseEnumeracao.prototipo);
				ClasseEnumeracao.aplicarComEscopo(this[enumeracao], argumentos);
			}, NovaEnumeracao);
			return NovaEnumeracao;
		},

		criarEnumeracaoDeConstantes: function (enumeracoes) {
			var NovaEnumeracaoDeConstantes = new Enumeracao();
			enumeracoes.paraCada(function (valor, enumeracao) {
				this[enumeracao] = valor;
			}, NovaEnumeracaoDeConstantes);
			return NovaEnumeracaoDeConstantes;
		}
	});

	var Enumeracao = Classe.criar({
		inicializar: function (classe) {
			this.definirPropriedades({
				classe: {
					gravavel: false,
					enumeravel: false,
					configuravel: false,
					valor: classe
				}
			});
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

	global.Classe = Classe;
	global.Objeto = Objeto;
	global.Enumeracao = Enumeracao;
}(this));
