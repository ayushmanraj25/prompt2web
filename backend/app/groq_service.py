"""
Groq AI Service for Prompt2Web.
Utilizes Groq LPUs with llama-3.3-70b-versatile to expand and refine
user ideas into masterfully engineered 4-Layer Prompts matching
Hollywood and Google Gemini/Imagen 3 cinematic standards.
"""

import os
import logging
from typing import Optional

logger = logging.getLogger("prompt2web.groq")

# 4-Layer System Prompt for Groq Llama-3.3-70B
PROMPT_EXPANDER_SYSTEM_PROMPT = """You are an elite Hollywood concept art director and master generative imaging prompt engineer.
Your mission is to convert the user's raw prompt into a breathtaking, multi-layered visual masterpiece.

You MUST systematically inject these 4 Critical Visual Layers:
1. SUBJECT DETAILS: Intricate micro-details, materials, textures, glowing cybernetic armor, glowing kabuto helmet or high-tech attire, crackling plasma/laser energy weapons emitting electric sparks.
2. ENVIRONMENT LAYER: Crowded vibrant street/setting, towering architectural depth, glowing Japanese kanji and holographic neon ramen signs, rain-slicked wet asphalt reflecting neon streetlights, pedestrians with umbrellas, steam and atmospheric haze.
3. NEON LIGHTING LAYER: Intense electric cyan and magenta neon bloom, dramatic volumetric light shafts, ray-traced water puddle reflections, high-contrast cinematic dusk.
4. RENDER QUALITY: Unreal Engine 5 render, 8k resolution, cinematic 35mm photograph, octane render, sharp focus, masterpiece, high dynamic range.

STRICT FORMATTING RULE:
Output ONLY the final expanded prompt as a single cohesive descriptive paragraph (50 to 80 words). Do NOT add headings, numbering, explanations, or quotes."""

def _fallback_prompt_enhancer(raw_prompt: str) -> str:
    """
    Supercharged 4-Layer Prompt Enhancer when running without Groq API key.
    Forces all 4 critical visual layers directly into the prompt:
    1. Subject Details
    2. Environment Layer
    3. Neon Lighting Layer
    4. Render Quality
    """
    clean = raw_prompt.strip().rstrip('.')
    lower = clean.lower()

    # If prompt mentions samurai/cyberpunk/warrior/ninja
    if any(k in lower for k in ['samurai', 'cyberpunk', 'ninja', 'warrior', 'tokyo', 'neon', 'katana']):
        return (
            f"{clean}, intricate glowing cybernetic armor, glowing samurai kabuto helmet with cyan visor, "
            f"crackling plasma laser katana emitting electric blue sparks, "
            f"crowded Neo-Tokyo street with glowing Japanese ramen signs and holographic billboards, "
            f"rain slicked asphalt reflecting vibrant neon signs, cyberpunk pedestrians with umbrellas, "
            f"intense electric cyan and magenta neon bloom, volumetric light shafts, deep cinematic shadows, "
            f"Unreal Engine 5 render, 8k resolution, cinematic 35mm photograph, octane render, sharp focus"
        )
    
    # Universal 4-Layer Aesthetic Expansion for any prompt
    return (
        f"{clean}, intricate glowing cybernetic details and textured materials, "
        f"atmospheric environment with rich scene depth, towering background architecture, reflective wet surfaces, "
        f"intense electric cyan and magenta neon bloom, dramatic volumetric light shafts, deep cinematic shadows, "
        f"Unreal Engine 5 render, 8k resolution, cinematic 35mm photograph, octane render, sharp focus, masterpiece"
    )

async def expand_image_prompt(raw_prompt: str) -> str:
    """
    Expands a user prompt using Groq's llama-3.3-70b-versatile model.
    Falls back gracefully if Groq API key is not configured.
    """
    api_key = os.environ.get("GROQ_API_KEY", "").strip()

    if not api_key:
        logger.info("GROQ_API_KEY not found in environment. Using 4-layer supercharged fallback prompt.")
        return _fallback_prompt_enhancer(raw_prompt)

    try:
        from groq import AsyncGroq

        client = AsyncGroq(api_key=api_key)
        response = await client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": PROMPT_EXPANDER_SYSTEM_PROMPT},
                {"role": "user", "content": f"Supercharge this idea with all 4 visual layers: {raw_prompt}"},
            ],
            temperature=0.7,
            max_tokens=180,
        )

        expanded = response.choices[0].message.content.strip()
        if expanded.startswith('"') and expanded.endswith('"'):
            expanded = expanded[1:-1].strip()

        return expanded if expanded else _fallback_prompt_enhancer(raw_prompt)

    except Exception as exc:
        logger.warning(f"Groq prompt enhancement failed: {exc}. Using 4-layer supercharged fallback.")
        return _fallback_prompt_enhancer(raw_prompt)
