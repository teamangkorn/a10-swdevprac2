import DateReserve from "@/components/DateReserve";
import TextField from '@mui/material/TextField';
import { Select, MenuItem } from "@mui/material";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/authOptions";
import getUserProfile from "@/libs/getUserProfile";
import { redirect } from "next/navigation";

export default async function Booking (){
    const session = await getServerSession(authOptions);

    if(!session){
        redirect("/api/auth/signin");
    }

    const profile = await getUserProfile(session.user?.token ?? "");
    const displayName = profile?.data?.name ?? session.user?.name ?? "Guest";

    return (
        
        <main className="w-[100%] flex flex-col items-center space-y-4">
            <div className="text-lg text-gray-700">
                Welcome back, {displayName}
            </div>
        
            <div className="text-xl font-medium">
                Venue Booking
            </div>
            <div className="w-fit space-y-2">
                <div className="text-md text-left text-gray-600"> Pick-up Date and Location</div>
                <DateReserve />
                <TextField id="outlined-basic" name="Name-Lastname" label="Name-Lastname" variant="standard" className="bg-white w-[200px]" />
                <TextField id="tel_num" name="Contact-Number" label="Contact-Number" variant="standard" className="bg-white w-[200px]" />
                 <div className="text-md text-left text-gray-600"> Return Date and Location</div>

                
                <Select variant="standard" name="venue" id='venue'>
                    <MenuItem value="Bloom">The Bloom Pavilion</MenuItem>
                    <MenuItem value="Spark">Spark Space</MenuItem>
                    <MenuItem value="GrandTable">The Grand Table</MenuItem>
                </Select>    


                
            </div>
            <button name="Book Venue" className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-small">Book Venue</button>
        </main>
    )
}
