var jogo = {
    numVidas : 3,
    numPontos : 0,
    infoLogo: null,
    usedNum: [],
    logoAtual : null,
    iLogoTela : null,
    acertou: function(){
        this.numPontos += 1;
        document.getElementById("pontos").innerHTML = "Pontos:" + this.numPontos;
    },
    errou: function(){
        this.numVidas -= 1;
    },
    getNumVidas: function(){
        return this.numVidas;
    },
    getNumPontos: function(){
        return this.numPontos;
    },
    getDifficulty: function(difficulty){
        if(difficulty === 0){
            this.infoLogo = JSON.parse(facil);
        }
        if(difficulty === 1){
            this.infoLogo = JSON.parse(intermediario);
        }
        if(difficulty === 2){
            this.infoLogo = JSON.parse(dificil);
        }
        for(var i = 0 ; i < this.infoLogo.length ; i++)
        { 
            console.log(this.infoLogo[i].nome);
        }
    }

};

function selectLevel(difficulty){

    document.getElementById("jogo").style.display = "block";
    document.getElementById("inicio").style.display = "none";
    jogo.getDifficulty(difficulty);
    setScreen();
}

function setScreen(){
    if(jogo.usedNum.length === jogo.infoLogo.length)
    {
        alert("O jogo terminou");
        document.getElementById("jogo").style.display = "none";
    }
    else
    {
        var auxNum , test;
        do{
            auxNum = randNum(jogo.infoLogo.length);
            test = validNumber(auxNum , jogo.usedNum);
        }while(!test);
        

        jogo.logoAtual = auxNum;
        jogo.usedNum.push(jogo.logoAtual); // fala pro programa que ja usamos esse logo
        document.getElementById("logoAtual").src = jogo.infoLogo[auxNum].caminho;
        var auxStr= [auxNum]; // auxStr serve para mostrar os campos que ja foram usados para a montagem dessa tela. Para n ter repetição de campos
        for(var i = 0 ; i < 3 ; i++){
                do{
                    auxNum = randNum(jogo.infoLogo.length);
                    test = validNumber(auxNum , auxStr);
                }while(!test);
                auxStr.push(auxNum);
        }
        console.log(auxStr);
        jogo.iLogoTela = randNum(4);
        var iAuxStr = 1;
        for(var i = 0 ; i < 4 ; i++){ // comeca do 1 pois a posicao 0 eh do logo atual.
            if(jogo.iLogoTela === i){
                document.getElementById("op" + (i)).innerHTML = jogo.infoLogo[jogo.logoAtual].nome; 
            }
            else{
                document.getElementById("op" + (i)).innerHTML = jogo.infoLogo[auxStr[iAuxStr]].nome;
                console.log(jogo.infoLogo[auxStr[iAuxStr]].nome);
                iAuxStr++;
            }
        }
    }
}

function validNumber(number , strNum) // ve se tem o number dentro do strNum
{
    for(var i = 0 ; i < strNum.length ; i++){
        if(number === strNum[i])
        {
            return false;
        }
    }
    return true;
}


function randNum(maxNum){
    var num = Math.floor(Math.random()*maxNum);
    return  num;
}

function calculaAcerto(i){
    if(i == jogo.iLogoTela)
    {
        jogo.acertou();
    }
    else
    {
        jogo.errou();
    }
    setScreen();
}