import type Series from '@/types/Series';
import type Episode from '@/types/Episode';

/**
 * Build the file path for an episode download
 * @param series The series object
 * @param seasonNumber The season number
 * @param episode The episode object
 * @param baseDir The base directory for downloads (optional, will use default if not provided)
 * @returns The complete file path for the episode
 */
export function buildEpisodeFilePath(
  series: Series,
  seasonNumber: number,
  episode: Episode,
  baseDir?: string
): string {
  // Use provided baseDir or default placeholder
  let path = baseDir || '/path/to/sonarr/base/dir'; // TODO: Get from configuration
  
  path = path.endsWith('/') ? path : `${path}/`;
  
  const slug = series.titleSlug;
  
  path += series.path.replace(series.rootFolderPath, '');
  path = path.endsWith('/') ? path : `${path}/`;
  path += `Season ${seasonNumber.toString()}/`;
  path += `${slug}-s${seasonNumber.toString().padStart(2, '0')}e${episode.episodeNumber.toString().padStart(2, '0')}.mp4`;
  
  return path;
}
