
let cats= ['all'];
/* Main Loop */

const main = () => {
  

  fetch('/all').then((res) => {
    return res.json();
  }). then((articles) => {
    console.log(articles.entries());
    document.querySelector('#list').innerHTML='';
  for (const [index,article] of articles.entries()) {
    /* Appending to ul */
      
    const li = document.createElement('li');
    const img = document.createElement('img');
    img.src = article.thumbnail;
    const title = document.createElement('h3');
    const details = document.createElement('p');
    const titleText = document.createTextNode(article.title);
    const detailsText = document.createTextNode(article.details);
    const viewBtn = document.createElement('button');
    const viewBtnText = document.createTextNode('View');
    const editBtn = document.createElement('button');
    const editBtnText = document.createTextNode('Edit');
    const deleteBtn = document.createElement('button');
    const deleteBtnText = document.createTextNode('Delete');

    title.appendChild(titleText);
    details.appendChild(detailsText);
    viewBtn.appendChild(viewBtnText);
    editBtn.appendChild(editBtnText);
    deleteBtn.appendChild(deleteBtnText);
    li.appendChild(img);
    li.appendChild(title);
    li.appendChild(details);
    li.appendChild(viewBtn);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    li.setAttribute('category', article.category);
    li.setAttribute('id', article._id);
    li.className = 'cats';
    editBtn.setAttribute('class', 'edit');
    deleteBtn.setAttribute('class', 'delete')




    /* For Modal*/
    const modalContainer = document.createElement('div');
    modalContainer.setAttribute('id', 'modalBox');
    const modal = document.createElement('div');
    modal.setAttribute('id', 'modal');

    const head = document.createElement('div');
    const modalTitle = document.createElement('h3');
    const modalTitleText = document.createTextNode(article.title);
    modalTitle.appendChild(modalTitleText);
    head.appendChild(modalTitle);
    head.setAttribute('id', 'modHead');

    const mid = document.createElement('div');
    const modalImg = document.createElement('img');
    modalImg.setAttribute('id', 'modalImg');
    modalImg.src = article.image;
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
    const dateVal = new Date(article.time);
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
    viewBtn.addEventListener('click', (evt) => {
      modalContainer.style.display = 'block'; // Modal Display

      /* Map Stuff */

      const coords = article.coordinates;
      console.log(coords);
      const gmap = new google.maps.Map(map, {
        zoom: 12,
        center: coords,
      });
      // Marker
      new google.maps.Marker({
        position: coords,
        map: gmap,
        title: article.title,
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

    deleteBtn.addEventListener('click', (e) => {
    const delID = deleteBtn.parentElement.id;
    del(delID);
    })





    /* Categories*/
    if (!cats.includes(article.category)) {
      cats.push(article.category);
    }
  } // End of loop
  })
}

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

// For Location Data 

navigator.geolocation.getCurrentPosition((position) => {
 let coords = {};
  const latlngData = document.createElement('input');
            latlngData.setAttribute('type', 'hidden');
      latlngData.setAttribute('name', 'coordinates');

      

  // Get the coordinates of the current position.
  let lat = position.coords.latitude;
  let lng = position.coords.longitude;

  // Create a new map and place a marker at the device location.
 
  const gmap = new google.maps.Map(document.querySelector('#mapdata'), {
    zoom: 14,
      center: {lat: lat, lng: lng}
  });
  let marker=0;
  gmap.addListener('click', e=>{
    placeMarker(e.latLng, gmap)
  });
  const placeMarker = (latLng, map) => {
    marker ? marker.setPosition(latLng) :
    marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
    coords = JSON.stringify({
      'lat' : marker.getPosition().lat(),
      'lng' : marker.getPosition().lng()
    });
    gmap.panTo(latLng);
    
    latlngData.setAttribute('value', coords);
        document.querySelector('#inputForm').appendChild(latlngData);
  }
  const inputForm = document.querySelector('#inputForm');
  

  //posting form -> create new cat

  document.querySelector('#inputForm').addEventListener('submit', (evt) => {
  evt.preventDefault();
 
  const data = new FormData(evt.target);
  const fileElement = evt.target.querySelector('input[type=file]');
  const file = fileElement.files[0];
  data.append('file', file);
  console.log(data);
   console.log('append event called');

  const url = '/post';

  fetch(url, {
    method: 'post',
    body: data,
  }).then((resp) => {
    return resp.json();
  }).then((json) => {
    console.log(json);
    main();
  });

 
});

});
const del = (id) => {
     fetch(`/delete/${id}`, {
      method: 'delete'
    }).then((resp) => {
      return resp.json();
    }).then((json) => {
      console.log(json);
      main();
    });
}
main();

 

