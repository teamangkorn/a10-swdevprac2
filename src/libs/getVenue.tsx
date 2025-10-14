export default async function getVenue(id: string) {
  const res = await fetch(
    `https://a08-venue-explorer-backend.vercel.app/api/v1/venues/${id}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch venue");
  }
  return await res.json();
}
