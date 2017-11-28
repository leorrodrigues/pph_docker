var mapa= "100001020000000011111110001111100001110000101111020111100111111111001000100111111100100001020100101111111111101101101111311110101111020100101111111111100101011113331111100001020000000111111111000101011133333111111101022222000001111100010101011113331111010000000002011000000000010101001111311110010000111102011000010010000000000111111100000010000000000000111000111111100001110000001000001102011010010000000000000000000010001011101102011010000000111000111011110010001000000002000011111001111100111000000000001000000002222010010011111110000010011110000000001000002010010011121110000010000000111101011100002000010001121100001111111000000001011100222220010000020000000001000000001001001002222222000111020001001001000000101001000022222222200000020111101001000011101001000022200022200100020001001000011111101011100022200022201110020000001110111111100000000022200022201110022222200000000011111110000022222222201110000000201110111111000010100002222222000100011100201000011111000010100000222220000000011100201011000011001000101100002000000111000000201010000000011100101111002000110000001000200011110000011101100000002001111000101002220001110010011100001110002011111100100022222000000010001000000000002011111100100222222200111110100010012222222001111000100022222000100010110111002000001000110011110002220000000000110111002000001010000000000000000111101110100010002011111011110111111000010001000100000000000000000000000000001001111101010101010111102011101111111111011000000000000101010000102001001000000001010011111111100101011100102001001011111101000111333331110001010000102000001010000101001133333333311001110111102222001000000101001133333333311000100000100002001111111101011333333333331100101110100002000000000000011333333333331100100000100002001111111111011333333333331100";

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
                mapa=reader.result;
                mapa=mapa.replace( /\s/g, '' );
            }

            reader.readAsText(file);
        } else {
            fileDisplayArea.innerText = "File not supported!"
        }
    });
    if(linhas>1 && colunas>1 && typeof mapa!="undefined" && init_x>=1 && init_x<=linhas && init_y>=1 &&  init_y<=colunas && final_x>=1 && final_x<=linhas && final_y>=1 && final_y<=colunas){
        document.getElementById("Mapa").innerHTML=PreparaMapa(linhas,colunas,mapa,init_x,init_y,final_x,final_y);
    }
    else{
        document.getElementById("Mapa").innerHTML="Valores fornecidos para montar o mapa estão incorretos.";
    }
}

function PreparaMapa(linhas,colunas,mapa,init_x,init_y,final_x,final_y){
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
                switch(mapa[index]){
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

function ExecutaBFS(){

}
