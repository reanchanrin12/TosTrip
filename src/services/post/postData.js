export default async function postData(endpoint, body) {
  try {
    const response = await fetch(`https://tostrip.eunglyzhia.social/api/v1/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      mode: 'cors'
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Something went wrong while posting data.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error while posting data:", error);
    throw error;
  }
}
