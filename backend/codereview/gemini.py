from google import genai


def review_code_with_gemini(prompt: str) -> str:
    client = genai.Client()

    response = client.models.generate_content(
        model="gemini-3-flash-preview",
        contents=[
            {
                "role": "user",
                "parts": [{"text": prompt}]
            }
        ]
    )

    return response.text
