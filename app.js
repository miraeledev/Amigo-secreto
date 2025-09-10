let listaAmigos = [];
const inputAmigo = document.getElementById('amigo');
const buttonAdd = document.getElementById('button-add');
const sortearBtn = document.getElementById('sortearAmigo');
const novoSorteioBtn = document.getElementById('novoSorteio');
const listaHTML = document.getElementById('listaAmigos');
const resultadoElem = document.getElementById('resultado');
const counterElem = document.getElementById('counter');

inputAmigo.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        adicionarAmigo();
    }
});

function adicionarAmigo() {
    let amigo = inputAmigo.value.trim();
    
    if (!amigo) {
        Swal.fire({
            title: "Erro ao inserir nome!",
            text: "Por favor insira um nome válido.",
            icon: "error",
            confirmButtonText: "OK",
            timer: 3000
        });
        return;
    }

    if (listaAmigos.includes(amigo)) {
        Swal.fire({
            title: "Nome já inserido!",
            text: "Se for outra pessoa, por favor, adicione o sobrenome ou um identificador.",
            icon: "warning",
            confirmButtonText: "OK",
            timer: 3200
        });
        return;
    }

    listaAmigos.push(amigo);
    exibirAmigos();
    atualizarContador();
    
    if (listaAmigos.length > 1) {
        sortearBtn.disabled = false;
    }
    
    limparCampo();
}

function exibirAmigos() {
    listaHTML.innerHTML = "";

    listaAmigos.forEach((amigo, index) => {
        let item = document.createElement('li');
        item.innerHTML = `
            ${amigo}
            <button class="remove-btn" onclick="removerAmigo(${index})" aria-label="Remover amigo">×</button>
        `;
        listaHTML.appendChild(item);
    });
}

function removerAmigo(index) {
    listaAmigos.splice(index, 1);
    exibirAmigos();
    atualizarContador();
    
    if (listaAmigos.length < 2) {
        sortearBtn.disabled = true;
    }
}

function atualizarContador() {
    counterElem.textContent = `${listaAmigos.length} ${listaAmigos.length === 1 ? 'amigo adicionado' : 'amigos adicionados'}`;
}

function sortearAmigo() {
    if (listaAmigos.length < 2) {
        Swal.fire({
            title: "Amigos insuficientes!",
            text: "Adicione pelo menos 2 amigos para sortear.",
            icon: "warning",
            confirmButtonText: "OK"
        });
        return;
    }

    let amigoSorteado = listaAmigos[Math.floor(Math.random() * listaAmigos.length)];
    
    resultadoElem.innerHTML = `
        <h3>🎉 Amigo Sorteado 🎉</h3>
        <p style="font-size: 32px; margin: 15px 0; color: var(--color-primary);">${amigoSorteado}</p>
        <p style="font-size: 18px;">Parabéns!</p>
    `;
    
    sortearBtn.disabled = true;
    novoSorteioBtn.disabled = false;
    buttonAdd.disabled = true;
    inputAmigo.disabled = true;
    
    resultadoElem.scrollIntoView({ behavior: 'smooth' });
    
    Swal.fire({
        title: "Sorteio realizado!",
        html: `O amigo sorteado é: <strong>${amigoSorteado}</strong>`,
        icon: "success",
        confirmButtonText: "OK",
        timer: 4000
    });
}

function limparCampo() {
    inputAmigo.value = '';
    inputAmigo.focus();
}


function novoSorteio() {
    
    resultadoElem.innerHTML = '';
    
    
    listaAmigos = [];
    exibirAmigos();
    atualizarContador();
    
    
    sortearBtn.disabled = true;
    novoSorteioBtn.disabled = true;
    buttonAdd.disabled = false;
    inputAmigo.disabled = false;
    
    
    inputAmigo.focus();
    

}