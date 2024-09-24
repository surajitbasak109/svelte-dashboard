export default function get_env(
  name: string,
  default_value: string | number | null = null
): string | number | null {
  return process.env[name] ?? default_value;
}
