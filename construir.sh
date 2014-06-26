#!/bin/bash

projeto=Linda
pacoteDoProjeto=linda

css=css
html=html
js=js
construcao=construcao

limpar() {
	echo ":limpar"
	rm -rf ${construcao}
}

criarEstrutura() {
	echo ":criarEstrutura"
	mkdir -p ${css}
	mkdir -p ${html}
	mkdir -p ${js}
	mkdir -p ${construcao}
}

adicionarBibliotecas() {
	echo ":adicionarBibliotecas"
	cp -rf ../verificaJs/construcao/verifica.css ${css}
	cp -rf ../verificaJs/construcao/verifica.js ${js}/bibliotecas
	cp -rf ../verificaJs/construcao/jsHint.js ${js}/bibliotecas
	cp -rf ../nodoWeb/construcao/nodoWeb.js ${js}/bibliotecas
}

construir() {
	limpar
	criarEstrutura
	adicionarBibliotecas
	echo ":construir"
	cat ${js}/linda.js > ${construcao}/${pacoteDoProjeto}.js
	cat ${js}/funcao.js >> ${construcao}/${pacoteDoProjeto}.js
	cat ${js}/objeto.js >> ${construcao}/${pacoteDoProjeto}.js
	cat ${js}/lista.js >> ${construcao}/${pacoteDoProjeto}.js
	cat ${js}/texto.js >> ${construcao}/${pacoteDoProjeto}.js
	cat ${js}/numero.js >> ${construcao}/${pacoteDoProjeto}.js
	cat ${js}/prototipacao.js >> ${construcao}/${pacoteDoProjeto}.js
	cat ${js}/enumeracoes.js >> ${construcao}/${pacoteDoProjeto}.js
	cat ${js}/dom/dom.js >> ${construcao}/${pacoteDoProjeto}.js
	cat ${js}/dom/notificavel.js >> ${construcao}/${pacoteDoProjeto}.js
	cat ${js}/dom/janela.js >> ${construcao}/${pacoteDoProjeto}.js
	cat ${js}/dom/nodo.js >> ${construcao}/${pacoteDoProjeto}.js
	cat ${js}/dom/documento.js >> ${construcao}/${pacoteDoProjeto}.js
	cat ${js}/dom/elemento.js >> ${construcao}/${pacoteDoProjeto}.js
	cat ${js}/http.js >> ${construcao}/${pacoteDoProjeto}.js
	cat ${js}/funcionalidades.js >> ${construcao}/${pacoteDoProjeto}.js
}

construirNode() {
	limpar
	criarEstrutura
	adicionarBibliotecas
	echo ":construirSemDom"
	cat ${js}/linda.js > ${construcao}/${pacoteDoProjeto}.js
	cat ${js}/funcao.js >> ${construcao}/${pacoteDoProjeto}.js
	cat ${js}/objeto.js >> ${construcao}/${pacoteDoProjeto}.js
	cat ${js}/lista.js >> ${construcao}/${pacoteDoProjeto}.js
	cat ${js}/texto.js >> ${construcao}/${pacoteDoProjeto}.js
	cat ${js}/numero.js >> ${construcao}/${pacoteDoProjeto}.js
	cat ${js}/prototipacao.js >> ${construcao}/${pacoteDoProjeto}.js
	cat ${js}/enumeracoes.js >> ${construcao}/${pacoteDoProjeto}.js
}

testar() {
	echo ":testar"
	testes=`find ${html}/testes -name teste*.html`
	testes=`echo ${testes} | sed -e s@html/@http://localhost:7000/html/@g`
	chromium-browser ${testes} --allow-file-access-from-files
}

executar() {
	construir
	echo ":executar"
	chromium-browser ${html}/${pacoteDoProjeto}.html
}

integrar() {
	construir
	echo ":integrar"
	node ${js}/bibliotecas/nodoWeb.js
}

echo :${pacoteDoProjeto}
if [ -n "$1" ]
then
	$1
else
	construir
fi
