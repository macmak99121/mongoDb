// Random bakgrundsfärg
function random_bg_color() 
{
    var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    var bgColor = "rgb(" + x + "," + y + "," + z + ")";
    document.body.style.background = bgColor;
}


function toggle_visibility(id) 
{
    var aut = document.getElementById("author");
    if ( aut.style.display == 'block' )
        aut.style.display = 'none';
    else
        aut.style.display = 'block';

    var q = document.getElementById("quote");
    if ( q.style.display == 'block' )
    q.style.display = 'none';
    else
    q.style.display = 'block';  

    var t = document.getElementById("timestamp");
    if ( t.style.display == 'block' )
        t.style.display = 'none';
    else
        t.style.display = 'block';
}

        

        