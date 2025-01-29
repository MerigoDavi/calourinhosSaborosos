document.addEventListener('DOMContentLoaded', function() {
    const respostaInput = document.getElementById('respostaForm');
    const validarBtn = document.getElementById('validarBtn');
    const messageDiv = document.getElementById('message');
    const linkSection = document.getElementById('linkSection');

    // Matrix Rain Canvas Setup
    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const katakana = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const characters = katakana;

    const fontSize = 16;
    const columns = canvas.width / fontSize;

    const drops = [];
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }

    function drawMatrixRain() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'rgba(154, 35, 209, 0.5)';;
        ctx.font = fontSize + 'px Share Tech Mono';

        for (let i = 0; i < drops.length; i++) {
            const charIndex = Math.floor(Math.random() * characters.length);
            const text = characters[charIndex];
            const x = i * fontSize;
            const y = drops[i] * fontSize;
            ctx.fillText(text, x, y);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i] += 0.2;
        }
    }

    function animationLoop() {
        drawMatrixRain();
        requestAnimationFrame(animationLoop);
    }

    animationLoop();


    // Answer validation and Link creation logic:
    const respostaCorreta = "a razão vos é dada para discernir o bem do mal";

    validarBtn.addEventListener('click', function() {
        const respostaUsuario = respostaInput.value.trim().toLowerCase();

        messageDiv.textContent = "";
        messageDiv.classList.remove("success");
        messageDiv.classList.remove("error");
        linkSection.innerHTML = '';

        if (respostaUsuario === respostaCorreta) {
            messageDiv.textContent = "Resposta correta! Link liberado.";
            messageDiv.classList.add("success");

            const linkParagraph = document.createElement('p');
            linkParagraph.classList.add('success');
            linkParagraph.textContent = "Parabéns! Acesse o formulário:";

            const formLink = document.createElement('a');
            formLink.href = "https://docs.google.com/forms/d/e/1FAIpQLSd3CjXQ3YMmiu_759YFgVdkqMbB49T8Poxpa9QkxueiSdfFaA/viewform"; // ***REPLACE WITH YOUR FORM LINK HERE!***
            formLink.textContent = "Acessar Formulário";
            formLink.target = "_blank";
            formLink.rel = "noopener noreferrer";

            linkSection.appendChild(linkParagraph);
            linkSection.appendChild(formLink);

            linkSection.classList.remove('hidden');


        } else {
            messageDiv.textContent = "Resposta incorreta. Tente novamente.";
            messageDiv.classList.add("error");
            linkSection.classList.add('hidden');
        }
    });
});