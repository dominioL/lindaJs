/*global Classe*/
/*global deepEqual*/
/*global equal*/
/*global Linda*/
/*global ok*/
/*global Objeto*/
/*global module*/
/*global test*/

(function () {
	"use strict";

	(function () {
		module("Classe");

		test("Criar classe Carro com método andar.", function () {
			var Carro = Classe.criar({
				andar: function () {
					return 1;
				}
			});

			var carro = new Carro();
			carro.buzina = "Bibi";
			equal(carro.andar(), 1, "Instância de carro pode executar métodos.");
			equal(carro.igual(new Carro()), false, "Instância de carro pode executar métodos de Objeto.");
			equal(carro.igual(carro), true, "Instância de carro pode executar métodos de Objeto.");
			deepEqual(carro.fornecerPropriedades(), ["buzina"], "Instância de Carro não possui propriedades extras.");
			deepEqual(Carro.prototype.fornecerPropriedades(), ["andar", "inicializar"], "Protótipo de Carro possui propriedades fornecidas na criação de Carro  mais o método inicializar.");
			ok(Carro.prototype.prototipoDe(carro), "Protótipo de Carro é o prototipo de uma instância de Carro.");
			ok(Linda.instanciaDe(carro, Carro), "Instância de Carro é uma instância de Carro.");
			ok(Linda.instanciaDe(carro, Objeto), "Instância de Carro é uma instância de Objeto.");
		});

		test("Criar classe Carro com método inicializar.", function () {
			var Carro = Classe.criar({
				inicializar: function (buzina, pneu) {
					this.buzina = buzina;
					this.pneu = pneu;
				},

				buzinar: function () {
					return this.buzina;
				}
			});

			var carroA = new Carro("Bibi", "Michelan");
			var carroB = new Carro("Fonfon", "Bridgestone");
			equal(carroA.buzinar(), "Bibi", "Instância de carro pode executar métodos que acessam suas propriedades.");
			equal(carroB.buzinar(), "Fonfon", "Instância de carro pode executar métodos que acessam suas propriedades.");
			equal(carroA.pneu, "Michelan", "Instância de carro pode acessar suas propriedades.");
			equal(carroB.pneu, "Bridgestone", "Instância de carro pode acessar suas propriedades.");
			deepEqual(carroA.fornecerPropriedades(), ["buzina", "pneu"], "Instância de carro não possui propriedades extras.");
			deepEqual(carroA.fornecerPropriedades(), ["buzina", "pneu"], "Instância de carro não possui propriedades extras.");
			deepEqual(Carro.prototype.fornecerPropriedades(), ["inicializar", "buzinar"], "Protótipo de Carro possui propriedades fornecidas na criação de Carro.");
		});

		test("Criar classe Carro  e Bicicleta que estende classe Veiculo.", function () {
			var Veiculo = Classe.criar({
				inicializar: function (velocidade) {
					this.velocidade = velocidade;
				},

				andar: function () {
					return this.velocidade;
				}
			});

			var Carro = Classe.criar({
				estende: Veiculo,
				inicializar: function (velocidade, pneu) {
					Veiculo.prototipo.inicializar.chamarComEscopo(this, velocidade);
					this.pneu = pneu;
				}
			});

			var CarroQuebrado = Classe.criar({
				estende: Carro,
				inicializar: function (velocidade, pneu) {
					Carro.prototipo.inicializar.chamarComEscopo(this, velocidade, pneu);
				},

				andar: function () {
					return "Erro, carro não pode andar.";
				},

				andarSuper: function () {
					return Carro.prototipo.andar.chamarComEscopo(this);
				}
			});

			var Bicicleta = Classe.criar({
				estende: Veiculo,
				inicializar: function (velocidade) {
					Veiculo.prototipo.inicializar.chamarComEscopo(this, velocidade);
				}
			});

			var veiculo = new Veiculo(0);
			var carro = new Carro(80, "Michelan");
			var carroQuebrado = new CarroQuebrado(60, "Bridgestone");
			var bicicleta = new Bicicleta(20);
			ok(Linda.instanciaDe(veiculo, Veiculo), "Instância de Veiculo é um Veiculo.");
			ok(Linda.instanciaDe(carro, Veiculo), "Instância de Carro é um Veiculo.");
			ok(Linda.instanciaDe(carroQuebrado, Veiculo), "Instância de CarroQuebrado é um Veiculo.");
			ok(Linda.instanciaDe(bicicleta, Veiculo), "Instância de Bicicleta é um Veiculo.");
			ok(!Linda.instanciaDe(veiculo, Carro), "Instância de Veiculo não é um Carro.");
			ok(Linda.instanciaDe(carro, Carro), "Instância de Carro é um Carro.");
			ok(Linda.instanciaDe(carroQuebrado, Carro), "Instância de CarroQuebrado é um Carro.");
			ok(!Linda.instanciaDe(bicicleta, Carro), "Instância de Bicicleta não é um Carro.");
			ok(Linda.instanciaDe(carroQuebrado, CarroQuebrado), "Instância de CarroQuebrado é um CarroQuebrado.");
			equal(veiculo.andar(), 0, "Instância de Veiculo pode executar métodos de Veiculo.");
			equal(carro.andar(), 80, "Instância de Carro pode executar métodos de Veiculo.");
			equal(bicicleta.andar(), 20, "Instância de Bicicleta pode executar métodos de Veiculo.");
			equal(carroQuebrado.andar(), "Erro, carro não pode andar.", "CarroQuebrado pode sobreescrever métodos de Carro.");
			equal(carroQuebrado.andarSuper(), 60, "CarroQuebrado pode chamar métodos da super classe.");
			equal(veiculo.velocidade, 0, "Instância de Veiculo pode acessar propriedades de Veiculo.");
			equal(carro.velocidade, 80, "Instância de Carro pode acessar propriedades de Veiculo.");
			equal(bicicleta.velocidade, 20, "Instância de Bicicleta pode acessar propriedades de Veiculo.");
			equal(carro.pneu, "Michelan", "Instância de Carro pode acessar propriedades de Carro.");
			equal(carroQuebrado.pneu, "Bridgestone", "Instância de CarroQuebrado pode acessar propriedades de Carro.");
		});
	}());

	(function () {
		module("Classe Singleton");

		test("Criar classe Singleton CouchDb que estende a classe BancoDeDados.", function () {
			var BancoDeDados = Classe.criar({
				inicializar: function (nomeDoBanco) {
					this.nomeDoBanco = nomeDoBanco;
				},

				fornecerNomeDoBanco: function () {
					return this.nomeDoBanco;
				}
			});

			var CouchDb = Classe.criarSingleton({
				estende: BancoDeDados,

				inicializar: function (nomeDaBase) {
					BancoDeDados.prototipo.inicializar.chamarComEscopo(this, "CouchDB");
					this.nomeDaBase = nomeDaBase;
				},

				fornecerNomeDaBase: function () {
					return this.nomeDaBase;
				}
			});

			ok(Linda.nulo(CouchDb.instanciaUnica), "CouchDb é iniciado sem instância");
			ok(Linda.instanciaDe(CouchDb.instancia("linda"), CouchDb), "CouchDb.instancia() cria instância unica de CouchDb.");
			ok(!Linda.nulo(CouchDb.instanciaUnica), "CouchDb é iniciado e passa a ter instância");
			ok(Linda.instanciaDe(CouchDb.instancia, CouchDb), "CouchDb.instancia fornece instância unica de CouchDb.");
			ok(Linda.instanciaDe(CouchDb.instancia, BancoDeDados), "CouchDb.instancia fornece instância unica de CouchDb que também é uma instância de BancoDeDados.");
			equal(CouchDb.instancia.nomeDaBase, "linda", "Instância única de CouchDb tem acesso as propriedades.");
			equal(CouchDb.instancia.fornecerNomeDaBase(), "linda", "Instância única de CouchDb tem acesso aos métodos.");
			equal(CouchDb.instancia.nomeDoBanco, "CouchDB", "Instância única de CouchDb tem acesso as propriedades de BancoDeDados.");
			equal(CouchDb.instancia.fornecerNomeDoBanco(), "CouchDB", "Instância única de CouchDb tem acesso aos métodos de BancoDeDados.");
		});
	}());
}());
