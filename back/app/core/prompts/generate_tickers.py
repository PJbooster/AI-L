import json
import re

from app.core.llm_manager import LLMManager


def prompt_to_json(raw_llm_response):
    try:
        clean_json = re.sub(r"```json|```", "", raw_llm_response).strip()
        return json.loads(clean_json)

    except Exception as e:
        return {"error": f"Failed to parse llm response to JSON: {str(e)}"}


def generate_tickers(region=None):
    llm = LLMManager()
    region = region if region else "Polska"
    number_of_tickers = 20

    instruction = (
        "Jesteś ekspertem finansowym GPW. Na każde zapytanie o spółki odpowiadaj "
        "WYŁĄCZNIE poprawnym formatem JSON. Nie dodawaj wstępów ani komentarzy."
        f"Wygeneruj liste tickerów finansowych dla yfinance na terenie {region}"
        f"Wygeneruj przynajmniej {number_of_tickers} tickerów"
        "Format:  [{'ALE.WA': 'Allegro SA'}, {'PKO.WA': 'PEKAO SA'} ...  ]"
    )

    response = llm.ask(instruction)
    return prompt_to_json(response)
