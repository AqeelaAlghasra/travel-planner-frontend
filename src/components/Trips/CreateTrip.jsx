import { SelectBudgetOptions, SelectTravelsTypeList } from '@/constants/options';
import {LoadScript} from '@react-google-maps/api';
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Button } from '../ui/button';
import { toast } from 'sonner';

function CreateTrip() {
  const [place,setPlace]= useState();
  const [formData,setFormData]= useState([]);

  const handleInputChange =(name,value)=>{
    if(name=='DaysNo'&&value>5){
      console.log("Please enter Trip days less than 5 ")
      return;
    }

    setFormData({
      ...formData,
      [name]:value
    })
    // console.log(event.target.value);

  }


  const OnGenerateTrip=()=>{
    if (formData?.DaysNo>5&&formData?.location&&!formData?.budget|| !formData?.traveler ){
      toast("Please fill all details");
      return;
    }
    console.log(formData);
  }

  useEffect(()=>{
    console.log(formData)
  },[formData])


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
          onChange:(v)=>{setPlace(v.description); console.log(v)
          handleInputChange('location',v);
          }
        }}/>
        </div>
        <div className='mt-20 flex flex-col gap-10'>
        <p className='mt-3 text-grey-500 text-xl'>Number of days:</p>
        <input onChange={(e)=>handleInputChange('DaysNo',e.target.value)} type="number" placeholder='Ex.4' />

        </div>
      </div>
      <div>
        <h2 className='text-xl my-3 font-medium'>What is your Budget?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectBudgetOptions.map((item,index)=>(
            <div key={index} onClick={()=>handleInputChange('budget',item.title)} className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.budget==item.title&&'shadow-lg border-black'}`}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500' >{item.desc}</h2>
                
            </div>
          ))}
        </div>
      <div>
        <h2 className='text-xl my-3 font-medium'>traveler List</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectTravelsTypeList.map((item,index)=>(
            <div key={index}
            onClick={()=>handleInputChange('traveler',item.people)} className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.people==item.people&&'shadow-lg border-black'}`}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500' >{item.desc}</h2>
                
            </div>
          ))}
        </div>
      </div>
      </div>
      <div className='my-10 justify-end flex '>
        <Button onClick={OnGenerateTrip}>Generate Trip</Button>
      </div>
    </LoadScript>
    </>
  )
}

export default CreateTrip