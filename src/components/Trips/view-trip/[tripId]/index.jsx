import { db } from '@/services/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import Footer from '@/components/Custom/Footer';

function ViewTrip() {

    const {tripId}=useParams();
    const [trip,setTrip]=useState([]);
    useEffect(()=>{
        tripId&&GetTripData();
    },[tripId])

    /**
     * Used to get Trip Information from Firebase
     */
    const GetTripData=async()=>{
        const docRef=doc(db,'AITrips',tripId);
        const docSnap=await getDoc(docRef);

        if(docSnap.exists()){
            console.log("Dodcument:",docSnap.data());
            setTrip(docSnap.data());
        }
        else{
            console.log("No Such Document");
            toast('No trip Found!')
        }
    }

  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
       
            <Footer trip={trip} />
    </div>
  )
}

export default ViewTrip