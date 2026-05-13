"use server";

export async function executeML(datasetId: number) {

    const response = await fetch(
        `http://localhost:8000/api/v1/ml/execute/${datasetId}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                strategy: "linear"
            }),
            cache: "no-store"
        }
    );

    if (!response.ok) {
        throw new Error("Error ejecutando IA");
    }

    return response.json();
}