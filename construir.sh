#!/bin/bash

projeto=Linda
pacoteDoProjeto=linda

bibliotecas=bibliotecas
binarios=binarios
construcao=construcao
documentacao=documentacao
fontes=fontes
recursos=recursos
testes=testes
integracao=/var/www/$pacoteDoProjeto

bibliotecasCss=$bibliotecas/css
bibliotecasJs=$bibliotecas/js
binariosCss=$binarios/css
binariosHtml=$binarios/html
binariosJs=$binarios/js
fontesHtml=$fontes/html
fontesJs=$fontes/js
testesHtml=$testes/html
testesJs=$testes/js

limpar() {
	echo ":limpar"
	rm -rf $binarios
	rm -rf $construcao
}

criarEstrutura() {
	echo ":criarEstrutura"
	mkdir -p $bibliotecasCss
	mkdir -p $bibliotecasJs
	mkdir -p $binariosCss
	mkdir -p $binariosHtml
	mkdir -p $binariosJs
	mkdir -p $construcao
	mkdir -p $fontesHtml
	mkdir -p $fontesJs
	mkdir -p $testesHtml
	mkdir -p $testesJs
}

adicionarBibliotecas() {
	echo ":adicionarBibliotecas"
	cp -rf ../verificaJs/construcao/verifica.css $bibliotecasCss
	cp -rf ../verificaJs/construcao/verifica.js $bibliotecasJs
	cp -rf ../verificaJs/construcao/jsHint.js $bibliotecasJs
}

compilar() {
	limpar
	criarEstrutura
	adicionarBibliotecas
	echo ":compilar"
	cp -rf $bibliotecasCss/* $binariosCss
	cp -rf $fontesHtml/* $testesHtml/* $binariosHtml
	cp -rf $bibliotecasJs/* $fontesJs/* $testesJs/* $binariosJs
}

construir() {
	compilar
	echo ":construir"
	cat $binariosJs/linda.js > $construcao/$pacoteDoProjeto.js
	cat $binariosJs/funcao.js >> $construcao/$pacoteDoProjeto.js
	cat $binariosJs/objeto.js >> $construcao/$pacoteDoProjeto.js
	cat $binariosJs/lista.js >> $construcao/$pacoteDoProjeto.js
	cat $binariosJs/texto.js >> $construcao/$pacoteDoProjeto.js
	cat $binariosJs/numero.js >> $construcao/$pacoteDoProjeto.js
	cat $binariosJs/prototipacao.js >> $construcao/$pacoteDoProjeto.js
	cat $binariosJs/enumeracoes.js >> $construcao/$pacoteDoProjeto.js
	cat $binariosJs/http.js >> $construcao/$pacoteDoProjeto.js
	cat $binariosJs/ambiente/ambiente.js >> $construcao/$pacoteDoProjeto.js
	cat $binariosJs/ambiente/elemento.js >> $construcao/$pacoteDoProjeto.js
	cat $binariosJs/ambiente/tratadores.js >> $construcao/$pacoteDoProjeto.js
	cat $binariosJs/funcionalidades.js >> $construcao/$pacoteDoProjeto.js
}

testar() {
	construir
	echo ":testar"
	chromium-browser `find $binariosHtml -name teste*.html` --allow-file-access-from-files
}

depurar() {
	construir
	echo ":depurar"
	chromium-browser $binariosHtml/testeDeCodigo.html --allow-file-access-from-files
}

executar() {
	construir
	echo ":executar"
	chromium-browser $binariosHtml/$pacoteDoProjeto.html
}

integrar() {
	construir
	echo ":integrar"
	sudo rm -rf $integracao
	sudo mkdir -p $integracao
	sudo cp -r $binarios/* $integracao
}

echo :$pacoteDoProjeto
if [ -n "$1" ]
then
	$1
else
	construir
fi
