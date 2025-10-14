import styles from "./topmenu.module.css";
import Image from "next/image";
import TopMenuItem from "./TopMenuItem";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/authOptions";
import Link from "next/link";

export default async function TopMenu() {

  const session = await getServerSession(authOptions);


  return (
    <div className={styles.menucontainer}>
      <div className={styles.authsection}>
        {session ? (
          <Link href="/api/auth/signout" className={styles.authlink}>
            Sign-Out of {session.user?.name}
          </Link>
        ) : (
          <Link href="/api/auth/signin" className={styles.authlink}>
            Sign-In
          </Link>
        )}
      </div>
      <div className={styles.menuitems}>
        <TopMenuItem title="Booking " pageRef="/booking" />
        {/* <TopMenuItem title='About' pageRef='/about'/> */}
      </div>
      <Image
        src={"/img/cover4.png"}
        className={styles.logoimg}
        alt="Logo"
        width={0}
        height={0}
        sizes="100vh"
      />
    </div>

    //         <div className={styles.menucontainer}>
    //   <div className={styles.menuitems}>
    //     <TopMenuItem title="Reservation" pageRef="/reservations" />
    //     {/* <TopMenuItem title="About" pageRef="/about" /> */}
    //   </div>
    //   <Image src={'/img/logo.jpg'} className={styles.logoimg} alt="Logo" width={0} height={0} sizes='100vh'/>
    // </div>
  );
}
