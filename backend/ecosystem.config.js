module.exports = {
  apps: [{
    name: 'ee-dept-website',
    script: './server.js',
    cwd: '/home/sysad/Documents/EE-Dept-Website/backend',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 1337
    }
  }]
};
