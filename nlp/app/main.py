from fastapi import FastAPI, HTTPException

from .classifier import classifier
from .schemas import PredictRequest, PredictResponse


app = FastAPI(
    title="Restaurant Review NLP",
    version="1.0.0",
)


@app.get("/health")
def health():
    return {
        "status": "ok",
        "service": "restaurant-review-nlp",
    }


@app.post("/predict", response_model=PredictResponse)
def predict(request: PredictRequest):

    text = request.text.strip()

    if not text:
        raise HTTPException(
            status_code=400,
            detail="Review text cannot be empty",
        )

    try:
        result = classifier.predict(text)

        return result

    except Exception as error:

        print(f"NLP prediction error: {error}")

        raise HTTPException(
            status_code=500,
            detail="Failed to classify review",
        )