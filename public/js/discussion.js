// app.get('/discussion/:id', async (req, res) => {
//     const post = await Post.findById(req.params.id);
//     res.json(post)
//   })


window.onload = function exampleFunction() {
    fetch('discussion/5e6bc98fae92033dff575860').then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                output = ''
                
                    output = `<div class="post bg-white p-1 my-1">
                    <div>
                      <a href="profile.html">
                        <img
                          class="round-img"
                          src="${data.avatar}"
                          alt=""
                        />
                        <h4>${data.name}</h4>
                      </a>
                    </div>
                    <div>
                      <p class="my-1">
                        ${data.text}
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
                
            }document.getElementById('discussion').innerHTML = output
        })
    })

}
