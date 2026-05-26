export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      categories: {
        Row: {
          active: boolean
          created_at: string
          id: string
          name_en: string
          name_es: string
          name_pt: string
          slug: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          id?: string
          name_en: string
          name_es: string
          name_pt: string
          slug: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          id?: string
          name_en?: string
          name_es?: string
          name_pt?: string
          slug?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      companies: {
        Row: {
          active: boolean
          address: string | null
          cnpj: string | null
          created_at: string
          fantasy_name: string
          id: string
          instagram: string | null
          is_primary: boolean
          legal_name: string | null
          logo_url: string | null
          site: string | null
          sort_order: number
          updated_at: string
        }
        Insert: {
          active?: boolean
          address?: string | null
          cnpj?: string | null
          created_at?: string
          fantasy_name: string
          id?: string
          instagram?: string | null
          is_primary?: boolean
          legal_name?: string | null
          logo_url?: string | null
          site?: string | null
          sort_order?: number
          updated_at?: string
        }
        Update: {
          active?: boolean
          address?: string | null
          cnpj?: string | null
          created_at?: string
          fantasy_name?: string
          id?: string
          instagram?: string | null
          is_primary?: boolean
          legal_name?: string | null
          logo_url?: string | null
          site?: string | null
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      markers: {
        Row: {
          active: boolean
          created_at: string
          icon_color: string
          icon_name: string
          id: string
          label_en: string
          label_es: string
          label_pt: string
          slug: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          icon_color?: string
          icon_name?: string
          id?: string
          label_en: string
          label_es: string
          label_pt: string
          slug: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          icon_color?: string
          icon_name?: string
          id?: string
          label_en?: string
          label_es?: string
          label_pt?: string
          slug?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      product_markers: {
        Row: {
          marker_id: string
          product_id: string
        }
        Insert: {
          marker_id: string
          product_id: string
        }
        Update: {
          marker_id?: string
          product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_markers_marker_id_fkey"
            columns: ["marker_id"]
            isOneToOne: false
            referencedRelation: "markers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_markers_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          active: boolean
          available_days: number[]
          category_id: string
          created_at: string
          description_en: string | null
          description_es: string | null
          description_pt: string | null
          id: string
          image_url: string | null
          ingredients_en: string | null
          ingredients_es: string | null
          ingredients_pt: string | null
          name_en: string
          name_es: string
          name_pt: string
          price: number | null
          sort_order: number
          time_end_1: string | null
          time_end_2: string | null
          time_start_1: string | null
          time_start_2: string | null
          updated_at: string
        }
        Insert: {
          active?: boolean
          available_days?: number[]
          category_id: string
          created_at?: string
          description_en?: string | null
          description_es?: string | null
          description_pt?: string | null
          id?: string
          image_url?: string | null
          ingredients_en?: string | null
          ingredients_es?: string | null
          ingredients_pt?: string | null
          name_en: string
          name_es: string
          name_pt: string
          price?: number | null
          sort_order?: number
          time_end_1?: string | null
          time_end_2?: string | null
          time_start_1?: string | null
          time_start_2?: string | null
          updated_at?: string
        }
        Update: {
          active?: boolean
          available_days?: number[]
          category_id?: string
          created_at?: string
          description_en?: string | null
          description_es?: string | null
          description_pt?: string | null
          id?: string
          image_url?: string | null
          ingredients_en?: string | null
          ingredients_es?: string | null
          ingredients_pt?: string | null
          name_en?: string
          name_es?: string
          name_pt?: string
          price?: number | null
          sort_order?: number
          time_end_1?: string | null
          time_end_2?: string | null
          time_start_1?: string | null
          time_start_2?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      theme_settings: {
        Row: {
          accent: string
          accent_foreground: string
          background: string
          border: string
          foreground: string
          id: string
          muted: string
          primary_color: string
          primary_foreground: string
          singleton: boolean
          updated_at: string
        }
        Insert: {
          accent?: string
          accent_foreground?: string
          background?: string
          border?: string
          foreground?: string
          id?: string
          muted?: string
          primary_color?: string
          primary_foreground?: string
          singleton?: boolean
          updated_at?: string
        }
        Update: {
          accent?: string
          accent_foreground?: string
          background?: string
          border?: string
          foreground?: string
          id?: string
          muted?: string
          primary_color?: string
          primary_foreground?: string
          singleton?: boolean
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      companies_public: {
        Row: {
          active: boolean | null
          created_at: string | null
          fantasy_name: string | null
          id: string | null
          instagram: string | null
          is_primary: boolean | null
          logo_url: string | null
          site: string | null
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          fantasy_name?: string | null
          id?: string | null
          instagram?: string | null
          is_primary?: boolean | null
          logo_url?: string | null
          site?: string | null
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          fantasy_name?: string | null
          id?: string | null
          instagram?: string | null
          is_primary?: boolean | null
          logo_url?: string | null
          site?: string | null
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
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
