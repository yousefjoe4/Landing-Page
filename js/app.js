const navbarList = document.querySelector("#navbar__list")
const sections = document.querySelectorAll("section")
const HIGHLIGHT_MARGIN = 300; // The section needs to be highlighted before it's visible with 300 px



attachSectionsTextsToNavBarList(sections, navbarList);

listenToVisibleSections();


/**
 * A function that takes sections, extracts their texts and attach them to the nav bar
 * @param sections, from which texts should be extracted
 * @param navbarList, in which the texts should be appended
 */
function attachSectionsTextsToNavBarList(sections,navbarList) {
    sections.forEach((section) => {

        const sectionName = extractSectionNameFrom(section)

        const navBarItem = createNavbarAnchorItemFrom(sectionName)
        const navBarLi = navBarItem.querySelector("li")

        navBarItem.setAttribute("href", `#${section.id}`)

        navBarLi.setAttribute("id", `nav-${section.id}`)

        // setOnClickEventListenerToItem(liElement, onNavBarItemClickedScrollToAssociatedSection)

        navbarList.append(navBarItem)
    })
}

function listenToVisibleSections() {
    document.addEventListener("scroll", () => {
        let currentScrollPosition = pageYOffset;

        sections.forEach((section) => {
            // get the corresponding nav item to the section
            const navItem = document.querySelector(`#nav-${section.id}`)

            const topPosition = section.offsetTop - HIGHLIGHT_MARGIN;
            const bottomPosition = section.offsetHeight + section.offsetTop - HIGHLIGHT_MARGIN;
            let sectionVisible = currentScrollPosition >= topPosition && currentScrollPosition <= bottomPosition;

            if (sectionVisible) {
                highLightSection(section);
                highlightNavItem(navItem);

            } else {
                deHighlightSection(section);
                deHighlightNavItem(navItem);
            }
        })

    })
}


/**
 *
 * @param section, that include data-nav
 * @returns {string} , the data stored inside of the data-nav, which is the name of the section
 */
function extractSectionNameFrom(section) {
    return section.dataset.nav;
}


/** Helper function to create a <li> item from a passed text argument,
 *  e.g:
 *      arg: Hello
 *      returns: <li> Hello </li>
 *
 * @param text
 * @returns {HTMLLIElement} <li>
 */
function createNavbarAnchorItemFrom(text){
    const anchor = document.createElement("a");
    const li = document.createElement("li");
    li.textContent = text;
    anchor.append(li)
    return anchor;
}


function highLightSection(section) {
    section.classList.add("your-active-class")
}

function highlightNavItem(navItem) {
    navItem.classList.add("active")
}

function deHighlightSection(section) {
    section.classList.remove("your-active-class")
}

function deHighlightNavItem(navItem) {
    navItem.classList.remove("active")
}