import axios from "axios"

// let herokuPrefix = "https://b-c-hub.herokuapp.com" 
let herokuPrefix = "" 


export const goToEndpoint = (str, props) => props.history.push(herokuPrefix + str);

export const dataRequestGet = async (url) => {
    const resp = await axios.get(herokuPrefix + url);
    return resp.data
}


export const dataRequestPost = async (url, data) => {
    const response = await fetch(herokuPrefix + url, {
        method: "POST",
        body: data
    })
    const body = await response.text()
    console.log(body)
    const parser = JSON.parse(body);
    return parser
}

