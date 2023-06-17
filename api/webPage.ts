import axios from "axios";

const client = axios.create({
    baseURL: 'https://smotret-anime.com',
    withCredentials: false,
});

function parseCookies(cookiesArray) {
    return cookiesArray
        .map((cookie) => {
            const [nameAndValue] = cookie.split(';');
            return nameAndValue.trim();
        })
        .join('; ');
}

async function getCookieValue(cookiesArray, name) {
    const cookies = parseCookies(cookiesArray);
    const matchedCookie = cookies.match(new RegExp(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`));
    return matchedCookie ? matchedCookie[2] : null;
}

export async function main() {
    try {
        const initialResponse = await client.get('/animelist/edit/4974?mode=mini');
        console.log(initialResponse.headers['set-cookie'])
        const csrfToken = await getCookieValue(initialResponse.headers['set-cookie'], 'csrf');

        if (!csrfToken) {
            throw new Error('CSRF token not found');
        }

        const formData = `csrf=${csrfToken}&LoginForm%5Busername%5D=hyperclapoff%40yandex.ru&LoginForm%5Bpassword%5D=laik3737ka2000&yt0=&dynpage=1`;

        const loginResponse = await client.post('/users/login', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Requested-With': 'XMLHttpRequest',
                Cookie: `csrf=${csrfToken}`,
            },
        });

        console.log(loginResponse.status);

        if (loginResponse.status === 200) {
            const cookies = [
                ...initialResponse.headers['set-cookie'],
                ...loginResponse.headers['set-cookie'],
            ].join('\n');
            console.log(cookies)
        }
    } catch (error) {
        console.error('Error:', error);
    }
}


function serializeCookies(cookies) {
    const something = Object.keys(cookies)
        .map(name => `${name}=${cookies[name]}`)
        .join('; ');
    return something;
}

export async function LoginWithForm(email, password, cookies) : Promise<string | boolean> {
    const result = await fetch("https://smotret-anime.com/users/login", {
        method: "POST",
        credentials: "include",
        headers: {
            'User-Agent': 'anime365Mobile/0.1',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF8',
            'X-Requested-With': 'XMLHttpRequest',
            'Cookie': serializeCookies(cookies)
        },
        body: `csrf=${cookies.csrf}&LoginForm%5Busername%5D=hyperclapoff%40yandex.ru&LoginForm%5Bpassword%5D=laik3737ka2000&yt0=&dynpage=1`
    })
    const authToken = getCookieValue(result.headers.get("set-cookie"), "aaaa8ed0da05b797653c4bd51877d861");
    console.log(result.headers.get("set-cookie"))
    if (authToken)
        return authToken;
    return false;
}
