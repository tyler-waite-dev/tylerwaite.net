var scroller = document.getElementById("scroller");
var selected = 0;

const params = new URLSearchParams(window.location.search);

var projects = [
    {
        name: "Plate Recipes <br>UI Design",
        img: "/img/proj/0/thumb.png",
        alt: "Shows an ordering system for ordering In & Out Products"
    },
    {
        name: "In & Out <br/> Delivery Service",
        img: "/img/proj/1/thumb.png",
        alt: "Shows an ordering system for ordering In & Out Products"
    },
    {
        name: "MuzakMaker",
        img: "/img/proj/2/thumb.png",
        alt: "Shows a webpage that plays different playlists"
    },
    {
        name: "All Foods Mart",
        img: "/img/proj/3/thumb.png",
        alt: "Shows a homepage for a grocery mart"
    },
    {
        name: "Wonderlust Travel",
        img: "/img/proj/4/thumb.png",
        alt: "Shows a mobile-friendly homepage for a travel website"
    }
]

function setSelected(num){

    scroller.children[selected].classList.remove("active")
    selected = num;
    scroller.children[selected].classList.add("active")

    //load html file
    async function logMovies() {
        const response = await fetch(scroller.children[selected].file);
        const movies = await response.text();
        console.log(movies);
    }

    fetch(`/portfolio/projects/${selected}.html`).then(function (response) {
        // The API call was successful!
        return response.text();
    }).then(function (html) {
        document.querySelector("#container").innerHTML = html;
    }).catch(function (err) {
        // There was an error
        console.warn('Something went wrong.', err);
    });

    const url = new URL(window.location.href);
    url.searchParams.set('project_id', num);
    window.history.pushState({}, '', url.toString());

}

function next(){
    if(selected + 1 < projects.length){
        setSelected(selected + 1);
    }
}
function prev(){
    if(selected - 1 >= 0 && selected - 1 != projects.length){
        setSelected(selected - 1);
    }
}

for(var i=0; i<projects.length; i++) {

    scroller.innerHTML += `<li onclick="setSelected(${i})"><img src="${projects[i].img}" alt="${projects[i].img}"><p>${projects[i].name}</p></li>`;
}

if(params.has('project_id')){
    setSelected(parseInt(params.get('project_id')))
}else{
    setSelected(0)
}

