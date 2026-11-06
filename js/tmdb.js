import { TMDB_KEY } from "./config.js";

const URL_BUSCA = "https://api.themoviedb.org/3/search/movie";

export async function buscarFilmesTmdb(termo) {
    const parametros = new URLSearchParams({
        api_key: TMDB_KEY,
        query: termo,
        language: "pt-BR",
        include_adult: "false"
    });

    const resposta = await fetch(`${URL_BUSCA}?${parametros}`);

    if (!resposta.ok) {
        throw new Error("Falha na busca do TMDB");
    }

    const dados = await resposta.json();
    return dados.results;
}