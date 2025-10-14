import Image from "next/image";
import getVenue from "@/libs/getVenue";
import getVenues from "@/libs/getVenues";
import { notFound } from "next/navigation";

type VenueSummary = {
  id: string | number;
};

type VenueListResponse = {
  data: VenueSummary[];
};

type VenueDetailResponse = {
  data: {
    id: string | number;
    name: string;
    picture: string;
    address: string;
    district: string;
    province: string;
    postalcode: string;
    tel: string;
    dailyrate: string | number;
  };
};

export default async function VenueDetailPage({
  params,
}: {
  params: Promise<{ vid: string }>;
}) {
  const { vid } = await params;
  const venueDetail: VenueDetailResponse | null = await getVenue(vid).catch(
    () => null
  );
  if (!venueDetail) {
    notFound();
  }
  return (
    <main className="text-center p-5">
      <h1 className="text-lg font-medium">
        {" "}
        Venue Detail Page {venueDetail.data.name}
      </h1>
      <div className="flex flex-row my-5">
        <Image
          src={venueDetail.data.picture}
          alt="Card Image"
          width={0}
          height={0}
          sizes="100vw"
          className="rounded-lg w-[30%]"
        />
        <div className="text-md-mx-5 text-left">
          {" "}
          {venueDetail.data.name}
          <div className="text-md-mx-5"> Address : {venueDetail.data.address} </div>
          <div className="text-md-mx-5"> District : {venueDetail.data.district} </div>
          <div className="text-md-mx-5"> Province : {venueDetail.data.province} </div>
          <div className="text-md-mx-5"> Postal Code : {venueDetail.data.postalcode} </div>
          <div className="text-md-mx-5"> Tel : {venueDetail.data.tel} </div>
          <div className="text-md-mx-5"> Daily Rate : {venueDetail.data.dailyrate} (insurance include) </div>
        </div>
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  try {
    const venueResponse: VenueListResponse = await getVenues();
    return venueResponse.data.map((venue) => ({
      vid: String(venue.id),
    }));
  } catch {
    return [];
  }
}
