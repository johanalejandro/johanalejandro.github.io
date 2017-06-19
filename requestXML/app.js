var http_request = false;
var data ;
var cont;
function makeRequest(url) {


    http_request = false;

    if (window.XMLHttpRequest) { // Mozilla, Safari,...
        http_request = new XMLHttpRequest();
        if (http_request.overrideMimeType) {
            http_request.overrideMimeType('text/xml');
            // Ver nota sobre esta linea al final
        }
    } else if (window.ActiveXObject) { // IE
        try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }
    }

    if (!http_request) {
        alert('Falla :( No es posible crear una instancia XMLHTTP');
        return false;
    }
    http_request.onreadystatechange = alertContents;
    http_request.open('GET', "datos.xml",true);
    http_request.send();

}

function alertContents() {
    if (http_request.readyState == 4) {
        if (http_request.status == 200) {
            var lista= document.getElementById("lista-canciones");
            data= http_request.responseXML.getElementsByTagName("cancion");
            for( i=0 ; i< data.length ; i++){
                var li= document.createElement ('li');
                var cancion=document.createTextNode(data[i].getAttribute('titulo'));
                li.appendChild(cancion);
                lista.appendChild(li);
               
            }
                

            
            /*Aquí deben procesar el archivo y cargar la información en el contenedor especificado*/
        } else {
            alert('Hubo problemas con la petición.');
        }
    }
}

window.onload = function() {
    data = new Array();
    cont = document.getElementById('lista-canciones');
   
    var link = document.getElementById('requerimiento');
    link.onclick = function() {
        makeRequest('datos.xml');
    }
}
