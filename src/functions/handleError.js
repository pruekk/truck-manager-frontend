const handleError = (status_code) => {
    switch (status_code) {
        case "200":
            return "OK";
        case "201":
            return "Created";
        case "400":
            return "Bad Request";
        case "401":
            return "Unauthorized";
        case "403":
            return "Forbidden - Permission not enough";
        case "404":
            return "Not Found";
        case "429":
            return "Too Many Requests";
        case "500":
            return "Internal Server Error";
        case "502":
            return "Bad Gateway";
        case "503":
            return "Service Unavailable";
        default:
            return `Can't handle error with status ${status_code}`;
    }
}

export default handleError
