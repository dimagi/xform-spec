document.addEventListener('DOMContentLoaded', function () {
    var queryParams = getAllQueryParams();
    addNavMenu();
    addBadges();
    addBadgeListeners();
    addEnketoListener(queryParams['show-enketo-compatibility']);
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

    headingEl.id = headingEl.id.replace(' ', '-');
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

// add badge listeners to show/hide badge comments
function addBadgeListeners() {
    var link, clss,
        links = document.querySelectorAll('.badge');

    for (var i = 0; i < links.length; ++i) {
        link = links[i];
        link.addEventListener("click", toggleCommentVisibility, false);
    }
}

// toggle visibility of single badge comment
function toggleCommentVisibility(evt) {
    evt.preventDefault();
    evt.target.classList.toggle('show-comment');
}

// add listener to show/hide enketo compatibility comments
function addEnketoListener(showComments) {
    var button, link,
        buttons = document.querySelectorAll('.show-enketo-comments');

    for (var i = 0; i < buttons.length; ++i) {
        button = buttons[i];
        button.addEventListener("click", toggleEnketoCommentsVisibility, false);
    }

    if (showComments) {
        buttons[0].dispatchEvent(new MouseEvent('click'));
    }
}

// toggle visibility of all enketo comments
function toggleEnketoCommentsVisibility(evt) {
    var shown = evt.target.classList.contains('data-visible'),
        links = document.querySelectorAll('.badge.enketo');

    evt.preventDefault();
    evt.target.classList.toggle('data-visible');
    evt.target.textContent = (shown) ? 'Show Enketo Compatibility' : 'Hide Enketo Compatibility';

    for (var j = 0; j < links.length; ++j) {
        link = links[j];
        if (shown) {
            link.classList.remove('show-comment');
            document.location.search = '';
        } else {
            link.classList.add('show-comment');
            document.location.search = 'show-enketo-compatibility=true';
        }
    }
}

// get all querystring parameters as an object
function getAllQueryParams() {
    var val, processedVal,
        query = window.location.search.substring(1),
        vars = query.split("&"),
        params = {};

    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0].length > 0) {
            val = decodeURIComponent(pair[1]);
            processedVal = (val === 'true') ? true : (val === 'false') ? false : val;
            params[pair[0]] = processedVal;
        }
    }

    return params;
}
