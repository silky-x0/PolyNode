# Vercel Frontend Deployment Setup

This guide will help you set up automatic deployment of your PolyNode frontend to Vercel using GitHub Actions CI/CD pipeline.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Your code should be in a GitHub repository
3. **Node.js 18+**: Ensure your local environment has Node.js 18 or higher

## Step 1: Connect Vercel to Your Repository

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Select the `frontend` folder as the root directory
5. Configure your project settings:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm ci`

## Step 2: Get Vercel Configuration

After creating your project, you'll need these values:

1. **Vercel Token**:
   - Go to [vercel.com/account/tokens](https://vercel.com/account/tokens)
   - Create a new token with appropriate permissions

2. **Organization ID**:
   - Found in your project settings or dashboard

3. **Project ID**:
   - Found in your project settings or dashboard

## Step 3: Configure GitHub Secrets

In your GitHub repository:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add the following repository secrets:
   - `VERCEL_TOKEN`: Your Vercel API token
   - `VERCEL_ORG_ID`: Your Vercel organization ID
   - `VERCEL_PROJECT_ID`: Your Vercel project ID

## Step 4: Configure Branch Protection (Recommended)

1. Go to **Settings** → **Branches**
2. Add rule for `main` branch:
   - Require status checks to pass before merging
   - Require branches to be up to date before merging
   - Select the status checks from your workflow

## Step 5: Test Your Pipeline

1. Make a change to your frontend code
2. Push to a feature branch
3. Create a pull request to `main`
4. The pipeline will automatically:
   - Run tests and linting
   - Deploy a preview to Vercel
   - Show deployment status in the PR

## Step 6: Production Deployment

When you merge to `main`:
1. The pipeline automatically deploys to production
2. Vercel will build and deploy your application
3. You'll get a production URL (e.g., `your-app.vercel.app`)

## Workflow Files

This setup includes two GitHub Actions workflows:

- **`frontend-deploy.yml`**: Main CI/CD pipeline for production deployment
- **`frontend-preview.yml`**: Preview deployments for pull requests

## Environment Variables

If your frontend needs environment variables:

1. Add them in your Vercel project settings
2. Or create a `.env.local` file (don't commit this to git)
3. For production, use Vercel's environment variable management

## Custom Domain (Optional)

1. In Vercel dashboard, go to your project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Configure DNS records as instructed

## Monitoring and Analytics

Vercel provides:
- Real-time performance metrics
- Function execution logs
- Error tracking
- Analytics dashboard

## Troubleshooting

### Common Issues:

1. **Build Failures**: Check the build logs in Vercel dashboard
2. **Missing Dependencies**: Ensure all dependencies are in `package.json`
3. **Environment Variables**: Verify all required env vars are set in Vercel
4. **GitHub Actions Failures**: Check the Actions tab in your repository

### Debug Commands:

```bash
# Test build locally
cd frontend
npm run build

# Test Vercel deployment locally
npx vercel

# Check Vercel status
npx vercel ls
```

## Next Steps

1. Set up monitoring and alerting
2. Configure automatic rollbacks
3. Set up staging environments
4. Implement blue-green deployments if needed

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
