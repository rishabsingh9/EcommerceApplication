
var form=document.getElementById('form');
form.addEventListener('submit',createPost);
function createPost(e){
    e.preventDefault();
    let obj={
        postLink:document.getElementById('Link').value,
        postDescription:document.getElementById('description').value
    }
    axios.post('http://localhost:3000/user/add-post',obj)
    .then(response=>{
        console.log(response.data.newPost);
        displayPost(response.data.newPost);
    })
    .catch(err=>{
        console.log(err);
    })
}
window.addEventListener('DOMContentLoaded',()=>{
    axios.get('http://localhost:3000/user/get-posts')
   .then(dts=>{
    let len=dts.data.newPost.length
    for(let i=0;i<len;i++){
        console.log(dts.data.newPost[i].id)
      displayPost(dts.data.newPost[i]);
    getComments(dts.data.newPost[i].id);
     }
  })
  .catch(err=>console.log(err));
})


function displayPost(obj) {
    let postFeed = document.getElementById('postFeed');

    let postWrapper = document.createElement('div');
    postWrapper.classList.add('post-wrapper');

   
    let postContainer = document.createElement('div');
    postContainer.setAttribute('id',`${obj.id}`);
    postContainer.classList.add('post-container');


    let postBox = document.createElement('div');
    postBox.classList.add('post-box');
    console.log("inside display",obj.id)
    postBox.innerHTML = `<p><img src="${obj.postLink}"></p><br><p class="user-description"><Strong>User</strong>- ${obj.postDescription}</p><br><h3>Comments</h3>`;


    let inputbox = document.createElement('input');
    inputbox.setAttribute('id', 'comment');
    inputbox.setAttribute('placeholder', 'Write a comment');

    // Create a button to submit comments
    var btn = document.createElement('button');
    btn.textContent = "Send";

    // Create a container for comments
    let commentsContainer = document.createElement('div');
    commentsContainer.classList.add('comments-container');

    btn.addEventListener('click', () => {
        const commentText = inputbox.value.trim();

        if (commentText !== '') {
            // Create a new comment element
            let commentElement = document.createElement('div');
            commentElement.innerHTML = `<strong>Anonymous-</strong>${commentText}`;

            // Append the comment element to the comments container
            commentsContainer.appendChild(commentElement);

            // Clear the input box
            inputbox.value = '';
            axios.post('http://localhost:3000/user/add-comment',{
                postId:obj.id,
                text:commentText
            })
            .then(response=>{
                console.log(response.data)
            })
            .catch(err=>{
                console.log(err);
            })
        }
    });

    // Append the post elements to the post container
    postContainer.appendChild(postBox);
    postContainer.appendChild(inputbox);
    postContainer.appendChild(btn);
    postContainer.appendChild(commentsContainer);


    // Append the post container to the post feed
    postFeed.appendChild(postContainer);
}

function getComments(postId){
    axios.get(`http://localhost:3000/user/get-comments/${postId}`)
    .then(response=>{
        console.log("comments",response.data.newComment);
        displayComments(response.data.newComment,postId);
    })
    .catch(err=>{
        console.log(err);
    })
}
function displayComments(comments, postId) {
    // Find the post container for the given postId and append comments there
   let postContainer=document.getElementById(`${postId}`);
   let commentsContainer = document.createElement('div');
    commentsContainer.classList.add('comments-container');
    
    let len=comments.length;
    for(let i=0;i<len;i++){
      let commentElement = document.createElement('div');
      commentElement.innerHTML = `<strong>Anonymous</strong> -${comments[i].comment}`;
      commentsContainer.appendChild(commentElement)
     postContainer.appendChild(commentsContainer);
    }



  }

// var form=document.getElementById('form');
// form.addEventListener('submit',createPost);
// function createPost(e){
//     e.preventDefault();
//     let obj={
//         postLink:document.getElementById('Link').value,
//         postDescription:document.getElementById('description').value
//     }
//     axios.post('http://localhost:3000/user/add-post',obj)
//     .then(response=>{
//         console.log(response.data.newPost);
//         displayPost(response.data.newPost);
//     })
//     .catch(err=>console.log(err));
// }
// window.addEventListener('DOMContentLoaded',()=>{
//     axios.get('http://localhost:3000/user/get-posts')
//    .then(dts=>{
//     let len=dts.data.newPost.length
//     for(let i=0;i<len;i++){
//         console.log(dts.data.newPost[i].id)
//       displayPost(dts.data.newPost[i]);
//     getComments(dts.data.newPost[i].id);
//      }
//   })
//   .catch(err=>console.log(err));
// })


// function displayPost(obj) {
//     let postFeed = document.getElementById('postFeed');

//     let postContainer = document.createElement('div');
//     postContainer.setAttribute('id',`${obj.id}`);
//     postContainer.classList.add('post-container');

//     // Create a box for the post
//     let postBox = document.createElement('div');
//     postBox.classList.add('post-box');
//     console.log("inside display",obj.id)
//     postBox.innerHTML = `<p><img src="${obj.postLink}"></p><br><p><Strong>User</strong>- ${obj.postDescription}</p><br><h3>Comments</h3>`;

//     // Create an input box for comments
//    let cmntbtn=document.createElement('button');
//    cmntbtn.textContent="Comment";

   
//    let inputbox = document.createElement('input');
//    inputbox.setAttribute('id', 'comment');
//    inputbox.setAttribute('placeholder', 'Write a comment');
//    var btn = document.createElement('button');
//     btn.textContent = "Send";

//    cmntbtn.addEventListener('click',()=>{
//     postContainer.appendChild(inputbox);
//     postContainer.appendChild(btn);
  
//    })

//     let commentsContainer = document.createElement('div');
//     commentsContainer.classList.add('comments-container');

//     btn.addEventListener('click', () => {
//         const commentText = inputbox.value.trim();

//         if (commentText !== '') {
//             // Create a new comment element
//              displayComments(commentText,obj.id);
//             inputbox.value = '';
//             axios.post('http://localhost:3000/user/add-comment',{
//                 postId:obj.id,
//                 text:commentText
//             })
//             .then(response=>{
//                 console.log(response.data)
//             })
//             .catch(err=>{
//                 console.log(err);
//             })
//         }
//     });
//     postContainer.appendChild(postBox);
//     postContainer.appendChild(cmntbtn);
//    // postContainer.appendChild(commentsContainer);
//     postFeed.appendChild(postContainer);
// }

// function getComments(postId){
//     axios.get(`http://localhost:3000/user/get-comments/${postId}`)
//     .then(response=>{
//         //console.log("comments",response.data.newComment);
//         let len2=response.data.newComment.length;
//         for(let i=0;i<len2;i++){
//           console.log(response.data.newComment[i]);
//         displayComments(response.data.newComment[i].comment,postId);
//         }
//     })
//     .catch(err=>{
//         console.log(err);
//     })
// }
// function displayComments(comment, postId) {
//    let postContainer=document.getElementById(`${postId}`);
//    let commentsContainer = document.createElement('div');
//     commentsContainer.classList.add('comments-container');
    
//       let commentElement = document.createElement('div');
//       commentElement.innerHTML = `<strong>Anonymous</strong> -${comment}`;
//       commentsContainer.appendChild(commentElement)
//      postContainer.appendChild(commentsContainer);

//   }