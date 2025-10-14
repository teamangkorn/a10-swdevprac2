"use client";
import Card from "./Card";
import styles from "./page.module.css";
import { useReducer, useState, useRef, useEffect } from "react";
import Link from "next/link";
import getVenues from "@/libs/getVenues";

type Venue = {
  id: string;
  name: string;
  picture: string;
};

type VenueResponse = {
  data: Venue[];
};

export default function CardPanel() {
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [venueRespose, setVenueRespose] = useState<VenueResponse | null>(null);
  useEffect(() => {
    const fetchData = async() => {
      const venues: VenueResponse = await getVenues();
      setVenueRespose(venues);
    }
    fetchData();
  }, [])
  const countRef = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  // keep your compare list reducer as-is
  const compareReducer = (
    compareList: Set<string>,
    action: { type: string; venueName: string }
  ) => {
    switch (action.type) {
      case "add": {
        // ensure it's in the set
        const next = new Set(compareList);
        next.add(action.venueName);
        return next;
      }
      case "remove": {
        const next = new Set(compareList);
        next.delete(action.venueName);
        return next;
      }
      default:
        return compareList;
    }
  };

  const [compareList, dispatchCompare] = useReducer(
    compareReducer,
    new Set<string>()
  );

  /**
   * Mock Date for Demonstration Only
   */
  // const mockData = [
  //   { vid: "001", name: "The Bloom Pavilion", img: "/img/bloom.jpg" },
  //   { vid: "002", name: "Spark Space", img: "/img/sparkspace.jpg" },
  //   { vid: "003", name: "The Grand Table ", img: "/img/grandtable.jpg" },
  // ];

  if(!venueRespose) return (<p>Car panel is loading...</p>)
  // NEW: ratings state keyed by venue name

  const handleRatingChange = (venueName: string, value: number | null) => {
    setRatings((prev) => ({ ...prev, [venueName]: value ?? 0 }));
    // optional: auto-add to compare when user rates
    if (!compareList.has(venueName)) {
      dispatchCompare({ type: "add", venueName });
    }
  };

  return (
    <div>
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
        {/* {mockData.map((venue) => (
          <Link href={`/venue/${venue.vid}`} key={venue.vid} className="w-1/5">
            <Card
              key={venue.vid}
              venueName={venue.name}
              imgSrc={venue.img}
              ratingValue={ratings[venue.name] ?? 0}
              onRatingChange={(v: number | null) =>
                handleRatingChange(venue.name, v)
              }
              onCompare={(card: string) =>
                dispatchCompare({ type: "add", venueName: card })
              }
            />
          </Link>
        ))} */}
        {venueRespose.data.map((venue) => (
          <Link href={`/venue/${venue.id}`} key={venue.id} className="w-1/5">
            <Card
              key={venue.id}
              venueName={venue.name}
              imgSrc={venue.picture}
              ratingValue={ratings[venue.name] ?? 0}
              onRatingChange={(v: number | null) =>
                handleRatingChange(venue.name, v)
              }
              onCompare={(card: string) =>
                dispatchCompare({ type: "add", venueName: card })
              }
            />
          </Link>
        ))}
      </div>

      <div className="w-full text-xl font-medium">
        Compare List {compareList.size}
      </div>

      {Array.from(compareList).map((card) => (
        <div
          key={card}
          data-testid={card}
          onClick={() => dispatchCompare({ type: "remove", venueName: card })}
        >
          {card} : {ratings[card] ?? 0}
        </div>
      ))}
      <button
        className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2"
        onClick={() => {
          countRef.current = countRef.current + 1;
          alert(countRef.current);
        }}
      >
        Count with local variable
      </button>
      <input
        type="text"
        placeholder="Please fill"
        className="block text-gray-900 text-sm rounded-lg
      p-2 m-2 bg-purple-50 ring-1 ring-inset ring-purple-400 focus:outline-none focus:bg-purple-200 focus:ring-2"
        ref={inputRef}
      />

      <button
        className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2"
        onClick={() => {
          if (inputRef.current != null) inputRef.current.focus();
        }}
      >
        Count
      </button>
    </div>
  );
}
