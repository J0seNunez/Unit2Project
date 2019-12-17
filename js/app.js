//API Authentication
const newsApiKey = "a702b8a38878465eb7cade2dcb0b07a1";
let newsApiUrl = "https://newsapi.org/v2/top-headlines?";
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
  $.each(apiArticles, function(){
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
            $("<a>").attr("href","#").click(function(){displayModal(apiArticles, indexArticles(apiArticles,recordLink))}).append(
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
  $("#popUp").addClass("loader hidden").empty();
}

//Function to unhide modal
function openModal(){
  $("#popUp").removeClass("loader hidden");
}

//Function to index articles
function indexArticles(articleObj, articleUrl){
  let pos = articleObj.map(function(e){
    return e.url;
  }).indexOf(articleUrl);
  return pos;
}

//Function to call modal for given index
function useIndex(articleObj, articleIndex){
  if(articleIndex===articleObj.length){
    articleIndex=0;
  } else {
    articleIndex++;
  }
  let pos = articleObj.map(function(e,articleIndex){
    return [e.url, e.title]
  });
  closeModal();
  displayModal(pos[0],pos[1]);//generates circular reference
  
}

//Function to trigger modal
function displayModal(list, index){
  console.log(list);

//Continue here to change this perspective from link and title parameters to list and index parameters
//to try to squash the circular reference

  $("#popUp").append($('<a/>', {'href':'#', 'class':'closePopUp', text: 'X', 'onclick': 'closeModal()'}).css('font-size','10px').append(
     $('<div/>', {'class':'container'}).append(
      $('<h1/>', {text: title}).css('font-size','10px').append(
        $('<p/>', {'href': linkRef}).append(
          $('<a/>', {'href':'#', 'class':'popUpAction', 'onclick': useIndex(dossier,indexArticles(dossier,linkRef)), text: 'Read more from source'})
        )
      )
     )
    )
  )

  openModal();
}
