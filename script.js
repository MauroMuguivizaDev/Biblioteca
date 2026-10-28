
const livrosIniciais = [
    {
        id: 1,
        titulo: "Java: Como Programar",
        autor: "Paul Deitel e Harvey Deitel",
        categoria: "Programação"
    },
    {
        id: 2,
        titulo: "Redes de Computadores - Teoria e Prática",
        autor: "Douglas Rocha Mendes",
        categoria: "Tecnologia"
    },
    {
        id: 3,
        titulo: "Nós Matamos o Cão-Tinhoso",
        autor: "Luís Bernardo Honwana",
        categoria: "Literatura"
    }
];

const chave = "minhaBiblioteca";

let livros = localStorage.getItem(chave);

if (livros === null) {
    livros = livrosIniciais;
    guardarLivros();
} 
else {
    livros = JSON.parse(livros);
}

const listaLivros = document.getElementById("listaLivros");
const formulario = document.getElementById("formLivro");
const pesquisa = document.getElementById("pesquisa");
const total = document.getElementById("total");
const mensagem = document.getElementById("mensagem");

function guardarLivros() {
    localStorage.setItem(chave, JSON.stringify(livros));
}

function mostrarLivros() {
    listaLivros.replaceChildren();


    const texto = pesquisa.value.trim().toLowerCase();
    const resultado = livros.filter(function(livro) {
        return livro.titulo.toLowerCase().includes(texto) ||
               livro.autor.toLowerCase().includes(texto);
    });

    total.textContent = "Total de livros: " + livros.length;

    if (resultado.length === 0) {
        mensagem.textContent = livros.length === 0
            ? "Ainda não existem livros na biblioteca."
            : "Nenhum livro encontrado.";

        return;
    }

    mensagem.textContent = "";

    resultado.forEach(function(livro) {
        const item = document.createElement("li");
        const detalhes = document.createElement("div");
        const titulo = document.createElement("strong");
        const autor = document.createElement("span");
        const botao = document.createElement("button");

        detalhes.className = "detalhes";
        titulo.textContent = livro.titulo;
        autor.textContent = livro.autor + " - " + livro.categoria;

        botao.textContent = "Apagar";
        botao.className = "apagar";
        botao.type = "button";

        botao.addEventListener("click", function() {
            apagarLivro(livro.id);
        });

        detalhes.append(titulo, autor);
        item.append(detalhes, botao);
        listaLivros.appendChild(item);
    });
}

formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const titulo = document.getElementById("titulo").value.trim();
    const autor = document.getElementById("autor").value.trim();
    const categoria = document.getElementById("categoria").value;

    if (!titulo || !autor || !categoria) {
        return;
    }

    const novoLivro = {
        id: Date.now(),
        titulo: titulo,
        autor: autor,
        categoria: categoria
    };

    livros.push(novoLivro);

    guardarLivros();
    formulario.reset();
    pesquisa.value = "";

    mostrarLivros();
});

function apagarLivro(id) {
    livros = livros.filter(function(livro) {
        return livro.id !== id;
    });

    
    guardarLivros();
    mostrarLivros();
}

pesquisa.addEventListener("input", mostrarLivros);

mostrarLivros();
