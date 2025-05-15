import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { OpenAI } from 'https://esm.sh/openai@4.20.0'; // Importiere OpenAI

// Stelle sicher, dass der OpenAI API Key als Environment Variable gesetzt ist.
// In Supabase: Project Settings > Functions > transcribe-audio > Secrets
const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
if (!OPENAI_API_KEY) {
  console.error("OpenAI API key is not set. Please set the OPENAI_API_KEY environment variable.");
}

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

serve(async (req) => {
  // CORS Headers für lokale Entwicklung und Produktion
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*', // Für lokale Entwicklung; in Produktion spezifischer setzen
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS', // OPTIONS für Preflight-Requests
  };

  // Handle OPTIONS request (preflight)
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (!OPENAI_API_KEY) {
    return new Response(
      JSON.stringify({ error: 'OpenAI API key not configured on the server.' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }

  try {
    // Erwarte FormData mit einer Datei namens 'audioFile'
    const formData = await req.formData();
    const audioFile = formData.get('audioFile');

    if (!audioFile || !(audioFile instanceof File)) {
      return new Response(
        JSON.stringify({ error: 'No audio file found in FormData or invalid file type.' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    console.log(`Received audio file: ${audioFile.name}, size: ${audioFile.size}, type: ${audioFile.type}`);

    // Rufe die OpenAI Whisper API auf
    // Wichtig: OpenAI erwartet die Datei als `File` Objekt oder `ReadableStream`
    // Deno's `File` ist kompatibel.
    const transcription = await openai.audio.transcriptions.create({
      model: 'whisper-1', // Das Standard Whisper Modell
      file: audioFile, // Das File-Objekt direkt übergeben
      // language: 'de', // Optional: Sprache angeben, falls bekannt
      // response_format: 'json', // Standard ist json
    });

    console.log('Transcription successful:', transcription);

    return new Response(
      JSON.stringify({ transcribedText: transcription.text }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );

  } catch (error) {
    console.error('Error processing audio transcription:', error);
    let errorMessage = 'Failed to transcribe audio.';
    let statusCode = 500;

    if (error.response) { // Fehler von der OpenAI API
      console.error('OpenAI API Error Status:', error.response.status);
      console.error('OpenAI API Error Data:', error.response.data);
      errorMessage = error.response.data?.error?.message || errorMessage;
      statusCode = error.response.status || statusCode;
    } else if (error instanceof OpenAI.APIError) {
        console.error('OpenAI API Error:', error.message);
        errorMessage = error.message;
        statusCode = error.status || 500;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }


    return new Response(
      JSON.stringify({ error: errorMessage }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: statusCode }
    );
  }
})
