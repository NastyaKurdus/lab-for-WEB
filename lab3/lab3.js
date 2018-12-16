var myModule = (function () {
    'use strict';
    var div = document.querySelector("div");
    var index = -1;
    var arr = [];
    var myText = document.querySelector('h3');
    fetch('http://localhost:3000/text')
       .then(function(response) {
            return response.json();
        })
        .then(function(text) {
            myText.appendChild(document.createTextNode(text[0]));
        });
    function func () {
        var rez = new RegExp(this.value), i = 0 ,text="";
        index=-1;
        $.ajax({
            url: "http://localhost:3000/list",
            success: function(array) {
                arr=array;
                return arr;},
            error: function () {
                alert("Ошибка запроса");
            }
        });
        for (i; i < arr.length; i = i + 1) {
            if (rez.test(arr[i]))
            { text += '<p>'+arr[i]+'</p>'; } };
        div.innerHTML = text;
    }
    function add (){
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/add",
            data:{country:this.value}
        });

    }
    function move(e){
        e=e||window.event;
        if (e.keyCode===38||e.keyCode===40){
            if(index!==-1){div.childNodes[index].removeAttribute("id");}
            switch(e.keyCode){
                case 38:{
                    if(index<=0){
                        index=(div.childElementCount)-1;}
                    else{index--;}
                    break;}
                case 40:{
                    index=(index+1)%div.childElementCount;
                    break;}}
            document.querySelector("input").value = div.childNodes[index].innerHTML;
            div.childNodes[index].setAttribute("id","active");
        }}
    return {
        keyUp:func,
        keyDown:add,
        move:move
    };
}());
document.querySelector("input").addEventListener("input",myModule.keyUp);
document.querySelector("input").addEventListener("change",myModule.keyDown);
window.addEventListener("keydown",myModule.move);