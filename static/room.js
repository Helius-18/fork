// setTimeout(createEvent,1000);
var chatSocket;
var winsize = window.matchMedia("(max-width: 600px)")
  function createEvent() {
document.getElementById("room_form").addEventListener("submit", createRoom, true);
    document.getElementById("leave_room").addEventListener("click",leaveRoom, true);
  }

  var createRoom = function(event) {
    event.preventDefault();
    if (chatSocket) {
      chatSocket.close();
    }
    document.getElementById("navbarDarkDropdownMenuLink").innerText=document.getElementById("room_name").value.replace(' ','-');
    document.getElementById("username").innerText=document.getElementById("user_name").value;
createSocket(document.getElementById("room_name").value.replace(' ','-'),document.getElementById("username").innerText);
    document.getElementById("modal-close").click();
    document.getElementById("modal_btn").classList.add("d-none");
    document.getElementById("room").classList.remove('d-none');
    document.getElementById("chat_btn").classList.remove("d-none");
  };

window.addEventListener('beforeunload', function (e) {
  if (chatSocket.readyState) {
    leaveRoom();
  }
});


  function leaveRoom() {
    chatSocket.send(JSON.stringify({
      "kind" : "exit",
      "user" : document.getElementById("username").innerText,
      "message" : document.getElementById("username").innerText+" left the room"
    }));
    if (chatSocket.readyState) {
      chatSocket.close();
    }
    raise_alert("room exit success");
    document.getElementById("navbarDarkDropdownMenuLink").innerText="";
    document.getElementById("modal_btn").classList.remove("d-none");
    document.getElementById("room").classList.add('d-none');
    document.getElementById("chat_btn").classList.add("d-none");
  }

function createSocket(room_name,user_name) {
        window.url = `wss://${window.location.host}/ws/`+room_name+`/`

        window.chatSocket = new WebSocket(url)

        chatSocket.addEventListener('open', (e) => {
          chatSocket.send(JSON.stringify({
            "kind" : "welcome",
            "user" : document.getElementById("username").innerText,
            "message" : document.getElementById("username").innerText+" joined the room"
          }));
        });
    
        chatSocket.onmessage = function(e){
            let data = JSON.parse(e.data)
            console.log('Data:', data)

            if(data.kind === "sync"){
                updatePlayer(data.message);
            }
            else if(data.kind === "welcome"){
                welcome(data.message);
            }
            else if(data.kind === "exit")
            {
              raise_alert(data.message);
            }
            else if (data.kind === "chat") {
              receivedChat(data);
            }
            else if(data.kind === "playorpause"){
              playorPause();
            }
        }
    }

function updatePlayer(data) {
  if(document.getElementById("app-cover").classList.contains("d-none"))
  {
    document.getElementById("app-cover").classList.remove("d-none");
  }
  playorPause();
  document.getElementById("hiddenaudio").load()
  document.getElementById("hiddenaudio").pause();
  document.getElementById("album-name").innerText=data.title;
  document.getElementById("track-name").innerText=data.artist;
  document.getElementById("_1").src=data.thumbnail;
  document.getElementById("audio_source").src=data.link;
  playorPause();
  playorPause();
}

function play(search) {
  loadToast.show();
  $.ajax({
          type: "GET",
          url: "/play/"+search,
          // data: reqBody,
          dataType: "json",
          success: function(data, textStatus) {
            if(chatSocket)
            {
            chatSocket.send(JSON.stringify({
              "kind" : "sync",
              "user" : document.getElementById("username").innerText,
              "message" : data
            }))
            }
            else{
              updatePlayer(data)
            }
          }
        })
  loadToast.hide();
}


// setTimeout(searchEvent,1000);
function searchEvent() {
  document.getElementById('form_id').addEventListener('submit', (e)=> {
      e.preventDefault()
      var search = e.target.search.value;
      loadToast.show();
      if(search!='')
      {
        $.ajax({
          type: "GET",
          url: "/"+search,
          // data: reqBody,
          dataType: "json",
          success: function(data, textStatus) {
                  document.getElementById("root").innerHTML=""
                  if (winsize.matches) {
                    calssName = "col"
                  } else {
                    calssName = "d-flex"
                  }
                  for (let item of data["data"]) {
                      document.getElementById("root").innerHTML+='<div class="'+calssName+' position-relative mt-3"><img src='+item["thumbnail"]+' class="flex-shrink-0 figure-img img-fluid rounded me-3" alt="..." style="height: 210px;width: max-content;"><div><h5 class="mt-0">'+item["title"]+'</h5><p style="color: #c1c1c1;font-size: small;">'+item["description"]+'</p><a style="cursor: pointer;" href="javascript:play(\''+item["link"]+'\')" id='+item["link"]+' class="stretched-link"></a></div></div>'
                  }
          }
        })
      }
      loadToast.hide();
  })}