
// readyState	Holds the status of the XMLHttpRequest.
// 0: request not initialized
// 1: server connection established
// 2: request received
// 3: processing request
// 4: request finished and response is ready
//
// ----------------------------
//
// status	Returns the status-number of a request
// 200: "OK"
// 403: "Forbidden"
// 404: "Not Found"
// For a complete list go to the Http Messages Reference

var products_list;

function callAPI(callback, method, url){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if(this.readyState == 4){
      callback(JSON.parse(this.responseText));
    }
  }
  xhttp.open(method, url);
  xhttp.send();
}

callAPI(renderProducts, 'GET', 'https://my-json-server.typicode.com/buithetuan/json/products')
// lấy dữ liệu từ API product

function renderProducts(renders){
  let html = '';
  // vòng lặp duyệt qua tất cả phần từ trong API product
  // for(let render of renders){
  for(let i=0; i<renders.length; i++){
    render = renders[i];
    html+= '<div class="col-lg-4 col-6">'
    html+= '  <div class="product__item">'
    html+= '    <div class="product__button-box">'
    html+= '      <a class="product__button product__button--add-to-cart">'
    html+= '        <i class="fas fa-cart-plus"></i>'
    html+= '      </a>'
    html+= '      <a onclick="product_detail('+render.id+')" class="product__button product__button--detail" data-toggle="modal" data-target="#myModal">'
    html+= '        <i class="fas fa-eye"></i>'
    html+= '      </a>'
    html+= '    </div>'
    html+= '    <div class="product__image-box">'
    html+= '      <img src="'+render.image_first+'" alt="" class="product__image--first">'
    html+= '      <img src="'+render.image_second+'" alt="" class="product__image--second">'
    html+= '    </div>'
    html+= '    <div class="product__text-box">'
    html+= '      <h3 class="product__name">'+render.name+'</h3>'
    html+= '      <h4 class="product__description">'+render.description+'</h4>'
    html+= '      <h3 class="product__price">'+render.price+'</h3>'
    html+= '    </div>'
    html+= '  </div>'
    html+= '</div>'
  }

  let get_id = document.querySelectorAll(".product .row")[0];
  get_id.innerHTML = html;

}

//--------------detail product-----------------//

// mở kết nối tới API
function get_data_from_url(){
  var http_req = new XMLHttpRequest();
    http_req.open("GET",'https://my-json-server.typicode.com/buithetuan/json/products',false);
    http_req.send();
    return http_req.responseText;
}

// gán chuỗi JSON từ API vào product_list
products_list = JSON.parse(get_data_from_url());

//-----------------get product theo id------------------//
function product_detail(get_id) {
  let render_id = products_list.filter(function(result){
    return result.id == get_id;
  })
  let html = '';

  for (var i = 0; i < render_id.length; i++) {
    let render = render_id[i];

    html+= '  <button type="button" class="close" data-dismiss="modal">&times;</button>'
    html+= '  <div class="modal__image-box">'
    html+= '    <img class="modal__image" src="'+render.image_modal+'" alt="">'
    html+= '  </div>'
  
    html+= '    <div class="modal--left"></div>'
  
  
    html+= '    <div class="modal--right">'
    html+= '      <div class="modal__body">'
    html+= '        <h3 class="product__name product__name--big">'+render.name+'</h3>'
    html+= '        <h4 class="product__description">'+render.description+'</h4>'
    html+= '        <h3 class="product__price">'+render.price+'</h3>'
    html+= '        <p class="paragraph">'+render.full_description+'</p>'
    html+= '        <button class="btn btn-primary mr-3"><i class="fa fa-shopping-cart" aria-hidden="true"></i>&nbsp;&nbsp;ADD TO CART</button>'
    html+= '        <button class="btn btn-warning"><i class="far fa-star"></i>&nbsp;&nbsp;ADD TO FAVORITE</button>'
    html+= '      </div>'

    html+= '    </div>'
    

}

  let get = document.getElementById('products_modal');
  get.innerHTML = html;
}
