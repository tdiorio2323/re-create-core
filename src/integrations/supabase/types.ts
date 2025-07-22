export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      creator_content: {
        Row: {
          content_type: string
          created_at: string
          creator_id: string
          description: string | null
          file_url: string | null
          id: string
          is_premium: boolean | null
          price: number | null
          title: string
          updated_at: string
        }
        Insert: {
          content_type: string
          created_at?: string
          creator_id: string
          description?: string | null
          file_url?: string | null
          id?: string
          is_premium?: boolean | null
          price?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          content_type?: string
          created_at?: string
          creator_id?: string
          description?: string | null
          file_url?: string | null
          id?: string
          is_premium?: boolean | null
          price?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "creator_content_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      creator_earnings: {
        Row: {
          creator_id: string
          id: string
          last_payout_date: string | null
          ppv_earnings: number | null
          subscription_earnings: number | null
          tip_earnings: number | null
          total_earnings: number | null
          updated_at: string
        }
        Insert: {
          creator_id: string
          id?: string
          last_payout_date?: string | null
          ppv_earnings?: number | null
          subscription_earnings?: number | null
          tip_earnings?: number | null
          total_earnings?: number | null
          updated_at?: string
        }
        Update: {
          creator_id?: string
          id?: string
          last_payout_date?: string | null
          ppv_earnings?: number | null
          subscription_earnings?: number | null
          tip_earnings?: number | null
          total_earnings?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      invites: {
        Row: {
          created_at: string
          created_by: string
          current_uses: number | null
          description: string | null
          expires_at: string | null
          id: string
          intended_for: string | null
          invite_code: string
          max_uses: number | null
          passcode: string
          status: string | null
          updated_at: string
          used_at: string | null
          used_by: string | null
        }
        Insert: {
          created_at?: string
          created_by: string
          current_uses?: number | null
          description?: string | null
          expires_at?: string | null
          id?: string
          intended_for?: string | null
          invite_code: string
          max_uses?: number | null
          passcode: string
          status?: string | null
          updated_at?: string
          used_at?: string | null
          used_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string
          current_uses?: number | null
          description?: string | null
          expires_at?: string | null
          id?: string
          intended_for?: string | null
          invite_code?: string
          max_uses?: number | null
          passcode?: string
          status?: string | null
          updated_at?: string
          used_at?: string | null
          used_by?: string | null
        }
        Relationships: []
      }
      link_clicks: {
        Row: {
          browser: string | null
          city: string | null
          clicked_at: string
          country: string | null
          device_type: string | null
          id: string
          ip_address: unknown | null
          link_id: string | null
          metadata: Json | null
          os: string | null
          referer: string | null
          region: string | null
          session_id: string | null
          short_code: string
          user_agent: string | null
          user_id: string | null
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
        }
        Insert: {
          browser?: string | null
          city?: string | null
          clicked_at?: string
          country?: string | null
          device_type?: string | null
          id?: string
          ip_address?: unknown | null
          link_id?: string | null
          metadata?: Json | null
          os?: string | null
          referer?: string | null
          region?: string | null
          session_id?: string | null
          short_code: string
          user_agent?: string | null
          user_id?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Update: {
          browser?: string | null
          city?: string | null
          clicked_at?: string
          country?: string | null
          device_type?: string | null
          id?: string
          ip_address?: unknown | null
          link_id?: string | null
          metadata?: Json | null
          os?: string | null
          referer?: string | null
          region?: string | null
          session_id?: string | null
          short_code?: string
          user_agent?: string | null
          user_id?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "link_clicks_link_id_fkey"
            columns: ["link_id"]
            isOneToOne: false
            referencedRelation: "link_tracking"
            referencedColumns: ["id"]
          },
        ]
      }
      link_tracking: {
        Row: {
          campaign_name: string | null
          content: string | null
          created_at: string
          created_by: string | null
          creator_id: string | null
          custom_alias: string | null
          expires_at: string | null
          id: string
          is_active: boolean | null
          medium: string | null
          metadata: Json | null
          original_url: string
          short_code: string
          source: string | null
          term: string | null
          updated_at: string
        }
        Insert: {
          campaign_name?: string | null
          content?: string | null
          created_at?: string
          created_by?: string | null
          creator_id?: string | null
          custom_alias?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          medium?: string | null
          metadata?: Json | null
          original_url: string
          short_code: string
          source?: string | null
          term?: string | null
          updated_at?: string
        }
        Update: {
          campaign_name?: string | null
          content?: string | null
          created_at?: string
          created_by?: string | null
          creator_id?: string | null
          custom_alias?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          medium?: string | null
          metadata?: Json | null
          original_url?: string
          short_code?: string
          source?: string | null
          term?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          cover_image_url: string | null
          created_at: string
          display_name: string | null
          id: string
          is_admin: boolean | null
          is_creator_verified: boolean | null
          role: string | null
          subscription_price: number | null
          updated_at: string
          user_id: string
          username: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          cover_image_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          is_admin?: boolean | null
          is_creator_verified?: boolean | null
          role?: string | null
          subscription_price?: number | null
          updated_at?: string
          user_id: string
          username: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          cover_image_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          is_admin?: boolean | null
          is_creator_verified?: boolean | null
          role?: string | null
          subscription_price?: number | null
          updated_at?: string
          user_id?: string
          username?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          amount: number | null
          created_at: string
          creator_id: string
          currency: string | null
          expires_at: string | null
          id: string
          interval_type: string | null
          status: string | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          subscriber_id: string
        }
        Insert: {
          amount?: number | null
          created_at?: string
          creator_id: string
          currency?: string | null
          expires_at?: string | null
          id?: string
          interval_type?: string | null
          status?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscriber_id: string
        }
        Update: {
          amount?: number | null
          created_at?: string
          creator_id?: string
          currency?: string | null
          expires_at?: string | null
          id?: string
          interval_type?: string | null
          status?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscriber_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "subscriptions_subscriber_id_fkey"
            columns: ["subscriber_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      transactions: {
        Row: {
          amount: number
          content_id: string | null
          created_at: string
          creator_id: string
          currency: string | null
          id: string
          status: string | null
          stripe_payment_intent_id: string | null
          stripe_session_id: string | null
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          content_id?: string | null
          created_at?: string
          creator_id: string
          currency?: string | null
          id?: string
          status?: string | null
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          content_id?: string | null
          created_at?: string
          creator_id?: string
          currency?: string | null
          id?: string
          status?: string | null
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      vip_link_tracking: {
        Row: {
          campaign_name: string | null
          created_at: string
          id: string
          is_active: boolean | null
          metadata: Json | null
          sent_by: string | null
          sent_to: string | null
          sent_via: string | null
          short_code: string
          tracking_url: string
          updated_at: string
          vip_code: string
        }
        Insert: {
          campaign_name?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          sent_by?: string | null
          sent_to?: string | null
          sent_via?: string | null
          short_code: string
          tracking_url: string
          updated_at?: string
          vip_code: string
        }
        Update: {
          campaign_name?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          sent_by?: string | null
          sent_to?: string | null
          sent_via?: string | null
          short_code?: string
          tracking_url?: string
          updated_at?: string
          vip_code?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_secret_proxy: {
        Args: { secret_name: string; secret_value: string }
        Returns: undefined
      }
      create_tracked_link: {
        Args: {
          original_url: string
          campaign_name?: string
          source?: string
          medium?: string
          content?: string
          term?: string
          custom_alias?: string
          expires_days?: number
        }
        Returns: Json
      }
      generate_invite_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_passcode: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_short_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_link_analytics: {
        Args: { link_id?: string; user_filter?: string }
        Returns: Json
      }
      record_link_click: {
        Args: {
          short_code: string
          ip_address?: unknown
          user_agent?: string
          referer?: string
          country?: string
          region?: string
          city?: string
          device_type?: string
          browser?: string
          os?: string
          session_id?: string
        }
        Returns: boolean
      }
      update_creator_earnings: {
        Args: { creator_id: string; amount: number; earning_type: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
