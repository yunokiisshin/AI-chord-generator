import requests


def generate_chord_progression(prompt):
    from openai import OpenAI
    client = OpenAI()

    response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "You are a professional musician and music theorist. Your job is to create a 8-bar chord progression in C-major, suited to the genre. Only provide the strings as shown in the examples. Be creative, but not too odd."},
        {"role": "user", "content": "Make me a jazz chord progression"},
        {"role": "assistant", "content": "FM7 Em7 G9sus4"},
        {"role": "user", "content": "Where was it played?"}
    ]
    )
prompt = "Generate a chord progression in C major"
chord_progression = generate_chord_progression(prompt)
print(chord_progression)
