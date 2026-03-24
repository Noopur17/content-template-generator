# Content Template Generator

Content Template Generator is an AI-powered platform that transforms user prompts into structured, template-driven content using free local LLMs through Ollama.

## Features

- Template-based content generation
- Structured JSON output
- Prompt + template driven workflow
- Image upload support
- Editable preview
- Docker support
- Free local LLM integration with Ollama

## Tech Stack

- Frontend: Next.js
- Backend: FastAPI
- LLM: Ollama
- Templates: JSON schema files
- Storage: Local uploads + in-memory content store

## Templates

- Hero Banner
- Product Spotlight
- Marketing Card

## Run locally

### 1. Start Ollama
Install Ollama, then pull a model:

```bash
ollama pull llama3.2