import { IdentifyAnalyticsEventDTO, TrackAnalyticsEventDTO } from "./mutations"

export type ProviderTrackAnalyticsEventDTO = TrackAnalyticsEventDTO

export type ProviderIdentifyAnalyticsEventDTO = IdentifyAnalyticsEventDTO

export interface IAnalyticsProvider {
  /**
   * This method is used to track an event in the analytics provider
   *
   * @param {ProviderTrackAnalyticsEventDTO} data - The data for the event.
   * @returns {Promise<void>} Resolves when the event is tracked successfully.
   *
   */
  track(data: ProviderTrackAnalyticsEventDTO): Promise<void>

  /**
   * This method is used to identify an actor or group in the analytics provider
   *
   * @param {ProviderIdentifyAnalyticsEventDTO} data - The data for the actor or group..
   * @returns {Promise<void>} Resolves when the event is tracked successfully.
   *
   */
  identify(data: ProviderIdentifyAnalyticsEventDTO): Promise<void>

  /**
   * This method is used to shutdown the analytics provider, and flush all data before shutting down.
   *
   * @returns {Promise<void>} Resolves when the provider is shutdown successfully.
   *
   */
  shutdown?(): Promise<void>
}
