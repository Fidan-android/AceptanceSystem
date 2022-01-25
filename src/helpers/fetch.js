export async function login(forma) {
    var response = await fetch("http://ar/signin/signin.php", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries((new FormData(forma)).entries()))
    });
    return response.json();
}

export async function registration(forma) {
    var response = await fetch("http://ar/signup/signup.php", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries((new FormData(forma)).entries()))
    });

    return response.json();
}

export async function signout(token) {
    var response = await fetch("http://ar/signout/signout.php", {
        headers: {
            "Authorization" : "Bearer " + token
        }
    });

    return response.json();
}

export async function userInfo(token) {
    var response = await fetch("http://ar/user/user-info.php", {
        method: "GET",
        headers: {
            "Authorization" : "Bearer " + token
        }
    });

    return response.json();
}

export async function dispatcherInfo(token) {
    var response = await fetch("http://ar/user/dispatcher-info.php", {
        method: "GET",
        headers: {
            "Authorization" : "Bearer " + token
        }
    });

    return response.json();
}

export async function matcherInfo(token) {
    var response = await fetch("http://ar/user/matcher-info.php", {
        method: "GET",
        headers: {
            "Authorization" : "Bearer " + token
        }
    });

    return response.json();
}

export async function adminInfo(token) {
    var response = await fetch("http://ar/user/admin-info.php", {
        method: "GET",
        headers: {
            "Authorization" : "Bearer " + token
        }
    });

    return response.json();
}

export async function directorInfo(token) {
    var response = await fetch("http://ar/user/director-info.php", {
        method: "GET",
        headers: {
            "Authorization" : "Bearer " + token
        }
    });

    return response.json();
}

export async function getOffices() {
    var response = await fetch("http://ar/user/get-office.php", {
        method: "GET",
    });

    return response.json();
}

export async function createRequest(token, forma) {
    var response = await fetch("http://ar/user/create-request.php", {
        method: "POST",
        headers: {
            "Authorization" : "Bearer " + token
        },
        body: JSON.stringify(Object.fromEntries((new FormData(forma)).entries()))
    });

    return response.json();
}

export async function cancelRequest(token, forma) {
    var response = await fetch("http://ar/user/cancel-request.php", {
        method: "POST",
        headers: {
            "Authorization" : "Bearer " + token
        },
        body: JSON.stringify(Object.fromEntries((new FormData(forma)).entries()))
    });

    return response.json();
}

export async function requestChange(token, reques_id) {
    var response = await fetch("http://ar/user/change-request.php", {
        method: "POST",
        headers: {
            "Authorization" : "Bearer " + token
        },
        body: JSON.stringify({ request_id: reques_id })
    });

    return response.json();
}

export async function redirectToOffice(id, office, end_date) {
    var response = await fetch("http://ar/user/redirect-request.php", {
        method: "POST",
        body: JSON.stringify({request_id: id, office_id: office, date_end: end_date})
    });

    return response.json();
}

export async function deleteRequest(token, request_id) {
    var response = await fetch("http://ar/user/delete-request.php", {
        method: "POST",
        headers: {
            "Authorization" : "Bearer " + token
        },
        body: JSON.stringify({request_id : request_id})
    });

    return response.json();
}

export async function checkPermission(token) {
    var response = await fetch("http://ar/permission/permission.php", {
        method: "GET",
        headers: {
            "Authorization" : "Bearer " + token
        }
    });

    return response.json();
}