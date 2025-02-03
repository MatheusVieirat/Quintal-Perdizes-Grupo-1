document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    const feedback = document.getElementById("feedback");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Impede o envio real do formulário

        // Captura os valores dos campos
        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const mensagem = document.getElementById("mensagem").value.trim();

        // Verifica se todos os campos estão preenchidos
        if (nome === "" || email === "" || mensagem === "") {
            feedback.textContent = "Por favor, preencha todos os campos!";
            feedback.className = "error"; // Estilo de erro no CSS
            return;
        }

        // Simula um envio bem-sucedido
        feedback.textContent = "Mensagem enviada com sucesso! Entraremos em contato em breve.";
        feedback.className = "success"; // Estilo de sucesso no CSS

        // Limpa os campos após o envio
        form.reset();

        // Remove a mensagem após 5 segundos
        setTimeout(() => {
            feedback.textContent = "";
        }, 5000);
    });
});
