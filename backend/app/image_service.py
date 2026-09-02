"""
Image Generation Service for Prompt2Web.
Generates ultra-high resolution imagery using FLUX.1 diffusion models.
"""

import urllib.parse
import random
import logging
from typing import Dict, Any

logger = logging.getLogger("prompt2web.image")

# Aspect ratio map to pixel dimensions (FLUX.1 optimized)
ASPECT_RATIO_DIMENSIONS = {
    "1:1": (1024, 1024),
    "16:9": (1280, 720),
    "9:16": (720, 1280),
    "4:3": (1024, 768),
    "3:2": (1080, 720),
}

async def generate_flux_image(prompt: str, aspect_ratio: str = "1:1", seed: int = None) -> Dict[str, Any]:
    """
    Generates an image via FLUX.1 using the provided prompt and dimensions.
    Returns the high-res image URL, dimensions, and metadata.
    """
    width, height = ASPECT_RATIO_DIMENSIONS.get(aspect_ratio, (1024, 1024))
    image_seed = seed if seed is not None else random.randint(100000, 9999999)

    # Encode prompt for URL safety
    encoded_prompt = urllib.parse.quote(prompt.strip())

    # High-speed FLUX.1 endpoint with no watermark
    image_url = (
        f"https://image.pollinations.ai/prompt/{encoded_prompt}"
        f"?model=flux&width={width}&height={height}&seed={image_seed}&nologo=true"
    )

    logger.info(f"FLUX.1 image URL generated successfully for seed {image_seed}")

    return {
        "image_url": image_url,
        "width": width,
        "height": height,
        "seed": image_seed,
        "model": "FLUX.1",
        "aspect_ratio": aspect_ratio,
    }
