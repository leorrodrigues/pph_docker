var mapaString= "100001020000000011111110001111100001110000101111020111100111111111001000100111111100100001020100101111111111101101101111311110101111020100101111111111100101011113331111100001020000000111111111000101011133333111111101022222000001111100010101011113331111010000000002011000000000010101001111311110010000111102011000010010000000000111111100000010000000000000111000111111100001110000001000001102011010010000000000000000000010001011101102011010000000111000111011110010001000000002000011111001111100111000000000001000000002222010010011111110000010011110000000001000002010010011121110000010000000111101011100002000010001121100001111111000000001011100222220010000020000000001000000001001001002222222000111020001001001000000101001000022222222200000020111101001000011101001000022200022200100020001001000011111101011100022200022201110020000001110111111100000000022200022201110022222200000000011111110000022222222201110000000201110111111000010100002222222000100011100201000011111000010100000222220000000011100201011000011001000101100002000000111000000201010000000011100101111002000110000001000200011110000011101100000002001111000101002220001110010011100001110002011111100100022222000000010001000000000002011111100100222222200111110100010012222222001111000100022222000100010110111002000001000110011110002220000000000110111002000001010000000000000000111101110100010002011111011110111111000010001000100000000000000000000000000001001111101010101010111102011101111111111011000000000000101010000102001001000000001010011111111100101011100102001001011111101000111333331110001010000102000001010000101001133333333311001110111102222001000000101001133333333311000100000100002001111111101011333333333331100101110100002000000000000011333333333331100100000100002001111111111011333333333331100";
//*************************CLASSE DO MAPA***********************************
function Celula(){
    this.peso=-1;
    this.posicao_x=-1;
    this.posicao_y=-1;
    this.path=[];
    this.condicao=0;//0 nao visitado(cor normal), 1 visitado(preto) e 2 borda(amarelo), 3 atual
    this.tipo=0;//0 normal,1 inicio,2 final
    this.star=0;
}

function MapaCompleto(){
    this.terreno=[]; //cria um novo array (ira simular uma matriz)

    this.inicio_x=-1;
    this.inicio_y=-1;

    this.destino_x=-1;
    this.destino_y=-1;

    this.tamanho_x=-1;
    this.tamanho_y=-1;

    this.metodo="";
}

//************************FUNCOES EXTERNAS**********************************

function GeraMapa(){
    var linhas=parseInt(document.getElementById('map_line').value);
    var colunas=parseInt(document.getElementById('map_row').value);
    var fileInput = document.getElementById('map_file');
    var fileDisplayArea = document.getElementById('fileDisplayArea');
    var init_x=parseInt(document.getElementById('init_line').value);
    var init_y=parseInt(document.getElementById('init_row').value);
    var final_x=parseInt(document.getElementById('final_line').value);
    var final_y=parseInt(document.getElementById('final_row').value);
    fileInput.addEventListener('change', function(e) {
        var file = fileInput.files[0];
        var textType = /text.*/;

        if (file.type.match(textType)) {
            var reader = new FileReader();

            reader.onload = function(e) {
                fileDisplayArea.innerText = "Mapa carregado com sucesso!";
                mapaString=reader.result;
                mapaString=mapaString.replace( /\s/g, '' );
            }

            reader.readAsText(file);
        } else {
            fileDisplayArea.innerText = "File not supported!"
        }
    });
    if(linhas>1 && colunas>1 && typeof mapaString!="undefined" && init_x>=1 && init_x<=linhas && init_y>=1 &&  init_y<=colunas && final_x>=1 && final_x<=linhas && final_y>=1 && final_y<=colunas){
        document.getElementById("Mapa").innerHTML=PreparaMapa(linhas,colunas,mapaString,init_x,init_y,final_x,final_y);
    }
    else{
        document.getElementById("Mapa").innerHTML="Valores fornecidos para montar o mapa estão incorretos.";
    }
}

function PreparaMapa(linhas,colunas,mapaString,init_x,init_y,final_x,final_y){
    var index=0;
    var html="<table>";
    for(var i=0;i<linhas;i++){
        html+="<tr>";
        for(var j=0;j<colunas;j++){
            if(i==init_x-1 && j==init_y-1){
                html+="<td bgcolor='#cc00cc'> &nbsp;</td>";
            }
            else if(i==final_x-1 && j==final_y-1){
                html+='<td bgcolor="#669999"> &nbsp;</td>'
            }
            else{
                switch(mapaString[index]){
                    case '0':
                        html+='<td bgcolor="#00D600"> &nbsp;</td>';
                        break;
                    case '1':
                        html+='<td bgcolor="#996000"> &nbsp;</td>';
                        break;
                    case '2':
                        html+='<td bgcolor="#0000CC"> &nbsp;</td>';
                        break;
                    case '3':
                        html+='<td bgcolor="#CC0000"> &nbsp;</td>';
                        break;
                    default:
                        html+="<td>?</td>";
                        break;
                }
            }
            index+=1;
        }
        html+="</tr>";
    }
    html+="</table>";
    return html;
}

function CriaMapa(){
    var linhas=parseInt(document.getElementById('map_line').value);
    var colunas=parseInt(document.getElementById('map_row').value);
    var init_x=parseInt(document.getElementById('init_line').value);
    var init_y=parseInt(document.getElementById('init_row').value);
    var final_x=parseInt(document.getElementById('final_line').value);
    var final_y=parseInt(document.getElementById('final_row').value);
    oMapa=new MapaCompleto();
    oMapa.inicio_x=init_x-1;
    oMapa.inicio_y=init_y-1;
    oMapa.destino_x=final_x-1;
    oMapa.destino_y=final_y-1;
    oMapa.tamanho_x=colunas;
    oMapa.tamanho_y=linhas;
    var index=0;
    for(var i=0;i<linhas;i++){
        for(var j=0;j<colunas;j++){
            oCelula= new Celula();
            oCelula.condicao=0;
            oCelula.posicao_x=i;
            oCelula.posicao_y=j;
            switch(mapaString[index]){
                case '0':
                    oCelula.peso=0;
                    break;
                case '1':
                    oCelula.peso=1;
                    break;
                case '2':
                    oCelula.peso=2;
                    break;
                case '3':
                    oCelula.peso=3;
                    break;
                default:
                    oCelula.peso=-1;
                    break;
            }
            index+=1;
            oMapa.terreno.push(oCelula);
        }
    }
    return oMapa;
}

function atualizaMapa(mapa){
    var index=0;
    var html="<table>";
    for(var i=0;i<mapa.tamanho_y;i++){
        html+="<tr>";
        for(var j=0;j<mapa.tamanho_x;j++){
            if(mapa.terreno[index].tipo==1){
                html+="<td bgcolor='#cc00cc'> &nbsp;</td>";
            }
            else if(mapa.terreno[index].tipo==2){
                html+='<td bgcolor="#669999"> &nbsp;</td>'
            }
            else{
                if(mapa.terreno[index].condicao==1){ // VISITADOS
                    html+='<td bgcolor="#000000"> &nbsp;</td>';
                }
                else if(mapa.terreno[index].condicao==2){ //FRONTEIRA
                    html+='<td bgcolor="#ffff00"> &nbsp;</td>';
                }
                else if(mapa.terreno[index].condicao==3){//atual
                    html+='<td bgcolor="#003300"> &nbsp;</td>';
                }
                else{
                    switch(mapa.terreno[index].peso){
                        case 0:
                            html+='<td bgcolor="#00D600"> &nbsp;</td>';
                            break;
                        case 1:
                            html+='<td bgcolor="#996000"> &nbsp;</td>';
                            break;
                        case 2:
                            html+='<td bgcolor="#0000CC"> &nbsp;</td>';
                            break;
                        case 3:
                            html+='<td bgcolor="#CC0000"> &nbsp;</td>';
                            break;
                        default:
                            html+="<td>?</td>";
                            break;
                    }
                }
            }
            index+=1;
        }
        html+="</tr>";
    }
    html+="</table>";
    document.getElementById("Mapa").innerHTML=html;
}

function done(mapa,x,y){
    return (mapa.destino_x==x && mapa.destino_y==y);
}

function verificaContido(vetor,match){
    for(var i=0;i<vetor.length;i++){
        if(vetor[i].posicao_x==match.posicao_x && vetor[i].posicao_y==match.posicao_y){
            return true;
        }
    }
    return false;
}

function salvaDB(mapa){
    var pesos="";
    for(var i=0;i<mapa.terreno.length;i++){
        pesos+=mapa.terreno[i].peso+" ";
    }
    var dados={"Metodo":mapa.metodo, "Inicio":[mapa.inicio_x,mapa.inicio_y], "Destino":[mapa.destino_x,mapa.destino_y],"Tamanho":[mapa.tamanho_x,mapa.tamanho_y],"Pesos":pesos};
    $.ajax({
        url: "/algorithms/saveToDB",
        type: "GET",
        data: dados
    })

}

function ExecutaBFS(){
    var mapa=CriaMapa();
    mapa.metodo="bfs";
    var fronteira=[];
    var visitados=[];
    var verificando;
    var inicial=mapa.terreno[mapa.inicio_x+mapa.inicio_y*mapa.tamanho_x];
    mapa.terreno[mapa.inicio_x+mapa.inicio_y*mapa.tamanho_x].tipo=1;
    mapa.terreno[mapa.destino_x+mapa.destino_y*mapa.tamanho_x].tipo=2;
    inicial.path.push(-1);//Para mostrar que ele é o primeiro nó
    fronteira.push(inicial);
    atual_x=fronteira[0].x;
    atual_y=fronteira[0].y;
    //for(var i=0;i<21;i++){
    while(!done(mapa,atual_x,atual_y)){
        //console.log(i);
        verificando=fronteira.shift();
        visitados.push(verificando);
        mapa.terreno[verificando.posicao_x+verificando.posicao_y*mapa.tamanho_x].condicao=1;
        if(!((verificando.posicao_x-1)<0)){
            filho=mapa.terreno[verificando.posicao_x-1+verificando.posicao_y*mapa.tamanho_x];
            if(!verificaContido(fronteira,filho) && !verificaContido(visitados,filho)){
                fronteira.push(filho);
                mapa.terreno[filho.posicao_x+filho.posicao_y*mapa.tamanho_x].condicao=2;
            }
        }

        if(!((verificando.posicao_y+1)>=mapa.tamanho_y)){
            filho=mapa.terreno[verificando.posicao_x+(verificando.posicao_y+1)*mapa.tamanho_x];
            if(!verificaContido(fronteira,filho) && !verificaContido(visitados,filho)){
                fronteira.push(filho);
                mapa.terreno[filho.posicao_x+filho.posicao_y*mapa.tamanho_x].condicao=2;
            }
        }
        if(!((verificando.posicao_x+1)>=mapa.tamanho_x)){
            filho=mapa.terreno[verificando.posicao_x+1+(verificando.posicao_y)*mapa.tamanho_x];
            if(!verificaContido(fronteira,filho) && !verificaContido(visitados,filho)){
                fronteira.push(filho);
                mapa.terreno[filho.posicao_x+filho.posicao_y*mapa.tamanho_x].condicao=2;
            }
        }
        if(!((verificando.posicao_y-1)<0)){
            filho=mapa.terreno[verificando.posicao_x+(verificando.posicao_y-1)*mapa.tamanho_x];
            if(!verificaContido(fronteira,filho) && !verificaContido(visitados,filho)){
                fronteira.push(filho);
                mapa.terreno[filho.posicao_x+filho.posicao_y*mapa.tamanho_x].condicao=2;
            }
        }
        atual_x=fronteira[0].posicao_x;
        atual_y=fronteira[0].posicao_y;
        atualizaMapa(mapa);
    }
    salvaDB(mapa);
}

function ExecutaDFS(){
    var mapa=CriaMapa();
    var fronteira=[];
    var visitados=[];
    var verificando;
    var inicial=mapa.terreno[mapa.inicio_x+mapa.inicio_y*mapa.tamanho_x];
    mapa.metodo="dfs";
    mapa.terreno[mapa.inicio_x+mapa.inicio_y*mapa.tamanho_x].tipo=1;
    mapa.terreno[mapa.destino_x+mapa.destino_y*mapa.tamanho_x].tipo=2;
    inicial.path.push(-1);//Para mostrar que ele é o primeiro nó
    fronteira.push(inicial);
    atual_x=fronteira[0].x;
    atual_y=fronteira[0].y;
    while(!done(mapa,atual_x,atual_y)){
        //console.log(i);
        verificando=fronteira.shift();
        visitados.push(verificando);
        mapa.terreno[verificando.posicao_x+verificando.posicao_y*mapa.tamanho_x].condicao=1;
        if(!((verificando.posicao_y-1)<0)){
            filho=mapa.terreno[verificando.posicao_x+(verificando.posicao_y-1)*mapa.tamanho_x];
            if(!verificaContido(fronteira,filho) && !verificaContido(visitados,filho)){
                fronteira.unshift(filho);
                mapa.terreno[filho.posicao_x+filho.posicao_y*mapa.tamanho_x].condicao=2;
            }
        }
        if(!((verificando.posicao_x+1)>=mapa.tamanho_x)){
            filho=mapa.terreno[verificando.posicao_x+1+(verificando.posicao_y)*mapa.tamanho_x];
            if(!verificaContido(fronteira,filho) && !verificaContido(visitados,filho)){
                fronteira.unshift(filho);
                mapa.terreno[filho.posicao_x+filho.posicao_y*mapa.tamanho_x].condicao=2;
            }
        }
        if(!((verificando.posicao_y+1)>=mapa.tamanho_y)){
            filho=mapa.terreno[verificando.posicao_x+(verificando.posicao_y+1)*mapa.tamanho_x];
            if(!verificaContido(fronteira,filho) && !verificaContido(visitados,filho)){
                fronteira.unshift(filho);
                mapa.terreno[filho.posicao_x+filho.posicao_y*mapa.tamanho_x].condicao=2;
            }
        }
        if(!((verificando.posicao_x-1)<0)){
            filho=mapa.terreno[verificando.posicao_x-1+verificando.posicao_y*mapa.tamanho_x];
            if(!verificaContido(fronteira,filho) && !verificaContido(visitados,filho)){
                fronteira.unshift(filho);
                mapa.terreno[filho.posicao_x+filho.posicao_y*mapa.tamanho_x].condicao=2;
            }
        }
        atual_x=fronteira[0].posicao_x;
        atual_y=fronteira[0].posicao_y;
        mapa.terreno[atual_x+atual_y*mapa.tamanho_x].condicao=3;
        atualizaMapa(mapa);
        mapa.terreno[atual_x+atual_y*mapa.tamanho_x].condicao=1;
    }
    salvaDB(mapa);
}

function ExecutaUFS(){
    var mapa=CriaMapa();
    mapa.metodo="ufs";
    var fronteira=[];
    var visitados=[];
    var verificando;
    var inicial=mapa.terreno[mapa.inicio_x+mapa.inicio_y*mapa.tamanho_x];
    mapa.terreno[mapa.inicio_x+mapa.inicio_y*mapa.tamanho_x].tipo=1;
    mapa.terreno[mapa.destino_x+mapa.destino_y*mapa.tamanho_x].tipo=2;
    inicial.path.push(-1);//Para mostrar que ele é o primeiro nó
    fronteira.push(inicial);
    atual_x=fronteira[0].x;
    atual_y=fronteira[0].y;
    //for(var i=0;i<21;i++){
    while(!done(mapa,atual_x,atual_y)){
        //console.log(i);
        verificando=fronteira.shift();
        visitados.push(verificando);
        mapa.terreno[verificando.posicao_x+verificando.posicao_y*mapa.tamanho_x].condicao=1;
        if(!((verificando.posicao_x-1)<0)){
            filho=mapa.terreno[verificando.posicao_x-1+verificando.posicao_y*mapa.tamanho_x];
            if(!verificaContido(fronteira,filho) && !verificaContido(visitados,filho)){
                fronteira.push(filho);
                mapa.terreno[filho.posicao_x+filho.posicao_y*mapa.tamanho_x].condicao=2;
            }
        }

        if(!((verificando.posicao_y+1)>=mapa.tamanho_y)){
            filho=mapa.terreno[verificando.posicao_x+(verificando.posicao_y+1)*mapa.tamanho_x];
            if(!verificaContido(fronteira,filho) && !verificaContido(visitados,filho)){
                fronteira.push(filho);
                mapa.terreno[filho.posicao_x+filho.posicao_y*mapa.tamanho_x].condicao=2;
            }
        }
        if(!((verificando.posicao_x+1)>=mapa.tamanho_x)){
            filho=mapa.terreno[verificando.posicao_x+1+(verificando.posicao_y)*mapa.tamanho_x];
            if(!verificaContido(fronteira,filho) && !verificaContido(visitados,filho)){
                fronteira.push(filho);
                mapa.terreno[filho.posicao_x+filho.posicao_y*mapa.tamanho_x].condicao=2;
            }
        }
        if(!((verificando.posicao_y-1)<0)){
            filho=mapa.terreno[verificando.posicao_x+(verificando.posicao_y-1)*mapa.tamanho_x];
            if(!verificaContido(fronteira,filho) && !verificaContido(visitados,filho)){
                fronteira.push(filho);
                mapa.terreno[filho.posicao_x+filho.posicao_y*mapa.tamanho_x].condicao=2;
            }
        }
        fronteira.sort(function(a,b){return a.peso>b.peso;});
        atual_x=fronteira[0].posicao_x;
        atual_y=fronteira[0].posicao_y;
        atualizaMapa(mapa);
    }
    salvaDB(mapa);
}
