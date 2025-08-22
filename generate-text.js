// api/generate-text.js
export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const apiKey = process.env.GOOGLE_AI_API_KEY;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    const apiResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request.body)
    });

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      console.error("API Error:", errorText);
      return response.status(apiResponse.status).json({ message: 'Error from Google AI API', details: errorText });
    }

    const data = await apiResponse.json();
    response.status(200).json(data);

  } catch (error) {
    console.error('Server Error:', error);
    response.status(500).json({ message: 'Internal Server Error' });
  }
}