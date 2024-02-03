const imgFormunsplash = document.querySelector("#search-form-unsplash");
const qunsplash =  document.querySelector("#search-unsplash");
const nbPageunsplash =  document.querySelector("#page-unsplash");
const navpaginationunsplash = document.querySelector("#searchPagination-unsplash");
qunsplash.addEventListener("change", function(){nbPageunsplash.value='1'});
imgFormunsplash.addEventListener("submit", fetchImagesunsplash);
const limitunsplash = 25;

function fetchImagesunsplash(e) {
    
    e.preventDefault();
    const page = document.querySelector("#page-unsplash").value;;
    const searchTerm = document.querySelector(".search-unsplash").value;
    fetch(`https://api.unsplash.com/search/photos?page=${page}&query=${searchTerm}&client_id=${apikeyunsplash}&per_page=${limitunsplash}`)
    .then(response => {return response.json();})
    .then(resp => {
        console.log(resp);
        let maxPage = Math.ceil(resp.total / limitunsplash);
        let pageNbr = page;
        let hitsArray = resp.results;
        console.log('resultats ' +resp.results)
        showImagesunsplash(hitsArray);
        //if(maxPage > 20) maxPage =20;
        paginationunsplash(maxPage,pageNbr);
        const alertMsg = document.querySelector(".alert-msg-unsplash");
        if (hitsArray.length === 0) {
            alertMsg.innerHTML = " Essayer un autre mot";
            } else {
            alertMsg.innerHTML = "";
        }
        
        const text = document.querySelector(".search-text-unsplash");
        text.innerHTML = `<h2>${searchTerm}: <small>page ${page} / ${maxPage}</small></h2>`; //${resp.total} trouvé(s).
        document.querySelector('#bottom-unsplash').scrollIntoView();
        if (searchTerm && hitsArray.length === 0) {
            text.innerHTML = `
            <h1> ${searchTerm}:  ${hitsArray.length} </h1>
            `;
        }
        
    }).
    catch(err => console.log('err:' + err));
}



function showImagesunsplash(hitsArray) {
    const results = document.querySelector(".results-unsplash");
    //console.log(results);
    
    
    let output = '<div class="flex-images">';
    hitsArray.forEach(imgData => {
    console.log(imgData.id +' '+ imgData.slug)
    let imageDesc = imgData.slug.replace('-'+imgData.id, ''); 
    console.log(imageDesc)
        output += `
        <div class="col-4 item" data-w="${imgData.width}"  data-h="${imgData.height}">
        <a href="${imgData.urls.regular}" data-name="${imageDesc}" class="unsplashUpload">upload</a>
        <img src="${imgData.urls.regular}"/>
        </div>
        `;
    });
    document.querySelector('.results-unsplash').innerHTML = output;
    new setUploadLinksunsplash();
    new flexImages({ selector: '.flex-images', rowHeight: 140 });
}

// affichage
function callpageunsplash(position) {
    nbPageunsplash.value = position;

}

// boutons précédent/suivant
function paginationunsplash(totalPages, numpage) {
    let btnTag = "";
    let totalP = totalPages;
    // if page is greater than 1  then show the prev button
    // display prev button
    if (numpage > 1) {
        btnTag += `<button class="btn prev"onClick="callpageunsplash(${numpage - 1})">&lsaquo;</button>`;
    }
    
    if (numpage < totalPages ) {
        btnTag += `<button class="btn next"onClick="callpageunsplash(${++numpage})">&rsaquo;</button>`;
    }
    
    navpaginationunsplash.innerHTML = btnTag;
}

// demande de fichier
function setUploadLinksunsplash() {  
    let myLinks= document.querySelectorAll('a.unsplashUpload')
    for (let lks of myLinks) {
        lks.addEventListener('click',function(e){
            e.preventDefault(); 
            e.stopPropagation();
            uploadImageunsplash('?banque=unsplash&url='+lks.href+'&desc='+lks.dataset.name);
        }, false);
    }
    
}

// affichage fichier demandé et codes d'insertions
function dialogUploadedImageunsplash(imgArray) {
    const succeedUpload = document.querySelector("#medias-table tbody tr:first-child td:first-child");
    // on garde juste le nom du fichier
    let file = imgArray[3].replace(/\.[^/.]+$/, "");
    let done = `<div id="justUploaded-unsplash">
    <dialog open>
    <h2>Image <i>${file}</i></h2>
    <div><b>Lien:</b><code>${imgArray[5]}.jpg</code><div data-copy="${imgArray[5]}" title="Copier le lien dans le presse-papier" class="ico">&#128203;
    <div>lien copié</div>
    </div></div>
    <div><b>HTML:</b> 
    <code>&lt;img src="${imgArray[5]}.jpg" alt="${file} uploaded@pixabay" &gt;</code>
    <div data-copy="<img src='${imgArray[5]}.jpg' alt='${imgArray[3]} uploaded@unsplash'>" title="Copier le code dans le presse-papier" class="ico">&#128203;
    <div>code copié</div>
    </div> 
    
    </div>
    <div><b>Preview:</b> <img src="${imgArray[1]}${imgArray[3]}" alt="image prewiew"></div>
    <form method="dialog">
    <button type="button" onclick="this.closest('dialog').removeAttribute('open')">OK</button>
    </form>
    </dialog>
    </div>
    `;
   let addtr=`
    <tr>
        <td>
            <input type="checkbox" name="idFile[]" value="${imgArray[3]}">
        </td>
        <td class="icon">
            <a class="overlay" title="${imgArray[7]}" href="${imgArray[5]}">
                <img alt="${imgArray[7]}" src="../../data/${imgArray[8]}/${imgArray[7]}.tb.${imgArray[6]}" class="thumb">
            </a>
        </td>
        <td>
            <a class="imglink" onclick="this.target='_blank'" title="${imgArray[7]}" href="../../${imgArray[5]}">
                ${imgArray[3]}
            </a>
            <div data-copy="${imgArray[5]}" title="Copier le lien dans le presse-papier" class="ico">
                📋
                <div>Lien copié</div>
            </div>
            <div data-rename="../../${imgArray[5]}" title="Renommer fichier" class="ico">✎</div>
                <br>Miniature : 
                <a onclick="this.target='_blank'" title="${imgArray[7]}" href="../../data/${imgArray[8]}/${imgArray[7]}.tb.${imgArray[6]}">
                    ${imgArray[7]}.tb.${imgArray[6]}
                </a>
            <div data-copy="data/${imgArray[8]}/${imgArray[7]}.tb.${imgArray[6]}" title="Copier le lien dans le presse-papier" class="ico">
                📋
                <div>Lien copié</div>
            </div>
        </td>
        <td>.${imgArray[6]}</td>
        <td>
            <br></td>
        <td></td>
        <td>Now</td>
    </tr>`;
    // insertion dans tbody pour beneficier de la fonction copy/paste native . affichage
    succeedUpload.insertAdjacentHTML('beforeend', done);
    filesTable.insertAdjacentHTML('beforeend',addtr);
    
}

// telechargement depuis le serveur distant de pixabay
function uploadImageunsplash(ziHref) {
    let protocol=window.location.protocol;
    let domain=window.location.host;
    let url = window.location.pathname;
    
    fetch(protocol+url+ziHref).
    then(response => {        
    return response.json();}).
    then(resp => {
        console.log(resp);
        dialogUploadedImageunsplash(resp);
    }).
    catch(err => console.log('err:' + err));
    return
}

