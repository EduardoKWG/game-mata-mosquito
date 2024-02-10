// as variáveis [Globais] serão definidas fora da função para que sejam reconhecidas fora dela
var altura = 0
var largura = 0
var vidas = 1 
var tempo = 15

var criaMoscaTempo = 1500

//pegar os parâmetros encaminhados à URL e alterar a dificuldade de acordo com eles.
var nivel = window.location.search
nivel = nivel.replace('?','')

if (nivel === 'normal'){
    //1500
    criaMoscaTempo = 1500
} else if (nivel === 'dificil'){
    //1000
    criaMoscaTempo = 1000
}else if (nivel === 'chucknorris'){
    //750
    criaMoscaTempo = 750
}

function ajustaTamanhoPalcoJogo(){
    altura = window.innerHeight
    largura = window.innerWidth
    console.log(largura, altura)
}
ajustaTamanhoPalcoJogo()

//adiciona o cronômetro do jogo
var cronometro = setInterval(function(){
    tempo -= 1
    if(tempo<0){
        clearInterval(cronometro)
        clearInterval(criaMosca)
        window.location.href = 'vitoria.html'
    } else {
    document.getElementById('cronometro').innerHTML = tempo
}
}, 1000)


//criar posição randomica
function posicaoRandomica(){
    // Remover mosca anterior caso exista.
    // Caso exista, o if retornará true, caso não, retornará null e não aplicará a instrução. 
    if(document.getElementById('mosca')){
        document.getElementById('mosca').remove()

        //altera  o src do elemento mosca para vazio
        if(vidas> 3 ){            
            window.location.href = 'fim_de_jogo.html'
        } else{
        document.getElementById('v' + vidas).src = 'imagens/coracao_vazio.png'
        vidas ++
        }
    }

    var posicaox = Math.floor(Math.random() * largura) -  70
    var posicaoy = Math.floor(Math.random() * altura) - 90
    //caso as posições sejam em valores negativos, multiplicaremos por -1 para inverter o valor(pra mosca não ficar fora do display)
    posicaox < 0 ? posicaox *=(-1) : posicaox
    posicaoy < 0 ? posicaoy *=(-1) : posicaoy

    console.log(posicaox,posicaoy)

    //criar o elemento HTML
    var mosca = document.createElement('img')
    mosca.src = 'imagens/mosca.png'
    mosca.className = tamanhoRandomico() + ' ' + ladoRandomico()
    mosca.style.left = posicaox + 'px'
    mosca.style.top = posicaoy + 'px'
    mosca.style.position = 'absolute'
    document.body.appendChild(mosca)  
    mosca.id = 'mosca'  
    mosca.onclick = function(){
        this.remove()
    }
}

//criar tamanho randômico
function tamanhoRandomico(){
    var tamanhox = Math.floor(Math.random()*3)
    switch(tamanhox){
        case 0 :
            return 'mosca1'
        case 1 : 
            return 'mosca2'
        case 2 :
            return 'mosca3'
    }
}
//criar tamanho randômico
function ladoRandomico(){
    var posicao = Math.floor(Math.random()*2)
    switch(posicao){
        case 0 :
            return 'esquerda'
        case 1 : 
            return 'direita'
    }
}