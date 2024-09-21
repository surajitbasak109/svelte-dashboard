export const SALT_ROUNDS = 10;

export interface User {
    id: string;
    username: string;
    email: string;
    github_id: string;
    avatar_url: string;
    created_at: string;
    updated_at: string;
    name: string;
}
