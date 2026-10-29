import { WorkerDispatchCandidate, SkillCategory } from '@coopserve/types';

export class DispatchEngine {
  /**
   * Computes the Great-Circle Distance (Haversine formula) in meters between two lat/lng points.
   */
  public static calculateDistanceMeters(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371e3; // Earth radius in meters
    const phi1 = (lat1 * Math.PI) / 180;
    const phi2 = (lat2 * Math.PI) / 180;
    const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
    const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
      Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return Math.round(R * c);
  }

  /**
   * Ranks candidates prioritizing:
   * 1. Radius proximity (within threshold)
   * 2. Fair work allocation: Least recently assigned worker gets priority
   * 3. Society member rating
   */
  public static rankCandidates(
    candidates: WorkerDispatchCandidate[],
    maxRadiusMeters: number = 5000
  ): WorkerDispatchCandidate[] {
    return candidates
      .filter((c) => c.distanceMeters <= maxRadiusMeters)
      .sort((a, b) => {
        // First priority: Fair distribution - Worker who hasn't had a job recently
        if (!a.lastAssignedAt && b.lastAssignedAt) return -1;
        if (a.lastAssignedAt && !b.lastAssignedAt) return 1;

        if (a.lastAssignedAt && b.lastAssignedAt) {
          const diff = new Date(a.lastAssignedAt).getTime() - new Date(b.lastAssignedAt).getTime();
          if (Math.abs(diff) > 1000 * 60 * 60 * 4) { // More than 4 hours difference
            return diff; // Oldest assignment gets first chance
          }
        }

        // Second priority: Distance proximity
        if (Math.abs(a.distanceMeters - b.distanceMeters) > 1000) {
          return a.distanceMeters - b.distanceMeters;
        }

        // Third priority: Rating
        return b.ratingAverage - a.ratingAverage;
      });
  }
}
