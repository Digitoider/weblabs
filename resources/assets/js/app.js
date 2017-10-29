
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('example', require('./components/Example.vue'));

const app = new Vue({
    el: '#app'
});



function addCommentToDOM(postId, commentHTML, initial = false){
  if(initial) return;
  // var posts = document.getElementsByClassName('post');
  // var post;
  // for(var i = 0; i < posts.length; i++){
  //   var currPostId = posts[i].getAttribute('post-id');
  //   if(currPostId == postId){
  //     post = posts[i];
  //     break;
  //   }
  // }
  var post = document.getElementById(postId);

  var commentSection = post.getElementsByClassName('post__comments-container')[0];
  commentSection.innerHTML += commentHTML;
  alert('added');
}

window.onload = function(){
  alert(squire(5));
  window.addCommentToDOM = addCommentToDOM;// вот это говно нужно, чтобы V8 видел функцию. Я хз почему!!!
	if(window.location.pathname == '/register'){
		// alert('we are registering');
		var login = document.getElementById('email');

		//console.log(login);

		login.onblur = checkLoginAsync;
		login.onfocus = () => {
			document.getElementById('ajaxResponse_div')
							.textContent = '';
		};
	}

  if(window.location.pathname == '/home'){

    var sendPostButton = document.getElementById('sendPostButton');    
    if(sendPostButton){
      sendPostButton.onclick = addPostAsync;
    }

    var updatePostButton = document.getElementById('updatePostButton');
    if(updatePostButton){
      updatePostButton.onclick = updatePostAsync;
    }
    addEventListenersOnSendComment();
    addEventListenersOnPostEdit();
    addEventListenersOnPostDelete();
  }
};

function addCommentAsync(e){
  var postId = e.target.getAttribute('post-id');

  var commentTextAreas = document.getElementsByClassName('post__comment-textarea');
  var commentTextArea;
  for(var i = 0; i < commentTextAreas.length; i++){
    var id = commentTextAreas[i].getAttribute('post-id');
    if(id == postId){
      commentTextArea = commentTextAreas[i];
      break;
    }
  }

  var commentText = commentTextArea.value;

  commentTextArea.value = "";
  
  // return console.log(commentText);

  var script = document.createElement('script');
  script.type = 'text/javascript';
  var url = `/post/${ postId }/add/comment/?commentText=${ commentText }`;

  // alert('sending comment to ' + url);

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);

  addCommentToDOM(1, "null", true);
}

var editingPostId;
function updatePostAsync(){
  var title = document.forms.editPost.title.value;
  var body = document.forms.editPost.body.value;
  var postId = document.forms.editPost.editId.value;

  var xml = `<title>${ title }</title><body>${ body }</body>`;
  // alert(xml);

  var csrf_token = document.getElementsByName('_token')[0].value;

  var xhr = new XMLHttpRequest();
  xhr.open('POST', `/admin/update/post/${ postId }`, true);

  xhr.setRequestHeader('Content-Type', 'text/xml');
  xhr.setRequestHeader('X-CSRF-TOKEN', csrf_token);

  xhr.send(xml);

  editingPostId = postId;

  xhr.onreadystatechange = function(){

    if(xhr.readyState != 4) return;

    alert(xhr.responseText);

    var post = document.getElementById( editingPostId );
    post.getElementsByClassName('post__title-text')[0].textContent = title;
    post.getElementsByClassName('post__text')[0].textContent = body;
    $('#editPostModal').modal({hide: true});
    // Update post DOM

  };
}

function editPost(event){
  
  // console.log(event.target.parentElement.parentElement.parentElement.textNode);
  
  var clickedButton = event.target;
  var postId = clickedButton.getAttribute('post-id') | clickedButton.parentElement.getAttribute('post-id'); 
  // console.log(postId);
  

  var posts = document.getElementsByClassName('post');
  var post;
  for(var i = 0; i < posts.length; i++){
    currentPostId = posts[i].getAttribute('post-id');
    if(currentPostId == postId){
      post = posts[i];
      break;
    }
  }

  var title = post.getElementsByClassName('post__title-text')[0].textContent.trim();
  var body = post.getElementsByClassName('post__text')[0].textContent.trim();

  console.log(`title: ${ title }; body: ${ body }`);
  
  var editForm = document.forms.editPost;
  editForm.title.value = title;
  editForm.body.value = body;
  editForm.editId.setAttribute('value', `${ postId }`);
  console.log(postId);
  $('#editPostModal').modal({show: true});
}

function deletePost(event){

  // var xml = `<id>${ postId }</id>`;
  
  // alert(xml);

  var csrf_token = document.getElementsByName('_token')[0].value;

  var postId = event.target.parentElement.getAttribute('post-id');
  // console.log(event);
  // alert(postId);
  // return;

  var xhr = new XMLHttpRequest();
  xhr.open('POST', `/admin/delete/post/${ postId }`, true);

  xhr.setRequestHeader('Content-Type', 'text/xml');
  xhr.setRequestHeader('X-CSRF-TOKEN', csrf_token);

  // xhr.send(xml);
  xhr.send();

  xhr.onreadystatechange = function(){

    if(xhr.readyState != 4) return;

    if(xhr.status == 200){

      var posts = document.getElementsByClassName('post');
      for(var i = 0; i < posts.length; i++){
        var post = posts[i];
        var currentPostId = post.getAttribute('post-id');
        if(currentPostId == postId){
          post.outerHTML = '';
          break;
        }
      }

      alert('Post was successifully deleted!');
    }
  };

}

function checkLoginAsync() {
	var login = document.getElementById('email');
  
  var xhr = new XMLHttpRequest();
  var isAsync = true;
  xhr.open('POST', '/api/loginExists', isAsync);

  var data = {
  	email: login.value
  };

  var csrf_token = document.getElementsByName('_token')[0].value;

  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('X-CSRF-TOKEN', csrf_token);

  xhr.send(JSON.stringify(data));
  
  xhr.onreadystatechange = function(){
      
      if (xhr.readyState != 4) return;

      $ajaxResponse_div = document.getElementById('ajaxResponse_div');
      $ajaxResponse_div.textContent = xhr.responseText;

      // alert(xhr.responseText);
  };
}

function addPostAsync(){
  var title = document.forms.post.title.value;
  var body = document.forms.post.body.value;

  var xml = `<title>${ title }</title><body>${ body }</body>`;
  // alert(xml);

  var csrf_token = document.getElementsByName('_token')[0].value;

  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/admin/create/post', true);

  xhr.setRequestHeader('Content-Type', 'text/xml');
  xhr.setRequestHeader('X-CSRF-TOKEN', csrf_token);

  xhr.send(xml);

  xhr.onreadystatechange = function(){

    if(xhr.readyState != 4) return;

    var posts_div = document.getElementById('posts');
    var msgHTML = posts_div.innerHTML;
    posts_div.innerHTML = xhr.responseText + msgHTML;

    // upload photo

    var file = document.forms.post.image.files[0];
    if (file) {
      
      var addedPost = document.getElementById('posts').firstChild;

      var url = upload(file, addedPost.id);

      console.log(url);

      var img = document.createElement('img');
      img.src = url;

      
      var postPhoto_div = addedPost.getElementsByClassName('post__photo')[0];
      postPhoto_div.innerHTML = "";
      postPhoto_div.appendChild(img);
    }



    addEventListenersOnSendComment();
    addEventListenersOnPostEdit();
    addEventListenersOnPostDelete();
  };

}

function upload(file, postId) {

  var xhr = new XMLHttpRequest();
  
  var csrf_token = document.getElementsByName('_token')[0].value;
  
  // обработчик для закачки
  xhr.onprogress = function(event) {
    console.log(event.loaded + ' / ' + event.total);
  };
  

  xhr.open("POST", "/admin/upload/photo/" + postId, false);
  xhr.setRequestHeader('X-CSRF-TOKEN', csrf_token);
  var formData = new FormData();
  formData.append("image", file);
  xhr.send(formData);

  if (xhr.status == 200) {
      console.log("success: photo is saved");

      return xhr.responseText;
  }

  console.log(xhr.responseText + ": " + xhr.status);

  return 'storage/noimage.png';
}

function addEventListenersOnPostDelete(){
  var deletePostButtons = document.getElementsByClassName('post__delete');
  
  for(var i = 0; i < deletePostButtons.length; i++){
    deletePostButtons[i].onclick = deletePost;
  }
}

function addEventListenersOnPostEdit(){
  var editPostButtons = document.getElementsByClassName('post__edit');
  
  for(var i = 0; i < editPostButtons.length; i++){
    editPostButtons[i].onclick = editPost;
  }
}

function addEventListenersOnSendComment(){
  var sendCommentButtons = document.getElementsByClassName('post__send-comment-button');
  for(var i = 0; i < sendCommentButtons.length; i++){
    var item = sendCommentButtons[i].firstChild;
    item.onclick = addCommentAsync;
  }
}