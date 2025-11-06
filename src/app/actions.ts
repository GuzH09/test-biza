"use server";

export async function validateAccessCode(code: string): Promise<{
  success: boolean;
  expires?: number;
}> {
  if (code === "787") {
    // Set expiration to 1 year from now
    const expires = Date.now() + 365 * 24 * 60 * 60 * 1000;
    return {
      success: true,
      expires,
    };
  }

  return {
    success: false,
  };
}
