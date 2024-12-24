### Contributor Guide

#### Setting Up Environment Variables

To contribute to this project, you need to set up a `.env` file in the root directory of the project. This file will store the environment variables required for the application to run.

##### Steps to Create the `.env` File:

1. In the root directory of the project, create a new file named `.env`.
2. Copy and paste the following keys into the `.env` file:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_c3dlZXBpbmctYmVldGxlLTM0LmNsZXJrLmFjY291bnRzLmRldiQ
VITE_GOOGLE_API_KEY=AIzaSyAvPYDPbh8T5Ml-0-dys39frOyO-lMaq-0

VITE_LANGCHAIN_TRACING_V2=
VITE_LANGCHAIN_ENDPOINT=
VITE_LANGCHAIN_API_KEY=
VITE_LANGCHAIN_PROJECT=
VITE_GROQ_API_KEY=
```

##### Important Notes:
- Do **not** share your `.env` file or any of its contents publicly to avoid exposing sensitive information.
- Make sure the `.env` file is included in `.gitignore` to prevent it from being committed to version control.

Once the `.env` file is set up, the application will be able to access the required environment variables during runtime. 