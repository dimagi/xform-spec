document.addEventListener('DOMContentLoaded', function() {
    addNavMenu();
    addBadges();
    addBadgeListeners();
    addEnketoListener();
});

// adds Navigation Menu up to 2 levels deep
function addNavMenu() {
    var navListEl = document.createElement('ul'),
        sideNavEl = document.querySelector('.sidenav'),
        sectionHeadings = document.querySelectorAll('h2[id]');

    for (var i = 0; i < sectionHeadings.length; ++i) {
        var subHeadings = sectionHeadings[i].parentNode.querySelectorAll('h3[id]'),
            navSectionEl = navListEl.appendChild(getMenuElement(sectionHeadings[i]));

        if (subHeadings.length > 0) {
            var navSubSectionListEl = navSectionEl.appendChild(document.createElement('ul'));
            for (var j = 0; j < subHeadings.length; ++j) {
                navSubSectionListEl.appendChild(getMenuElement(subHeadings[j]));
            }
        }
    }

    sideNavEl.insertBefore(navListEl, sideNavEl.querySelector('.show-enketo-comments'));
}

// creates a menu element from a heading element
function getMenuElement(headingEl) {
    var listItemEl = document.createElement('li'),
        linkEl = document.createElement('a');

    linkEl.setAttribute('href', '#' + headingEl.id);
    linkEl.appendChild(document.createTextNode(headingEl.textContent));

    listItemEl.appendChild(linkEl);

    return listItemEl;
}

// add badges from review and pending links
function addBadges() {
    var link, clss, comment,
        links = document.querySelectorAll('a');

    for (var i = 0; i < links.length; ++i) {
        link = links[i];
        if (link.textContent.toLowerCase() === 'review' || link.textContent.toLowerCase() === 'pending' || link.textContent.toLowerCase() === 'enketo') {
            link.classList.add('badge');
            link.classList.add(link.textContent);
            if (!link.getAttribute('href')) {
                link.setAttribute('href', '#');
            }
            if (link.getAttribute('title')) {
                comment = document.createElement('span');
                comment.classList.add('badge-comment');
                comment.textContent = link.getAttribute('title');
                link.parentNode.insertBefore(comment, link.nextSibling);
            }
        }
    }
}

// add badges from review and pending links
function addBadgeListeners() {
    var link, clss,
        links = document.querySelectorAll('.badge');

    for (var i = 0; i < links.length; ++i) {
        link = links[i];
        link.addEventListener("click", toggleCommentVisibility, false);
    }

    function toggleCommentVisibility(evt) {
        evt.preventDefault();
        evt.target.classList.toggle('show-comment');
    }
}

function addEnketoListener() {
    var button, link,
        buttons = document.querySelectorAll('.show-enketo-comments'),
        links = document.querySelectorAll('.badge.enketo');

    for (var i = 0; i < buttons.length; ++i) {
        button = buttons[i];
        button.addEventListener("click", toggleEnketoComments, false);
    }

    function toggleEnketoComments(evt) {
        var shown = evt.target.classList.contains('data-visible');

        evt.target.classList.toggle('data-visible');
        evt.target.textContent = (shown) ? 'Show Enketo Compatibility' : 'Hide Enketo Compatibility';

        for (var j = 0; j < links.length; ++j) {
            link = links[j];
            if (shown) {
                link.classList.remove('show-comment');
            } else {
                link.classList.add('show-comment');
            }
        }
    }

}
