import {
  ChatInitialized as ChatInitializedEvent,
  UserInitialized as UserInitializedEvent
} from "../generated/Prontera/Prontera"
import { ChatInitialized, UserInitialized } from "../generated/schema"

export function handleChatInitialized(event: ChatInitializedEvent): void {
  let entity = new ChatInitialized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.initializer = event.params.initializer
  entity.peer = event.params.peer
  entity.callerEncryptedChatSecret = event.params.callerEncryptedChatSecret
  entity.peerEncryptedChatSecret = event.params.peerEncryptedChatSecret

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.save()
}

export function handleUserInitialized(event: UserInitializedEvent): void {
  let entity = new UserInitialized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.encryptedUserSecret = event.params.init.encryptedUserSecret
  entity.publicKeyX = event.params.init.publicKeyX
  entity.publicKeyPrefix = event.params.init.publicKeyPrefix

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
