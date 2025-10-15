import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

const client = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY as string
});

/**
 * Convert text into speech and return the audio buffer
 * @param {string} text - The text to convert
 * @param {object} options - Optional config (model, voiceId, format)
 * @returns {Promise<Buffer>} - The audio data as a Buffer
 */
export async function textToSpeechBuffer(
  text: string,
  {
    voiceId = "pVnrL6sighQX7hVz89cp", //process.env.ELEVENLABS_VOICE_ID as string, // set default in env
    model = "eleven_flash_v2_5" // fast, long-text model
  } = {}
) {
  const stream = await client.textToSpeech.convert(voiceId, {
    text,
    modelId: model,
    outputFormat: "mp3_44100_128"
  });

  // Collect audio chunks into a single buffer
  const chunks: Uint8Array[] = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks.map((u) => Buffer.from(u)));
}
