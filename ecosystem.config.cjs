module.exports = {
  apps: [{
    name: "lockcard",
    script: "npx",
    args: "serve dist -l 7575 --no-clipboard",
    cwd: "/home/home/peer-programming/lockcard",
    env: {
      NODE_ENV: "production",
    },
  }],
};
