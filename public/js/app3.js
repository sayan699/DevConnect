window.onload = function exampleFunction() {
    fetch('/display').then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                output = ''
                for (var i = data.length-1; i >=0; i--) {
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
                    </div>
                  </div>
            
                  <div class="post-form">
                    <div class="bg-primary p">
                      <h3>Leave A Comment</h3>
                    </div>
                    <form class="form my-1">
                      <textarea
                        name="text"
                        cols="30"
                        rows="2"
                        placeholder="Comment on this post"
                        required
                      ></textarea>
                      <input type="submit" class="btn btn-dark my-1" value="Submit" />
                    </form>
                  </div>`
                }
            }document.getElementById('posts').innerHTML = output
        })
    })

}
