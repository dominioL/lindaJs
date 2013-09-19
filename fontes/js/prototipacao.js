/*global Linda*/

(function (global) {
	"use strict";

	function Objeto() {}

	Objeto.implementar({
		inicializar: function () {},

		destruir: function () {},

		super: function () {
			this.SuperClasse.prototipo.inicializar.aplicarComEscopo(this, arguments);
		},

		igual: function (outro) {
			return (this === outro);
		}
	});

	Objeto.estender({
		prototipo: Objeto.prototype
	});

	function Classe() {}

	Classe.estender({
		criar: function (corpoDaClasse) {
			var SuperClasse = corpoDaClasse.SuperClasse;
			var estende = Linda.instanciaDe(SuperClasse, Function);
			function NovaClasse() {
				this.inicializar.aplicarComEscopo(this, arguments);
			}
			SuperClasse = (estende) ? SuperClasse : Objeto;
			corpoDaClasse.SuperClasse = SuperClasse
			NovaClasse.prototype = Object.create(SuperClasse.prototype);
			NovaClasse.prototipo = NovaClasse.prototype;
			NovaClasse.implementar(corpoDaClasse);
			NovaClasse.prototype.definirPropriedades({
				SuperClasse: Linda.propriedadesDeAtributosGravaveisConfiguraveis
			});
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
			var NovaEnumeracaoDeConstantes = new EnumeracaoDeConstantes();
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
				if (enumeracao.chave === chave || enumeracao === chave) {
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

	var EnumeracaoDeConstantes = Classe.criar({
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

	global.Classe = Classe;
	global.Objeto = Objeto;
}(this));
