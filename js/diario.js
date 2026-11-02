import { listarFilmes, criarFilme, editarFilme, excluirFilme } from "./crud.js";

    let filmesCarregados = [];
    
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
        filmesCarregados = await listarFilmes();
        renderizarFilmes(filmesCarregados);
    } catch (erro) {
        console.error("Erro ao carregar a lista:", erro);
    }
}

function mostrarMensagem(texto, ehErro = false) {
    const mensagem = document.getElementById("mensagem");
    mensagem.textContent = texto;
    mensagem.classList.toggle("erro", ehErro);
}

function lerFormulario() {
    return {
        titulo: document.getElementById("titulo").value,
        pais: document.getElementById("pais").value,
        ano: Number(document.getElementById("ano").value),
        nota: Number(document.getElementById("nota").value),
        comentario: document.getElementById("comentario").value
    };
}

function entrarNoModoEdicao(filme) {
    document.getElementById("filme-id").value = filme.objectId;
    document.getElementById("titulo").value = filme.titulo ?? "";
    document.getElementById("pais").value = filme.pais ?? "";
    document.getElementById("ano").value = filme.ano ?? "";
    document.getElementById("nota").value = filme.nota ?? "";
    document.getElementById("comentario").value = filme.comentario ?? "";

    document.getElementById("btn-salvar").textContent = "Salvar alterações";
    document.getElementById("btn-cancelar").hidden = false;

    document.getElementById("form-filme").scrollIntoView({ behavior: "smooth" });
}

function sairDoModoEdicao() {
    document.getElementById("form-filme").reset();
    document.getElementById("filme-id").value = "";
    document.getElementById("btn-salvar").textContent = "Salvar";
    document.getElementById("btn-cancelar").hidden = true;
}

export function iniciarDiario() {
    carregarLista();

    const formulario = document.getElementById("form-filme");
    const lista = document.getElementById("lista-filmes");

    formulario.addEventListener("submit", async (evento) => {
        evento.preventDefault();

        const id = document.getElementById("filme-id").value;
        const filme = lerFormulario();

        try {
            if (id) {
                await editarFilme(id, filme);
                mostrarMensagem("Alterações salvas!");
            } else {
                await criarFilme(filme);
                mostrarMensagem("Filme salvo!");
            }

            sairDoModoEdicao();
            await carregarLista();
        } catch (erro) {
            console.error("Erro ao salvar:", erro);
            mostrarMensagem("Não foi possível salvar.", true);
        }
    });

    document.getElementById("btn-cancelar").addEventListener("click", () => {
        sairDoModoEdicao();
        mostrarMensagem("");
    });

    lista.addEventListener("click", async (evento) => {
        const card = evento.target.closest(".filme-card");
        if (!card) return;

        const id = card.dataset.id;

        if (evento.target.closest(".btn-editar")) {
            const filme = filmesCarregados.find(f => f.objectId === id);
            if (filme) entrarNoModoEdicao(filme);
            return;
        }

        if (evento.target.closest(".btn-excluir")) {
            if (!confirm("Excluir este filme do diário?")) return;

            try {
                await excluirFilme(id);
                await carregarLista();
            } catch (erro) {
                console.error("Erro ao excluir:", erro);
            }
        }
    });
}