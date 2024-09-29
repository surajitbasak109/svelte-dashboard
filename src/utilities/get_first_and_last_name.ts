export default function getFirstAndLastName(name?: string) {
  if (!name) return null;
  const names = name.split(' ');
  return {
    firstName: names[0],
    lastName: names[1]
  };
}
