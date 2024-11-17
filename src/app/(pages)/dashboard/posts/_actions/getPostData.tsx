"use server";

export const getPosts = async () => {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`,
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
