export interface TrackAnalyticsEventDTO {
  /**
   * The event name
   */
  event: string
  /**
   * The actor of the event, if there is any
   */
  actor_id?: string
  /**
   * The group that the event is for, such as an organization or team.
   * The "type" defines the name of the group (eg. "organization"), and the "id" is the id of the group.
   */
  group?: {
    type?: string
    id?: string
  }
  /**
   * The properties of the event. The format and content depends on the provider.
   */
  properties?: Record<string, any>
}

export interface IdentifyActorDTO {
  actor_id: string
  properties?: Record<string, any>
}

export interface IdentifyGroupDTO {
  group: {
    type: string
    id: string
  }
  // When identifying a group, the actor can potentially be passed as well as metadata.
  actor_id?: string
  properties?: Record<string, any>
}
// Either actor_id or group must be provided. Depending on the provided identifier, the properties will be set for the actor or group.
export type IdentifyAnalyticsEventDTO = IdentifyActorDTO | IdentifyGroupDTO
