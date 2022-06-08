window.onscroll = function(){
    if(window.pageYOffset>=100){
        document.getElementById("collapseWidthExample").classList.remove("show");
        document.getElementById("navbar").classList.add("sticky-top");
    }
    else
    {
        document.getElementById("collapseWidthExample").classList.add("show");
        document.getElementById("navbar").classList.remove("sticky-top");
    }
}