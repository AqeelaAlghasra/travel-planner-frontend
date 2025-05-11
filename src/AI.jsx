import { useState } from "react";
import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPEN_AI_API_KEY, // use .env for security
  dangerouslyAllowBrowser: true, // only use this for testing!
});


// const generateTripPlan = async (formData) => {
//     try {
//         const completion = await openai.chat.completion.create(messages: [
//             {
//               role: "system",
//               content:
//                 "I'm a project manager and I need help identifying missing to-do items. I have a list of existing tasks in JSON format, containing objects with 'taskName' and 'description' properties. I also have a good understanding of the project scope. Can you help me identify 5 additional to-do items for the project with projectName that are not yet included in this list? Please provide these missing items in a separate JSON array with the key 'todos' containing objects with 'taskName' and 'description' properties. Ensure there are no duplicates between the existing list and the new suggestions.",
//             },
//             {
//               role: "user",
//               content: JSON.stringify({
//                 todos,
//                 projectName,
//               }),
//             },
//           ],
//           response_format: {
//             type: "json_object",
//           },
//           model: "gpt-3.5-turbo",
//         });
//     }
//     } catch (error) {
//         console.log(error.message)
//     }



export default function GenerateTripPlan() {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const generateTripPlan = async () => {
    setLoading(true);
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'user', content: 'generate travel Plan for Location : {London},for {8}days for {5}people with {1500BD}, Give me a Hotels options list with HotelName,Hotel address,Prices ,hotel image url , geo coordinates, descriptions,rating,and suggest itinerary with place name ,place details,place Image URl,geo coordinates, ticket pricing Time  travel each of the location for 8 days with each day plan with the best time to to visit in json format' },
        //   { role: 'user', content: 'Plan a 3-day trip to Tokyo with activities.' },
        ],
      });

      setResponse(completion.choices[0].message.content);
    } catch (error) {
      console.error('Error fetching AI suggestion:', error);
      setResponse('Failed to get a response.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={generateTripPlan}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Get Trip Plan'}
      </button>

      {response && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h2 className="font-bold mb-2">AI Trip Plan:</h2>
          <pre>{response}</pre>
        </div>
      )}
    </div>
  );
}
export {
    GenerateTripPlan,
  };
  