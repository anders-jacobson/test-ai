# Security Setup Guide

This document explains how to handle sensitive configuration files safely.

## 🔒 Protected Files

The following files contain sensitive information and are **NOT tracked in git**:

### Automatically Ignored:

- `.env.local` - Environment variables
- `.cursor/mcp.json` - MCP server configuration with access tokens
- `.cursor/rules/environment-config.mdc` - Supabase project details

### Template Files (Safe to commit):

- `.cursor/rules/environment-config.template.mdc` - Template for environment setup

## 🚀 Initial Setup for New Team Members

### 1. Copy Template Files

```bash
# Copy environment config template
cp .cursor/rules/environment-config.template.mdc .cursor/rules/environment-config.mdc
```

### 2. Get Supabase Access

- Join the **test-ai-build** organization on Supabase
- Get project details from team lead
- Create personal access token in Supabase dashboard

### 3. Configure Files

- Fill in real values in `environment-config.mdc`
- Create `.cursor/mcp.json` with your personal access token
- Set up `.env.local` when project is initialized

### 4. Verify Security

```bash
# Check that sensitive files are ignored
git status
# Should NOT show .cursor/mcp.json or environment-config.mdc
```

## ⚠️ Security Rules

### DO:

✅ Use environment variables for all sensitive data  
✅ Keep personal access tokens private  
✅ Use the template files as reference  
✅ Update templates when adding new configuration

### DON'T:

❌ Commit real API keys or tokens  
❌ Share personal access tokens  
❌ Remove files from `.gitignore`  
❌ Push sensitive configuration files

## 🆘 If You Accidentally Commit Sensitive Data

1. **Immediately rotate** all exposed tokens/keys
2. **Remove from git history** using `git filter-branch` or BFG
3. **Update team** about compromised credentials
4. **Review and improve** security practices

## 📞 Questions?

If you're unsure about any security setup, ask before proceeding!
