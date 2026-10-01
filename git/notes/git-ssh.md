# Add SSH Auth to Git<->GitHub Integration

## Step 1: Generate a New SSH Key

Open your terminal (Linux/macOS) or Git Bash / PowerShell (Windows) and run the following command. The Ed25519 algorithm is highly recommended for security and efficiency.

```
ssh-keygen -t ed25519 -C "your_email@example.com"
```

### For multiple user account

```
# Generate key for your personal account
ssh-keygen -t ed25519 -C "personal_email@example.com" -f ~/.ssh/id_ed25519_personal

# Generate key for your work account
ssh-keygen -t ed25519 -C "work_email@company.com" -f ~/.ssh/id_ed25519_work
```

Note:
1. **Save Location**: When prompted to "Enter a file in which to save the key," simply press Enter to accept the default location.
2. **Passphrase**: You will be prompted to type a passphrase. You can type a secure password (highly recommended) or press Enter twice to leave it blank.


## Step 2: Add Your SSH Key to the ssh-agent

The ssh-agent manages your keys and remembers your passphrase so you don't have to type it every time.

1. Start the agent in the background:

```
eval "$(ssh-agent -s)"
```

2. Add your private key to the agent:

```
ssh-add ~/.ssh/id_ed25519
```

## Step 3: Copy Your Public SSH Key

You need to copy the contents of the public key file (.pub) to your clipboard. Use the appropriate command for your operating system:

- Windows (Git Bash): `cat ~/.ssh/id_ed25519.pub | clip`
- macOS: `pbcopy < ~/.ssh/id_ed25519.pub`
- Linux: `cat ~/.ssh/id_ed25519.pub`

## Step 4: Add the Key to GitHub

1. Go to your account on GitHub and log in.
2. Click your profile photo in the top-right corner, then select **Settings**.
3. In the left sidebar, click **SSH** and **GPG keys**.
4. Click the green **New SSH key** (or **Add SSH key**) button.
5. In the **Title** field, type a descriptive label (e.g., "Personal Laptop").
6. Leave the **Key type** as "Authentication Key".
7. Paste your public key into the **Key** text field.
8. Click **Add SSH key**. Confirm with your GitHub password if prompted.

## Step 5: Test Your Connection

To ensure the setup is working correctly, run this test command in your terminal:

```
ssh -T git@github.com
```

- If this is your first time connecting, you will see a warning message like: "The authenticity of host 'github.com' can't be established..."
- Type yes and press Enter.
- If successful, you will see a message confirming your username:

>>> Hi username! You've successfully authenticated, but GitHub does not provide shell access.
