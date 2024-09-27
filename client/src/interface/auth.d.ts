import { BuiltInProviderType } from "next-auth/providers"
import { ClientSafeProvider, LiteralUnion } from "next-auth/react"

declare namespace Auth {
  declare type IProvider = Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>
}
