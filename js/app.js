//API Authentication
const newsApiKey = "a702b8a38878465eb7cade2dcb0b07a1";
let url = "https://newsapi.org/v2/top-headlines?";
let searchOptions = {
  //apiKey goes last
  country:"mx",
  apiKey: newsApiKey
}

//Auxiliary variable
var dossier=[];

//Populating URL
for(let key in searchOptions){
  url += "&" + key + "=" + searchOptions[key];
}
url=url.replace('?&','?');
console.log(url);

//Extracting API feedback
$.get(url).done(function(feedback){
  if(feedback.totalResults === 0){
    console.log("No news");
  } else {
    dossier = feedback.articles
    console.log(dossier.length);
    loadArticle(dossier);
  }
})

//Function to process JSON and DOM interaction
function loadArticle(apiArticles){
  $.each(apiArticles, function(){
    let recordImage = this.urlToImage;
    let recordTitle = this.title;
    let recordCategory = "News API : Top Headlines";
    let recordImpressions = Math.floor(Math.random()*1000);
    let recordLink = this.url;
  
    //console.log(recordImage, recordTitle);

    /* S T A R T   O V E R*/
    $("#main").append($('<article/>',{'class':'article'}).append(
        $('<section/>',{'class':'featuredImage'}).append(
            $("<img>").attr({
              src: recordImage,
              alt: ""})
          )
        )
        .append(
          $('<section/>',{'class':'articleContent'}).append(
            $("<a>").attr("href","#").click(function(){displayModal(recordLink)}).append(
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

//Function to trigger modal
function displayModal(url){
  console.log(url);
  //$(".loader").css("display", "block");
  //popUp.loader.style.display = "block";
  $("#popUp").toggleClass("popUpAction");
}