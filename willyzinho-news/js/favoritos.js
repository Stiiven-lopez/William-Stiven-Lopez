/* ============================================================
   FAVORITOS.JS
   Solo se usa en favoritos.html.
   Guarda y lee los favoritos del usuario usando localStorage
   del navegador (clave "wz_favoritos"), y dibuja dos grillas:
   "Noticias recientes" (con el botón ☆ para guardar) y
   "Mis Favoritos" (lo que el usuario ya guardó).
   ============================================================ */

(function(){
  var STORAGE_KEY = 'wz_favoritos';

  var NEWS_DATA = [
    { id:'n1', img:'assets/img/court.svg', cat:'CRÓNICA', title:'EL QUINTETO QUE REESCRIBIÓ LA FINAL EN EL MINUTO 40', meta:'HOY · 08:12 · COPA METROPOLITANA' },
    { id:'n2', img:'assets/img/ball.svg', cat:'FICHAJES', title:'TITO SUÁREZ FIRMA CON RAYO NEGRO PARA LA LIGA URBANA', meta:'AYER · MERCADO' },
    { id:'n3', img:'assets/img/jersey.svg', cat:'CANTERA', title:'LA GENERACIÓN QUE VIENE PISANDO FUERTE', meta:'HACE 2 DÍAS · SUB-17' },
    { id:'n4', img:'assets/img/trophy.svg', cat:'ÁRBITROS', title:'NUEVOS CRITERIOS PARA LA DOBLE PENALIZACIÓN', meta:'HACE 3 DÍAS · REGLAMENTO' },
    { id:'n5', img:'assets/img/goal.svg', cat:'ENTREVISTA', title:'"EL FUTSAL SE GANA EN LA CABEZA"', meta:'HACE 4 DÍAS · PORTEROS' },
    { id:'n6', img:'assets/img/whistle.svg', cat:'RESULTADOS', title:'FÉNIX FS GOLEA Y SE ACERCA A LA CIMA', meta:'HACE 5 DÍAS · LIGA URBANA' }
  ];

  function getFavs(){
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function setFavs(arr){
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(arr)); } catch (e) {}
  }

  window.wzToggleFav = function(id){
    var favs = getFavs();
    var idx = favs.indexOf(id);
    if (idx === -1) { favs.push(id); } else { favs.splice(idx, 1); }
    setFavs(favs);
    renderAll();
  };

  function cardHTML(item, isFav){
    return '' +
      '<div class="news-card">' +
        '<div class="news-img">' +
          '<span class="news-cat">' + item.cat + '</span>' +
          '<button class="fav-toggle' + (isFav ? ' is-fav' : '') + '" onclick="wzToggleFav(\'' + item.id + '\')" title="' + (isFav ? 'Quitar de favoritos' : 'Guardar en favoritos') + '">' + (isFav ? '★' : '☆') + '</button>' +
          '<img src="' + item.img + '" alt="">' +
        '</div>' +
        '<div class="news-body">' +
          '<div class="news-meta"><span>' + item.meta + '</span></div>' +
          '<h3 class="display">' + item.title + '</h3>' +
        '</div>' +
      '</div>';
  }

  function renderAll(){
    var favs = getFavs();

    var recentGrid = document.getElementById('recentGrid');
    recentGrid.innerHTML = NEWS_DATA.map(function(n){ return cardHTML(n, favs.indexOf(n.id) !== -1); }).join('');

    var favItems = NEWS_DATA.filter(function(n){ return favs.indexOf(n.id) !== -1; });
    var favGrid = document.getElementById('favGrid');
    var favEmpty = document.getElementById('favEmpty');

    if (favItems.length === 0) {
      favGrid.style.display = 'none';
      favEmpty.style.display = 'block';
    } else {
      favEmpty.style.display = 'none';
      favGrid.style.display = 'grid';
      favGrid.innerHTML = favItems.map(function(n){ return cardHTML(n, true); }).join('');
    }
  }

  renderAll();
})();
