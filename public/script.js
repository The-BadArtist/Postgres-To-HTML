

window.addEventListener('DOMContentLoaded', (event) => { 
    console.log('testing');

    let search = document.getElementById('institution');

    const baseUrl = 'http://localhost:3000/testing'

    if (search) {
        console.log('I have loaded master')
        
        const getInfo = async () => {

            const res = await fetch(baseUrl, {
                method: 'GET'
            })
            // console.log(res);
            const data = await res.json()
            // console.log(Object.values(data.institutionOption) + ' <= array');
            institutionSearch = Object.values(data.institutionOption);
            datalistOptions(institutionSearch, "insName");
            
        }
        
        getInfo();
    }
})


let datalistOptions = (arrayList, elementId) => {
    const listOfItems = [...arrayList];
    const id = elementId;

    for(let i = 0; i < listOfItems.length; i++){
        let options = document.createElement("option");
        options.value = listOfItems[i];
        let element = document.getElementById(id);
        element.appendChild(options);
    }
}