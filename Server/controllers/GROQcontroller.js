const { ChatGroq } = require('@langchain/groq');
const { ElevenLabsClient  } = require('elevenlabs');
const { AssemblyAI } = require('assemblyai');
const config = require('../Config/voicebot');
const fs = require('fs');
const model = new ChatGroq({
  apiKey: config.GROQ_API_KEY,
  model: 'mixtral-8x7b-32768',
  temperature: 0,
});

const client = new ElevenLabsClient({
  apiKey: config.ELEVENLABS_API_KEY,
});

const assemblyAI = new AssemblyAI({
  apiKey: config.ASSEMBLYAI_API_KEY,
});

const groqChat = async (req, res) => {
  try {
    const { text } = req.body;
  
    const response = await model.invoke([text]);
    const aiResponse = response.content; // Parse response as needed

    // ElevenLabs Voice Synthesis
    const audioStream = await client.generate({
      voice: "Rachel",
      model_id: "eleven_turbo_v2_5",
      text: aiResponse,
    });

    const chunks = [];
    for await (const chunk of audioStream) {
      chunks.push(chunk);
    }

    const audioBuffer = Buffer.concat(chunks);
    const audioBase64 = audioBuffer.toString('base64');
    const audioUrl = `data:audio/mpeg;base64,${audioBase64}`;

    // Respond with AI response and audio
    res.setHeader('Content-Type', 'application/json');
    res.json({ text: aiResponse, audio: audioUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error generating response.' });
  }
};

const processVoiceCommand = async (req, res) => {
  try {
    const { audioData } = req.body; // `audioData` is the file from frontend

    if (!audioData) {
      return res.status(400).json({ error: 'No audio file provided.' });
    }

    // Save the audio file temporarily on the server
    const filePath = path.join(__dirname, 'temp_audio.wav');
    const writeStream = fs.createWriteStream(filePath);

    writeStream.write(Buffer.from(audioData, 'base64'));
    writeStream.end();

    writeStream.on('finish', async () => {
      try {
        const params = {
          audio: filePath,
          speaker_labels: true,
        };

        // Process the file with AssemblyAI
        const transcript = await assemblyAI.transcripts.transcribe(params);

        if (transcript.status === 'error') {
          console.error(`Transcription failed: ${transcript.error}`);
          return res.status(500).json({ error: `Transcription failed: ${transcript.error}` });
        }

        // Send the transcript and continue with the chat flow
        const text = transcript.text;
        req.body.text = text;

        // Clean up: Delete the temporary audio file
        fs.unlinkSync(filePath);

        return groqChat(req, res); // Forward the transcript to your existing chat logic
      } catch (error) {
        console.error('Error during transcription:', error);
        res.status(500).json({ error: 'Error during transcription.' });
      }
    });

    writeStream.on('error', (error) => {
      console.error('Error saving audio file:', error);
      res.status(500).json({ error: 'Error saving audio file.' });
    });
  } catch (error) {
    console.error('Error processing the voice command:', error);
    res.status(500).json({ error: 'Error processing the voice command.' });
  }
};

module.exports = { groqChat, processVoiceCommand  };
