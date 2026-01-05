import pathlib

from pydantic_settings import BaseSettings, SettingsConfigDict

ROOT_DIR = pathlib.Path(__file__).resolve().parent.parent.parent
ENV_PATH = ROOT_DIR / ".env"

print(ROOT_DIR)


class Settings(BaseSettings):
    openai_api_key: str
    gemini_api_key: str
    app_name: str = "Financial AI Agent"
    debug: bool = False
    model_config = SettingsConfigDict(env_file=ENV_PATH, env_file_encoding="utf-8")


settings = Settings()
