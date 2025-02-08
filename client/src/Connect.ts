const HOST = '127.0.0.1';
const PORT = 8080;

async function Connect() {
    const connection = Deno.connect({
        port: PORT,
        hostname: HOST,
    });
}

export default Connect;