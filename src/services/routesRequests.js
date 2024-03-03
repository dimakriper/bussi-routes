import axios from 'axios';


export function requestRoutes(){
    return new Promise(resolve => {
        axios.get("https://220.transflow.ru/api/public/v1/routes_data?key=012345678abc").then( res => {
            resolve(res.data);
        })
    })
}