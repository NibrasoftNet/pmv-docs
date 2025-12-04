module.exports = {
  apps: [
    {
      name: 'backend',
      script: 'apps/backend/dist/main.js',
      env: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'web',
      script: 'node_modules/.bin/next',
      args: 'start -p 4010',
      cwd: '/app/apps/web',
      env: {
        NODE_ENV: 'production',
        PORT: '4010',
      },
      user: 'nextjs',
    },
  ],
};
