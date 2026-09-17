# TIME JP

Site público, responsivo e instalável para valorizar os profissionais da Escola Jarbas Passarinho.

**Assinatura:** Heróis que fazem a escola acontecer  
**Concepção e desenvolvimento:** Reinaldo Rêgo

## Estado desta versão

Esta entrega é uma **versão de homologação interna**. Os 51 cartoons individuais recebidos estão organizados por departamento em `img/equipe/` e ligados às fichas da galeria. Antes da publicação definitiva, faça a conferência final com cada pessoa retratada e valide nome, função, departamento, setor, frase e imagem.

Antes da publicação oficial:

1. confirme com a direção a nomenclatura oficial da escola;
2. confirme que cada ficha corresponde à pessoa retratada e ao consentimento registrado;
3. obtenha a aprovação final de cada pessoa sobre nome, função, setor, frase e imagem;
4. revise as imagens para evitar símbolos de personagens ou marcas comerciais; algumas ilustrações recebidas exibem elementos que precisam ser substituídos antes da publicação pública;
5. altere `modoDemonstracao` para `false` em `data.js`;
6. atualize a versão do cache em `sw.js`.

## Como visualizar

O service worker funciona em `localhost` ou em uma hospedagem HTTPS. Na pasta do projeto, execute:

```bash
python3 -m http.server 8080
```

Depois acesse `http://localhost:8080`.

## Como cadastrar uma pessoa

Edite o array `EQUIPE` em `data.js`. Cada ficha segue esta estrutura:

```js
{
  id: "identificador-unico",
  nome: "Nome autorizado para exibição",
  nomeHeroico: "Título aprovado pela pessoa",
  funcao: "Função autorizada",
  categoria: "professores",
  setor: "Setor ou atuação autorizada",
  contribuicao: "Força que move a escola",
  frase: "Frase aprovada",
  foto: "img/equipe/area/nome-do-arquivo.png",
  textoAlternativo: "Descrição objetiva da ilustração"
}
```

Categorias existentes: `professores`, `coordenacao`, `direcao`, `educacao_especial`, `educacao_infantil`, `apoio`, `secretaria` e `psicologia`.

## Estrutura

- `index.html`: interface, estilos e comportamento.
- `data.js`: textos institucionais, categorias e fichas.
- `manifest.json`: instalação do site como aplicativo.
- `sw.js`: funcionamento offline.
- `img/`: logo e os cartoons organizados em `img/equipe/` por departamento.
- `favicon.svg`, `favicon-32.png`, `icon-192.png` e `icon-512.png`: identidade visual usada no navegador e na instalação como aplicativo.

## Direção visual desta versão

A faixa superior usa fundo preto, textura pontilhada laranja e o slogan institucional em branco. O herói principal usa o palco vermelho contínuo, com pontilhado escuro, divisória laranja e título cartoon de alto contraste, branca com contorno escuro e sombra laranja. O título foi redimensionado para manter a palavra `ACONTECER` inteira em telas pequenas e grandes. A galeria permanece com fundo vermelho e o menu de filtros em cinza. O botão flutuante com o cartoon do Prof. Reinaldo exibe `ADS / 2026`: leva ao rodapé e, quando ele está visível, retorna ao topo. A identidade brutalista foi preservada com papel quadriculado, bordas espessas, sombras sólidas, cards quadrados e enquadramento padronizado para os retratos.

O projeto usa apenas HTML, CSS e JavaScript, sem bibliotecas ou processo de compilação. As fontes `Bowlby One SC`, `Baloo 2`, `Inter Tight` e `JetBrains Mono` são carregadas do Google Fonts quando há conexão; em modo offline entram as fontes de reserva do sistema sem comprometer a navegação.
