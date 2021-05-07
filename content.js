

// Names of the id of whose the shared posts needs to be removed
var names = ["Kazi Ababil Azam Talha","Kowsar Mahmud Pappu"];
var hideAll = false;
let targetNode; // The div element of either feed or profileTimeline

// Adding listener to window when the initial loading is done
window.addEventListener('load',async function (){
    let counter = 0;
    do{
        targetNode = document.querySelectorAll('[role="feed"]')[0];
        if( targetNode == undefined ) targetNode = document.querySelectorAll('[data-pagelet="ProfileTimeline"]')[0];
        await sleep(100);
        counter++;
        if( counter>10 ) break;
    }while (targetNode==undefined);
    // Sometimes the feed fragment fails to load. so we will try as loong as we can
    console.log(targetNode);
})


targetNode = document.querySelectorAll('[role="feed"]')[0];
if( targetNode == undefined ) targetNode = document.querySelectorAll('[data-pagelet="ProfileTimeline"]')[0];
console.log(targetNode);


// config for  Mutation observer
const config = {
    childList: true
};

// Callback function to execute when mutations are observed
const callback = function (mutationsList, observer) {
    // Post segment
    const nodes = document.querySelectorAll('[class="du4w35lb k4urcfbm l9j0dhe7 sjgh65i0"]');

    for(const node of nodes){
        // sharing photos
        const shares = node.querySelectorAll('[class="dati1w0a hv4rvrfc osnr6wyh"]');
        // sharing only text posts
        const shares2 = node.querySelectorAll('[class="dati1w0a f10w8fjw hv4rvrfc pybr56ya"]');
        if( ( shares.length!=0 || shares2.length!=0 )   && node.style.display!="none"){

            // getting the name of the sharer
            const text = node.querySelectorAll('[class="nc684nl6"]')[1].innerText;
            if( hideAll == true ){
                node.style.display = "none"
            }else{
                for( const name of names ){
                    if( text == name ){
                        node.style.display = "none"
                        console.log("hidden a shared post")
                    }
                }
            }
        }
    }

};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);

// Later, you can stop observing
//observer.disconnect();


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

window.addEventListener('beforeunload',async function (){
    //Disconnect the observer before leaving window
    observer.disconnect();
})