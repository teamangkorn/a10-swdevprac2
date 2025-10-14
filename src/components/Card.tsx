import Image from "next/image";
import InteractiveCard from "./InteractiveCard";
import Rating from "@mui/material/Rating";

export default function ProductCard({
  venueName,
  imgSrc,
  onCompare,
  ratingValue = 0,
  onRatingChange,
}: {
  venueName: string;
  imgSrc: string;
  onCompare?: (name: string) => void;
  ratingValue?: number;
  onRatingChange?: (value: number | null) => void;
}) {
  return (
    <InteractiveCard contentName={venueName}>
      <div className="w-full h-[70%] relative rounded-t-lg">
        <Image
          src={imgSrc}
          alt={venueName}
          fill
          className="object-cover rounded-t-lg"
        />
      </div>

      <div className="w-full h-[15%] p-[10px]">{venueName}</div>
      {onCompare ? (
        <Rating
          data-testid={`${venueName} Rating`}
          id={`${venueName} Rating`}
          name={`${venueName} Rating`}
          className="block h[10%] mx-1 px-1 py-1"
          value={ratingValue} // controlled value
          precision={0.5}
          onClick={(e) => e.stopPropagation()} // prevent card click
          onChange={(e, newValue) => {
            // use onChange to capture stars
            e.stopPropagation();
            onCompare(venueName); // keep your compare behavior
            onRatingChange?.(newValue); // lift value up
          }}
        />
      ) : (
        ""
      )}
    </InteractiveCard>
  );
}
