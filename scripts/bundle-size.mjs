#!/usr/bin/env node
/* eslint-disable no-console */
import { execSync } from 'node:child_process'
import { existsSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

/**
 * Get directory size in bytes
 */
function getDirectorySize(dir) {
  if (!existsSync(dir)) return 0

  try {
    const output = execSync(`du -sk "${dir}"`, { encoding: 'utf8' })
    const sizeKB = Number.parseInt(output.split('\t')[0], 10)
    return sizeKB * 1024
  } catch {
    return 0
  }
}

/**
 * Get gzipped size of all files in directory
 */
function getGzippedSize(dir) {
  if (!existsSync(dir)) return 0

  try {
    const output = execSync(
      `find "${dir}" -type f \\( -name "*.js" -o -name "*.css" \\) -exec sh -c 'gzip -c "{}" | wc -c' \\; | awk '{sum+=$1} END {print sum}'`,
      { encoding: 'utf8' },
    )
    return Number.parseInt(output.trim(), 10) || 0
  } catch {
    return 0
  }
}

/**
 * Format bytes to human-readable size
 */
function formatSize(bytes) {
  if (bytes === 0) return '0 B'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

/**
 * Get package info
 */
function getPackageInfo(packagePath, packageName) {
  const srcPath = join(packagePath, 'src')
  const distPath = join(packagePath, 'dist')

  const sourceSize = getDirectorySize(srcPath)
  const builtSize = getDirectorySize(distPath)
  const gzippedSize = getGzippedSize(distPath)

  return {
    name: packageName,
    sourceSize,
    builtSize,
    gzippedSize,
    hasSource: existsSync(srcPath),
    hasBuild: existsSync(distPath),
  }
}

/**
 * Main function
 */
function main() {
  console.log('\n📦 Package Bundle Sizes\n')

  const packages = []

  // Check packages/ directory
  const packagesDir = 'packages'
  if (existsSync(packagesDir)) {
    const entries = readdirSync(packagesDir)
    for (const entry of entries) {
      const packagePath = join(packagesDir, entry)
      if (statSync(packagePath).isDirectory()) {
        const info = getPackageInfo(packagePath, `packages/${entry}`)
        if (info.hasSource || info.hasBuild) {
          packages.push(info)
        }
      }
    }
  }

  // Check apps/ directory
  const appsDir = 'apps'
  if (existsSync(appsDir)) {
    const entries = readdirSync(appsDir)
    for (const entry of entries) {
      const packagePath = join(appsDir, entry)
      if (statSync(packagePath).isDirectory()) {
        const info = getPackageInfo(packagePath, `apps/${entry}`)
        if (info.hasSource || info.hasBuild) {
          packages.push(info)
        }
      }
    }
  }

  // Sort by gzipped size (largest first)
  packages.sort((a, b) => b.gzippedSize - a.gzippedSize)

  // Calculate max widths for table alignment
  const maxNameWidth = Math.max(...packages.map((p) => p.name.length), 'Package'.length)
  const maxSourceWidth = Math.max(
    ...packages.map((p) => formatSize(p.sourceSize).length),
    'Source'.length,
  )
  const maxBuiltWidth = Math.max(
    ...packages.map((p) => formatSize(p.builtSize).length),
    'Built'.length,
  )
  const maxGzippedWidth = Math.max(
    ...packages.map((p) => formatSize(p.gzippedSize).length),
    'Gzipped'.length,
  )

  // Print header
  const headerName = 'Package'.padEnd(maxNameWidth)
  const headerSource = 'Source'.padStart(maxSourceWidth)
  const headerBuilt = 'Built'.padStart(maxBuiltWidth)
  const headerGzipped = 'Gzipped'.padStart(maxGzippedWidth)
  const headerStatus = 'Status'

  console.log(`${headerName}  ${headerSource}  ${headerBuilt}  ${headerGzipped}  ${headerStatus}`)
  console.log(
    `${'─'.repeat(maxNameWidth)}  ${'─'.repeat(maxSourceWidth)}  ${'─'.repeat(maxBuiltWidth)}  ${'─'.repeat(maxGzippedWidth)}  ${'─'.repeat(10)}`,
  )

  // Print rows
  for (const pkg of packages) {
    const name = pkg.name.padEnd(maxNameWidth)
    const source = formatSize(pkg.sourceSize).padStart(maxSourceWidth)
    const built = formatSize(pkg.builtSize).padStart(maxBuiltWidth)
    const gzipped = formatSize(pkg.gzippedSize).padStart(maxGzippedWidth)

    let status = '✅'
    if (!pkg.hasBuild) {
      status = '⚠️  No build'
    } else if (pkg.gzippedSize > 200 * 1024) {
      status = '🔴 > 200KB'
    } else if (pkg.gzippedSize > 100 * 1024) {
      status = '🟡 > 100KB'
    }

    console.log(`${name}  ${source}  ${built}  ${gzipped}  ${status}`)
  }

  // Print totals
  console.log(
    `${'─'.repeat(maxNameWidth)}  ${'─'.repeat(maxSourceWidth)}  ${'─'.repeat(maxBuiltWidth)}  ${'─'.repeat(maxGzippedWidth)}  ${'─'.repeat(10)}`,
  )

  const totalSource = packages.reduce((sum, p) => sum + p.sourceSize, 0)
  const totalBuilt = packages.reduce((sum, p) => sum + p.builtSize, 0)
  const totalGzipped = packages.reduce((sum, p) => sum + p.gzippedSize, 0)

  const totalName = 'Total'.padEnd(maxNameWidth)
  const totalSourceStr = formatSize(totalSource).padStart(maxSourceWidth)
  const totalBuiltStr = formatSize(totalBuilt).padStart(maxBuiltWidth)
  const totalGzippedStr = formatSize(totalGzipped).padStart(maxGzippedWidth)

  console.log(`${totalName}  ${totalSourceStr}  ${totalBuiltStr}  ${totalGzippedStr}\n`)

  // Print legend
  console.log('Legend:')
  console.log('  ✅ Gzipped < 100KB')
  console.log('  🟡 Gzipped 100-200KB')
  console.log('  🔴 Gzipped > 200KB')
  console.log('  ⚠️  No build output found\n')
}

main()
