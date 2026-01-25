import json 
import re

def extract_json(text:str)->dict:
    """
    Extracts the first valid JSON object from AI output.
    """

    try : 
        return json.loads(text)
    except json.JSONDecodeError:
        match = re.search(r"\{.*\}", text, re.DOTALL)
        if not match:
            raise ValueError("No JSON found in AI response")
        return json.loads(match.group())