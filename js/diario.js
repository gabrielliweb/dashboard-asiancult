import { listarFilmes, criarFilme, excluirFilme } from "./crud.js";
    
    function renderizarFilmes(filmes) {
    const lista = document.getElementById("lista-filmes");
    lista.innerHTML = "";

    if (filmes.length === 0) {
        const vazio = document.createElement("p");
        vazio.className = "muted";
        vazio.textContent = "Nenhum filme no diário ainda.";
        lista.appendChild(vazio);
        return;
    }

    for (const filme of filmes) {
        const card = document.createElement("article");
        card.className = "filme-card";
        card.dataset.id = filme.objectId;

        const titulo = document.createElement("h3");
        titulo.textContent = filme.titulo;

        const meta = document.createElement("p");
        meta.className = "filme-meta";
        meta.textContent = `${filme.pais ?? ""} · ${filme.ano ?? ""}`;

        const nota = document.createElement("p");
        nota.className = "filme-nota";
        nota.textContent = `${filme.nota ?? ""}`;

        const comentario = document.createElement("p");
        comentario.className = "filme-comentario";
        comentario.textContent = `${filme.comentario ?? ""}`;

        const acoes = document.createElement("div");
        acoes.className = "filme-acoes";

        const btnEditar = document.createElement("button");
        btnEditar.type = "button";
        btnEditar.className = "btn-editar";
        btnEditar.textContent = "Editar";

        const btnExcluir = document.createElement("button");
        btnExcluir.type = "button";
        btnExcluir.className = "btn-excluir";
        btnExcluir.textContent = "Excluir";

        acoes.appendChild(btnEditar);
        acoes.appendChild(btnExcluir);

        card.appendChild(titulo);
        card.appendChild(meta);
        card.appendChild(nota);
        card.appendChild(comentario);
        card.appendChild(acoes);

        lista.appendChild(card);
    }
}

async function carregarLista() {
    try {
        const filmes = await listarFilmes();
        renderizarFilmes(filmes);
    } catch (erro) {
        console.error("Erro ao carregar a lista:", erro);
    }
}

export function iniciarDiario() {
    carregarLista();

    const lista = document.getElementById("lista-filmes");

    lista.addEventListener("click", async (evento) => {
        const botao = evento.target.closest(".btn-excluir");
        if (!botao) return;

        const card = botao.closest(".filme-card");
        const id = card.dataset.id;

        if (!confirm("Excluir este filme do diário?")) return;

        try {
            await excluirFilme(id);
            await carregarLista();
        } catch (erro) {
            console.error("Erro ao excluir:", erro);
        }
    });
}