const CACHE_NAME = "time-jp-v13-20260917";

const ARQUIVOS_ESSENCIAIS = [
  "./",
  "./index.html",
  "./data.js",
  "./manifest.json",
  "./favicon.svg",
  "./favicon-32.png",
  "./icon-192.png",
  "./icon-512.png",
  "./img/logo-jp.png",
  "./img/equipe/direcao/Diretora - Silvia.png",
  "./img/equipe/direcao/Vice diretor - Adriano.png",
  "./img/equipe/coordenacao/Coordenação - Cinthya Guerra.png",
  "./img/equipe/coordenacao/Coordenação - Elaine.png",
  "./img/equipe/educacao-especial/Educação Especial -Degiane.png",
  "./img/equipe/educacao-especial/Educação especial - Nadja.png",
  "./img/equipe/educacao-infantil/Educação Infantil - Silvio.png",
  "./img/equipe/portaria/Seu Eduardo.png",
  "./img/equipe/apoio/Arlindo.png",
  "./img/equipe/apoio/Camila.png",
  "./img/equipe/apoio/Cley.png",
  "./img/equipe/apoio/Eliza.png",
  "./img/equipe/apoio/Joilton.png",
  "./img/equipe/apoio/Simone.png",
  "./img/equipe/secretaria/Secretaria - Rochinha.png",
  "./img/equipe/secretaria/Secretaria Rilze.png",
  "./img/equipe/secretaria/Secretária Giselle.png",
  "./img/equipe/secretaria/Secretária Jessica.png",
  "./img/equipe/psicologia/Psicólogo Virgílhio_.png",
  "./img/equipe/terceirizada/1789147615252.png",
  "./img/equipe/professores/Prof. Abel - Educação Física.png",
  "./img/equipe/professores/Prof. Ady - História.png",
  "./img/equipe/professores/Prof. André - Língua Portuguesa.png",
  "./img/equipe/professores/Prof. Andréia - História.png",
  "./img/equipe/professores/Prof. Ane - Língua Portuguesa.png",
  "./img/equipe/professores/Prof. Aparecida - Inglês.png",
  "./img/equipe/professores/Prof. Cavalcante - Geografia.png",
  "./img/equipe/professores/Prof. Cinthia Bello - Língua Portuguesa.png",
  "./img/equipe/professores/Prof. Cláudia Virginia - Língua Portuguesa.png",
  "./img/equipe/professores/Prof. Cláudia galvão - Matemática.png",
  "./img/equipe/professores/Prof. Dantas - Matemática.png",
  "./img/equipe/professores/Prof. Edir - Artes.png",
  "./img/equipe/professores/Prof. Fernando - Ed. Física.png",
  "./img/equipe/professores/Prof. Fábio - Inglês.png",
  "./img/equipe/professores/Prof. Helder - Língua Portuguesa.png",
  "./img/equipe/professores/Prof. Jack - Química.png",
  "./img/equipe/professores/Prof. Jardel - Geografia.png",
  "./img/equipe/professores/Prof. Juliana - Matemática.png",
  "./img/equipe/professores/Prof. Júlia - Artes.png",
  "./img/equipe/professores/Prof. Karla - Língua Portuguesa.png",
  "./img/equipe/professores/Prof. Lene - Filosofia.png",
  "./img/equipe/professores/Prof. Leodiceia - Estudo Religioso.png",
  "./img/equipe/professores/Prof. Marcus - Geografia.png",
  "./img/equipe/professores/Prof. Marlucia - Língua Portuguesa.png",
  "./img/equipe/professores/Prof. Ozias - Sociologia.png",
  "./img/equipe/professores/Prof. Reinaldo - Matemática.png",
  "./img/equipe/professores/Prof. Roberto - Geografia.png",
  "./img/equipe/professores/Prof. Roberto Cunha - Matemática.png",
  "./img/equipe/professores/Prof. Said - Física.png",
  "./img/equipe/professores/Prof. Teresinha - Biologia.png",
  "./img/equipe/professores/Prof. Valter - Matemática.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ARQUIVOS_ESSENCIAIS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((chaves) =>
      Promise.all(
        chaves
          .filter((chave) => chave !== CACHE_NAME)
          .map((chave) => caches.delete(chave))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const requisicao = event.request;
  if (requisicao.method !== "GET") return;

  const url = new URL(requisicao.url);
  if (url.origin !== self.location.origin) return;

  if (requisicao.mode === "navigate") {
    event.respondWith(
      fetch(requisicao)
        .then((resposta) => {
          const copia = resposta.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put("./index.html", copia));
          return resposta;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  event.respondWith(
    caches.match(requisicao).then((emCache) => {
      const daRede = fetch(requisicao)
        .then((resposta) => {
          if (resposta.ok) {
            const copia = resposta.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(requisicao, copia));
          }
          return resposta;
        })
        .catch(() => emCache);

      return emCache || daRede;
    })
  );
});
