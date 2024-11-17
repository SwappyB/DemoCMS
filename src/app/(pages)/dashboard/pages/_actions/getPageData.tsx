"use server";

export const getPages = async () => {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/pages`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      }
    );
    const res = await result.json();
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
