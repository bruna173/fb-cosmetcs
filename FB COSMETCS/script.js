const NUMERO_WHATSAPP = "5516999999999";



const produtos = [
    {
        id: 1,
        nome: "Gloss Labial",
        preco: 19.90,
        categoria: "maquiagem",
        imagem: "https://placehold.co/400x400/f7c5d8/c91656?text=Gloss"
    },
    {
        id: 2,
        nome: "Máscara de Cílios",
        preco: 24.90,
        categoria: "maquiagem",
        imagem: "https://placehold.co/400x400/f7c5d8/c91656?text=Rimel"
    },
    {
        id: 3,
        nome: "Hidratante Facial",
        preco: 35.90,
        categoria: "skincare",
        imagem: "https://placehold.co/400x400/f7c5d8/c91656?text=Skincare"
    },
    {
        id: 4,
        nome: "Perfume",
        preco: 49.90,
        categoria: "perfumaria",
        imagem: "https://placehold.co/400x400/f7c5d8/c91656?text=Perfume"
    }
];

let carrinho = [];



function mostrarProdutos() {

    const lista = document.getElementById("lista-produtos");

    lista.innerHTML = "";

    produtos.forEach(produto => {

        lista.innerHTML += `
            <div class="produto">

                <img src="${produto.imagem}"
                     alt="${produto.nome}">

                <h3>${produto.nome}</h3>

                <p class="preco">
                    ${produto.preco.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                    })}
                </p>

                <button onclick="adicionarCarrinho(${produto.id})">
                    Adicionar ao carrinho +
                </button>

            </div>
        `;

    });

}



function adicionarCarrinho(id) {

    const produto = produtos.find(p => p.id === id);

    const item = carrinho.find(p => p.id === id);

    if (item) {
        item.quantidade++;
    } else {
        carrinho.push({
            ...produto,
            quantidade: 1
        });
    }

    atualizarCarrinho();

}



function removerCarrinho(id) {

    const item = carrinho.find(p => p.id === id);

    if (item) {
        item.quantidade--;

        if (item.quantidade <= 0) {
            carrinho = carrinho.filter(p => p.id !== id);
        }
    }

    atualizarCarrinho();

}



function atualizarCarrinho() {

    const lista = document.getElementById("itens-carrinho");

    let total = 0;
    let quantidadeTotal = 0;

    lista.innerHTML = "";

    if (carrinho.length === 0) {

        lista.innerHTML = `
            <p class="carrinho-vazio">
                Seu carrinho está vazio.
            </p>
        `;

    }

    carrinho.forEach(item => {

        const subtotal = item.preco * item.quantidade;

        total += subtotal;
        quantidadeTotal += item.quantidade;

        lista.innerHTML += `
            <div class="item-carrinho">

                <div>
                    <strong>${item.nome}</strong>

                    <p>
                        ${subtotal.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL"
                        })}
                    </p>
                </div>

                <div class="quantidade">

                    <button onclick="removerCarrinho(${item.id})">
                        −
                    </button>

                    <span>${item.quantidade}</span>

                    <button onclick="adicionarCarrinho(${item.id})">
                        +
                    </button>

                </div>

            </div>
        `;

    });

    document.getElementById("total").textContent =
        total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

    document.getElementById("cart-count").textContent =
        quantidadeTotal;

}



function abrirCarrinho() {

    document.getElementById("carrinho")
        .classList.add("ativo");

    document.getElementById("fundo-carrinho")
        .classList.add("ativo");

}



function fecharCarrinho() {

    document.getElementById("carrinho")
        .classList.remove("ativo");

    document.getElementById("fundo-carrinho")
        .classList.remove("ativo");

}



function finalizarPedido() {

    if (carrinho.length === 0) {

        alert("Seu carrinho está vazio!");

        return;
    }

    let mensagem = "Olá! Vim pelo site da FB Cosmetics. 💗\n\n";
    mensagem += "Gostaria de fazer o seguinte pedido:\n\n";

    let total = 0;

    carrinho.forEach(item => {

        const subtotal = item.preco * item.quantidade;

        total += subtotal;

        mensagem += `• ${item.nome}\n`;
        mensagem += `  Quantidade: ${item.quantidade}\n`;
        mensagem += `  Subtotal: ${subtotal.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })}\n\n`;

    });

    mensagem += `TOTAL: ${total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })}\n\n`;

    mensagem += "Aguardo informações sobre pagamento e entrega! 💕";

    const link = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensagem)}`;

    window.open(link, "_blank");

}



const linkWhatsApp =
    `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(
        "Olá! Vim pelo site da FB Cosmetics e gostaria de conhecer os produtos. 💗"
    )}`;

document.getElementById("whatsapp-home").href = linkWhatsApp;

document.getElementById("whatsapp-footer").href = linkWhatsApp;



mostrarProdutos();

function filtrarProdutos(categoria, botao) {

    const botoes = document.querySelectorAll(".categoria");

    botoes.forEach(b => b.classList.remove("ativa"));

    botao.classList.add("ativa");

    const filtrados = categoria === "todos"
        ? produtos
        : produtos.filter(p => p.categoria === categoria);

    const lista = document.getElementById("lista-produtos");

    lista.innerHTML = "";

    filtrados.forEach(produto => {

        lista.innerHTML += `
            <div class="produto">
                <img src="${produto.imagem}" alt="${produto.nome}">

                <h3>${produto.nome}</h3>

                <p class="preco">
                    ${produto.preco.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                    })}
                </p>

                <button onclick="adicionarCarrinho(${produto.id})">
                    Adicionar ao carrinho +
                </button>
            </div>
        `;
    });
}

atualizarCarrinho();
