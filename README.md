# ttu-textbooks

[![Netlify Status](https://api.netlify.com/api/v1/badges/44b36b21-552c-4095-85ec-e43a9d6fd025/deploy-status)](https://app.netlify.com/sites/ttu-textbooks/deploys)

Deliverable for Introduction to Technical Writing (ENGL-2311-D35) Project 3. Taught by Dr. Min-Joo Kim.

## Running locally

### Step 1: Clone the repository

```shell
# Clone the repository
git clone https://github.com/ryantoddgarza/ttu-textbooks.git

# Move into the project
cd ttu-textbooks

# Install dependencies
npm install
```

### Step 2: Configure the `env` variables

| Name                            | Description                                     |
| ------------------------------- | ----------------------------------------------- |
| `GC_PRIVATE_KEY_ID`             | Google Cloud private key id.                    |
| `GC_PRIVATE_KEY`                | Google Cloud private key.                       |
| `GC_CLIENT_EMAIL`               | Google Cloud project service account email.     |
| `GC_CLIENT_ID`                  | Google Cloud project service account unique id. |
| `STUDENT_SURVEY_SPREADSHEET_ID` | Student Survey Google spreadsheet id.           |

### Step 3: Start the development server

```shell
npm run develop
```
