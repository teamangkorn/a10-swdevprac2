import Card from "./Card";
import Link from "next/link";

type Venue = {
  id: string;
  name: string;
  picture: string;
};

type VenueResponse = {
  count: number;
  data: Venue[];
};

export default async function VenueCatalog({
  venuesJson,
}: {
  venuesJson: Promise<VenueResponse>;
}) {
  const venuesJsonReady = await venuesJson;
  return (
    <>
      Explore {venuesJsonReady.count} models in our Catalog.
      <div
        style={{
          margin: "20px",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignContent: "space-around",
        }}
      >
        {venuesJsonReady.data.map((venue) => (
          <Link href={`/venue/${venue.id}`} key={venue.id} className="w-1/5">
            <Card
              key={venue.id}
              venueName={venue.name}
              imgSrc={venue.picture}
            />
          </Link>
        ))}
      </div>
    </>
  );
}
