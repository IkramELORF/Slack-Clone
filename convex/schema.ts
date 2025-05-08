import { defineSchema, defineTable } from "convex/server"; // Fonctions de base pour définir le schéma Convex
import { authTables } from "@convex-dev/auth/server"; // Tables pré-définies pour la gestion de l'authentification
import { v } from "convex/values";// Utilitaire pour les types de validation

// Tables `users` et `sessions` injectées automatiquement par le module d'auth Convex.

const schema = defineSchema({
    ...authTables,
    workspaces: defineTable({
        name: v.string(),
        userId: v.id("users"),
        joinCode: v.string(),
    }),
    // Représente un utilisateur dans un workspace, avec un rôle (admin/member).

    members: defineTable({
        userId: v.id("users"),
        workspaceId: v.id("workspaces"),
        role: v.union(v.literal("admin"), v.literal("member")),
    })
        .index("by_user_id", ["userId"])
        .index("by_workspace_id", ["workspaceId"])
        .index("by_workspace_id_user_id", ["workspaceId", "userId"]),
    // Représente les canaux publics/privés dans un workspace.
    channels: defineTable({
        name: v.string(),
        workspaceId: v.id("workspaces"),

    })
        .index("by_workspace_id", ["workspaceId"]),
    // Représente une conversation privée entre deux membres dans un workspace.

    conversations: defineTable({
        workspaceId: v.id("workspaces"),
        memberOneId: v.id("members"),
        memberTwoId: v.id("members"),
    })
        .index("by_workspace_id", ["workspaceId"]),
    // Messages échangés dans un canal ou une conversation privée.
    // Peut contenir du texte, une image, ou être une réponse à un autre message.
    messages: defineTable({
        body: v.string(),
        image: v.optional(v.id("_storage")),
        memberId: v.optional(v.id("members")),
        workspaceId: v.optional(v.id("workspaces")),
        channelId: v.optional(v.id("channels")),
        parentMessageId: v.optional(v.id("messages")),
        conversationId: v.optional(v.id("conversations")),
        updatedAt: v.optional(v.number()),
    })
        .index("by_workspace_id", ["workspaceId"])
        .index("by_member_id", ["memberId"])
        .index("by_channel_id", ["channelId"])
        .index("by_conversation_id", ["conversationId"])
        .index("by_parent_message_id", ["parentMessageId"])
        .index("by_channel_id_parent_message_id_conversation_id", [
            "channelId",
            "parentMessageId",
            "conversationId",
        ]),
    // Permet aux membres de réagir à un message (emoji, like, etc.).
    reactions: defineTable({
        workspaceId: v.id("workspaces"),
        messageId: v.id("messages"),
        memberId: v.id("members"),
        value: v.string(),
    })
        .index("by_workspace_id", ["workspaceId"])
        .index("by_message_id", ["messageId"])
        .index("by_member_id", ["memberId"])
});

export default schema;