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
}
window.addEventListener('DOMContentLoaded',()=>{
    axios.get('http://localhost:3000/user/get-posts')
   .then(dts=>{
    console.log(dts.data);
    let len=dts.data.newPost.length
    for(let i=0;i<len;i++){
      displayPost(dts.data.newPost[i]);
     }
  })
  .catch(err=>console.log(err));
})


function displayPost(obj) {
    let postFeed = document.getElementById('postFeed');

    // Create a container for the entire post including comments
    let postContainer = document.createElement('div');
    postContainer.classList.add('post-container');

    // Create a box for the post
    let postBox = document.createElement('div');
    postBox.classList.add('post-box');
    postBox.innerHTML = `<p><img src="${obj.postLink}"></p><br><p>user- ${obj.postDescription}</p><br><h3>Comments</h3>`;

    // Create an input box for comments
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
            commentElement.textContent = commentText;

            // Append the comment element to the comments container
            commentsContainer.appendChild(commentElement);

            // Clear the input box
            inputbox.value = '';
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