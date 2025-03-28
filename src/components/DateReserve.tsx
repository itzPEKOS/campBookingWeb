"use client";
import { useState, useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Select, MenuItem, TextField } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import getCamps from "@/libs/getCamps";

export default function DateReserve({ onChange }: { onChange: Function }) {
  // State for form fields
  const [nameLastname, setNameLastname] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [camp, setCamp] = useState("");
  const [date, setDate] = useState<Dayjs | null>(null);

  
  const [ campItems, setCampItems] = useState(new Map<string, string>())

  useEffect( () => {
    const fetchData = async ()=> {
      const response = await getCamps()
      const mapItems: Map<string, string> = new Map();
      response.data.map((campItem: CampItem) => {
        mapItems.set(campItem._id, campItem.name)
      })
      setCampItems(mapItems)
    }
    fetchData();
  }, [])

  // ส่งค่ากลับไปยัง parent (Booking)
  useEffect(() => {
    onChange({
      nameLastname,
      tel: contactNumber,
      camp,
      bookDate: date ? date.format("YYYY-MM-DD") : "",
    });
  }, [nameLastname, contactNumber, camp, date]);

  // Event handlers
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameLastname(event.target.value);
  };

  const handleContactChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContactNumber(event.target.value);
  };

  const handleCampChange = (event: any) => {
    setCamp(event.target.value);
  };

  const handleDateChange = (newDate: Dayjs | null) => {
    setDate(newDate);
  };

  return (
    <div className="bg-slate-100 rounded-lg space-x-5 space-y-2 w-fit px-[25%] py-5 justify-center">
      <div className="w-fit space-y-2">
        <div className="sm:col-span-3">
          <label htmlFor="Name-Lastname" className="block text-md text-left text-gray-600">
            Name-Lastname
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="Name-Lastname"
              name="Name-Lastname"
              value={nameLastname}
              onChange={handleNameChange}
              placeholder="Your Name"
              className="MuiInput-input bg-white"
            />
          </div>
        </div>
        <div className="sm:col-span-3">
          <label htmlFor="Contact-Number" className="block text-md text-left text-gray-600">
            Contact-Number
          </label>
          <div className="mt-2">
            <input
              id="Contact-Number"
              name="Contact-Number"
              type="text"
              value={contactNumber}
              onChange={handleContactChange}
              placeholder="Your Contact Number"
              className="MuiInput-input bg-white"
            />
          </div>
        </div>
        <div className="sm:col-span-3">
          <label htmlFor="Pick-Camp" className="block text-md text-left text-gray-600">
            Pick Camp
          </label>
          <Select
            variant="standard"
            name="camp"
            id="camp"
            value={camp}
            onChange={handleCampChange}
            className="h-[2em] w-[200px]"
          >
            {Array.from(campItems.entries()).map(([key, value]) => (
              <MenuItem key={key} value={key}>{value}</MenuItem>
            ))}
          </Select>
        </div>
        <div className="sm:col-span-3">
          <label htmlFor="Pick-Date" className="block text-md text-left text-gray-600">
            Pick Date
          </label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker className="bg-white" value={date} onChange={handleDateChange} />
          </LocalizationProvider>
        </div>
      </div>
    </div>
  );
}
