import { newMockEvent } from "matchstick-as"
import { ethereum, Address, Bytes } from "@graphprotocol/graph-ts"
import {
  ChatInitialized,
  UserInitialized
} from "../generated/Prontera/Prontera"

export function createChatInitializedEvent(
  initializer: Address,
  peer: Address,
  callerEncryptedChatSecret: Bytes,
  peerEncryptedChatSecret: Bytes
): ChatInitialized {
  let chatInitializedEvent = changetype<ChatInitialized>(newMockEvent())

  chatInitializedEvent.parameters = new Array()

  chatInitializedEvent.parameters.push(
    new ethereum.EventParam(
      "initializer",
      ethereum.Value.fromAddress(initializer)
    )
  )
  chatInitializedEvent.parameters.push(
    new ethereum.EventParam("peer", ethereum.Value.fromAddress(peer))
  )
  chatInitializedEvent.parameters.push(
    new ethereum.EventParam(
      "callerEncryptedChatSecret",
      ethereum.Value.fromBytes(callerEncryptedChatSecret)
    )
  )
  chatInitializedEvent.parameters.push(
    new ethereum.EventParam(
      "peerEncryptedChatSecret",
      ethereum.Value.fromBytes(peerEncryptedChatSecret)
    )
  )

  return chatInitializedEvent
}

export function createUserInitializedEvent(
  user: Address,
  init: ethereum.Tuple
): UserInitialized {
  let userInitializedEvent = changetype<UserInitialized>(newMockEvent())

  userInitializedEvent.parameters = new Array()

  userInitializedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  userInitializedEvent.parameters.push(
    new ethereum.EventParam("init", ethereum.Value.fromTuple(init))
  )

  return userInitializedEvent
}
