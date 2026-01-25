const API_BASE_URL = "http://127.0.0.1:8000/api";

export async function reviewCode(payload) {
    const response = await fetch(`${API_BASE_URL}/code-review/`,{
        method:"POST",
        headers:{
            "content-type":"application/json",
        },
        body:JSON.stringify(payload),
    });

    const data = await response.json();

    if(!response.ok){
        throw new Error(data.error || "😵‍💫Something went Wrong...")
    }
    return data;
}