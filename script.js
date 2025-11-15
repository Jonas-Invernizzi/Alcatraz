const jogo = document.querySelector('#jogos');
const acabar = document.querySelector('#acabar');
const campo = document.querySelector('#campo');
const imagem1 = document.querySelector('#p1');
const imagem2 = document.querySelector('#p2');
const player1 = document.querySelector('#player1');
const player2 = document.querySelector('#player2');
const inicio = document.querySelector('#inicio');
const iniciar = document.querySelector('#iniciar');
const barco = document.querySelector('#barco');
const mensagem = document.querySelector('#Mensagem');
let urlplayer1 = ""
let urlplayer2 = ""
let num1 = 0
let num2 = 0
let primeirajogada = true
let primejogada = true
let urlguarda = "https://down-br.img.susercontent.com/file/sg-11134201-7reot-m8of0178g3op57"
let s = true
let numero = 0
let numero1 = 0
let guardas = []
let chegada = []
let vitoria = false
//true= Vez do player 1
//false= Vez do player 2
let botoes = []
let personagens1 = []
let personagens2 = []

iniciar.addEventListener('click', async (e) => {
    e.preventDefault();
    await campos();
    num1 = 0
    num2 = 0
    const response = await fetch("inicio.php");
    const data = await response.json();
    if (data) {
        jogo.classList.remove('esconder');
        acabar.classList.remove('esconder');
        inicio.classList.add('esconder');
        inicio.setAttribute('id', '')
        jogo.setAttribute('id', 'jogos')
    }

});

const verifica = async () => {
    const response = await fetch("verifica.php");
    const data = await response.json();
    if (data.status) {
        jogo.classList.add('esconder');
        acabar.classList.remove('esconder');
        inicio.classList.add('esconder');
        inicio.setAttribute('id', 'inicios')
        jogo.setAttribute('id', 'jogos')
    }
    else {
        jogo.setAttribute('id', '')
    }
    if(data.jogada){
        s = true
        mensagem.innerText = "Vez do player 1"
    }
    else{
        s = false
        mensagem.innerText = "Vez do player 2"
    }
};

acabar.addEventListener('click', async () => {
    await campos();
    const response = await fetch("acabar.php");
    const data = await response.json();
    if (!data) {
        jogo.classList.add('esconder');
        inicio.classList.remove('esconder');
        acabar.classList.add('esconder');
        inicio.setAttribute('id', 'inicio')
        jogo.setAttribute('id', '')
    }
});

const personagem = async () => {
    const response = await fetch('personagens.php');
    const data = await response.json();
    urlplayer1 = data.p1
    console.log(urlplayer1)
    urlplayer2 = data.p2
    data.personagens.forEach(Elemento => {
        const img = document.createElement('img');
        const img22 = document.createElement('img');
        const btn1 = document.createElement('button');
        const btn2 = document.createElement('button');
        btn1.addEventListener('click', async (e) => {
            personagens1.forEach((imgm) => {
                if (imgm.style.borderColor == "green") imgm.style.borderColor = "red"
            });
            img.style.borderColor = "green"
            urlplayer1 = Elemento;
            const body = new FormData()
            body.set('p1', urlplayer1)
            const resposta = await fetch('personagens.php', {
                method: 'post',
                body
            })
            personagens1.push(img)
        })
        btn2.addEventListener('click', async (e) => {
            personagens2.forEach((imgm) => {
                if (imgm.style.borderColor == "green") imgm.style.borderColor = "red"
            });
            img22.style.borderColor = "green"
            urlplayer2 = Elemento
            const body = new FormData()
            body.set('p2', urlplayer2)
            const resposta = await fetch('personagens.php', {
                method: 'post',
                body
            })
            personagens2.push(img22)
            console.log(personagens2)
        })

        btn1.id = 'btn1';
        btn2.id = 'btn2';

        img.setAttribute("src", Elemento);
        img22.setAttribute("src", Elemento);
        imagem1.appendChild(btn1);
        btn1.setAttribute('id', 'btn')
        btn2.setAttribute('id', 'btn')
        btn1.appendChild(img);
        imagem2.appendChild(btn2);
        btn2.appendChild(img22);
    });
};
campo.addEventListener("submit", (e) => {
    e.preventDefault()
})

const campos = async () => {
    campo.innerHTML = '';

    const response = await fetch('tabuleiro.php');
    const tabuleiro = await response.json();
    barco.addEventListener('click', () => {
        chegada.forEach((botao, i) => {
            for (let linha = 0; linha < 9; linha++) {
                for (let coluna = 0; coluna < 9; coluna++) {
                    if (tabuleiro.tabela[linha][coluna] === 1 && s) {
                        let pos = linha * 9 + coluna
                        if (botoes[pos] === botao) {
                            mensagem.innerText = "Jogador 1 Venceu"
                            vitoria = true
                        }
                    }
                    else if (tabuleiro.tabela[linha][coluna] === 2 && s == false) {
                        let pos = linha * 9 + coluna
                        if (botoes[pos] === botao) {
                            mensagem.innerText = "Jogador 2 Venceu"
                            vitoria = true
                        }
                    }
                }
            }
        });

    })
    primeirajogada = tabuleiro.player1
    primejogada = tabuleiro.player2
    reinicio(tabuleiro.tabela)
};
function reinicio(tabuleiro) {
    botoes = []
    campo.innerText = ""
    player1.classList.remove('esconder')
    player2.classList.remove("esconder")
    for (let linha = 0; linha < 9; linha++) {
        for (let coluna = 0; coluna < 9; coluna++) {
            const valor = tabuleiro[linha][coluna];
            const botao = document.createElement('button');
            const imagemnatabela = document.createElement('img')
            const imagemp = document.createElement('img')
            const imagemp2 = document.createElement('img')

            if (valor == 1) {
                player1.classList.add("esconder")
            }
            else if (valor == 2) {
                player2.classList.add("esconder")
            }

            imagemp.src = urlplayer1;
            player1.innerText = "";
            player1.appendChild(imagemp);

            imagemp2.src = urlplayer2;
            player2.innerText = "";
            player2.appendChild(imagemp2);

            switch (valor) {
                case 0: break;
                case 1:
                    imagemnatabela.src = urlplayer1;
                    botao.innerText = ""
                    botao.appendChild(imagemnatabela)
                    break;
                case 2: imagemnatabela.src = urlplayer2; botao.innerText = ""; botao.appendChild(imagemnatabela); break;
                default: imagemnatabela.src = urlguarda; botao.innerText = ""; botao.appendChild(imagemnatabela); guardas.push(botao); break;
            }
            botoes.push(botao)
            botao.setAttribute('type', "submit")
            campo.appendChild(botao);

            botao.addEventListener('click', async () => {
                if (s) {
                    if (player1.classList !== "esconder") {
                        player1.classList.add('esconder')
                    }
                    mensagem.innerText = "Vez do player 2"
                    s = false
                    let m = 1
                    repetição(botao, imagemnatabela, tabuleiro, m, linha, coluna, primeirajogada)
                }
                else {
                    if (player2.classList !== "esconder") {
                        player2.classList.add('esconder')
                    }
                    mensagem.innerText = "Vez do player 1"
                    s = true
                    let m = 2
                    repetição(botao, imagemnatabela, tabuleiro, m, linha, coluna, primejogada)
                }



            })
        }
    }

    botoes.forEach((botao, i) => {
        if ((i > 1 && i < 7) || (i > 11 && i < 15) || i == 22) {
            botao.classList.add('chegada')
            chegada.push(botao)
        }
        else if (i > 71) {
            botao.classList.add('inicios')
        }
    })
}
const repetição = async (botao, imagemnatabela, tabuleiro, m, l, c, primas) => {

    for (let linha = 0; linha < 9; linha++) {
        for (let coluna = 0; coluna < 9; coluna++) {
            if (tabuleiro[linha][coluna] == m) {
                botoes.forEach((botao, i) => {
                    let bl = 0
                    let nove = 9
                    while (nove <= i) {
                        nove += 9
                        bl++
                    }
                    let bc = i % 9
                    if (bl == linha && bc == coluna) {
                        botao.innerText = ""
                        numero = i
                        tabuleiro[linha][coluna] = 0
                        num1 = linha
                        num2 = coluna
                    }

                })

            }
        }
    }
    botao.innerText = ""
    if (m == 1) {
        imagemnatabela.src = urlplayer1;
    }
    else {
        imagemnatabela.src = urlplayer2;
    }
    let valido = true
    if (num1 == l) {
        let start = Math.min(num2, c);
        let end = Math.max(num2, c);
        for (i = start + 1; i < end; i++) {
            if (tabuleiro[l][i] !== 0) {
                valido = false
                break;
            }
        }
    }
    else if (num2 == c) {
        let start = Math.min(num1, l);
        let end = Math.max(num1, l);
        for (i = start + 1; i < end; i++) {
            if (tabuleiro[i][c] !== 0) {
                valido = false
                break;
            }
        }
    }
    if (tabuleiro[l][c] === 0 && (num1 == l || num2 == c || (primas && botao.classList.contains('inicios'))) && (num1 !== l || num2 !== c) && vitoria == false && valido) {
        tabuleiro[l][c] = m
        if (m === 1) {
            primeirajogada = false
        }
        else {
            primejogada = false
        }
        console.log('valido')
        botao.appendChild(imagemnatabela)
    }
    else {
        console.log(primeirajogada)
        if (m === 1 && primeirajogada && !botao.classList.contains('inicios')) {
            player1.classList.remove("esconder")
            return;
        }
        else if (m === 2 && primejogada && !botao.classList.contains('inicios')) {
            player2.classList.remove("esconder")
            return;
        }
        tabuleiro[num1][num2] = m
        for (let xs of botoes) {
            if (numero1 == numero) {
                let imagem = document.createElement('img')
                let imagem2 = document.createElement('img')
                if (tabuleiro[l][c] == 0) {
                    if (m == 2) {
                        xs.appendChild(imagem2)
                        imagem2.src = urlplayer2
                    }
                    else {
                        imagem.src = urlplayer1
                        xs.appendChild(imagem)
                    }

                }
                else if ((tabuleiro[l][c] == 3)) {
                    imagemnatabela.src = urlguarda
                    botao.appendChild(imagemnatabela)
                    xs.appendChild(imagem)
                    if (s) {
                        imagem.src = urlplayer2
                    }
                    else {
                        imagem.src = urlplayer1
                    }
                }
                else if (botao === xs) {
                    botao.appendChild(imagem)
                    if (s) {
                        imagem2.src = urlplayer1
                        imagem.src = urlplayer2
                    }
                    else {
                        imagem.src = urlplayer2
                        imagem2.src = urlplayer1
                    }
                }
                else {
                    xs.innerText = ""
                    botao.innerText = ""
                    xs.appendChild(imagemnatabela)
                    botao.appendChild(imagem)

                    if (s) {
                        imagemnatabela.src = urlplayer2
                        imagem.src = urlplayer1

                    }
                    else {
                        imagemnatabela.src = urlplayer1
                        imagem.src = urlplayer2
                    }
                }
            }
            numero1++
        }
        mesmo = false
        numero1 = 0

    }
    console.log(tabuleiro)

    guarda(tabuleiro, m, l, c, botao, player1, player2)
}

const guarda = async (tabuleiro, m, l, c, botao, player1, player2) => {
    for (let linha = 0; linha < 9; linha++) {
        for (let coluna = 0; coluna < 9; coluna++) {
            //tabuleiro[l][c] Nova Localização
            // tabuleiro[linha][coluna] Posição do Guarda
            //tabuleiro[num1][num2] Posição Antiga
            let t = false
            let x = 0
            let y = 0
            let z = 0
            if (tabuleiro[l][c] === m && tabuleiro[linha][coluna] == 3 && linha == l) {
                // if (linha == l) {
                //     let start = Math.min(coluna, c);
                //     let end = Math.max(coluna, c);
                //     let start2 = Math.min(num1, l);
                //     let end2 = Math.max(num1, l);
                //     x = end - start//guarda e jogador
                //     y = end2 - start2
                //     for (i = 0; i <= y; i++) {
                //         if (tabuleiro[l][i] !== 0) {
                //             tabuleiro[linha][coluna] = 0
                //             tabuleiro[l][i] = 3
                //             t = true
                //             break;
                //         }
                //     }
                // }
                // else if (coluna == c) {
                //     let start = Math.min(linha, l);
                //     let end = Math.max(linha, l);
                //     let start2 = Math.min(num2, c);
                //     let end2 = Math.max(num2, c);
                //     x = end - start//guarda e jogador
                //     y = end2 - start2
                //     for (i = 0; i <= y; i++) {
                //         if (tabuleiro[i][c] !== 0) {
                //             tabuleiro[linha][coluna] = 0
                //             tabuleiro[i][c] = 3
                //             t = true
                //             break;
                //         }
                //     }
                // }

                if (l > num1 && t == false) {
                    x = l - num1
                    console.log(x)
                    tabuleiro
                    if (c > coluna) {
                        y = c - coluna
                    }
                    if (coluna > c) {
                        y = coluna - c
                    }
                    console.log(y)
                    const imgteste = document.createElement('img')
                    imgteste.src = urlguarda
                    if (y <= x) {
                        tabuleiro[linha][coluna] = 0
                        tabuleiro[l][c] = 3
                        botao.innerText = ""
                        botao.appendChild(imgteste)
                        const id = linha * 9 + coluna
                        const btn = botoes[id]
                        btn.innerText = ""
                        guardas.push(botao)
                        if (m == 1) { player1.classList.remove('esconder'); primeirajogada = true }
                        else { player2.classList.remove('esconder'); primejogada = true }
                        
                    }
                    else {
                        if ((c - coluna) > 0) {
                            z = coluna + x
                            if (z < 9 && z >= 0) {
                                tabuleiro[linha][coluna] = 0
                                tabuleiro[linha][z] = 3
                                const id = linha * 9 + coluna
                                const btn = botoes[id]
                                btn.innerText = ""
                                const id2 = linha * 9 + z
                                const btn2 = botoes[id2]
                                btn2.innerText = ""
                                btn2.appendChild(imgteste)
                            }
                        }
                        else {
                            z = coluna - x
                            if (z < 9 && z >= 0) {
                                tabuleiro[linha][coluna] = 0
                                tabuleiro[linha][z] = 3
                                const id = linha * 9 + coluna
                                const btn = botoes[id]
                                btn.innerText = ""
                                const id2 = linha * 9 + z
                                const btn2 = botoes[id2]
                                btn2.innerText = ""
                                btn2.appendChild(imgteste)
                            }
                        }
                    }

                    break;
                }
                else if (num1 > l && t == false) {
                    x = num1 - l
                    console.log(x)
                    tabuleiro
                    if (c > coluna) {
                        y = c - coluna
                    }
                    if (coluna > c) {
                        y = coluna - c
                    }
                    console.log(y)
                    const imgteste = document.createElement('img')
                    imgteste.src = urlguarda
                    if (y <= x) {
                        tabuleiro[linha][coluna] = 0
                        tabuleiro[l][c] = 3
                        botao.innerText = ""
                        botao.appendChild(imgteste)
                        const id = linha * 9 + coluna
                        const btn = botoes[id]
                        btn.innerText = ""
                        guardas.push(botao)
                        if (m == 1) { player1.classList.remove('esconder'); primeirajogada = true }
                        else { player2.classList.remove('esconder'); primejogada = true }
                    }
                    else {
                        if ((c - coluna) > 0) {
                            z = coluna + x
                            if (z < 9 && z >= 0) {
                                tabuleiro[linha][coluna] = 0
                                tabuleiro[linha][z] = 3
                                const id = linha * 9 + coluna
                                const btn = botoes[id]
                                btn.innerText = ""
                                const id2 = linha * 9 + z
                                const btn2 = botoes[id2]
                                btn2.innerText = ""
                                btn2.appendChild(imgteste)
                            }
                        }
                        else {
                            z = coluna - x
                            if (z < 9 && z >= 0) {
                                tabuleiro[linha][coluna] = 0
                                tabuleiro[linha][z] = 3
                                const id = linha * 9 + coluna
                                const btn = botoes[id]
                                btn.innerText = ""
                                const id2 = linha * 9 + z
                                const btn2 = botoes[id2]
                                btn2.innerText = ""
                                btn2.appendChild(imgteste)
                            }
                        }
                    }
                    break;
                }
                else {
                    if (t == false) {
                        if (num2 < c) {
                            x = c - num2
                        }
                        else {
                            x = num2 - c
                        }
                        console.log(x)
                        if (coluna > c) {
                            y = coluna - c
                        }
                        else {
                            y = c - coluna
                        }
                        if (x >= y) {
                            tabuleiro[linha][coluna] = 0
                            tabuleiro[l][c] = 3
                            botao.innerText = ""
                            const imgteste = document.createElement('img')
                            imgteste.src = urlguarda
                            botao.appendChild(imgteste)
                            const id = linha * 9 + coluna
                            const btn = botoes[id]
                            btn.innerText = ""
                            guardas.push(botao)
                            if (m == 1) { player1.classList.remove('esconder'); primeirajogada = true }
                            else { player2.classList.remove('esconder'); primejogada = true }
                        }
                        else {
                            if ((c - coluna) > 0) {
                                z = coluna + x
                                const imgteste = document.createElement('img')
                                imgteste.src = urlguarda
                                if (z < 9 && z >= 0) {
                                    tabuleiro[linha][coluna] = 0
                                    tabuleiro[linha][z] = 3
                                    const id = linha * 9 + coluna
                                    const btn = botoes[id]
                                    btn.innerText = ""
                                    const id2 = linha * 9 + z
                                    const btn2 = botoes[id2]
                                    btn2.innerText = ""
                                    btn2.appendChild(imgteste)
                                }
                            }
                            else {
                                z = coluna - x
                                const imgteste = document.createElement('img')
                                imgteste.src = urlguarda
                                if (z < 9 && z >= 0) {
                                    tabuleiro[linha][coluna] = 0
                                    tabuleiro[linha][z] = 3
                                    const id = linha * 9 + coluna
                                    const btn = botoes[id]
                                    btn.innerText = ""
                                    const id2 = linha * 9 + z
                                    const btn2 = botoes[id2]
                                    btn2.innerText = ""
                                    btn2.appendChild(imgteste)
                                }
                            }
                        }
                        break;
                    }
                }
            }

        }
    }
    console.log(tabuleiro)
    const body = new FormData()
    body.set('tabuleiro', JSON.stringify(tabuleiro))
    const resposta = await fetch('acao.php', {
        method: 'post',
        body: body,
    })
}

async function start() {
    await verifica();
    await personagem();
    await campos();
}

start();
