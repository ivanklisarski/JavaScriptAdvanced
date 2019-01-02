function validateRequest(HTTPRequest) {
    const invalidRequestMSG = "Invalid request header: Invalid ";

    /** Validate required properties */
    const requiredProperties = ["Method", "URI", "Version", "Message"];
    const HTTPProperties = Object.keys(HTTPRequest);
    requiredProperties.forEach(prop => {
        if (HTTPProperties.indexOf(prop.toLowerCase()) < 0) {
            throw new Error(invalidRequestMSG + prop);
        }
    });

    /** Validate method */
    const requiredMethods = ["GET", "POST", "DELETE", "CONNECT"];
    if (HTTPRequest.method === null || HTTPRequest.method === "") {
        throw new Error(invalidRequestMSG + "Method");
    } else if (requiredMethods.indexOf(HTTPRequest.method) < 0) {
        throw new Error(invalidRequestMSG + "Method");
    }

    /** Validate uri */
    const uriPattern = /^([A-Za-z0-9]+|[\.])+$/g;
    if (HTTPRequest.uri === null || HTTPRequest.uri === "") {
        throw new Error(invalidRequestMSG + "URI")
    } else if (!uriPattern.test(HTTPRequest.uri)) {
        throw new Error(invalidRequestMSG + "URI");
    }

    /** Validate version */
    const requiredVersions = ["HTTP/0.9", "HTTP/1.0", "HTTP/1.1", "HTTP/2.0"];
    if (HTTPRequest.version === null || HTTPRequest.version === "") {
        throw new Error(invalidRequestMSG + "Version");
    } else if (requiredVersions.indexOf(HTTPRequest.version) < 0) {
        throw new Error(invalidRequestMSG + "Version");
    }

    /** Validate message */
    const messagePattern = /^[^<>\\&'"]+$/g;
    if (!messagePattern.test(HTTPRequest.message) && HTTPRequest.message !== "") {
        throw new Error(invalidRequestMSG + "Message");
    }

    return HTTPRequest;
}