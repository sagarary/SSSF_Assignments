
let extData = [];
fetch('cats.json')
  .then((response) => response.text())
  .then((data) => {
   extData = JSON.parse(data);
  })
  .then(() => main());


/* Main Loop */
const main = () => {

  let cats = new Array(); // Storing cats for filter, cat_all for all //
cats.push('all');
  for (const pic of extData.picArray) {
    /* Appending to ul */

    const li = document.createElement('li');
    const img = document.createElement('img');
    img.src = pic.thumbnail;
    const title = document.createElement('h3');
    const details = document.createElement('p');
    const titleText = document.createTextNode(pic.title);
    const detailsText = document.createTextNode(pic.details);
    const btn = document.createElement('button');
    const btnText = document.createTextNode('View');
    title.appendChild(titleText);
    details.appendChild(detailsText);
    btn.appendChild(btnText);
    li.appendChild(img);
    li.appendChild(title);
    li.appendChild(details);
    li.appendChild(btn);
    li.setAttribute('category', pic.category);
    li.setAttribute('id', pic.id);
    li.className = 'cats';


    /* For Modal*/
    const modalContainer = document.createElement('div');
    modalContainer.setAttribute('id', 'modalBox');
    const modal = document.createElement('div');
    modal.setAttribute('id', 'modal');

    const head = document.createElement('div');
    const modalTitle = document.createElement('h3');
    const modalTitleText = document.createTextNode(pic.title);
    modalTitle.appendChild(modalTitleText);
    head.appendChild(modalTitle);
    head.setAttribute('id', 'modHead');

    const mid = document.createElement('div');
    const modalImg = document.createElement('img');
    modalImg.setAttribute('id', 'modalImg');
    modalImg.src = pic.image;
    const map = document.createElement('div');
    map.setAttribute('id', 'map');
    const mapDiv = document.createElement('div');
    mapDiv.setAttribute('id', 'mapDiv');
    mapDiv.appendChild(map);
    mid.appendChild(modalImg);
    mid.appendChild(mapDiv);
    mid.setAttribute('id', 'modMid');

    const bot = document.createElement('div');
    const modalClose = document.createElement('button');
    const modalCloseText = document.createTextNode('Close');
    modalClose.appendChild(modalCloseText);
    const date = document.createElement('h3');
    const dateVal = new Date(pic.time);
    const dVal = document.createTextNode(dateVal.toDateString());
    date.appendChild(dVal);
    bot.appendChild(date);
    bot.appendChild(modalClose);
    bot.setAttribute('id', 'modBot');

    modal.appendChild(head);
    modal.appendChild(mid);
    modal.appendChild(bot);
    modalContainer.appendChild(modal);

    document.querySelector('ul').appendChild(li);
    document.querySelector('body').appendChild(modalContainer);

    mapDiv.style.height = '400px';
    mapDiv.style.width = '400px';
    map.style.height = '400px';
    map.style.width = '400px';

    /* Events*/
    // Open  Modal
    btn.addEventListener('click', (evt) => {
      modalContainer.style.display = 'block'; // Modal Display

      /* Map Stuff */

      const coords = pic.coordinates;
      const gmap = new google.maps.Map(map, {
        zoom: 12,
        center: coords,
      });
      // Marker
      new google.maps.Marker({
        position: coords,
        map: gmap,
        title: pic.title,
      });
    });

    // Close Modal
    modalClose.addEventListener('click', (e) => {
      modalContainer.style.display = 'none';
    });
    window.addEventListener('click', (event) => {
      if (event.target == modalContainer) {
        modalContainer.style.display = 'none';
      }
    });


    /* Categories*/
    if (!cats.includes(pic.category)) {
      cats.push(pic.category);
    }
  } // End of loop



/* Select Menu*/

const selectList = document.createElement('select');
selectList.id = 'categories';
const selectDiv = document.querySelector('#selectBox');
for(let cat of cats){
  const option = document.createElement('option');
  option.value = cat;
  option.text = cat;
  selectList.appendChild(option);
}
 
selectDiv.appendChild(selectList);
const catBtn = document.createElement('button');
const catBtnText = document.createTextNode('Filter');
catBtn.appendChild(catBtnText);
selectDiv.appendChild(catBtn);
catBtn.addEventListener('click', (evt) => {
  const selCat = document.querySelector('#categories').value;

  // Cat Filter

  const all = document.querySelectorAll('.cats');
  for (let one of all) {
    one.style.display = 'block';
    const selVal = one.getAttribute('category');
    if (selVal != selCat && selCat != 'all') {
      one.style.display = 'none';
    }
  }
});

/* Sort */

const sortBtn = document.createElement('button');
const sortBtnText = document.createTextNode('Sort');
sortBtn.appendChild(sortBtnText);
selectDiv.appendChild(sortBtn);

sortBtn.addEventListener('click', (evt) => {
  const list = document.querySelector('ul');
  const all = Array.from(list.childNodes).slice(1);
  //console.log(list.childNodes);
  //console.dir(all);
  all.map((x) => list.removeChild(x))
    .sort((x, y) => {
      return x.id - y.id;
    })
    .forEach((x) => {
      list.appendChild(x);
    });
console.log(all);
  });
};
