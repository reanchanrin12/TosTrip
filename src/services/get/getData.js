export default async function getData(endpoint) {
  try {
    const response = await fetch(`https://tostrip.eunglyzhia.social/api/v1/${endpoint}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json(); 
  } catch (error) {
    console.error("Fetch error:", error);
    return null; 
  }
}
