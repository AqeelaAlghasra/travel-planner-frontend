
import { SelectBudgetOptions, SelectTravelsTypeList } from '@/constants/options';
import { LoadScript } from '@react-google-maps/api';
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Button } from '../ui/button';
import { toast } from 'sonner';
import OpenAI from "openai";
import { FcGoogle } from 'react-icons/fc'
// import DestinationDialog from "./DestinationDialog"
import axios from 'axios';
import { doc, Firestore, setDoc } from 'firebase/firestore';
import { db } from '../../services/firebaseConfig';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useGoogleLogin } from '@react-oauth/google';
import { Await } from 'react-router';


const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPEN_AI_API_KEY, // use .env for security
  dangerouslyAllowBrowser: true, // only use this for testing!
});

function CreateTrip() {
  const [submitted, setSubmitted] = useState(false);
  const [openDialog, setOpenDailog] = useState(false);
  const [openDestinationsDialog, setOpenDestinationsDailog] = useState(false);
  const [place, setPlace] = useState();
  // const [setOpenDialog,setOpenDialog]=useState(false);
  const [topDestinations, setTopDestinations] = useState([])
  const [suggestionClicked, setSuggestionClicked] = useState(false)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    location: '',
    DaysNo: 1,
    budget: '',
    traveler: '',
  });

  const handleInputChange = (name, value) => {
    if (name == 'DaysNo' && value > 9) {
      toast("Please enter Trip days less than 9 ");
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
    // console.log(event.target.value);

  }

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => GetUserProfile(codeResponse),
    onError: (error) => console.log(error)
  })



  const OnGenerateTrip = async () => {
    const user = localStorage.getItem('user');

    if (!user) {
      setOpenDailog(true)
      return;
    }


    const { location, DaysNo, budget, traveler } = formData;
    if (formData?.DaysNo > 9 || !formData?.location || !formData?.budget || !formData?.traveler) {
      toast("Please fill all details");
      return;
    }
    setLoading(true);
    const systemMessage = `generate travel plan for Location: {${location}}, for {${DaysNo}} days, for {${traveler}} people with budget {${budget}}, returning JSON with hotel options (name, address, price, image_url, coordinates, rating, description) and daily itineraries including each place name, details, image_url, coordinates, ticket_price, and recommended visit times in JSON format`;
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: "Please generate the trip plan." },
      ],
    });

    console.log(completion.choices[0].message.content);
    setLoading(false);
    SaveAiTrip(completion?.choices[0]?.message.content);

  }

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json'
      }
    }).then((response) => {
      console.log(response);
      localStorage.setItem('user', JSON.stringify(response.data));
      setOpenDailog(false);
      OnGenerateTrip();
    })
  }

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString()
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId
    });
    setLoading(false);

  }

  const OnGetAISuggestionforDestinations = async () => {
    try {

      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'list the top 5 countries people travels /visits to it maybe with visitor number in the same month in JSON format' },
          { role: "user", content: "Please generate the destinations list." },
        ],
      });
      
      const responseText = completion.choices[0].message.content;

      // 👇 FIX: Parse the string into JSON
      const parsed = responseText;

      setTopDestinations(parsed.destinations);

      setSuggestionClicked(true);

      console.log(parsed);

    } catch (error) {
      console.error('Error fetching AI suggestion:', error);
      ('Failed to get a response.');
    }
  }


  useEffect(() => {
    console.log(formData)
  }, [formData])



  return (
    <>
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_PLACE_KEY} libraries={["places"]}>

        <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
          <h2 className='font-bold text-3xl'>help us know you travel preferences 🌴 🏄 🪂 🧗 🏜️ </h2>

        </div>

        <div className='mt-20 flex flex-col gap-10'>
          <div>
            <p className='mt-3 text-grey-500 text-xl'>Destination type</p>
            <GooglePlacesAutocomplete apiKey={import.meta.env.VITE_GOOGLE_PLACE_KEY}
              selectProps={{
                place,
                onChange: (v) => {
                  setPlace(formData.location);// console.log(v)
                  handleInputChange('location', v.value.description);
                }
              }} /><div className='my-10 justify-end flex '>
              <Dialog className="bg-white rounded-lg shadow-lg">
                <DialogTrigger>

                  <Button onClick={OnGetAISuggestionforDestinations} open={openDestinationsDialog} onOpenChange={setOpenDestinationsDailog}> Get AI suggestion for a destination 🪄</Button>

                </DialogTrigger>
                <DialogContent className="bg-white rounded-lg shadow-lg">
                  <DialogHeader>
                    <DialogTitle>🌍 Top Travel Destinations</DialogTitle>
                    <DialogDescription>
                      <p>Select a destination to autofill your trip</p>
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-3 mt-4">
                    {topDestinations?.map((dest, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="flex justify-between items-center"
                        onClick={() => {
                          handleInputChange('location', dest.country);
                          setOpenDailog(false);
                        }}
                      >
                        <span>{dest.country}</span>
                        <span className="text-sm text-gray-500">
                          {Number(dest.visitors).toLocaleString()} visitors
                        </span>
                      </Button>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </div>

          </div>
          <div className='mt-20 flex flex-col gap-10'>
            <p className='mt-3 text-grey-500 text-xl'>Number of days:</p>
            <input onChange={(e) => handleInputChange('DaysNo', e.target.value)} type="number" defaultValue={1} min={1} />

          </div>
        </div>
        <div>
          <h2 className='text-xl my-3 font-medium'>What is your Budget?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectBudgetOptions.map((item, index) => (
              <div key={index} onClick={() => handleInputChange('budget', item.title)} className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.budget == item.title && 'shadow-lg border-black'}`}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500' >{item.desc}</h2>

              </div>
            ))}
          </div>
          <div>
            <h2 className='text-xl my-3 font-medium'>traveler List</h2>
            <div className='grid grid-cols-3 gap-5 mt-5'>
              {SelectTravelsTypeList.map((item, index) => (
                <div key={index}
                  onClick={() => handleInputChange('traveler', item.people)} className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.traveler == item.people && 'shadow-lg border-black'}`}>
                  <h2 className='text-4xl'>{item.icon}</h2>
                  <h2 className='font-bold text-lg'>{item.title}</h2>
                  <h2 className='text-sm text-gray-500' >{item.desc}</h2>

                </div>
              ))}
            </div>
          </div>
        </div>
        <Dialog open={openDialog} onOpenChange={setOpenDailog} className="bg-white rounded-lg shadow-lg">
          <DialogTrigger asChild>
            <div className='my-10 justify-end flex '>
              <Button onClick={login}  >
                {loading ? <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : 'Generate Trip'}
              </Button>
            </div>
          </DialogTrigger>
          <DialogContent className="bg-white rounded-lg shadow-lg">
            <DialogHeader>

              <DialogDescription>
                <img src="/logo.png" className='ml-25 justify-center' width={250} height={250} />
                <h2 className='font-blod text-lg mt-2'>Sign In With Google</h2>

                <p>Sign in to the App with Google authentication securely </p>
                <Button disabled={loading} onClick={login} className='w-full mt-25 flex gap-4 items-center' >

                  <> <FcGoogle className='h-7 w-7' />Sign In With Google</></Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

      </LoadScript>
    </>
  );

}

export default CreateTrip