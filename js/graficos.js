function lerCor(nome) {
    return getComputedStyle(document.documentElement)
        .getPropertyValue(nome)
        .trim();
}

Chart.defaults.color = lerCor("--cor-texto-suave");
Chart.defaults.borderColor = lerCor("--cor-borda");

let graficoPais = null;

export function criarGraficoPais(rotulos, valores) {
    const contexto = document.getElementById("canvas-country");

    graficoPais = new Chart(contexto, {
        type: "bar",
        data: {
            labels: rotulos,
            datasets: [
                {
                    label: "País",
                    data: valores,
                    backgroundColor: lerCor("--cor-rosa"),
                    borderRadius: 6
                }
            ]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            }
        }
    });
}

let graficoGenero = null;

export function criarGraficoGenero(rotulos, valores) {
    const contexto = document.getElementById("canvas-genre");

    graficoGenero = new Chart(contexto, {
        type: "doughnut",
        data: {
            labels: rotulos,
            datasets: [
                {
                    label: "Filmes",
                    data: valores,
                    backgroundColor: [
                        lerCor("--cor-rosa"),
                        lerCor("--cor-ciano"),
                        lerCor("--cor-ambar"),
                        lerCor("--cor-roxo"),
                        lerCor("--cor-sucesso"),
                        lerCor("--cor-azul")
                    ],
                    borderColor: lerCor("--cor-superficie"),
                    borderWidth: 2
                }
            ]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: { position: "bottom" }
            }
        }
    });
}
let graficoDecada = null;

export function criarGraficoDecada(rotulos, valores) {
    const contexto = document.getElementById("canvas-decade");

    graficoDecada = new Chart(contexto, {
        type: "line",
        data: {
            labels: rotulos,
            datasets: [
                {
                    label: "Filmes",
                    data: valores,
                    borderColor: lerCor("--cor-ciano"),
                    fill: true,
                    backgroundColor: "rgba(0, 229, 255, 0.15)",
                    borderWidth: 2,
                    tension: 0.3,
                    pointRadius: 5,
                    pointBackgroundColor: lerCor("--cor-ciano")

                }
            ]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            }
        }
    });
}