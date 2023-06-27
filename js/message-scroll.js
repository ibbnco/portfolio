function startAutoScroll() {
    var scrollableDiv = document.getElementById('message');
    var scrollHeight = scrollableDiv.scrollHeight;
    var clientHeight = scrollableDiv.clientHeight;
    var scrollTop = 0;
    var isScrollingDown = true;

    setInterval(function() {
        if (isScrollingDown) {
            scrollTop += 1;
            if (scrollTop >= scrollHeight - clientHeight) {
                isScrollingDown = false;
            }
        } else {
            scrollTop -= 1;
            if (scrollTop <= 0) {
                isScrollingDown = true;
            }
        }
        scrollableDiv.scrollTop = scrollTop;
    }, 50);
}

window.onload = startAutoScroll;