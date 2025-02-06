document.addEventListener("DOMContentLoaded", function () {
    // Seleção de elementos
    const elements = {
        btnComprar: document.querySelectorAll(".btn-comprar"),
        linksMenu: document.querySelectorAll(".navbar-nav a"),
        cepInput: document.getElementById("cep"),
        valorFrete: document.getElementById("valorFrete"),
        listaCarrinho: document.getElementById("lista-carrinho"),
        totalCarrinho: document.getElementById("total-carrinho"),
        contadorCarrinho: document.getElementById("contador-carrinho"),
        btnCarrinho: document.getElementById("btn-carrinho"),
        carrinhoLateral: document.getElementById("carrinho-lateral"),
        fecharCarrinho: document.getElementById("fechar-carrinho"),
        formBusca: document.querySelector("form.d-flex"),
        formCadastro: document.getElementById("form-cadastro"),
        campoCep: document.getElementById("cep"),
        campoLogradouro: document.getElementById("logradouro"),
        campoBairro: document.getElementById("bairro"),
        campoCidade: document.getElementById("cidade"),
        campoEstado: document.getElementById("estado")
    };

    const carrinho = [];

    // Adicionar produto ao carrinho
    function adicionarAoCarrinho(nome, preco) {
        carrinho.push({ nome, preco });
        atualizarCarrinho();
        alert(`${nome} foi adicionado ao carrinho!`);
    }

    // Remover produto do carrinho
    function removerDoCarrinho(index) {
        carrinho.splice(index, 1);
        atualizarCarrinho();
    }

    // Atualizar carrinho
    function atualizarCarrinho() {
        elements.listaCarrinho.innerHTML = "";
        let total = 0;

        carrinho.forEach((produto, index) => {
            const li = document.createElement("li");
            li.className = "list-group-item d-flex justify-content-between align-items-center";
            li.innerHTML = `
                ${produto.nome} - R$ ${produto.preco.toFixed(2)}
                <button class="btn btn-danger btn-sm" onclick="removerDoCarrinho(${index})">Remover</button>
            `;
            elements.listaCarrinho.appendChild(li);
            total += produto.preco;
        });

        elements.totalCarrinho.textContent = `R$ ${total.toFixed(2)}`;
        elements.contadorCarrinho.textContent = carrinho.length;
    }

    // Eventos
    elements.btnComprar.forEach(botao => {
        botao.addEventListener("click", function (e) {
            e.preventDefault();
            adicionarAoCarrinho(this.getAttribute("data-nome"), parseFloat(this.getAttribute("data-preco")));
        });
    });

    elements.linksMenu.forEach(link => {
        link.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            if (targetId.startsWith("#")) {
                e.preventDefault();
                document.querySelector(targetId)?.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    elements.btnCarrinho.addEventListener("click", e => {
        e.preventDefault();
        elements.carrinhoLateral.classList.add("aberto");
    });

    elements.fecharCarrinho.addEventListener("click", () => {
        elements.carrinhoLateral.classList.remove("aberto");
    });

    elements.formBusca.addEventListener("submit", function (e) {
        e.preventDefault();
        alert(`Você buscou por: ${this.querySelector("input").value}`);
    });

    elements.formCadastro.addEventListener("submit", function (e) {
        e.preventDefault();
        const senha = document.getElementById("senha").value;
        const confirmarSenha = document.getElementById("confirmar-senha").value;

        if (senha !== confirmarSenha) {
            return alert("As senhas não coincidem. Tente novamente.");
        }
        if (senha.length < 6) {
            return alert("A senha deve ter no mínimo 6 caracteres.");
        }

        alert("Cadastro realizado com sucesso!");
        window.location.href = "index.html";
    });

    elements.cepInput.addEventListener("blur", function () {
        const cep = this.value.replace(/\D/g, '');
        if (cep.length !== 8) {
            return alert("CEP inválido. Digite um CEP com 8 dígitos.");
        }

        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (data.erro) return alert("CEP não encontrado.");
                elements.campoLogradouro.value = data.logradouro;
                elements.campoBairro.value = data.bairro;
                elements.campoCidade.value = data.localidade;
                elements.campoEstado.value = data.uf;
            })
            .catch(() => alert("Erro ao consultar o CEP. Tente novamente."));
    });

    document.getElementById("calcularFrete").addEventListener("click", () => {
        const cep = elements.cepInput.value.trim();
        if (!/^[0-9]{5}-?[0-9]{3}$/.test(cep)) {
            return alert("CEP inválido. Por favor, insira um CEP válido.");
        }

        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (data.erro) return alert("CEP não encontrado.");
                const frete = { 'SP': 10, 'RJ': 15, 'MG': 12, 'RS': 20 }[data.uf] || 25;
                elements.valorFrete.textContent = `Frete: R$ ${frete.toFixed(2)}`;
            })
            .catch(() => alert("Erro ao consultar o CEP. Tente novamente."));
    });

    window.adicionarAoCarrinho = adicionarAoCarrinho;
    window.removerDoCarrinho = removerDoCarrinho;
});
