import type { UserVerify } from "@prisma/client";

export default function isUserVerified(userVerify: UserVerify) {
    if (!userVerify) return false;
    if (!userVerify.verified_at) return false;
    return true;
}
