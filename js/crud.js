import { APP_ID, REST_KEY, URL_BASE } from "./config.js";

const CABECALHOS = {
    "X-Parse-Application-Id": "xD3uK9pQMPIVVCmKThEJolzvGoH6UhJ80Jj3kVyt",
    "X-Parse-REST-API-Key": "JxQWlhcpF2LfVsF3DuTV8xwE6XHe7MHi0apyogcI",
    "Content-Type": "application/json"
};

export async function listarFilmes() {
    const resposta = await fetch(URL_BASE, { headers: CABECALHOS });

    if (!resposta.ok) {
        throw new Error("Falha ao listar");
    }

    const dados = await resposta.json();
    return dados.results;
}

export async function criarFilme(Filmes) {
    const resposta = await fetch(URL_BASE, {
        method: "POST",
        headers: CABECALHOS,
        body: JSON.stringify(Filmes)
    });

    if (!resposta.ok) {
        throw new Error("Falha ao criar");
    }

    return await resposta.json();
}

export async function excluirFilme(id) {
    const resposta = await fetch(`${URL_BASE}/${id}`, {
        method: "DELETE",
        headers: CABECALHOS
    });

    if (!resposta.ok) {
        throw new Error("Falha ao excluir");
    }
}

export async function editarFilme(id, dados) {
    const resposta = await fetch(`${URL_BASE}/${id}`, {
        method: "PUT",
        headers: CABECALHOS,
        body: JSON.stringify(dados)
    });

    if (!resposta.ok) {
        throw new Error("Falha ao editar");
    }

    return await resposta.json();
}