"use client";
import { truncate } from "fs/promises";
import styles from "./banner.module.css";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";


export default function Banner() {
  const covers = [
    "/img/cover.jpg",
    "/img/cover2.jpg",
    "/img/cover3.png",
    "/img/cover4.jpg",
  ];
  const [index, setIndex] = useState(0);
  const router = useRouter();
  const { data:session } = useSession();
  console.log(session?.user.token)

  return (
    <div
      className={styles.banner}
      onClick={() => {
        setIndex(index + 1);
      }}
    >
      <Image
        src={covers[index % 4]}
        alt="Cover"
        fill={true}
        priority
        objectFit="cover"
      />
      <div className={styles.bannerText}>
        <h1 className="text-3xl text-white">
          Welcome to Our Venue Booking Service
        </h1>
        <h3 className="text-xl font-serif text-white">
          {" "}
          Explore your world with us
        </h3>
      </div>
      {
        session? <div className='z-30 absolute top-5 right-10 font-semibold text-cyan-800 text-xl'>
          Hello {session.user?.name} </div>:null
      }

      <button
        className="bg-white text-cyan-600 border border-cyan-600
            font-semibold px-2 py-2 rounded z-30 absolute bottom-0 right-0 hover:bg-cyan-600 hover:text-white hover:border-transparent"
        onClick={(e) => {
          e.stopPropagation();
          router.push("/venue");
        }}
      >
        Select Your Travel Partner NOW
      </button>
    </div>
  );
}
