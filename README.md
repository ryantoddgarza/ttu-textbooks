# ttu-textbooks

[![Netlify Status](https://api.netlify.com/api/v1/badges/81dc1367-6031-4440-ac8c-5d6e7fbaa9ed/deploy-status)](https://app.netlify.com/sites/ttu-textbooks/deploys)

Project 3 deliverable for Introduction to Technical Writing (ENGL-2311-D35, Fall 2022) taught by Dr. Min-Joo Kim at Texas Tech University.

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

### Step 2: Configure the environment variables

Create a file named `.env` at the project's root with the following variables:

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
