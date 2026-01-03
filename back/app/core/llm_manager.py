import google.generativeai as genai

from .config import settings


class LLMManager:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(LLMManager, cls).__new__(cls)

            if not settings.gemini_api_key:
                raise ValueError("Error: No api key provided.")

            genai.configure(api_key=settings.gemini_api_key)
            cls._instance.gemini_model = genai.GenerativeModel("gemini-3-flash-preview")
            # gemini-3-pro-preview
            # models/gemini-3-pro-image-preview
            # models/gemini-3-flash-preview
            cls._instance.default_model = "gemini"

        return cls._instance

    def ask(self, prompt: str, model="None"):
        selected_model = model if model else self.default_model

        try:
            response = self.gemini_model.generate_content(prompt)
            return response.text

        except Exception as e:
            return f"Błąd podczas komunikacji z {selected_model}: {str(e)}"
