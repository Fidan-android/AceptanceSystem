window.onload = function() {
    let name = 'Иван Иванов';
    let hours = new Date().getHours();

    if (hours >= 5 && hours < 12)
        document.getElementById('user_text').innerText = `Доброе утро, ${name}`
    else if (hours >= 12 && hours < 18)
        document.getElementById('user_text').innerText = `Добрый день, ${name}`
    else if (hours >= 18 && hours < 23)
        document.getElementById('user_text').innerText = `Добрый вечер, ${name}`
    else
        document.getElementById('user_text').innerText = `Доброй ночи, ${name}`
}

