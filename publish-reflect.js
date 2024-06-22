const { spawn } = require('child_process')
const fs = require('fs')
const { text } = require('stream/consumers')

const appBaseName = requireEnv({
  REFLECT_APP_NAME: process.env.REFLECT_APP_NAME,
})
const refName = requireEnv({
  HEAD: process.env.HEAD,
  VERCEL_GIT_COMMIT_REF: process.env.VERCEL_GIT_COMMIT_REF,
})

// Reflect app names have to start with a lower-case letter and can only
// contain lower-case letters, numbers, and hyphens.
const appName = `${appBaseName}-${refName}`
  .toLowerCase()
  .replace(/^[^a-z]/, '')
  .replace(/[^a-z0-9-]/g, '-')

publish()

async function publish() {
  const output = JSON.parse(
    await runCommand('npx', [
      'reflect',
      'publish',
      '--reflect-channel=canary',
      `--app=${appName}`,
      '--auth-key-from-env=REFLECT_AUTH_KEY',
      '--output=json',
    ])
  )
  if (output.success) {
    fs.writeFileSync('./.env', `NEXT_PUBLIC_REFLECT_SERVER=${output.url}`)
  }
}

// Run a command and return its output, but also echo that output to the console.
function runCommand(command, args) {
  console.log('running command: ' + command + ' ' + args.join(' '))

  const child = spawn(command, args, { stdio: [null, 'pipe', 'inherit'] })
  child.stdout.pipe(process.stdout)

  return new Promise((resolve, reject) => {
    const output = text(child.stdout)
    child.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Command failed with exit code ${code}`))
      } else {
        resolve(output)
      }
    })
  })
}

function requireEnv(kv) {
  const ret = Object.values(kv).find((v) => v)
  if (!ret) {
    throw new Error(
      `Required environment variable not found. One of [${Object.keys(
        kv
      )}] must be set.`
    )
  }
  return ret
}
