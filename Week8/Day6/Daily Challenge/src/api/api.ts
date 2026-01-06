export async function fetchData<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log("Fetching", data.recipes);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    return data.recipes as T;
  } catch (error) {
    console.error("Error fetching data:", error);

    throw error;
  }
}
