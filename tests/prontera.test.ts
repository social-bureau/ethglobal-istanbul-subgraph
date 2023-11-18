import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, Bytes } from "@graphprotocol/graph-ts"
import { ChatInitialized } from "../generated/schema"
import { ChatInitialized as ChatInitializedEvent } from "../generated/Prontera/Prontera"
import { handleChatInitialized } from "../src/prontera"
import { createChatInitializedEvent } from "./prontera-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let initializer = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let peer = Address.fromString("0x0000000000000000000000000000000000000001")
    let callerEncryptedChatSecret = Bytes.fromI32(1234567890)
    let peerEncryptedChatSecret = Bytes.fromI32(1234567890)
    let newChatInitializedEvent = createChatInitializedEvent(
      initializer,
      peer,
      callerEncryptedChatSecret,
      peerEncryptedChatSecret
    )
    handleChatInitialized(newChatInitializedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ChatInitialized created and stored", () => {
    assert.entityCount("ChatInitialized", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ChatInitialized",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "initializer",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ChatInitialized",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "peer",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ChatInitialized",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "callerEncryptedChatSecret",
      "1234567890"
    )
    assert.fieldEquals(
      "ChatInitialized",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "peerEncryptedChatSecret",
      "1234567890"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
