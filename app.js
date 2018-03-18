var xhr = new XMLHttpRequest();
xhr.onreadystatechange = () => {
    if (xhr.readyState == 4){
        if (xhr.status == 200){
            console.log(xhr.responseText);
        }
    }
}
xhr.open('GET', 'https://google.co.jp');
xhr.send(null);
