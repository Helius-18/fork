from django.shortcuts import render,HttpResponse
from get_audio import get_audio
from get_data import get
import json
# Create your views here.
def index(request):
  # client_ip = request.META['REMOTE_PORT']
  # print(client_ip)
  return render(request,"fork/player.html")

def search(request,search):
  return HttpResponse(json.dumps(get(search)),content_type='application/json')

def play(request,search):
  return HttpResponse(json.dumps(get_audio(search)),content_type='application/json')