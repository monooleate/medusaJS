import { IModuleService } from "../modules-sdk"
import { IdentifyAnalyticsEventDTO, TrackAnalyticsEventDTO } from "./mutations"
import { IAnalyticsProvider } from "./provider"

export interface IAnalyticsModuleService extends IModuleService {
  /**
   * Returns a reference to the analytics provider in use
   */
  getProvider(): IAnalyticsProvider

  /**
   * This method tracks an event in the analytics provider
   *
   * @param {TrackAnalyticsEventDTO} data - The data for the event.
   * @returns {Promise<void>} Resolves when the event is tracked successfully.
   *
   *
   * @example
   * await analyticsModuleService.track({
   *   event: "product_viewed",
   *   properties: {
   *     product_id: "123",
   *     product_name: "Product Name"
   *   }
   * })
   */
  track(data: TrackAnalyticsEventDTO): Promise<void>

  /**
   * This method identifies an actor or group in the analytics provider
   *
   * @param {IdentifyAnalyticsEventDTO} data - The data for the actor or group.
   * @returns {Promise<void>} Resolves when the actor or group is identified successfully.
   *
   *
   * @example
   * await analyticsModuleService.identify({
   *   actor_id: "123",
   *   properties: {
   *     name: "John Doe"
   *   }
   * })
   */
  identify(data: IdentifyAnalyticsEventDTO): Promise<void>
}
