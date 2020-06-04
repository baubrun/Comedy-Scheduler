import axios from "axios"

export const fetchEvents = async () => {
    const resp = await axios.get("/events");
    return resp.data
};


export const delEvents = async (data) => {
    await axios.post("/deleteEvents", {
        body: data,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer '
        }
    })
}

// export const delEvents = async (data) => {
//     await axios.post("/deleteEvents", {
//         body: data,
//     })
// }


export const fetchLogin = async (data) => {
    const resp = await axios.post("/login")
}