var a = document.getElementById('click');
a.addEventListener('click', (e) => {
    e.preventDefault()

    // var promise = ' '
    fetch('https://api.github.com/users/sayan699?client_id=d9308aacf8b204d361fd&client_secret=84969aeef73956f4ec9e8716d1840532802bb81b').then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                
                document.getElementById("myimg").src = data.avatar_url;

            }
        })
    
    })
})


 
