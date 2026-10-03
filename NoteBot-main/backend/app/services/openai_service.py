import os
import time
from typing import List

try:
    from openai import OpenAI
except Exception:
    OpenAI = None


OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
EMBEDDING_MODEL = os.getenv("OPENAI_EMBEDDING_MODEL", "text-embedding-3-small")
GENERATION_MODEL = os.getenv("OPENAI_GENERATION_MODEL", "gpt-4o-mini")

_client = None


def _get_client():
    global _client
    if _client is None:
        if OpenAI is None:
            raise RuntimeError("openai package is not installed. Add openai to requirements.txt")
        if not OPENAI_API_KEY:
            raise RuntimeError("OPENAI_API_KEY is not set in environment")
        _client = OpenAI(api_key=OPENAI_API_KEY)
    return _client


def get_embeddings(texts: List[str], model: str | None = None) -> List[List[float]]:
    client = _get_client()
    model = model or EMBEDDING_MODEL
    # batch via single request when possible
    tries = 0
    while True:
        try:
            resp = client.embeddings.create(input=texts, model=model)
            return [d.embedding for d in resp.data]
        except Exception as e:
            tries += 1
            if tries > 3:
                raise
            time.sleep(1 * tries)


def chat_completion(messages, model: str | None = None, temperature: float = 0.0, max_tokens: int | None = None):
    client = _get_client()
    model = model or GENERATION_MODEL
    tries = 0
    while True:
        try:
            resp = client.chat.completions.create(
                model=model,
                messages=messages,
                temperature=temperature,
                max_tokens=max_tokens or 1024,
            )
            return {
                "choices": [{"message": {"content": resp.choices[0].message.content}}]
            }
        except Exception as e:
            tries += 1
            if tries > 3:
                raise
            time.sleep(1 * tries)
