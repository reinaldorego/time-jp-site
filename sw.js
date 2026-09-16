const CACHE_NAME = "time-jp-v6-20260916";
const ARQUIVOS_ESSENCIAIS = [
  "./",
  "./index.html",
  "./data.js",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./img/logo-jp.png",
  "./img/equipe/direcao/Diretora - Silvia.jpg",
  "./img/equipe/direcao/Vice diretor - Adriano.jpg",
  "./img/equipe/educacao-especial/Educação Especial -Degiane.jpg",
  "./img/equipe/educacao-especial/Educação especial - Nadja.jpg",
  "./img/equipe/outros/Arlindo.jpg",
  "./img/equipe/outros/Camila.jpg",
  "./img/equipe/outros/Cley.jpg",
  "./img/equipe/outros/Elisa.jpg",
  "./img/equipe/outros/Joilton.jpg",
  "./img/equipe/outros/Simone.jpg",
  "./img/equipe/portaria/Seu Eduardo.jpg",
  "./img/equipe/professores/Prof. Ady - História.jpg",
  "./img/equipe/professores/Prof. Andreia - História.jpg",
  "./img/equipe/professores/Prof. André - Língua Portuguesa.jpg",
  "./img/equipe/professores/Prof. Andréia - História(1).jpg",
  "./img/equipe/professores/Prof. Andréia - História(2).jpg",
  "./img/equipe/professores/Prof. Andréia - História.jpg",
  "./img/equipe/professores/Prof. Ane - Língua Portuguesa.jpg",
  "./img/equipe/professores/Prof. Aparecida - Inglês.jpg",
  "./img/equipe/professores/Prof. Cavalcante - Geografia.jpg",
  "./img/equipe/professores/Prof. Cinthia Bello - Língua Portuguesa.jpg",
  "./img/equipe/professores/Prof. Cláudia Virginia - Língua Portuguesa.jpg",
  "./img/equipe/professores/Prof. Cláudia galvão - Matemática.jpg",
  "./img/equipe/professores/Prof. Dantas - Matemática.jpg",
  "./img/equipe/professores/Prof. Edir - Artes.jpg",
  "./img/equipe/professores/Prof. Elder - Língua Portuguesa.jpg",
  "./img/equipe/professores/Prof. Fernando - Ed. Física.jpg",
  "./img/equipe/professores/Prof. Fábio - Inglês.jpg",
  "./img/equipe/professores/Prof. Jack - Física(1).jpg",
  "./img/equipe/professores/Prof. Jack - Física.jpg",
  "./img/equipe/professores/Prof. Jardel - Geografia.jpg",
  "./img/equipe/professores/Prof. Juliana - Matemática.jpg",
  "./img/equipe/professores/Prof. Júlia - Artes(1).jpg",
  "./img/equipe/professores/Prof. Júlia - Artes.jpg",
  "./img/equipe/professores/Prof. Karla - Língua Portuguesa.jpg",
  "./img/equipe/professores/Prof. Leudiceia - Estudo Religioso.jpg",
  "./img/equipe/professores/Prof. Marcus - Biologia(1).jpg",
  "./img/equipe/professores/Prof. Marcus - Biologia.jpg",
  "./img/equipe/professores/Prof. Marcus - Geografia.jpg",
  "./img/equipe/professores/Prof. Marlúcia - Língua Portuguesa.jpg",
  "./img/equipe/professores/Prof. Ozias - Sociologia.jpg",
  "./img/equipe/professores/Prof. Reinaldo - Matemática.jpg",
  "./img/equipe/professores/Prof. Roberto - Geografia.jpg",
  "./img/equipe/professores/Prof. Roberto Cunha - Matemática.jpg",
  "./img/equipe/professores/Prof. Said - Física.jpg",
  "./img/equipe/professores/Prof. Teresinha - Biologia(1).jpg",
  "./img/equipe/professores/Prof. Teresinha - Biologia(2).jpg",
  "./img/equipe/professores/Prof. Teresinha - Biologia.jpg",
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
