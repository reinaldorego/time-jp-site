# TIME JP

Site público, responsivo e instalável para valorizar os profissionais da Escola Jarbas Passarinho.

**Assinatura:** Heróis que fazem a escola acontecer  
**Concepção e desenvolvimento:** Reinaldo Rêgo

## Estado desta versão

Esta entrega é uma **versão de homologação interna**. As 48 ilustrações individuais recebidas, organizadas por departamento em `img/equipe/`, já estão ligadas às fichas da galeria. Uma imagem de montagem foi mantida fora da galeria por não representar um único personagem. Antes de publicar, faça a conferência final com cada pessoa retratada e valide nome, função, departamento, setor, frase e imagem.

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
  foto: "img/nome-do-arquivo.jpg",
  textoAlternativo: "Descrição objetiva da ilustração"
}
```

Categorias existentes: `professores`, `coordenacao`, `direcao`, `educacao_especial`, `copa`, `apoio`, `secretaria` e `outros`.

## Estrutura

- `index.html`: interface, estilos e comportamento.
- `data.js`: textos institucionais, categorias e fichas.
- `manifest.json`: instalação do site como aplicativo.
- `sw.js`: funcionamento offline.
- `img/`: logo, imagens legadas de referência e os cartoons organizados em `img/equipe/` por departamento.

## Direção visual desta versão

O topo recebeu uma composição editorial inspirada em páginas de desafio criativo: título em grande escala, hierarquia tipográfica por níveis, selo de acervo, textura pontilhada e princípios do TIME JP em destaque. A identidade brutalista foi preservada com papel quadriculado, bordas espessas, sombras sólidas e cards quadrados.

O projeto usa apenas HTML, CSS e JavaScript, sem bibliotecas ou processo de compilação. As fontes `Baloo 2`, `Inter Tight` e `JetBrains Mono` são carregadas do Google Fonts quando há conexão; em modo offline entram as fontes de reserva do sistema sem comprometer a navegação.
