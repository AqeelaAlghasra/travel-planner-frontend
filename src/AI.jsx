import { useState } from "react";
import OpenAI from "openai";
const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPEN_AI_API_KEY, // use .env for security
    dangerouslyAllowBrowser: true, // only use this for testing!
});

export async function generateTripPlan({systemMessage})  {
    try {

            const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: systemMessage },
                {role: 'user', content: }
            ],
        });

       return(completion.choices[0].message.content);
    } catch (error) {
        console.error('Error fetching AI suggestion:', error);
        return('Failed to get a response.');

    }
}
// export function GenerateTripPlan({ location, days, people, budget }) {
//     const [response, setResponse] = useState([]);
//     const [loading, setLoading] = useState(false);

//     const generateTripPlan = async () => {
//         setLoading(true);
//         try {

//             const systemMessage = `generate travel plan for Location: {${location}}, for {${days}} days, for {${people}} people with budget {${budget}}, returning JSON with hotel options (name, address, price, image_url, coordinates, rating, description) and daily itineraries including each place name, details, image_url, coordinates, ticket_price, and recommended visit times in JSON format`;
//             const completion = await openai.chat.completions.create({
//                 model: 'gpt-3.5-turbo',
//                 messages: [
//                     { role: 'system', content: systemMessage },
//                 ],
//             });

//             setResponse(completion.choices[0].message.content);
//         } catch (error) {
//             console.error('Error fetching AI suggestion:', error);
//             setResponse('Failed to get a response.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="p-4">
//             <button
//                 onClick={generateTripPlan}
//                 className="bg-blue-500 text-white px-4 py-2 rounded"
//                 disabled={loading}
//             >
//                 {loading ? 'Generating...' : 'Get Trip Plan'}
//             </button>

//             {response && (
//                 <div className="mt-4 p-4 bg-gray-100 rounded">
//                     <h2 className="font-bold mb-2">AI Trip Plan:</h2>
//                     <pre>{response}</pre>
//                 </div>
//             )}
//         </div>
//     );
// }
export function GetTopCountries() {
    const [loading, setLoading] = useState(false);
    const [countries, setCountries] = useState < String | null > (null);
    const generateCountries = async () => {
        setLoading(true);
        try {

            // const systemMessage = `generate travel plan for Location: {${location}}, for {${days}} days, for {${people}} people with budget {${budget}}, returning JSON with hotel options (name, address, price, image_url, coordinates, rating, description) and daily itineraries including each place name, details, image_url, coordinates, ticket_price, and recommended visit times.`;
            const completion = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'user', content: 'list the top ten countries people travels /visits to it maybe with visitor number in the same month in jason format' },
                ],
            });

            setLoading(false);
            setCountries(completion.choices[0].message.content);
        } catch (error) {
            console.error('Error fetching AI suggestion:', error);
            ('Failed to get a response.');
        } finally {
            setLoading(false);
        }
        if (!Array.isArray(countries)) return null;
        return (
            <div className="p-4">
            <button
                onClick={generateCountries}
                className="bg-blue-500 text-white px-4 py-2 rounded"
                disabled={loading}
                >
                {loading ? 'Generating...' : 'Get AI suggestions for a destination'}
            </button>

            
                
                <div className="mt-4 p-4 bg-gray-100 rounded">
                    <h2 className="font-bold mb-2">AI destination suggestions:</h2>

                    <ul>
                        {countries.map((c) => (
                            <li key={c.code}>{c.name}</li>
                        ))}
                    </ul>        
            
                </div>
                </div>
        );
    }                 
}
export default{
                // GenerateTripPlan,
                generateTripPlan,
                GetTopCountries
            };
