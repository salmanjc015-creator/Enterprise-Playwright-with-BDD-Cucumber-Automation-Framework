# Official Microsoft Playwright image containing pre-installed browser binaries and OS dependencies
FROM mcr.microsoft.com/playwright:v1.50.0-noble

WORKDIR /app

# Install project dependencies
COPY package*.json ./
RUN npm ci

# Copy framework source code
COPY . .

# Generate BDD specs and compile TypeScript
RUN npx bddgen && npx tsc --noEmit

# Default command runs the test suite
CMD ["npm", "test"]
