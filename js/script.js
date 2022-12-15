'use strict';

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts .post.active');
    
  for (let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);
 
  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log();

  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
}


//Generate Title List

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthor = '.post-author';

function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  let html = '';

  for (let article of articles){

    /* get the aricle id */
    const articleId = article.getAttribute('id');

    /* find the title element and get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HMTL of the link */

    const linkHTML = '<li><a href="#' + articleId + '"><span> '+ articleTitle + '</span></a></li>';
    console.log(linkHTML);

    /* add link to the list */ 
    html = html + linkHTML;



  }

  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}


generateTitleLinks();

function generateTags(){
  
  const allTags = {};
  
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  
  /* START LOOP: for every article: */
  for (let article of articles) {
    
    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    
    /* make html variable with empty string */
    let html = '';
    
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);
      
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);
    
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      console.log(tag);
    

      
      /* generate HTML of the link */
      const linkHTML = '<li> <a href="#tag-' + tag + '"> ' + tag + ' </a> </li> ';
      //* const linkHTML = '<li><a href="#tag-design">design</a></li>'; // 
      
      /* add generated code to html variable */
      html = html + linkHTML; 
    
      if(tag in allTags){
        allTags[tag]++;
      }
      else{
        allTags[tag]=1;
      }
  
    /* END LOOP: for each tag */
    }


    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
  }
  console.log(allTags);
  
  const tagsList = document.querySelector('.sidebar .list.tags');
  let html = '';
  for(const tag in allTags){
    const tagAmount = allTags[tag];
    let className = '';
    if(tagAmount < 3){
      className = 'tag-size-1';
    }
    else if(tagAmount < 6){
      className = 'tag-size-2';
    }
    else if (tagAmount < 9){
      className = 'tag-size-3';
    }
    else if (tagAmount < 12){
      className = 'tag-size-4';
    }
    else{
      className = 'tag-size-5';
    }
    const linkHTML = '<li> <a href="#tag-' + tag + '" class="'+ className +'"> ' + tag + ' </a> </li> ';
    html = html + linkHTML;
  }

  tagsList.innerHTML = html;
/* END LOOP: for every article: */
}


generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const tagLinksActives = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for(let tagLinksActive of tagLinksActives){
    /* remove class active */
    
    tagLinksActive.classList.remove('active');
  }/* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */
  const allTagLinks = document.querySelectorAll('a[href="'+ href +'"]');

  /* START LOOP: for each found tag link */
  for(let tagLink of allTagLinks) {
   
    /* add class active */
    tagLink.classList.add('active');

  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
} 

function addClickListenersToTags(){
  /* find all links to tags */
  const allLinksToTags = document.querySelectorAll('a[href^="#tag-"]');

  /* START LOOP: for each link */
  for (let allLinksToTag of allLinksToTags) {

    /* add tagClickHandler as event listener for that link */
    allLinksToTag.addEventListener('click', tagClickHandler);


  /* END LOOP: for each link */
  }
}

addClickListenersToTags();

//Add authors to articles


function generateAuthors(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  
  /* START LOOP: for every article: */
  for (let article of articles) {
    
    /* find tags wrapper */
    const authorWrapper = article.querySelector(optArticleAuthor);
    
    /* get tags from data-author attribute */
    const articleAuthor = article.getAttribute('data-author');
   
    /* generate HTML of the link */
    const linkHTML = '<li> <a href="#author-' + articleAuthor + '"> ' + articleAuthor + ' </a> </li> ';
    //* const linkHTML = '<li><a href="#tag-design">design</a></li>'; // 
      
    


    /* insert HTML of all the links into the tags wrapper */
    authorWrapper.innerHTML = linkHTML;
  }
  
  
/* END LOOP: for every article: */
}


generateAuthors();

function authorClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const author = href.replace('#author-', '');

  /* find all tag links with class active */
  const authorLinksActives = document.querySelectorAll('a.active[href="#author-"]');

  /* START LOOP: for each active tag link */
  for(let authorLinksActive of authorLinksActives){
    /* remove class active */
    
    authorLinksActive.classList.remove('active');
  }/* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */
  const allLinks = document.querySelectorAll('a[href="'+ href +'"]');

  /* START LOOP: for each found tag link */
  for(let authorLink of allLinks) {
   
    /* add class active */
    authorLink.classList.add('active');

  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
} 

function addClickListenersToAuthors(){
  /* find all links to tags */
  const allLinksToAuthors = document.querySelectorAll('a[href^="#author-"]');

  /* START LOOP: for each link */
  for (let allLinksToAuthor of allLinksToAuthors) {

    /* add tagClickHandler as event listener for that link */
    allLinksToAuthor.addEventListener('click', authorClickHandler);


  /* END LOOP: for each link */
  }
}

addClickListenersToAuthors ();

