const BASE_URL = "http://20.207.122.201/evaluation-service/logs";

async function Log(stack, level, packageName, message, token) {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        stack: stack,
        level: level,
        package: packageName,
        message: message
      })
    });

    const data = await response.json();
    console.log("Log sent:", data);
    return data;
  } catch (error) {
    console.error("Logging failed:", error);
  }
}

export default Log;