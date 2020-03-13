var a = document.getElementById('click');
a.addEventListener('click', (e) => {
    
    fetch('https://api.github.com/users/sayan699/repos?per_page=5&sort=created:%20asc&client_id=d9308aacf8b204d361fd&client_secret=84969aeef73956f4ec9e8716d1840532802bb81b')
        .then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                console.log(data[0].clone_url)
                document.getElementById('redirect').href = data[0].clone_url
            }
        })
    
    })
})


 
