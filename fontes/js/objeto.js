/*global Linda*/
/*global TipoDeObservacao*/

(function () {
	"use strict";

	Object.implementar({
		cadaPropriedade: function (iterador, escopo) {
			iterador = iterador.vincularEscopo(escopo);
			var propriedades = this.fornecerPropriedades();
			for (var indice = 0, tamanho = propriedades.length; indice < tamanho; indice++) {
				var chave = propriedades[indice];
				iterador(this[chave], chave);
			}
		},

		cadaPropriedadeEnumeravel: function (iterador, escopo) {
			iterador = iterador.vincularEscopo(escopo);
			for (var chave in this) {
				iterador(this[chave], chave);
			}
		},

		cadaPropriedadeInvisivel: function (iterador, escopo) {
			iterador = iterador.vincularEscopo(escopo);
			var propriedadesInvisiveis = this.fornecerPropriedadesInvisiveis();
			for (var indice = 0, tamanho = propriedadesInvisiveis.length; indice < tamanho; indice++) {
				var chave = propriedadesInvisiveis[indice];
				iterador(this[chave], chave);
			}
		},

		cadaPropriedadePropria: function (iterador, escopo) {
			iterador = iterador.vincularEscopo(escopo);
			var propriedadesProprias = this.fornecerPropriedadesProprias();
			for (var indice = 0, tamanho = propriedadesProprias.length; indice < tamanho; indice++) {
				var chave = propriedadesProprias[indice];
				iterador(this[chave], chave);
			}
		},

		cadaPropriedadePropriaEnumeravel: function (iterador, escopo) {
			iterador = iterador.vincularEscopo(escopo);
			var propriedadesPropriasEnumeraveis = this.fornecerPropriedadesPropriasEnumeraveis();
			for (var indice = 0, tamanho = propriedadesPropriasEnumeraveis.length; indice < tamanho; indice++) {
				var chave = propriedadesPropriasEnumeraveis[indice];
				iterador(this[chave], chave);
			}
		},

		cadaPropriedadePropriaInvisivel: function (iterador, escopo) {
			iterador = iterador.vincularEscopo(escopo);
			var propriedadesPropriasInvisiveis = this.fornecerPropriedadesPropriasInvisiveis();
			for (var indice = 0, tamanho = propriedadesPropriasInvisiveis.length; indice < tamanho; indice++) {
				var chave = propriedadesPropriasInvisiveis[indice];
				iterador(this[chave], chave);
			}
		},

		cadaPropriedadeHerdada: function (iterador, escopo) {
			iterador = iterador.vincularEscopo(escopo);
			var propriedadesHerdadas = this.fornecerPropriedadesHerdadas();
			for (var indice = 0, tamanho = propriedadesHerdadas.length; indice < tamanho; indice++) {
				var chave = propriedadesHerdadas[indice];
				iterador(this[chave], chave);
			}
		},

		cadaPropriedadeHerdadaEnumeravel: function (iterador, escopo) {
			iterador = iterador.bind(escopo);
			for (var chave in this) {
				if (!this.possuiPropriedadePropriaEnumeravel(chave)) {
					iterador(this[chave], chave);
				}
			}
		},

		cadaPropriedadeHerdadaInvisivel: function (iterador, escopo) {
			iterador = iterador.vincularEscopo(escopo);
			var propriedadesHerdadasInvisiveis = this.fornecerPropriedadesHerdadasInvisiveis();
			for (var indice = 0, tamanho = propriedadesHerdadasInvisiveis.length; indice < tamanho; indice++) {
				var chave = propriedadesHerdadasInvisiveis[indice];
				iterador(this[chave], chave);
			}
		},

		fornecerPropriedades: function () {
			var propriedades = this.fornecerPropriedadesProprias();
			var prototipo = this.fornecerPrototipo();
			while (!Linda.nulo(prototipo)) {
				propriedades.push.aplicarComEscopo(propriedades, prototipo.fornecerPropriedadesProprias());
				prototipo = prototipo.fornecerPrototipo();
			}
			return propriedades;
		},

		fornecerPropriedadesEnumeraveis: function () {
			var propriedadesEnumeraveis = [];
			for (var propriedade in this) {
				propriedadesEnumeraveis.push(propriedade);
			}
			return propriedadesEnumeraveis;
		},

		fornecerPropriedadesInvisiveis: function () {
			var propriedades = this.fornecerPropriedades();
			var propriedadesInvisiveis = [];
			for (var indice = 0, tamanho = propriedades.length; indice < tamanho; indice++) {
				var propriedade = propriedades[indice];
				if (!this.possuiPropriedadeEnumeravel(propriedade)) {
					propriedadesInvisiveis.push(propriedade);
				}
			}
			return propriedadesInvisiveis;
		},

		fornecerPropriedadesProprias: function () {
			return Object.getOwnPropertyNames(this);
		},

		fornecerPropriedadesPropriasEnumeraveis: function () {
			return Object.keys(this);
		},

		fornecerPropriedadesPropriasInvisiveis: function () {
			var propriedadesProprias = this.fornecerPropriedadesProprias();
			var propriedadesPropriasInvisiveis = [];
			for (var indice = 0, tamanho = propriedadesProprias.length; indice < tamanho; indice++) {
				var propriedadePropria = propriedadesProprias[indice];
				if (!this.possuiPropriedadePropriaEnumeravel(propriedadePropria)) {
					propriedadesPropriasInvisiveis.push(propriedadePropria);
				}
			}
			return propriedadesPropriasInvisiveis;
		},

		fornecerPropriedadesHerdadas: function () {
			var propriedadesHerdadas = [];
			var prototipo = this.fornecerPrototipo();
			while (!Linda.nulo(prototipo)) {
				propriedadesHerdadas.push.aplicarComEscopo(propriedadesHerdadas, prototipo.fornecerPropriedadesProprias());
				prototipo = prototipo.fornecerPrototipo();
			}
			return propriedadesHerdadas;
		},

		fornecerPropriedadesHerdadasEnumeraveis: function () {
			var propriedadesHerdadasEnumeraveis = [];
			for (var propriedadeEnumeravel in this) {
				if (!this.possuiPropriedadePropriaEnumeravel(propriedadeEnumeravel)) {
					propriedadesHerdadasEnumeraveis.push(propriedadeEnumeravel);
				}
			}
			return propriedadesHerdadasEnumeraveis;
		},

		fornecerPropriedadesHerdadasInvisiveis: function () {
			var propriedadesHerdadas = this.fornecerPropriedadesHerdadas();
			var propriedadesHerdadasInvisiveis = [];
			for (var indice = 0, tamanho = propriedadesHerdadas.length; indice < tamanho; indice++) {
				var propriedadeHerdada = propriedadesHerdadas[indice];
				if (!this.possuiPropriedadeHerdadaEnumeravel(propriedadeHerdada)) {
					propriedadesHerdadasInvisiveis.push(propriedadeHerdada);
				}
			}
			return propriedadesHerdadasInvisiveis;
		},

		possuiPropriedade: function (propriedade) {
			return (propriedade in this);
		},

		possuiPropriedadeEnumeravel: function (propriedade) {
			for (var minhaPropriedade in this) {
				if (minhaPropriedade === propriedade) {
					return true;
				}
			}
			return false;
		},

		possuiPropriedadeInvisivel: function (propriedade) {
			return (this.possuiPropriedade(propriedade) && !this.possuiPropriedadeEnumeravel(propriedade));
		},

		possuiPropriedadePropria: function (propriedade) {
			return this.hasOwnProperty(propriedade);
		},

		possuiPropriedadePropriaEnumeravel: function (propriedade) {
			return this.propertyIsEnumerable(propriedade);
		},

		possuiPropriedadePropriaInvisivel: function (propriedade) {
			return (this.possuiPropriedadePropria(propriedade) && !this.possuiPropriedadePropriaEnumeravel(propriedade));
		},

		possuiPropriedadeHerdada: function (propriedade) {
			return (this.possuiPropriedade(propriedade) && !this.possuiPropriedadePropria(propriedade));
		},

		possuiPropriedadeHerdadaEnumeravel: function (propriedade) {
			return (this.possuiPropriedadeEnumeravel(propriedade) && !this.possuiPropriedadePropriaEnumeravel(propriedade));
		},

		possuiPropriedadeHerdadaInvisivel: function (propriedade) {
			return (this.possuiPropriedadeHerdada(propriedade) && !this.possuiPropriedadeHerdadaEnumeravel(propriedade));
		},

		instanciaDe: function (tipo) {
			if (!Linda.tipoDe(tipo, Function)) {
				return false;
			}
			return tipo.prototype.prototipoDe(this);
		},

		prototipadoDe: function (prototipoDoTipo) {
			var prototipoDoObjeto = this.fornecerPrototipo();
			while (!Linda.nulo(prototipoDoObjeto) && prototipoDoObjeto !== prototipoDoTipo) {
				prototipoDoObjeto = prototipoDoObjeto.fornecerPrototipo();
			}
			return (prototipoDoObjeto === prototipoDoTipo);
		},

		prototipoDe: function (objeto) {
			var prototipoDoObjeto = objeto.fornecerPrototipo();
			while (!Linda.nulo(prototipoDoObjeto) && prototipoDoObjeto !== this) {
				prototipoDoObjeto = prototipoDoObjeto.fornecerPrototipo();
			}
			return (prototipoDoObjeto === this);
		},

		fornecerPrototipo: function () {
			return Object.getPrototypeOf(this);
		},

		fornecerDescritorDePropriedade: function (propriedade) {
			var descritorOriginal = Object.getOwnPropertyDescriptor(this, propriedade);
			var descritor = {};
			this.privadoFornecerDescritorDePropriedade(descritor, descritorOriginal.value, "valor");
			this.privadoFornecerDescritorDePropriedade(descritor, descritorOriginal.get, "fornecer");
			this.privadoFornecerDescritorDePropriedade(descritor, descritorOriginal.set, "fixar");
			this.privadoFornecerDescritorDePropriedade(descritor, descritorOriginal.writable, "gravavel");
			this.privadoFornecerDescritorDePropriedade(descritor, descritorOriginal.enumerable, "enumeravel");
			this.privadoFornecerDescritorDePropriedade(descritor, descritorOriginal.configurable, "configuravel");
			return descritor;
		},

		privadoFornecerDescritorDePropriedade: function (descritor, propriedade, chave) {
			if (!Linda.indefinido(propriedade)) {
				descritor[chave] = propriedade;
			}
		},

		definirPropriedade: function (atributo, definicao) {
			var propriedades = {};
			this.privadoDefinirPropriedade(propriedades, "value", definicao.valor);
			this.privadoDefinirPropriedade(propriedades, "get", definicao.fornecer);
			this.privadoDefinirPropriedade(propriedades, "set", definicao.fixar);
			this.privadoDefinirPropriedade(propriedades, "writable", definicao.gravavel);
			this.privadoDefinirPropriedade(propriedades, "enumerable", definicao.enumeravel);
			this.privadoDefinirPropriedade(propriedades, "configurable", definicao.configuravel);
			Object.defineProperty(this, atributo, propriedades);
		},

		definirPropriedades: function (definicoes) {
			for (var indice = 0, propriedades = Object.getOwnPropertyNames(definicoes), tamanho = propriedades.length; indice < tamanho; indice++) {
				var propriedade = propriedades[indice];
				this.definirPropriedade(propriedade, definicoes[propriedade]);
			}
		},

		privadoDefinirPropriedade: function (propriedades, chave, valor) {
			if (!Linda.indefinido(valor)) {
				propriedades[chave] = valor;
			}
		},

		fundir: function (outro) {
			for (var chave in outro) {
				if (outro.possuiPropriedadePropria(chave)) {
					this[chave] = outro[chave];
				}
			}
		},

		observar: function (tratador, propriedade, tipoDeObservacao) {
			Object.observe(this, function (observacoes) {
				for (var indice = 0, tamanho = observacoes.length; indice < tamanho; indice++) {
					var observacao = observacoes[indice];
					var observacaoDesejada = (observacao.type === tipoDeObservacao || Linda.nuloOuIndefinido(tipoDeObservacao));
					var propriedadeDesejada = (observacao.name === propriedade || Linda.nuloOuIndefinido(propriedade));
					if (observacaoDesejada && propriedadeDesejada) {
						tratador(observacao.object, observacao.name, observacao.type, observacao.oldValue);
					}
				}
			});
		},

		observarAtualizacao: function (tratador, propriedade) {
			this.observar(tratador, propriedade, TipoDeObservacao.ATUALIZACAO);
		},

		observarCriacao: function (tratador, propriedade) {
			this.observar(tratador, propriedade, TipoDeObservacao.CRIACAO);
		},

		observarReconfiguracao: function (tratador, propriedade) {
			this.observar(tratador, propriedade, TipoDeObservacao.RECONFIGURACAO);
		},

		observarRemocao: function (tratador, propriedade) {
			this.observar(tratador, propriedade, TipoDeObservacao.REMOCAO);
		},

		desobservar: function (tratador) {
			Object.unobserve(this, tratador);
		},

		removerPropriedade: function (propriedade) {
			delete this[propriedade];
		}
	});

	Object.implementar({
		paraCada: Object.cadaPropriedadePropriaEnumeravel
	});
}(this));
