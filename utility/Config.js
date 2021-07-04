//const BaseApiUrl = "http://127.0.0.1:8000/api/";
const BaseApiUrl = "https://games-api.khaledbasha.com/api/";

const GetApiUrl = (Url) =>{
    return BaseApiUrl + Url;
}

export default GetApiUrl;
