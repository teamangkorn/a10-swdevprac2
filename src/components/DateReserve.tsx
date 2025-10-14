'use client';
import { useState } from 'react';
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Select, MenuItem } from '@mui/material';
import { Dayjs } from 'dayjs';

export default function DateReserve() {

    const [reserveDate, setReserveDate] = useState<Dayjs | null>(null);
    const [location, setLocation] = useState('BKK');

    return(
        <div className='bg-slate-100 rounded-lg space-x-5 space-y-2 w-fit px-10 py-5 flex flex-row justify-center'>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker className='bg-white' label="Select Date" 
                value={reserveDate}
                onChange={(value)=>{setReserveDate(value); alert(value?.toString()); }} />
            </LocalizationProvider>

            <Select value={location} onChange={(e)=>setLocation(e.target.value)} className='bg-white w-32'>
                <MenuItem value={'BKK'}>Bangkok</MenuItem>
                <MenuItem value={'CNX'}>Chiang Mai</MenuItem>
                <MenuItem value={'HKT'}>Phuket</MenuItem>
            </Select>
            <button className='bg-sky-600 hover:bg-indigo-600 text-white rounded-md px-3 py-1 shadow-sm'> Reserve Now </button>

        </div>
    );
}