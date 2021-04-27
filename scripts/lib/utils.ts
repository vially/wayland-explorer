import { existsSync, promises as fs } from 'fs'
import path from 'path'

export function coerceArray<T = any>(value: T | T[]): T[] {
    if (value === null || value === undefined) return []

    return Array.isArray(value) ? value : [value]
}

export async function findXMLFiles(rootDirectory: string): Promise<string[]> {
    if (!existsSync(rootDirectory)) {
        return []
    }

    const files = await fs.readdir(rootDirectory)

    const xmlFiles = await Promise.all(
        files.map(
            async (baseName): Promise<string[]> => {
                const fileName = path.join(rootDirectory, baseName)
                const stat = await fs.lstat(fileName)
                if (stat.isDirectory()) {
                    return findXMLFiles(fileName)
                } else if (fileName.endsWith('.xml')) {
                    return [fileName]
                }
                return []
            }
        )
    )

    return xmlFiles.flat()
}

export function jsonFileNameFor(srcFileName: string): string {
    // Add `kde-` prefix to KDE protocol file names to avoid potential future name clashes
    const prefix = path.dirname(srcFileName).endsWith('/kde/src/protocols')
        ? 'kde-'
        : ''

    const baseName = path.basename(srcFileName, '.xml')

    return `${prefix}${baseName}.json`
}
