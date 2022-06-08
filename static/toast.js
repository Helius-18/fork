var toast,alertToast,loadToast;
setTimeout(() => {
    var toastLive  = document.getElementById('liveToast')
    toast = new bootstrap.Toast(toastLive)
    var toastalert  = document.getElementById('alertToast')
    alertToast = new bootstrap.Toast(toastalert)
    var toastload  = document.getElementById('loadToast')
    window.loadToast = new bootstrap.Toast(toastload)
    createEvent();
    searchEvent();
    chatEvent();
}, 1000);


function welcome(message) {
    document.getElementById("toast-body").innerText=message;
    toast.show();
    notify();
}

function raise_alert(message) {
    document.getElementById("alert-toast-body").innerText=message;
    alertToast.show();
}