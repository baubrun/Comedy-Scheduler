import axios from "axios"

export const fetchEvents = async () => {
    const resp = await axios.get("/events");
    return resp.data
};


export const delEvents = async (data) => {
    await axios({
            data,
            url: "/deleteEvents",
            method: "post"
        }
    ).catch(err => {
        console.log("delEvents Util", err)
    })

}



export const fetchLogin = async (data) => {
    const resp = await axios.post("/login")
}