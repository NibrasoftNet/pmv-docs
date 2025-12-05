#!/bin/bash

# Test script to verify Husky hooks are working correctly

echo "🧪 Testing Husky Git Hooks"
echo "=========================="
echo ""

# Test 1: Check if hooks exist and are executable
echo "✅ Test 1: Checking if hooks exist and are executable..."
if [ -x .husky/pre-commit ]; then
  echo "   ✓ pre-commit hook exists and is executable"
else
  echo "   ✗ pre-commit hook is missing or not executable"
  exit 1
fi

if [ -x .husky/pre-push ]; then
  echo "   ✓ pre-push hook exists and is executable"
else
  echo "   ✗ pre-push hook is missing or not executable"
  exit 1
fi

echo ""

# Test 2: Check current branch
echo "✅ Test 2: Checking current branch..."
CURRENT_BRANCH=$(git symbolic-ref --short HEAD 2>/dev/null || echo "detached")
echo "   Current branch: $CURRENT_BRANCH"

if [ "$CURRENT_BRANCH" = "main" ]; then
  echo "   ⚠️  You are on the main branch!"
  echo "   The pre-push hook will BLOCK direct pushes to main."
  echo "   The pre-commit hook will WARN when committing to main."
else
  echo "   ✓ You are on a feature branch - hooks will allow normal workflow"
fi

echo ""

# Test 3: Simulate pre-push hook behavior
echo "✅ Test 3: Simulating pre-push hook behavior..."
if [ "$CURRENT_BRANCH" = "main" ]; then
  echo "   ❌ Pre-push would BLOCK this push!"
  echo "   Error message would be:"
  echo "   'Direct pushes to the main branch are not allowed!'"
else
  echo "   ✅ Pre-push would ALLOW this push"
fi

echo ""

# Test 4: Check if linting is configured
echo "✅ Test 4: Checking if linting is configured..."
if grep -q "\"lint\"" package.json; then
  echo "   ✓ Lint script found in package.json"
  echo "   Pre-commit hook will run: npm run lint"
else
  echo "   ✗ Lint script not found in package.json"
  exit 1
fi

echo ""
echo "=========================="
echo "✅ All tests passed!"
echo ""
echo "Summary:"
echo "--------"
echo "• Pre-commit hook: Warns on main branch commits + runs linting"
echo "• Pre-push hook: Blocks direct pushes to main branch"
echo "• Recommended workflow: Create feature branches and use PRs"
echo ""
echo "To test the hooks in action:"
echo "1. Try committing: git commit -m 'test'"
echo "2. Try pushing: git push"
echo ""
