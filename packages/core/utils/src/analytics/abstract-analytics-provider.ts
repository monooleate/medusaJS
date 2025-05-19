import {
  IAnalyticsProvider,
  ProviderIdentifyAnalyticsEventDTO,
  ProviderTrackAnalyticsEventDTO,
} from "@medusajs/types"

/**
 * ### constructor
 *
 * The constructor allows you to access resources from the module's container using the first parameter,
 * and the module's options using the second parameter.
 *
 * If you're creating a client or establishing a connection with a third-party service, do it in the constructor.
 *
 * #### Example
 *
 * ```ts
 * import { Logger } from "@medusajs/framework/types"
 * import { AbstractAnalyticsProviderService } from "@medusajs/framework/utils"
 *
 * type InjectedDependencies = {
 *   logger: Logger
 * }
 *
 * type Options = {
 *   apiKey: string
 * }
 *
 * class MyAnalyticsProviderService extends AbstractAnalyticsProviderService {
 *   protected logger_: Logger
 *   protected options_: Options
 *   static identifier = "my-analytics"
 *   // assuming you're initializing a client
 *   protected client
 *
 *   constructor (
 *     { logger }: InjectedDependencies,
 *     options: Options
 *   ) {
 *     super()
 *
 *     this.logger_ = logger
 *     this.options_ = options
 *
 *     // assuming you're initializing a client
 *     this.client = new Client(options)
 *   }
 * }
 *
 * export default MyAnalyticsProviderService
 * ```
 */
export class AbstractAnalyticsProviderService implements IAnalyticsProvider {
  /**
   * Each analytics provider has a unique ID used to identify it. The provider's ID
   * will be stored as `aly_{identifier}_{id}`, where `{id}` is the provider's `id`
   * property in the `medusa-config.ts`.
   *
   * @example
   * class MyAnalyticsProviderService extends AbstractAnalyticsProviderService {
   *   static identifier = "my-analytics"
   *   // ...
   * }
   */
  static identifier: string

  /**
   * @ignore
   */
  getIdentifier() {
    return (this.constructor as any).identifier
  }

  /**
   * This method tracks an event using your provider's semantics
   *
   * This method will be used when tracking events to third-party providers.
   *
   * @param {ProviderTrackAnalyticsEventDTO} data - The data for the event.
   * @returns {Promise<void>} Resolves when the event is tracked successfully.
   *
   * @example
   * class MyAnalyticsProviderService extends AbstractAnalyticsProviderService {
   *   // ...
   *   async track(
   *     data: ProviderTrackAnalyticsEventDTO
   *   ): Promise<void> {
   *     // track event to third-party provider
   *     // or using custom logic
   *     // for example:
   *     this.client.track(data)
   *   }
   * }
   */
  async track(data: ProviderTrackAnalyticsEventDTO): Promise<void> {
    throw Error("track must be overridden by the child class")
  }

  /**
   * This method identifies an actor or group in the analytics provider
   *
   * @param {ProviderIdentifyAnalyticsEventDTO} data - The data for the actor or group.
   * @returns {Promise<void>} Resolves when the actor or group is identified successfully.
   *
   * @example
   * class MyAnalyticsProviderService extends AbstractAnalyticsProviderService {
   *   // ...
   *   async identify(
   *     data: ProviderIdentifyAnalyticsEventDTO
   *   ): Promise<void> {
   *     // identify actor or group in the analytics provider
   *     // or using custom logic
   *     // for example:
   *     this.client.identify(data)
   *   }
   * }
   */
  async identify(data: ProviderIdentifyAnalyticsEventDTO): Promise<void> {
    throw Error("identify must be overridden by the child class")
  }
}
