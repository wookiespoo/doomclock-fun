#!/bin/bash
echo "Building Anchor program..."
anchor build
echo "Deploying to mainnet..."
anchor deploy --provider.cluster mainnet
echo "Frontend build..."
cd frontend
yarn install
yarn build
echo "Deployed! Run 'vercel --prod' from frontend/ for live site."
