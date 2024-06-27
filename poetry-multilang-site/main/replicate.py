import replicate
from django.conf import settings

model_name = "meta/meta-llama-3-8b-instruct"

replicate = replicate.Client(api_token=settings.REPLICATE_TOKEN)

def processing_full_prompt(full_prompt):
    full_prompt_processed = ""
    for line in full_prompt:
        full_prompt_processed += line["role"] + " : " + line["message"] + "\n"
    return full_prompt_processed

def define_inputs(prompt=""):
    return {
        "TOP_P": 0.9,
        "prompt": prompt,
        "MAX_TOKENS": 1024,
        "MIN_TOKENS": 0,
        "TEMPERATURE": 0.6,
        "PRESENCE_PENALTY": 0,
        "FREQUENCY_PENALTY": 0
    }


def run_inference(inputs):
    """
    Run inference using the specified model.

    Args:
        model_name (str): The name of the model to use for inference.

    Returns:
        str: The result of the inference as a string.
    """
    if not isinstance(model_name, str) or model_name == "":
        raise ValueError("model_name must be a non-empty string")

    result = ""

    try:
        for event in replicate.stream(
                model_name,
                input=inputs,
        ):
            print(event)
            result += str(event)

    except Exception as e:
        print(f"An error occurred: {str(e)}")

    return result
