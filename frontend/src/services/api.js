const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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