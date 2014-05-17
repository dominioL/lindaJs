/*global Classe*/
/*global Linda*/
/*global Objeto*/
/*global QUnit*/

(function () {
	"use strict";

	(function () {
		QUnit.module("Classe");

		QUnit.test("Criar classe Objeto e criar exemplar objeto.", function () {
			var objeto = new Objeto();
			objeto.atributo = "valor";

			QUnit.equal(Objeto.prototype, Objeto.prototipo, "Objeto recebe a propriedade prototipo que aponta para o seu prototype.");
			QUnit.equal(Objeto.prototype.SuperClasse, undefined, "Objeto não possui super classe em seu protótipo.");
			QUnit.deepEqual(Objeto.prototype.fornecerPropriedadesPropriasEnumeraveis(), ["inicializar", "destruir", "super", "igual"], "Objeto possui propriedades proprias enumeráveis associadas a ele.");
			QUnit.deepEqual(Objeto.prototype.fornecerPropriedadesPropriasInvisiveis(), ["constructor"], "Objeto possui propriedades proprias invisíveis associadas a ele.");
			QUnit.ok(Objeto.prototype.prototipoDe(objeto), "Protótipo de Objeto é protótipo de objeto.");
			QUnit.ok(objeto.instanciaDe(Objeto), "objeto é instância de Objeto.");
			QUnit.ok(objeto.prototipadoDe(Objeto.prototype), "objeto é prototipado de protótipo de Objeto.");
			QUnit.equal(objeto.SuperClasse, undefined, "objeto não possui super classe.");
			QUnit.deepEqual(objeto.fornecerPropriedadesPropriasEnumeraveis(), ["atributo"], "objeto possui propriedades próprias enumeráveis associadas a ele.");
			QUnit.deepEqual(objeto.fornecerPropriedadesPropriasInvisiveis(), [], "objeto possui propriedades próprias invisíveis associadas a ele.");
		});

		QUnit.test("Criar classe Veiculo sem super classe, sem método inicializar e criar exemplar veiculo.", function () {
			var Veiculo = Classe.criar({
				andar: function () {
					return "...";
				}
			});

			var veiculo = new Veiculo();
			veiculo.pneu = "Michelan";

			QUnit.equal(Veiculo.prototype, Veiculo.prototipo, "Veiculo recebe a propriedade prototipo que aponta para o seu prototype.");
			QUnit.equal(Veiculo.prototype.SuperClasse, Objeto, "Veiculo possui a super classe Objeto em seu protótipo.");
			QUnit.deepEqual(Veiculo.prototype.fornecerPropriedadesPropriasEnumeraveis(), ["andar"], "Veiculo possui propriedades proprias enumeráveis associadas a ele.");
			QUnit.deepEqual(Veiculo.prototype.fornecerPropriedadesPropriasInvisiveis(), ["SuperClasse"], "Veiculo possui propriedades proprias invisíveis associadas a ele.");
			QUnit.ok(Veiculo.prototype.prototipoDe(veiculo), "Protótipo de Veiculo é protótipo de veiculo.");
			QUnit.ok(Objeto.prototype.prototipoDe(veiculo), "Protótipo de Objeto é protótipo de veiculo.");
			QUnit.ok(veiculo.prototipadoDe(Veiculo.prototype), "veiculo é prototipado de protótipo de Veiculo.");
			QUnit.ok(veiculo.prototipadoDe(Objeto.prototype), "veiculo é prototipado de protótipo de Objeto.");
			QUnit.ok(Linda.instanciaDe(veiculo, Veiculo), "veiculo é instância de Veiculo.");
			QUnit.ok(Linda.instanciaDe(veiculo, Objeto), "veiculo é instância de Objeto.");
			QUnit.equal(veiculo.SuperClasse, Objeto, "veiculo possui super classe Objeto.");
			QUnit.deepEqual(veiculo.fornecerPropriedadesPropriasEnumeraveis(), ["pneu"], "veiculo possui propriedades próprias enumeráveis associadas a ele.");
			QUnit.deepEqual(veiculo.fornecerPropriedadesPropriasInvisiveis(), [], "veiculo possui propriedades próprias invisíveis associadas a ele.");
		});

		QUnit.test("Criar classe Carro com super classe Veiculo, com método inicializar e criar exemplar carro e exemplar veiculo.", function () {
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

			QUnit.equal(Carro.prototype.SuperClasse, Veiculo, "Carro possui a super classe Veiculo em seu protótipo.");
			QUnit.deepEqual(Carro.prototype.fornecerPropriedadesPropriasEnumeraveis(), ["inicializar", "buzinar"], "Veiculo possui propriedades proprias enumeráveis associadas a ele.");
			QUnit.deepEqual(Carro.prototype.fornecerPropriedadesPropriasInvisiveis(), ["SuperClasse"], "Veiculo possui propriedades proprias invisíveis associadas a ele.");
			QUnit.ok(Carro.prototype.prototipoDe(carro), "Protótipo de Carro é protótipo de carro.");
			QUnit.ok(Veiculo.prototype.prototipoDe(carro), "Protótipo de Veiculo é protótipo de carro.");
			QUnit.ok(Objeto.prototype.prototipoDe(carro), "Protótipo de Objeto é protótipo de carro.");
			QUnit.ok(carro.prototipadoDe(Carro.prototype), "carro é prototipado de protótipo de Carro.");
			QUnit.ok(carro.prototipadoDe(Veiculo.prototype), "carro é prototipado de protótipo de Veiculo.");
			QUnit.ok(carro.prototipadoDe(Objeto.prototype), "carro é prototipado de protótipo de Objeto.");
			QUnit.ok(Linda.instanciaDe(carro, Carro), "carro é instância de Carro.");
			QUnit.ok(Linda.instanciaDe(carro, Veiculo), "carro é instância de Veiculo.");
			QUnit.ok(Linda.instanciaDe(carro, Objeto), "carro é instância de Objeto.");
			QUnit.equal(carro.SuperClasse, Veiculo, "carro possui super classe Veiculo.");
			QUnit.deepEqual(carro.fornecerPropriedadesPropriasEnumeraveis(), ["marca"], "carro possui propriedades próprias enumeráveis associadas a ele.");
			QUnit.deepEqual(carro.fornecerPropriedadesPropriasInvisiveis(), [], "carro possui propriedades próprias invisíveis associadas a ele.");
			QUnit.equal(veiculo.buzinar(), "", "veiculo pode executar métodos de Veiculo.");
			QUnit.equal(veiculo.andar(), "...", "veiculo pode executar métodos de Veiculo.");
			QUnit.equal(carro.buzinar(), "Bibi!", "carro pode executar métodos de Carro que foram sobreescritos de Veiculo.");
			QUnit.equal(veiculo.andar(), "...", "carro pode executar métodos de Veiculo.");
		});

		QUnit.test("Criar classe Carro e Bicicleta que estende classe Veiculo.", function () {
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

			QUnit.equal(veiculo.super, Objeto.prototype.super, "Instância de veículo possui métodos de Objeto.");
			QUnit.equal(veiculo.inicializar, Veiculo.prototype.inicializar, "Instância de veículo possui métodos de Veículo.");
			QUnit.notEqual(veiculo.inicializar, Objeto.prototype.inicializar, "Instância de veículo possui métodos  do primeiro protótipo.");
			QUnit.equal(veiculo.SuperClasse, Objeto, "Instância de veículo possui acesso a super classe.");
			QUnit.equal(Veiculo.prototype.super, Objeto.prototype.super, "Protótipo Veículo possui métodos de Objeto.");
			QUnit.notEqual(Veiculo.prototype.inicializar, Object.prototype.inicializar, "Protótipo Veículo possui métodos do primeiro protótipo.");
			QUnit.equal(Veiculo.prototype.SuperClasse, Objeto, "Protótipo Veículo possui acesso a super classe.");
			QUnit.equal(carro.super, Objeto.prototype.super, "Instância de carro possui métodos de Objeto.");
			QUnit.equal(carro.inicializar, Carro.prototype.inicializar, "Instância de carro possui métodos de Carro.");
			QUnit.equal(carro.SuperClasse, Veiculo, "Instância de carro possui acesso a super classe.");
			QUnit.equal(Carro.prototype.super, Objeto.prototype.super, "Protótipo Carro possui métodos de Objeto.");
			QUnit.notEqual(Carro.prototype.inicializar, Objeto.prototype.inicializar, "Protótipo Carro possui métodos do primeiro protótipo.");
			QUnit.notEqual(Carro.prototype.inicializar, Veiculo.prototype.inicializar, "Protótipo Carro possui métodos do primeiro protótipo.");
			QUnit.equal(Carro.prototype.SuperClasse, Veiculo, "Protótipo Carro possui acesso a super classe.");
			QUnit.ok(Linda.instanciaDe(veiculo, Veiculo), "Instância de Veiculo é um Veiculo.");
			QUnit.ok(Linda.instanciaDe(carro, Veiculo), "Instância de Carro é um Veiculo.");
			QUnit.ok(Linda.instanciaDe(carroQuebrado, Veiculo), "Instância de CarroQuebrado é um Veiculo.");
			QUnit.ok(Linda.instanciaDe(bicicleta, Veiculo), "Instância de Bicicleta é um Veiculo.");
			QUnit.ok(!Linda.instanciaDe(veiculo, Carro), "Instância de Veiculo não é um Carro.");
			QUnit.ok(Linda.instanciaDe(carro, Carro), "Instância de Carro é um Carro.");
			QUnit.ok(Linda.instanciaDe(carroQuebrado, Carro), "Instância de CarroQuebrado é um Carro.");
			QUnit.ok(!Linda.instanciaDe(bicicleta, Carro), "Instância de Bicicleta não é um Carro.");
			QUnit.ok(Linda.instanciaDe(carroQuebrado, CarroQuebrado), "Instância de CarroQuebrado é um CarroQuebrado.");
			QUnit.equal(veiculo.andar(), 0, "Instância de Veiculo pode executar métodos de Veiculo.");
			QUnit.equal(carro.andar(), 80, "Instância de Carro pode executar métodos de Veiculo.");
			QUnit.equal(bicicleta.andar(), 20, "Instância de Bicicleta pode executar métodos de Veiculo.");
			QUnit.equal(carroQuebrado.andar(), "Erro, carro não pode andar.", "CarroQuebrado pode sobreescrever métodos de Carro.");
			QUnit.equal(carroQuebrado.andarSuper(), 60, "CarroQuebrado pode chamar métodos da super classe.");
			QUnit.equal(veiculo.velocidade, 0, "Instância de Veiculo pode acessar propriedades de Veiculo.");
			QUnit.equal(carro.velocidade, 80, "Instância de Carro pode acessar propriedades de Veiculo.");
			QUnit.equal(bicicleta.velocidade, 20, "Instância de Bicicleta pode acessar propriedades de Veiculo.");
			QUnit.equal(carro.pneu, "Michelan", "Instância de Carro pode acessar propriedades de Carro.");
			QUnit.equal(carroQuebrado.pneu, "Bridgestone", "Instância de CarroQuebrado pode acessar propriedades de Carro.");
		});
	}());

	(function () {
		QUnit.module("Classe Singleton");

		QUnit.test("Criar classe Singleton CouchDb que estende a classe BancoDeDados.", function () {
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

			QUnit.ok(Linda.nulo(CouchDb.instanciaUnica), "CouchDb é iniciado sem instância");
			QUnit.ok(Linda.instanciaDe(CouchDb.instancia("linda"), CouchDb), "CouchDb.instancia() cria instância unica de CouchDb.");
			QUnit.ok(!Linda.nulo(CouchDb.instanciaUnica), "CouchDb é iniciado e passa a ter instância");
			QUnit.ok(Linda.instanciaDe(CouchDb.instancia, CouchDb), "CouchDb.instancia fornece instância unica de CouchDb.");
			QUnit.ok(Linda.instanciaDe(CouchDb.instancia, BancoDeDados), "CouchDb.instancia fornece instância unica de CouchDb que também é uma instância de BancoDeDados.");
			QUnit.equal(CouchDb.instancia.nomeDaBase, "linda", "Instância única de CouchDb tem acesso as propriedades.");
			QUnit.equal(CouchDb.instancia.fornecerNomeDaBase(), "linda", "Instância única de CouchDb tem acesso aos métodos.");
			QUnit.equal(CouchDb.instancia.nomeDoBanco, "CouchDB", "Instância única de CouchDb tem acesso as propriedades de BancoDeDados.");
			QUnit.equal(CouchDb.instancia.fornecerNomeDoBanco(), "CouchDB", "Instância única de CouchDb tem acesso aos métodos de BancoDeDados.");
		});
	}());
}());
