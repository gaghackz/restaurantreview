import numpy as np
from transformers import AutoTokenizer, AutoModelForSequenceClassification, pipeline


MODEL_NAME = "Festooned/Multilingual-Restaurant-Reviews-Sentiment"


class RestaurantSentimentClassifier:

    def __init__(self):
        print(f"Loading model: {MODEL_NAME}")

        self.tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)

        self.model = AutoModelForSequenceClassification.from_pretrained(
            MODEL_NAME
        )

        self.pipeline = pipeline(
            "text-classification",
            model=self.model,
            tokenizer=self.tokenizer,
        )

        print("Model loaded successfully.")

    def predict(self, text: str) -> dict:

        result = self.pipeline(text)[0]

        # Model predicts 0-4
        raw_score = float(result["score"])

        # Convert 0-4 → 1-5
        rating = int(
            np.clip(
                round(raw_score),
                0,
                4,
            )
            + 1
        )

        sentiment = self._get_sentiment(rating)
        score = self._get_score(rating)

        return {
            "rating": rating,
            "sentiment": sentiment,
            "score": score,
        }

    @staticmethod
    def _get_sentiment(rating: int) -> str:

        if rating <= 2:
            return "NEGATIVE"

        if rating == 3:
            return "NEUTRAL"

        return "POSITIVE"

    @staticmethod
    def _get_score(rating: int) -> float:

        # Convert 1-5 rating into -1 to +1
        #
        # 1 → -1
        # 2 → -0.5
        # 3 →  0
        # 4 → +0.5
        # 5 → +1

        return (rating - 3) / 2


classifier = RestaurantSentimentClassifier()