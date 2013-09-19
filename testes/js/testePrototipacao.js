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

		test("Criar classe Objeto e criar exemplar objeto.", function () {
			var objeto = new Objeto();
			objeto.atributo = "valor";

			equal(Objeto.prototype, Objeto.prototipo, "Objeto recebe a propriedade prototipo que aponta para o seu prototype.");
			equal(Objeto.prototype.SuperClasse, undefined, "Objeto não possui super classe em seu protótipo.");
			deepEqual(Objeto.prototype.fornecerPropriedadesPropriasEnumeraveis(), ["inicializar", "destruir", "super", "igual"], "Objeto possui propriedades proprias enumeráveis associadas a ele.");
			deepEqual(Objeto.prototype.fornecerPropriedadesPropriasInvisiveis(), ["constructor"], "Objeto possui propriedades proprias invisíveis associadas a ele.");
			ok(Objeto.prototype.prototipoDe(objeto), "Protótipo de Objeto é protótipo de objeto.");
			ok(objeto.instanciaDe(Objeto), "objeto é instância de Objeto.");
			ok(objeto.prototipadoDe(Objeto.prototype), "objeto é prototipado de protótipo de Objeto.");
			equal(objeto.SuperClasse, undefined, "objeto não possui super classe.");
			deepEqual(objeto.fornecerPropriedadesPropriasEnumeraveis(), ["atributo"], "objeto possui propriedades próprias enumeráveis associadas a ele.");
			deepEqual(objeto.fornecerPropriedadesPropriasInvisiveis(), [], "objeto possui propriedades próprias invisíveis associadas a ele.");
		});

		test("Criar classe Veiculo sem super classe, sem método inicializar e criar exemplar veiculo.", function () {
			var Veiculo = Classe.criar({
				andar: function () {
					return "...";
				}
			});

			var veiculo = new Veiculo();
			veiculo.pneu = "Michelan";

			equal(Veiculo.prototype, Veiculo.prototipo, "Veiculo recebe a propriedade prototipo que aponta para o seu prototype.");
			equal(Veiculo.prototype.SuperClasse, Objeto, "Veiculo possui a super classe Objeto em seu protótipo.");
			deepEqual(Veiculo.prototype.fornecerPropriedadesPropriasEnumeraveis(), ["andar"], "Veiculo possui propriedades proprias enumeráveis associadas a ele.");
			deepEqual(Veiculo.prototype.fornecerPropriedadesPropriasInvisiveis(), ["SuperClasse"], "Veiculo possui propriedades proprias invisíveis associadas a ele.");
			ok(Veiculo.prototype.prototipoDe(veiculo), "Protótipo de Veiculo é protótipo de veiculo.");
			ok(Objeto.prototype.prototipoDe(veiculo), "Protótipo de Objeto é protótipo de veiculo.");
			ok(veiculo.prototipadoDe(Veiculo.prototype), "veiculo é prototipado de protótipo de Veiculo.");
			ok(veiculo.prototipadoDe(Objeto.prototype), "veiculo é prototipado de protótipo de Objeto.");
			ok(Linda.instanciaDe(veiculo, Veiculo), "veiculo é instância de Veiculo.");
			ok(Linda.instanciaDe(veiculo, Objeto), "veiculo é instância de Objeto.");
			equal(veiculo.SuperClasse, Objeto, "veiculo possui super classe Objeto.");
			deepEqual(veiculo.fornecerPropriedadesPropriasEnumeraveis(), ["pneu"], "veiculo possui propriedades próprias enumeráveis associadas a ele.");
			deepEqual(veiculo.fornecerPropriedadesPropriasInvisiveis(), [], "veiculo possui propriedades próprias invisíveis associadas a ele.");
		});

		test("Criar classe Carro com super classe Veiculo, com método inicializar e criar exemplar carro e exemplar veiculo.", function () {
			var Veiculo = Classe.criar({
				andar: function () {
					return "...";
				},

				buzinar: function () {
					return "";
				}
			});

			var Carro = Classe.criar({
				SuperClasse: Veiculo,

				inicializar: function () {
					this.marca = "Toyota";
				},

				buzinar: function () {
					return "Bibi!";
				}
			});

			var carro = new Carro();
			var veiculo = new Veiculo();

			equal(Carro.prototype.SuperClasse, Veiculo, "Carro possui a super classe Veiculo em seu protótipo.");
			deepEqual(Carro.prototype.fornecerPropriedadesPropriasEnumeraveis(), ["inicializar", "buzinar"], "Veiculo possui propriedades proprias enumeráveis associadas a ele.");
			deepEqual(Carro.prototype.fornecerPropriedadesPropriasInvisiveis(), ["SuperClasse"], "Veiculo possui propriedades proprias invisíveis associadas a ele.");
			ok(Carro.prototype.prototipoDe(carro), "Protótipo de Carro é protótipo de carro.");
			ok(Veiculo.prototype.prototipoDe(carro), "Protótipo de Veiculo é protótipo de carro.");
			ok(Objeto.prototype.prototipoDe(carro), "Protótipo de Objeto é protótipo de carro.");
			ok(carro.prototipadoDe(Carro.prototype), "carro é prototipado de protótipo de Carro.");
			ok(carro.prototipadoDe(Veiculo.prototype), "carro é prototipado de protótipo de Veiculo.");
			ok(carro.prototipadoDe(Objeto.prototype), "carro é prototipado de protótipo de Objeto.");
			ok(Linda.instanciaDe(carro, Carro), "carro é instância de Carro.");
			ok(Linda.instanciaDe(carro, Veiculo), "carro é instância de Veiculo.");
			ok(Linda.instanciaDe(carro, Objeto), "carro é instância de Objeto.");
			equal(carro.SuperClasse, Veiculo, "carro possui super classe Veiculo.");
			deepEqual(carro.fornecerPropriedadesPropriasEnumeraveis(), ["marca"], "carro possui propriedades próprias enumeráveis associadas a ele.");
			deepEqual(carro.fornecerPropriedadesPropriasInvisiveis(), [], "carro possui propriedades próprias invisíveis associadas a ele.");
			equal(veiculo.buzinar(), "", "veiculo pode executar métodos de Veiculo.");
			equal(veiculo.andar(), "...", "veiculo pode executar métodos de Veiculo.");
			equal(carro.buzinar(), "Bibi!", "carro pode executar métodos de Carro que foram sobreescritos de Veiculo.");
			equal(veiculo.andar(), "...", "carro pode executar métodos de Veiculo.");
		});

		test("Criar classe Carro e Bicicleta que estende classe Veiculo.", function () {
			var Veiculo = Classe.criar({
				inicializar: function (velocidade) {
					this.velocidade = velocidade;
				},

				andar: function () {
					return this.velocidade;
				}
			});

			var Carro = Classe.criar({
				SuperClasse: Veiculo,

				inicializar: function (velocidade, pneu) {
					Veiculo.prototype.inicializar.chamarComEscopo(this, velocidade);
					this.pneu = pneu;
				}
			});

			var CarroQuebrado = Classe.criar({
				SuperClasse: Carro,

				inicializar: function (velocidade, pneu) {
					this.super(velocidade, pneu);
				},

				andar: function () {
					return "Erro, carro não pode andar.";
				},

				andarSuper: function () {
					return this.SuperClasse.prototipo.andar.chamarComEscopo(this);
				}
			});

			var Bicicleta = Classe.criar({
				SuperClasse: Veiculo,

				inicializar: function (velocidade) {
					this.super(velocidade);
				}
			});

			var veiculo = new Veiculo(0);
			var carro = new Carro(80, "Michelan");
			var carroQuebrado = new CarroQuebrado(60, "Bridgestone");
			var bicicleta = new Bicicleta(20);

			equal(veiculo.super, Objeto.prototype.super, "Instância de veículo possui métodos de Objeto.");
			equal(veiculo.inicializar, Veiculo.prototype.inicializar, "Instância de veículo possui métodos de Veículo.");
			notEqual(veiculo.inicializar, Objeto.prototype.inicializar, "Instância de veículo possui métodos  do primeiro protótipo.");
			equal(veiculo.SuperClasse, Objeto, "Instância de veículo possui acesso a super classe.");
			equal(Veiculo.prototype.super, Objeto.prototype.super, "Protótipo Veículo possui métodos de Objeto.");
			notEqual(Veiculo.prototype.inicializar, Object.prototype.inicializar, "Protótipo Veículo possui métodos do primeiro protótipo.");
			equal(Veiculo.prototype.SuperClasse, Objeto, "Protótipo Veículo possui acesso a super classe.");
			equal(carro.super, Objeto.prototype.super, "Instância de carro possui métodos de Objeto.");
			equal(carro.inicializar, Carro.prototype.inicializar, "Instância de carro possui métodos de Carro.");
			equal(carro.SuperClasse, Veiculo, "Instância de carro possui acesso a super classe.");
			equal(Carro.prototype.super, Objeto.prototype.super, "Protótipo Carro possui métodos de Objeto.");
			notEqual(Carro.prototype.inicializar, Objeto.prototype.inicializar, "Protótipo Carro possui métodos do primeiro protótipo.");
			notEqual(Carro.prototype.inicializar, Veiculo.prototype.inicializar, "Protótipo Carro possui métodos do primeiro protótipo.");
			equal(Carro.prototype.SuperClasse, Veiculo, "Protótipo Carro possui acesso a super classe.");
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
				SuperClasse: BancoDeDados,

				inicializar: function (nomeDaBase) {
					this.super("CouchDB");
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
