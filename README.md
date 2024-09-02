# AWS Lambda React GitHub Pages Template

This repository contains a frontend and backend along with a Github Actions workflow that deploys them to AWS Lambda and Github Pages.

It was made to be used with this Terraform module to quickly start a project using Python, AWS Lambda, TypeScript, React and GitHub Pages. 

## Usage
https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template

### Development
```
git clone https://github.com/DustinAlandzes/aws-lambda-react-github-pages-template
cd aws-lambda-react-github-pages-template
```

#### Frontend
* Next.js
* React-Hook-Form

```
cd frontend
npm i
npm run dev
```

#### Backend
* Python
* AWS Lambda
* 
```
cd backend
python3 -m venv .venv
activate .venv/bin/activate
pip install -r requirements.txt
pytest
```

#### Deployment
* GitHub Actions

When you make a change to the main branch, if linting and tests pass, Github Actions will deploy the backend to AWS Lambda and the frontend to Github Pages

