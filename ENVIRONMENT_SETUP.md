# Environment Setup for Fitflix Web

## Overview
This document explains how to set up environment variables for the Fitflix Web application.

## Environment Variables

### Required Variables

1. **VITE_API_BASE_URL** - The base URL for the API server
   - Default: `http://localhost:3000/api`
   - Example: `https://api.fitflix.in/api`

### Optional Variables

1. **VITE_APP_VERSION** - Application version
   - Default: `1.0.0`

2. **VITE_ENABLE_PWA** - Enable Progressive Web App features
   - Default: `true`
   - Values: `true` or `false`

3. **VITE_ENABLE_ANALYTICS** - Enable analytics tracking
   - Default: `true`
   - Values: `true` or `false`

## Setup Instructions

### Option 1: Create .env file (Recommended for development)

1. Copy the `env.example` file to `.env`:
   ```bash
   cp env.example .env
   ```

2. Edit the `.env` file with your values:
   ```env
   VITE_API_BASE_URL=http://localhost:3000/api
   VITE_APP_VERSION=1.0.0
   VITE_ENABLE_PWA=true
   VITE_ENABLE_ANALYTICS=true
   ```

### Option 2: Set environment variables in your shell

```bash
export VITE_API_BASE_URL=http://localhost:3000/api
export VITE_APP_VERSION=1.0.0
export VITE_ENABLE_PWA=true
export VITE_ENABLE_ANALYTICS=true
```

### Option 3: Set in your deployment platform

For production deployments, set these variables in your hosting platform's environment configuration.

## Important Notes

- **Vite Environment Variables**: All environment variables must be prefixed with `VITE_` to be accessible in the client-side code.
- **Security**: Never expose sensitive information like API keys in client-side environment variables.
- **Build Time**: Environment variables are embedded at build time, so changes require a rebuild.

## Troubleshooting

### Common Issues

1. **"process is not defined" error**: This has been fixed by using `import.meta.env` instead of `process.env`.

2. **Environment variables not loading**: Ensure variables are prefixed with `VITE_` and the development server is restarted.

3. **Preload warnings**: These have been resolved by removing problematic preload tags.

## Development vs Production

- **Development**: Uses `.env` file or shell variables
- **Production**: Uses deployment platform environment variables
- **Build**: Environment variables are embedded during the build process

## File Structure

```
fitflix_web/
├── src/
│   ├── config/
│   │   └── env.ts          # Environment configuration
│   └── services/
│       └── api.ts          # API service using config
├── env.example             # Environment variables template
└── .env                    # Your local environment file (create this)
```
