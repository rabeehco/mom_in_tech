// API Calls to Backend-Server

// Authenitcation API
export const userLogin = async ({ host, username, password }) => {
    try {
        const response = await fetch(`${host}/login`, {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password
            }),
            headers: { "Content-Type": "application/json" }
        })

        const data = await response.json()
        return data;

    } catch (error) {
        return { errorMessage: error.message }
    }
}

export const userRegister = async ({ host, username, email, password }) => {
    try {
        const response = await fetch(`${host}/register`, {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json()
        return data
    } catch (error) {
        return { errorMessage: error.message }
    }
}

// Blog API
export const createBlog = async ({ host, title, userName, body, isAuth }) => {
    try {
        const data = await fetch(`${host}/blog`, {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                body: body,
                username: userName
            }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${isAuth}`
            }
        })

        return data;
    } catch (error) {
        alert('Failed to Create Post' + error.message)
    }
}

export const getAllBlog = async (host) => {
    try {
        const response = await fetch(`${host}/blog`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        const data = await response.json();
        return data;

    } catch (error) {
        return { errorMessage: error.message }
    }
}

export const getABlog = async ({ host, blogId }) => {
    try {
        const response = await fetch(`${host}/blog/${blogId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        const data = await response.json();
        return data;

    } catch (error) {
        return { errorMessage: error.message }
    }
}

export const editBlog = async ({ host, blogId, title, body, userName, isAuth }) => {
    try {
        const response = await fetch(`${host}/blog/${blogId}`, {
            method: 'PATCH',
            body: JSON.stringify({
                title: title,
                body: body,
                username: userName
            }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${isAuth}`
            }
        })

        const data = await response.json()

        return data;

    } catch (error) {
        return { errorMessage: error.message }
    }
}

export const deleteBlog = async ({ host, blogId, isAuth }) => {
    try {
        const data = await fetch(`${host}/blog/${blogId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${isAuth}`,
            },
        });

        return data;
    } catch (error) {
        return { message: error.message }
    }
}

// Event API
export const createEvent = async ({ host, title, description, location, link, userName, isAuth }) => {
    try {
        const data = await fetch(`${host}/event`, {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                description: description,
                location: location,
                link: link,
                username: userName
            }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${isAuth}`
            }
        })

        return data;

    } catch (error) {
        alert('Failed to Create Post')
    }
}

export const getAllEvent = async ({ host, isAuth }) => {
    try {
        const response = await fetch(`${host}/event`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${isAuth}`
            }
        })

        const data = await response.json()
        return data;
    } catch (error) {
        return { message: error.message }
    }
}

export const getAEvent = async ({ host, eventId, isAuth }) => {
    try {
        const response = await fetch(`${host}/event/${eventId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${isAuth}`
            }
        })

        const data = await response.json()
        return data;

    } catch (error) {
        return { message: error.message }
    }
}

export const deleteEvent = async ({ host, eventId, isAuth }) => {
    try {
        const response = await fetch(`${host}/event/${eventId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${isAuth}`
            }
        })

        const data = await response.json()

        if (!data.status) {
            return alert('error')
        }

        if (data.status === 'Unauthorized') {
            alert('Unauthorized to Delete')
        }

        return data;

    } catch (error) {
        return { message: error.message }
    }
}

// Job API
export const createJob = async ({ host, title, description, email, userName, isAuth }) => {
    try {
        const data = await fetch(`${host}/job`, {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                description: description,
                email: email,
                username: userName
            }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${isAuth}`
            }
        })

        return data;
    } catch (error) {
        alert('Failed to Create Post')
        // return {status: false};
    }
}

export const getAllJob = async ({ host, isAuth }) => {
    try {
        const response = await fetch(`${host}/job`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${isAuth}`
            }
        })

        const data = await response.json()

        if (!data.status) {
            return
        }

        return data;
    } catch (error) {
        return { message: error.message }
    }
}

export const getAJob = async ({ host, jobId, isAuth }) => {
    try {
        const response = await fetch(`${host}/job/${jobId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${isAuth}`
            }
        })

        const data = await response.json()
        return data

    } catch (error) {
        return { message: error.message }
    }
}

export const deleteJob = async ({ host, jobId, isAuth }) => {
    try {
        const response = await fetch(`${host}/job/${jobId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${isAuth}`
            }
        })

        const data = await response.json()

        return data;
    } catch (error) {
        return { message: error.message }
    }
}


// Navigation Bar API
export const fetchSearchQueryData = async ({ host, text, path }) => {
    if (text) {
        const response = await fetch(`${host}/search${path}?title=${text}`)

        const data = await response.json()
        return data;
    }
}

// Chat API
export const sendMessage = async ({ host, userName, message, isAuth }) => {
    if (message) {
        try {

            const response = await fetch(`${host}/chat`, {
                method: 'POST',
                body: JSON.stringify({
                    username: userName,
                    message: message
                }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${isAuth}`
                }
            })

            const data = await response.json()

            return data;

        } catch (error) {
            return { message: error.message }
        }
    } else {
        return alert('Message Input is Empty')
    }
}

export const loadMoreMessage = async ({ limit, host }) => {
    try {
        const response = await fetch(`${host}/chatmessageload`, {
            method: 'POST',
            body: JSON.stringify({
                limit: limit
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json()
        return data;
    } catch (error) {
        return { message: error.message }
    }
}

export const syncMessage = async ({ host, limit }) => {
    try {
        const response = await fetch(`${host}/chatmessageload`, {
            method: 'POST',
            body: JSON.stringify({
                limit: limit
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json()
        return data;
    } catch (error) {
        return { message: error.message }
    }
}