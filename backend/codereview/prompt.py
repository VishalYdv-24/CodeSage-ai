def build_code_review_prompt(language: str, code: str) -> str:
    return f"""
You are a helpful and practical software developer.

Review the following {language} code.

Your tasks:
1. Point out any obvious bugs or issues (if any)
2. Suggest improvements for readability and clarity
3. Rewrite the code in a clean, simple, and beginner-friendly way
   - Do NOT overengineer
   - Do NOT add logging, configuration, or advanced patterns
   - Keep the solution easy to understand
4. Give a rating from 1 to 10 based on code quality for everyday use

IMPORTANT:
- The improved code should look like what a normal developer would write
- Keep it simple and readable
- Avoid unnecessary abstractions

Respond ONLY in valid JSON with this exact structure:
{{
  "summary": "",
  "issues": [],
  "improved_code": "",
  "rating": 0,
  "original_code": ""
}}

CODE:
{code}
"""
