#!/bin/bash

fontes=fontes
fontesHtml=${fontes}/html
fontesJs=${fontes}/js
bibliotecas=bibliotecas
bibliotecaQUnit=${bibliotecas}/qUnit
binarios=binarios
binariosJs=${binarios}/js
binarioLindaJs=${binariosJs}/linda.js

echo ":limpar"
rm -rf ${binarios}

echo ":criarDiretorios"
mkdir -p ${fontes}
mkdir -p ${fontesHtml}
mkdir -p ${fontesJs}
mkdir -p ${bibliotecas}
mkdir -p ${binarios}
mkdir -p ${binariosJs}

echo ":compilarFontesJs"
cat ${fontesJs}/linda.js > ${binarioLindaJs}
cat ${fontesJs}/funcao.js >> ${binarioLindaJs}
cat ${fontesJs}/objeto.js >> ${binarioLindaJs}
cat ${fontesJs}/lista.js >> ${binarioLindaJs}
cat ${fontesJs}/texto.js >> ${binarioLindaJs}
cat ${fontesJs}/numero.js >> ${binarioLindaJs}
cat ${fontesJs}/prototipo.js >> ${binarioLindaJs}
cat ${fontesJs}/enumeracoes.js >> ${binarioLindaJs}
cat ${fontesJs}/utilidades.js >> ${binarioLindaJs}
cat ${fontesJs}/funcionalidades.js >> ${binarioLindaJs}

