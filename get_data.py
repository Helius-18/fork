from youtubesearchpython import VideosSearch

def get(name):
    search = VideosSearch(name)
    l=[]
    # return(search.result()['result'][0])
    for i in range(len(search.result()['result'])):
      data = dict()
      data["title"] = search.result()['result'][i]['title']
      data["thumbnail"] = search.result()['result'][i]['thumbnails'][0]["url"]
      try:
        data["description"] = search.result(
      )['result'][i]['accessibility']['title']
      except:
        data["description"]=""
      data['link']=search.result()['result'][i]['id']
      l.append(data)
    data=dict()
    data["data"]=l
    return data
  
if __name__=='__main__':
  print(get(input("Enter name:")))