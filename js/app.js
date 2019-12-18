//API Authentication
const newsApiKey = "a702b8a38878465eb7cade2dcb0b07a1";
let newsApiUrl = "https://newsapi.org/v2/top-headlines?";
const herokuProxy = "https://cors-anywhere.herokuapp.com/"
let searchOptions = {
  //apiKey goes last
  country:"mx",
  apiKey: newsApiKey
}

//Auxiliary variable
let dossier=[];
let currentIndex=[];

//Populating URL
for(let key in searchOptions){
  newsApiUrl += "&" + key + "=" + searchOptions[key];
}
newsApiUrl=newsApiUrl.replace('?&','?');
console.log(newsApiUrl);

//Extracting API feedback
$.get(newsApiUrl).done(function(feedback){
  if(feedback.totalResults === 0){
    console.log("No news");
  } else {
    dossier[0] = feedback.articles
    console.log(dossier[0].length);
    listNewsApi(dossier[0]);
  }
})

//Function to process JSON and DOM interaction
function listNewsApi(apiArticles){
  $.each(apiArticles, function(indexArticle){
    let recordImage = this.urlToImage;
    let recordTitle = this.title;
    let recordCategory = "News API : Top Headlines";
    let recordImpressions = Math.floor(Math.random()*1000);
    let recordLink = this.url;
  
    $("#main").append($('<article/>',{'class':'article'}).append(
        $('<section/>',{'class':'featuredImage'}).append(
            $("<img>").attr({
              src: recordImage,
              alt: ""})
          )
        )
        .append(
          $('<section/>',{'class':'articleContent'}).append(
            $("<a>").attr("href","#").click(function(){displayModal(apiArticles, indexArticle)}).append(
              $('<h3/>', {text: recordTitle}).append(
                $('<h6/>', {text: recordCategory})
              )
            )
          )
        )
        .append(
          $('<section/>',{'class':'impressions', text: recordImpressions})
        )
        .append(
          $('<div/>', {'class':'clearfix'})
        )
      );
  });
}

//Function to hide and clear modal
function closeModal(){
  $("#popUp").addClass("hidden").empty();
}

//Function to unhide modal
function openModal(){
  $("#popUp").removeClass("loader hidden");
}

//Function to go to next article inside modal
function nextArticle(list, index){
  if(index===(list.length-1)){
    currentIndex=0;
  } else {
    currentIndex++;
  }
  closeModal();
  displayModal(list,currentIndex);
}

//Function to trigger modal
function displayModal(list, index){
  
  currentIndex=index;
  let refresh=false;
  let proxyLink = herokuProxy + list[index].url;
  console.log(list[index].title, proxyLink, index);
 
  if (refresh){
    return false;
  }

  $("#popUp").append($('<a/>', {'href':'#', 'class':'closePopUp', text: 'X', 'onclick': 'closeModal()'}).css('font-size','10px').append(
     $('<div/>', {'class':'container'}).append(
      $('<h1/>', {text: list[currentIndex].title}).css('font-size','10px').append(
        $('<p/>', {'href': proxyLink}).append(
          $('<a/>', {'href':'#', 'class':'popUpAction', text: 'Read more from source'}).click(function(){
            nextArticle(list,currentIndex);
            refresh = true;
            return false;
          })
        )
      )
     )
    )
  )
  openModal();

}
