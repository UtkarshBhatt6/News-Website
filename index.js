
let source = 'bbc-news';
let apiKey = '9de90257e2e74c11a9c8c171fca5fc3e';
let switchCNN=document.getElementById('searchTxt');

newsAccordion = document.getElementById('newsAccordion');
const xhr = new XMLHttpRequest();
xhr.open('GET', `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`, true);

xhr.onload = function () {
  if (this.status === 200) {
    let json = JSON.parse(this.responseText);
    let articles = json.articles
    console.log(articles);
    let newsHtml = "";
    articles.forEach(function (element, index) {

      let news = `
            <div class="accordion-item">
            <h2 class="accordion-header" id="heading${index}">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
               <b>Breaking News ${index + 1}:</b> ${element.title}
              </button>
            </h2>
            <div id="collapse${index}" class="accordion-collapse collapse " aria-labelledby="heading${index}" data-bs-parent="#accordionExample">
              <div class="accordion-body">
                ${element.content}. <a href="${element.url}" target="_blank" ><strong>Click here for full news</strong></a>
              </div>
            </div>`
      newsHtml += news;
    });
    newsAccordion.innerHTML = newsHtml;
  }
  else {
    console.log("Some error occured");
  }
}
let search=document.getElementById('searchTxt');
search.addEventListener("input",function(){
   let inputVal=search.value;
   let newsCards=document.getElementsByClassName('accordion-item');
   Array.from(newsCards).forEach(function(element){
       let cardTxt=element.getElementsByTagName('button')[0].innerText;
       if(cardTxt.includes(inputVal)){
         element.style.display="block";
       }
       else{
        element.style.display="none";
       }
   })
})



xhr.send();