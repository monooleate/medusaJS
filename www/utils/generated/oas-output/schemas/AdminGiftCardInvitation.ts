/**
 * @schema AdminGiftCardInvitation
 * type: object
 * description: The gift card invitation details.
 * required:
 *   - gift_card
 *   - id
 *   - code
 *   - status
 *   - expires_at
 *   - email
 * properties:
 *   id:
 *     type: string
 *     title: id
 *     description: The invitation's ID.
 *   email:
 *     type: string
 *     title: email
 *     description: The invitation's email.
 *     format: email
 *   code:
 *     type: string
 *     title: code
 *     description: The invitation's code.
 *   status:
 *     type: string
 *     description: The invitation's status.
 *     enum:
 *       - pending
 *       - accepted
 *       - rejected
 *   expires_at:
 *     type: string
 *     title: expires_at
 *     description: The date the invitation expires at.
 *   gift_card:
 *     $ref: "#/components/schemas/AdminGiftCard"
 * x-schemaName: AdminGiftCardInvitation
 * 
*/

