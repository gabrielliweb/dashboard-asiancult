import { criarGraficoPais, criarGraficoGenero, criarGraficoDecada } from "./graficos.js";

let todosFilmes = [];

async function carregarFilmes() {
    try {
        const resposta = await fetch("dados.json");

        if (!resposta.ok) {
            throw new Error("Não achei o arquivo");
        }
        const dados = await resposta.json();
        return dados.filmes;
    } catch (erro) {
        console.error("Erro ao carregar:", erro);
    }
}

function contarPor(filmes, campo) {
    const contagem = {};

    for (const filme of filmes) {
        const valor = filme[campo];

        if (contagem[valor]) {
            contagem[valor] = contagem[valor] + 1;
        } else {
            contagem[valor] = 1;
        }
    }
    console.log(contagem);
    return contagem;
}

function contarPorDecada(filmes) {
    const contagem = {};

    for (const filme of filmes) {
        const decada = Math.floor(filme.ano / 10) * 10;

        if (contagem[decada]) {
            contagem[decada] = contagem[decada] + 1;
        } else {
            contagem[decada] = 1;
        }
    }

    const anos = filmes.map(filme => filme.ano);
    const primeira = Math.floor(Math.min(...anos) / 10) * 10;
    const ultima = Math.floor(Math.max(...anos) / 10) * 10;

    for (let d = primeira; d <= ultima; d += 10) {
        if (!contagem[d]) {
            contagem[d] = 0;
        }
    }

    return contagem;
}

function filtrarPorPais(filmes, pais) {
    if (pais === "todos") {
        return filmes;
    }
    return filmes.filter(filme => filme.pais === pais);
}

function prepararDados(filmes) {
    const porPais = contarPor(filmes, "pais");
    const porGenero = contarPor(filmes, "genero");
    const porDecada = contarPorDecada(filmes);

    return {
        pais: {
            rotulos: Object.keys(porPais),
            valores: Object.values(porPais)
        },
        genero: {
            rotulos: Object.keys(porGenero),
            valores: Object.values(porGenero)
        },
        decada: {
            rotulos: Object.keys(porDecada).map(decada => `${decada}s`),
            valores: Object.values(porDecada)
        }
    };
}

async function iniciar() {
    todosFilmes = await carregarFilmes();

    const dados = prepararDados(todosFilmes);

    criarGraficoPais(dados.pais.rotulos, dados.pais.valores);
    criarGraficoGenero(dados.genero.rotulos, dados.genero.valores);
    criarGraficoDecada(dados.decada.rotulos, dados.decada.valores);
}

function initNavbar() {
    const btnHamburger = document.querySelector('.hamburger-btn');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');
    const secoes = document.querySelectorAll('section[id]');

    if (btnHamburger && navLinks) {
        btnHamburger.addEventListener('click', () => {
            const estaAberto = navLinks.classList.toggle('aberto');
            btnHamburger.classList.toggle('aberto', estaAberto);
            btnHamburger.setAttribute('aria-expanded', estaAberto);
        });

        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('aberto');
                btnHamburger.classList.remove('aberto');
                btnHamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    if (secoes.length > 0 && links.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -60% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const idAtual = entry.target.getAttribute('id');

                    links.forEach(link => {
                        const href = link.getAttribute('href').replace('#', '');
                        if (href === idAtual) {
                            link.classList.add('ativo');
                        } else {
                            link.classList.remove('ativo');
                        }
                    });
                }
            });
        }, observerOptions);

        secoes.forEach(secao => observer.observe(secao));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
});

iniciar();