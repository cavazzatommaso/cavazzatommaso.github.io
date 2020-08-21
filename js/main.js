window.transitionToPage = function(href) {
    document.querySelector('body').style.opacity = 0
    document.querySelector('body').style.backgroundColor = "#212121";
    setTimeout(function() { 
        window.location.href = href
    }, 500)
}

document.addEventListener('DOMContentLoaded', function(event) {
    document.querySelector('body').style.opacity = 1
})