// Random bakgrundsfärg
function random_bg_color() 
{
    var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    var bgColor = "rgb(" + x + "," + y + "," + z + ")";
    document.body.style.background = bgColor;
}


function toggle_visibility() 
{
    for (let divs of document.querySelectorAll('.container'))
    {
    if( divs.style.display == 'block' )
    {
        divs.style.display = 'none';
    }
    else
    {
        divs.style.display = 'block';
    }
    }
}

        

        