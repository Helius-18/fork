from pytube import YouTube as yt
def get_audio(pattern):
  url="https://www.youtube.com/watch?v="+pattern
  video=yt(url)
  # print(video.title)
  # print(video.streams.filter(type="audio"))
  # print(video.streaming_data['adaptiveFormats'][-1]['url'])
  return({"link":video.streaming_data['adaptiveFormats'][-1]['url'],"thumbnail":video.thumbnail_url,"title":'%.15s' % video.title,"artist":video.author})

if __name__=='__main__':
  get_audio(input("Enter :"))