//POSTS.ejs 
window.onload = function exampleFunction() {
    fetch('/display').then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {   
                output = '';
                for (var i = 0; i < data.length; i++) {
                    output += `<div class="post bg-white p-1 my-1">
                    <div>
                      <a href="profile.html">
                        <img
                          class="round-img"
                          src="${data[i].avatar}"
                          alt=""
                        />
                        <h4>${data[i].name}</h4>
                      </a>
                    </div>
                    <div>
                      <p class="my-1">
                        ${data[i].text}
                      </p>
                      <p class="post-date">
                          Posted on ${data[i].date}
                      </p>
                      <form action="like/${data[i]._id}"  method="PUT">
                      <button type="submit"  class="btn btn-light">
                        <i class="fas fa-thumbs-up"></i>
                        <span>4</span>
                      </button>
                      <button type="button" id="like" class="btn btn-light">
                        <i class="fas fa-thumbs-down"></i>
                      </button>

                
                      <a href="/discussion/${data[i]._id}" class="btn btn-primary">
                        Discussion <span class='comment-count'>${data[i].comments.length}</span>
                      </a>
                      <button      
                      type="button"
                      class="btn btn-danger"
                    >
                      <i class="fas fa-times"></i>
                    </button>
                    </form>
                    </div>
                  </div>
                </div>`



                }document.getElementById('profile').innerHTML = output

            }
        })
 
    })
}


//<button onclick="window.location.href = 'https://w3docs.com';" type="button" class="btn btn-light">
