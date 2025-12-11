# GitHub Setup Instructions

## Step 1: Initialize Git (if not already done)

```bash
git init
```

## Step 2: Add All Files

```bash
git add .
```

## Step 3: Create Initial Commit

```bash
git commit -m "Initial commit - Modex Ticket Booking System"
```

## Step 4: Create Repository on GitHub

1. Go to https://github.com/new
2. Repository name: `modex-project` (or any name you prefer)
3. Description: "Full-stack ticket booking system"
4. Choose Public or Private
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

## Step 5: Connect and Push

```bash
git remote add origin https://github.com/Ashutosh-Codess/modex-project.git
git branch -M main
git push -u origin main
```

If you get authentication errors, use:
```bash
git remote add origin git@github.com:Ashutosh-Codess/modex-project.git
```

## Step 6: Verify

Check https://github.com/Ashutosh-Codess/modex-project to see your code!

## Troubleshooting

- **Authentication error**: Set up SSH keys or use GitHub CLI
- **Large files**: Make sure .gitignore excludes node_modules and dist folders
- **Push rejected**: Pull first: `git pull origin main --rebase`

