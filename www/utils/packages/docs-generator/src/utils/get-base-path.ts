/**
 * Retrieve the pathname of a file without the relative part
 *
 * @param fileName - The file name/path
 * @returns The path without the relative part.
 */
export default function getBasePath(fileName: string) {
  return fileName.substring(fileName.lastIndexOf("../") + 3)
}
