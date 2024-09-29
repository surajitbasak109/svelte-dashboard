import app from "$/config/app";

/**
 * Generates a verification link
 * @param {string} token The verification token
 * @returns {string} The verification link
 */
export function generateVerificationLink(token: string): string {
    return `${app.url}/verify?token=${token}`;
}
