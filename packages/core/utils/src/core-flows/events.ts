/**
 * @category Cart
 */
export const CartWorkflowEvents = {
  /**
   * Emitted when a cart is created.
   * 
   * @eventPayload
   * {
   *   id, // The ID of the cart
   * }
   */
  CREATED: "cart.created",
  /**
   * Emitted when a cart's details are updated.
   * 
   * @eventPayload
   * {
   *   id, // The ID of the cart
   * }
   */
  UPDATED: "cart.updated",
  /**
   * Emitted when the customer in the cart is updated.
   * 
   * @eventPayload
   * {
   *   id, // The ID of the cart
   * }
   */
  CUSTOMER_UPDATED: "cart.customer_updated",
  /**
   * Emitted when the cart's region is updated. This
   * event is emitted alongside the {@link CartWorkflowEvents.UPDATED} event.
   * 
   * @eventPayload
   * {
   *   id, // The ID of the cart
   * }
   */
  REGION_UPDATED: "cart.region_updated",
}

/**
 * @category Cart
 */
export const CustomerWorkflowEvents = {
  /**
   * Emitted when a customer is created.
   * 
   * @eventPayload
   * [{
   *   id, // The ID of the customer
   * }]
   */
  CREATED: "customer.created",
  /**
   * Emitted when a customer is updated.
   * 
   * @eventPayload
   * [{
   *   id, // The ID of the customer
   * }]
   */
  UPDATED: "customer.updated",
  /**
   * Emitted when a customer is deleted.
   * 
   * @eventPayload
   * [{
   *   id, // The ID of the customer
   * }]
   */
  DELETED: "customer.deleted",
}

/**
 * @category Order
 */
export const OrderWorkflowEvents = {
  /**
   * Emitted when the details of an order or draft order is updated. This
   * doesn't include updates made by an edit.
   * 
   * @eventPayload
   * {
   *   id, // The ID of the order
   * }
   */
  UPDATED: "order.updated",

  /**
   * Emitted when an order is placed, or when a draft order is converted to an
   * order.
   * 
   * @eventPayload
   * {
   *   id, // The ID of the order
   * }
   */
  PLACED: "order.placed",
  /**
   * Emitted when an order is canceld.
   * 
   * @eventPayload
   * {
   *   id, // The ID of the order
   * }
   */
  CANCELED: "order.canceled",
  /**
   * Emitted when orders are completed.
   * 
   * @eventPayload
   * [{
   *   id, // The ID of the order
   * }]
   */
  COMPLETED: "order.completed",
  /**
   * Emitted when an order is archived.
   * 
   * @eventPayload
   * [{
   *   id, // The ID of the order
   * }]
   */
  ARCHIVED: "order.archived",

  /**
   * Emitted when a fulfillment is created for an order.
   * 
   * @eventPayload
   * {
   *   order_id, // The ID of the order
   *   fulfillment_id, // The ID of the fulfillment
   *   no_notification, // Whether to notify the customer
   * }
   */
  FULFILLMENT_CREATED: "order.fulfillment_created",
  /**
   * Emitted when an order's fulfillment is canceled.
   * 
   * @eventPayload
   * {
   *   order_id, // The ID of the order
   *   fulfillment_id, // The ID of the fulfillment
   *   no_notification, // Whether to notify the customer
   * }
   */
  FULFILLMENT_CANCELED: "order.fulfillment_canceled",

  /**
   * Emitted when a return request is confirmed.
   * 
   * @eventPayload
   * {
   *   order_id, // The ID of the order
   *   return_id, // The ID of the return
   * }
   */
  RETURN_REQUESTED: "order.return_requested",
  /**
   * Emitted when a return is marked as received.
   * 
   * @eventPayload
   * {
   *   order_id, // The ID of the order
   *   return_id, // The ID of the return
   * }
   */
  RETURN_RECEIVED: "order.return_received",

  /**
   * Emitted when a claim is created for an order.
   * 
   * @eventPayload
   * {
   *   order_id, // The ID of the order
   *   claim_id, // The ID of the claim
   * }
   */
  CLAIM_CREATED: "order.claim_created",
  /**
   * Emitted when an exchange is created for an order.
   * 
   * @eventPayload
   * {
   *   order_id, // The ID of the order
   *   exchange_id, // The ID of the exchange
   * }
   */
  EXCHANGE_CREATED: "order.exchange_created",

  /**
   * Emitted when an order is requested to be transferred to
   * another customer.
   * 
   * @eventPayload
   * {
   *   id, // The ID of the order
   *   order_change_id, // The ID of the order change created for the transfer
   * }
   */
  TRANSFER_REQUESTED: "order.transfer_requested",
}

/**
 * @category Order
 */
export const OrderEditWorkflowEvents = {
  /**
   * Emitted when an order edit is requested.
   * 
   * @eventPayload
   * {
   *   order_id, // The ID of the order
   *   actions, // The actions to edit the order
   * }
   */
  REQUESTED: "order-edit.requested",
  /**
   * Emitted when an order edit request is confirmed.
   * 
   * @eventPayload
   * {
   *   order_id, // The ID of the order
   *   actions, // The actions to edit the order
   * }
   */
  CONFIRMED: "order-edit.confirmed",
  /**
   * Emitted when an order edit request is canceled.
   * 
   * @eventPayload
   * {
   *   order_id, // The ID of the order
   *   actions, // The actions to edit the order
   * }
   */
  CANCELED: "order-edit.canceled",
}

/**
 * @category User
 */
export const UserWorkflowEvents = {
  /**
   * Emitted when users are created.
   * 
   * @eventPayload
   * [{
   *   id, // The ID of the user
   * }]
   */
  CREATED: "user.created",
  /**
   * Emitted when users are updated.
   * 
   * @eventPayload
   * [{
   *   id, // The ID of the user
   * }]
   */
  UPDATED: "user.updated",
  /**
   * Emitted when users are deleted.
   * 
   * @eventPayload
   * [{
   *   id, // The ID of the user
   * }]
   */
  DELETED: "user.deleted",
}

/**
 * @category Auth
 */
export const AuthWorkflowEvents = {
  /**
   * Emitted when a reset password token is generated. You can listen to this event
   * to send a reset password email to the user or customer, for example.
   * 
   * @eventPayload
   * {
   *   entity_id, // The identifier of the user or customer. For example, an email address.
   *   actor_type, // The type of actor. For example, "customer", "user", or custom.
   *   token, // The generated token.
   * }
   */
  PASSWORD_RESET: "auth.password_reset",
}

/**
 * @category Sales Channel
 */
export const SalesChannelWorkflowEvents = {
  /**
   * Emitted when sales channels are created.
   * 
   * @eventPayload
   * [{
   *   id, // The ID of the sales channel
   * }]
   */
  CREATED: "sales-channel.created",
  /**
   * Emitted when sales channels are updated.
   * 
   * @eventPayload
   * [{
   *   id, // The ID of the sales channel
   * }]
   */
  UPDATED: "sales-channel.updated",
  /**
   * Emitted when sales channels are deleted.
   * 
   * @eventPayload
   * [{
   *   id, // The ID of the sales channel
   * }]
   */
  DELETED: "sales-channel.deleted",
}

/**
 * @category Product
 */
export const ProductCategoryWorkflowEvents = {
  /**
   * Emitted when product categories are created.
   * 
   * @eventPayload
   * [{
   *   id, // The ID of the product category
   * }]
   */
  CREATED: "product-category.created",
  /**
   * Emitted when product categories are updated.
   * 
   * @eventPayload
   * [{
   *   id, // The ID of the product category
   * }]
   */
  UPDATED: "product-category.updated",
  /**
   * Emitted when product categories are deleted.
   * 
   * @eventPayload
   * [{
   *   id, // The ID of the product category
   * }]
   */
  DELETED: "product-category.deleted",
}

/**
 * @category Product
 */
export const ProductCollectionWorkflowEvents = {
  /**
   * Emitted when product collections are created.
   * 
   * @eventPayload
   * [{
   *   id, // The ID of the product collection
   * }]
   */
  CREATED: "product-collection.created",
  /**
   * Emitted when product collections are updated.
   * 
   * @eventPayload
   * [{
   *   id, // The ID of the product collection
   * }]
   */
  UPDATED: "product-collection.updated",
  /**
   * Emitted when product collections are deleted.
   * 
   * @eventPayload
   * [{
   *   id, // The ID of the product collection
   * }]
   */
  DELETED: "product-collection.deleted",
}

/**
 * @category Product
 */
export const ProductVariantWorkflowEvents = {
  /**
   * Emitted when product variants are updated.
   * 
   * @eventPayload
   * [{
   *   id, // The ID of the product variant
   * }]
   */
  UPDATED: "product-variant.updated",
  /**
   * Emitted when product variants are created.
   * 
   * @eventPayload
   * [{
   *   id, // The ID of the product variant
   * }]
   */
  CREATED: "product-variant.created",
  /**
   * Emitted when product variants are deleted.
   * 
   * @eventPayload
   * [{
   *   id, // The ID of the product variant
   * }]
   */
  DELETED: "product-variant.deleted",
}

/**
 * @category Product
 */
export const ProductWorkflowEvents = {
  /**
   * Emitted when products are updated.
   * 
   * @eventPayload
   * [{
   *   id, // The ID of the product
   * }]
   */
  UPDATED: "product.updated",
  /**
   * Emitted when products are created.
   * 
   * @eventPayload
   * [{
   *   id, // The ID of the product
   * }]
   */
  CREATED: "product.created",
  /**
   * Emitted when products are deleted.
   * 
   * @eventPayload
   * [{
   *   id, // The ID of the product
   * }]
   */
  DELETED: "product.deleted",
}

/**
 * @category Product
 */
export const ProductTypeWorkflowEvents = {
  /**
   * Emitted when product types are updated.
   * 
   * @eventPayload
   * [{
   *   id, // The ID of the product type
   * }]
   */
  UPDATED: "product-type.updated",
  /**
   * Emitted when product types are created.
   * 
   * @eventPayload
   * [{
   *   id, // The ID of the product type
   * }]
   */
  CREATED: "product-type.created",
  /**
   * Emitted when product types are deleted.
   * 
   * @eventPayload
   * [{
   *   id, // The ID of the product type
   * }]
   */
  DELETED: "product-type.deleted",
}

/**
 * @category Product
 */
export const ProductTagWorkflowEvents = {
  /**
   * Emitted when product tags are updated.
   * 
   * @eventPayload
   * [{
   *   id, // The ID of the product tag
   * }]
   */
  UPDATED: "product-tag.updated",
  /**
   * Emitted when product tags are created.
   * 
   * @eventPayload
   * [{
   *   id, // The ID of the product tag
   * }]
   */
  CREATED: "product-tag.created",
  /**
   * Emitted when product tags are deleted.
   * 
   * @eventPayload
   * [{
   *   id, // The ID of the product tag
   * }]
   */
  DELETED: "product-tag.deleted",
}

/**
 * @category Product
 */
export const ProductOptionWorkflowEvents = {
  /**
   * Emitted when product options are updated.
   * 
   * @eventPayload
   * [{
   *   id, // The ID of the product option
   * }]
   */
  UPDATED: "product-option.updated",
  /**
   * Emitted when product options are created.
   * 
   * @eventPayload
   * [{
   *   id, // The ID of the product option
   * }]
   */
  CREATED: "product-option.created",
  /**
   * Emitted when product options are deleted.
   * 
   * @eventPayload
   * [{
   *   id, // The ID of the product option
   * }]
   */
  DELETED: "product-option.deleted",
}

/**
 * @category User
 */
export const InviteWorkflowEvents = {
  /**
   * Emitted when an invite is accepted.
   * 
   * @eventPayload
   * {
   *   id, // The ID of the invite
   * }
   */
  ACCEPTED: "invite.accepted",
  /**
   * Emitted when invites are created. You can listen to this event
   * to send an email to the invited users, for example.
   * 
   * @eventPayload
   * [{
   *   id, // The ID of the invite
   * }]
   */
  CREATED: "invite.created",
  /**
   * Emitted when invites are deleted.
   * 
   * @eventPayload
   * [{
   *   id, // The ID of the invite
   * }]
   */
  DELETED: "invite.deleted",
  /**
   * Emitted when invites should be resent because their token was
   * refreshed. You can listen to this event to send an email to the invited users,
   * for example.
   * 
   * @eventPayload
   * [{
   *   id, // The ID of the invite
   * }]
   */
  RESENT: "invite.resent",
}

/**
 * @category Region
 */
export const RegionWorkflowEvents = {
  /**
   * Emitted when regions are updated.
   * 
   * @eventPayload
   * [{
   *   id, // The ID of the region
   * }]
   */
  UPDATED: "region.updated",
  /**
   * Emitted when regions are created.
   * 
   * @eventPayload
   * [{
   *   id, // The ID of the region
   * }]
   */
  CREATED: "region.created",
  /**
   * Emitted when regions are deleted.
   * 
   * @eventPayload
   * [{
   *   id, // The ID of the region
   * }]
   */
  DELETED: "region.deleted",
}

/**
 * @category Fulfillment
 */
export const FulfillmentWorkflowEvents = {
  /**
   * Emitted when a shipment is created for an order.
   * 
   * @eventPayload
   * {
   *   id, // the ID of the shipment
   *   no_notification, // whether to notify the customer
   * }
   */
  SHIPMENT_CREATED: "shipment.created",
  /**
   * Emitted when a fulfillment is marked as delivered.
   * 
   * @eventPayload
   * {
   *   id, // the ID of the fulfillment
   * }
   */
  DELIVERY_CREATED: "delivery.created",
}