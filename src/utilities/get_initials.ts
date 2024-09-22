export function get_initials(name: string | null) {
  if (!name) return 'UU';
  const parts = name.split(' ');
  if (parts.length === 3) {
    return parts[0].charAt(0) + parts[2].charAt(0);
  } else if (parts.length === 2) {
    return parts[0].charAt(0) + parts[1].charAt(0);
  } else {
    return parts[0].charAt(0);
  }
}
