export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      company_profiles: {
        Row: {
          id: string
          user_id: string
          created_at: string | null
          updated_at: string | null
          email: string | null
          first_name: string | null
          last_name: string | null
          company_name: string | null
          industry: string | null
          website_url: string | null // Corresponds to 'website' in some contexts, and user's 'Online-Präsenz'
          main_product: string | null // User's "Hauptprodukt/Dienstleistung" (name)
          product_url: string | null
          linkedin_url: string | null
          position: string | null
          twitter_url: string | null
          
          // Fields from existing form / user's detailed spec (Markenstimme etc.)
          tone: string | null // User's 'general_tone' (Vertrauensvoll & seriös, Locker & humorvoll)
          language: string | null // User's 'tone_of_voice' (Du (informell) / Sie (formell))
          use_humor: string | null // User's 'humor_usage' (Ja / Gelegentlich / Nein)
          target_audience: string | null // User's 'Zielgruppe & Kundenavatar'
          writing_style: string | null // User's 'sentence_complexity' (Einfach / Mittel / Komplex)
          technical_terms: string | null // User's 'technical_language' (Ja / Nein / Mischung)
          preferred_phrases: string | null // User's 'Bevorzugte Redewendungen / Phrasen'
          avoid_phrases: string | null // User's 'forbidden_phrases' / 'No-Go Phrasen oder Wörter'
          call_to_actions: string[] | null // List of CTAs (e.g., "Jetzt kontaktieren")
          brand_values: string[] | null // User's 'Werte' (Innovation, Vertrauen etc. - Checkbox)

          // New fields from user's detailed spec (Unternehmensprofil)
          main_services: string | null // User's 'Hauptprodukte/Dienstleistung' (Textarea)
          main_problem: string | null // User's 'Hauptproblem Deiner Kunden'
          solution: string | null // User's 'Deine Lösung'
          mission_vision_values: string | null // User's 'Mission, Vision & Firmenwerte'
          positioning: string | null // User's 'Positionierung (USP)'
          benefits: string | null // User's 'Nutzen & Mehrwert'
          achievements: string | null // User's 'Erfolge & Meilensteine'
          seo_keywords: string | null // User's 'SEO-Keywords' (Kommagetrennte Liste)
          process_steps: string | null // User's 'Konkrete Schritte zur Zusammenarbeit'

          // New fields from user's detailed spec (Marken-Stimme)
          brand_personality: string | null // User's 'Markenpersönlichkeit' (Der Berater, etc.)
          sensitive_topics_handling: string | null // User's 'Umgang mit kritischen Themen'
          preferred_ctas_style: string | null // User's 'Call-to-Actions bevorzugt' (Direkt / Sanft - Dropdown)
          emoji_usage: string | null // User's 'Emojis verwenden?' (Ja / Nein)
        }
        Insert: {
          id?: string
          user_id: string
          created_at?: string | null
          updated_at?: string | null
          email?: string | null
          first_name?: string | null
          last_name?: string | null
          company_name?: string | null
          industry?: string | null
          website_url?: string | null
          main_product?: string | null
          product_url?: string | null
          linkedin_url?: string | null
          position?: string | null
          twitter_url?: string | null
          
          tone?: string | null
          language?: string | null
          use_humor?: string | null
          target_audience?: string | null
          writing_style?: string | null
          technical_terms?: string | null
          preferred_phrases?: string | null
          avoid_phrases?: string | null
          call_to_actions?: string[] | null
          brand_values?: string[] | null

          main_services?: string | null
          main_problem?: string | null
          solution?: string | null
          mission_vision_values?: string | null
          positioning?: string | null
          benefits?: string | null
          achievements?: string | null
          seo_keywords?: string | null
          process_steps?: string | null

          brand_personality?: string | null
          sensitive_topics_handling?: string | null
          preferred_ctas_style?: string | null
          emoji_usage?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          created_at?: string | null
          updated_at?: string | null
          email?: string | null
          first_name?: string | null
          last_name?: string | null
          company_name?: string | null
          industry?: string | null
          website_url?: string | null
          main_product?: string | null
          product_url?: string | null
          linkedin_url?: string | null
          position?: string | null
          twitter_url?: string | null

          tone?: string | null
          language?: string | null
          use_humor?: string | null
          target_audience?: string | null
          writing_style?: string | null
          technical_terms?: string | null
          preferred_phrases?: string | null
          avoid_phrases?: string | null
          call_to_actions?: string[] | null
          brand_values?: string[] | null

          main_services?: string | null
          main_problem?: string | null
          solution?: string | null
          mission_vision_values?: string | null
          positioning?: string | null
          benefits?: string | null
          achievements?: string | null
          seo_keywords?: string | null
          process_steps?: string | null

          brand_personality?: string | null
          sensitive_topics_handling?: string | null
          preferred_ctas_style?: string | null
          emoji_usage?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: { 
        Row: {
          id: string
          user_id: string
          first_name: string | null
          last_name: string | null
          email: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          first_name?: string | null
          last_name?: string | null
          email?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          first_name?: string | null
          last_name?: string | null
          email?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      },
      saved_content: {
        Row: {
          id: string
          user_id: string
          created_at: string
          title: string
          content: Json // oder Record<string, unknown>
          content_type: string // Später ggf. Union-Typ
          source_expert: string | null
          generation_params: Json | null // oder Record<string, unknown> | null
          is_favorite: boolean
        }
        Insert: {
          id?: string
          user_id: string
          created_at?: string
          title: string
          content: Json // oder Record<string, unknown>
          content_type: string
          source_expert?: string | null
          generation_params?: Json | null // oder Record<string, unknown> | null
          is_favorite?: boolean
        }
        Update: {
          id?: string
          user_id?: string
          created_at?: string
          title?: string
          content?: Json // oder Record<string, unknown>
          content_type?: string
          source_expert?: string | null
          generation_params?: Json | null // oder Record<string, unknown> | null
          is_favorite?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "saved_content_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      handle_updated_at: {
        Args: Record<PropertyKey, never>
        Returns: unknown
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
        Database["public"]["Views"])
    ? (Database["public"]["Tables"] &
        Database["public"]["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
    ? Database["public"]["Enums"][PublicEnumNameOrOptions]
    : never

export interface SavedContent {
  id: string
  user_id: string
  created_at: string
  title: string
  content: Json // oder Record<string, unknown>
  content_type: string // Später ggf. Union-Typ
  source_expert: string | null
  generation_params: Json | null // oder Record<string, unknown> | null
  is_favorite: boolean
}
