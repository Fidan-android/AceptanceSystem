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

export async function editTodo(token, forma) {
    var response = await fetch("http://ar/user/edit-todo.php", {
        method: "POST",
        headers: {
            "Authorization" : "Bearer " + token
        },
        body: JSON.stringify(Object.fromEntries((new FormData(forma)).entries()))
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