import os
import openai

from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()


def generate_chord_progression(prompt):
    try:
        # Ensure API key is set in your environment variables
        openai.api_key = os.getenv('OPENAI_API_KEY')
        if not openai.api_key:
            raise ValueError("OpenAI API key is not set in environment variables.")

        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a professional musician and music theorist. Your job is to create a good 8-bar chord progression in C, suited to the genre. Only provide the strings as shown in the examples. Be creative, but not too odd. Take care of musical qualities. Don't always start with C; don't overly use 2-5-1. DO NOT OUTPUT ANYTHING BUT 8 BARS OF CHORD SYMBOLS."},
                {"role": "user", "content": "give me a jazz chord progression"},
                {"role": "assistant", "content": "FM7 | Em7 A7b9 | Dm7 G7 | CM7 | F#m7b5 B7 | Em7 | A9 D7 | G7 | C#dim7"},
                {"role": "user", "content": "give me a jazz chord progression"},
                {"role": "assistant", "content": ""},
                {"role": "user", "content": prompt}
            ]
        )

        return response.choices[0].message['content']
    except Exception as e:
        print(f"An error occurred: {e}")
        return None

prompt = "Generate a jazz chord progression"
chord_progression = generate_chord_progression(prompt)
print(chord_progression)