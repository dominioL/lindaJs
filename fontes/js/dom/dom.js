/*global Document*/
/*global Element*/
/*global HTMLCollection*/
/*global Location*/
/*global Node*/
/*global NodeList*/
/*global Window*/

(function (contexto) {
	"use strict";

	var Linda = contexto.Linda;
	var Classe = contexto.Classe;

	var Dom = Classe.criarSingleton({
		inicializar: function () {
			this.janela = window;
			this.documento = this.janela.document;
			this.localizacao = this.janela.location;
			this.historico = this.janela.history;
		},

		carregarComponentes: function () {
			this.janelaDom = this.encapsular(this.janela);
			this.documentoDom = this.encapsular(this.documento);
		},

		encapsular: function (elementoDom) {
			var Documento = contexto.Documento;
			var Elemento = contexto.Elemento;
			var Janela = contexto.Janela;
			var Nodo = contexto.Nodo;
			var Notificavel = contexto.Notificavel;
			if (Linda.instanciaDe(elementoDom, NodeList)) {
				return new ListaDom(elementoDom);
			} else if (Linda.instanciaDe(elementoDom, HTMLCollection)) {
				return new ListaDom(elementoDom);
			} else if (Linda.instanciaDe(elementoDom, Element)) {
				return new Elemento(elementoDom);
			} else if (Linda.instanciaDe(elementoDom, Document)) {
				return new Documento(elementoDom);
			} else if (Linda.instanciaDe(elementoDom, Node)) {
				return new Nodo(elementoDom);
			} else if (Linda.instanciaDe(elementoDom, Window)) {
				return new Janela(elementoDom);
			} else if (Linda.instanciaDe(elementoDom, Location)) {
				return new Localizacao(elementoDom);
			} else if (Linda.instanciaDe(elementoDom, History)) {
				return new Historico(elementoDom);
			} else {
				return new Notificavel(elementoDom);
			}
		},

		extrair: function (suplementoDom) {
			return suplementoDom.elementoDom;
		},

		$: function (seletorOuElemento) {
			if (Linda.instanciaDe(seletorOuElemento, String)) {
				return this.documentoDom.selecionar(seletorOuElemento);
			}
			return this.encapsular(seletorOuElemento);
		},

		$$: function (seletorOuElemento) {
			if (Linda.instanciaDe(seletorOuElemento, String)) {
				return this.documentoDom.selecionarTodos(seletorOuElemento);
			}
			return this.encapsular(seletorOuElemento);
		}
	}).instancia();

	var ListaDom = Classe.criar({
		inicializar: function (elementosDom) {
			this.elementosDom = elementosDom;
			this.elementoDom = elementosDom;
		},

		paraCada: function (tratador, escopo) {
			for (var indice = 0; indice < this.elementosDom.length; indice++) {
				tratador.chamarComEscopo(escopo, Dom.encapsular(Dom.extrair(this).item(indice), indice));
			}
		}
	});

	var Localizacao = Classe.criar({
		inicializar: function (elementoDom) {
			Notificavel.prototipo.inicializar.chamarComEscopo(this, elementoDom);
		},

		fornecerUri: function () {
			return String.concatenar(this.protocolo, "://", this.endereco, this.caminho, this.ancora, this.busca);
		},

		fornecerUriComPorta: function () {
			return String.concatenar(this.protocolo, "://", this.endereco, ":", this.porta, this.caminho, this.ancora, this.busca);
		}
	});

	Localizacao.prototipo.definirPropriedades({
		ancora: {
			fornecer: function () {
				return Dom.extrair(this).hash;
			}
		},

		busca: {
			fornecer: function () {
				return Dom.extrair(this).search;
			}
		},

		caminho: {
			fornecer: function () {
				return Dom.extrair(this).pathname;
			}
		},

		endereco: {
			fornecer: function () {
				return Dom.extrair(this).hostname;
			}
		},

		porta: {
			fornecer: function () {
				var elemento = Dom.extrair(this);
				return (elemento.port === "") ? 80 : elemento.port.paraInteiro();
			}
		},

		protocolo: {
			fornecer: function () {
				return Dom.extrair(this).protocol.substituir(/:$/, "");
			}
		}
	});

	var Historico = Classe.criar({
		inicializar: function (elementoDom) {
			Notificavel.prototipo.inicializar.chamarComEscopo(this, elementoDom);
		},

		adicionarEstado: function (uri, estado, titulo) {
			if (!Linda.existe(titulo)) {
				titulo = Dom.$(documento).titulo;
			}
			Dom.extrair(this).pushState(estado, titulo, uri);
		},

		avancar: function () {
			Dom.extrair(this).forward();
		},

		ir: function (distancia) {
			Dom.extrair(this).go(uri);
		},

		substituirEstado: function (uri, estado, titulo) {
			if (!Linda.existe(titulo)) {
				titulo = Dom.$(documento).titulo;
			}
			Dom.extrair(this).replaceState(estado, titulo, uri);
		},

		voltar: function () {
			Dom.extrair(this).back();
		}
	});

	Historico.prototipo.definirPropriedades({
		estado: {
			fornecer: function () {
				return Dom.extrair(this).state;
			}
		}
	});

	contexto.addEventListener("load", function () {
		Dom.carregarComponentes();
	});

	contexto.Dom = Dom;
	contexto.ListaDom = ListaDom;
	contexto.Localizacao = Localizacao;
	contexto.Localizacao = Historico;
	contexto.documento = Dom.documento;
	contexto.localizacao = Dom.localizacao;
	contexto.historico = Dom.historico;
	contexto.janela = Dom.janela;
}(this));
