import { spawnSync } from 'node:child_process';
// Vercel hosts the browser demonstration. The API deployment remains separate.
const env = { ...process.env, VITE_ADMIN_DATA_MODE: 'preview' };
delete env.npm_config_cache_dir;
delete env.NPM_CONFIG_CACHE_DIR;
const result = spawnSync(process.execPath, ['node_modules/vite/bin/vite.js', 'build', '--config', 'frontend/vite.config.js'], { env, stdio: 'inherit' });
process.exit(result.status ?? 1);
