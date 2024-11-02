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
      connections: {
        Row: {
          id: string
          requestee_id: string | null
          requester_id: string | null
          status: string | null
        }
        Insert: {
          id?: string
          requestee_id?: string | null
          requester_id?: string | null
          status?: string | null
        }
        Update: {
          id?: string
          requestee_id?: string | null
          requester_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "connections_requestee_id_fkey"
            columns: ["requestee_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "connections_requester_id_fkey"
            columns: ["requester_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          age_group: Database["public"]["Enums"]["age_group"]
          allow_connections: boolean
          books: string | null
          content: string | null
          country: string | null
          created_at: string
          embedding: string | null
          entertainment_embedding: string | null
          fitness: string | null
          food: string | null
          food_embedding: string | null
          gender: Database["public"]["Enums"]["gender"]
          hobbies: string | null
          hobbies_embedding: string | null
          id: string
          kids: boolean | null
          movies: string | null
          music: string | null
          name: string | null
          personal_embedding: string | null
          personality: string | null
          personality_embedding: string | null
          pets: string | null
          podcasts: string | null
          shows: string | null
          travel: string | null
          travel_embedding: string | null
          updated_at: string
          work: string | null
          work_embedding: string | null
        }
        Insert: {
          age_group: Database["public"]["Enums"]["age_group"]
          allow_connections?: boolean
          books?: string | null
          content?: string | null
          country?: string | null
          created_at?: string
          embedding?: string | null
          entertainment_embedding?: string | null
          fitness?: string | null
          food?: string | null
          food_embedding?: string | null
          gender: Database["public"]["Enums"]["gender"]
          hobbies?: string | null
          hobbies_embedding?: string | null
          id: string
          kids?: boolean | null
          movies?: string | null
          music?: string | null
          name?: string | null
          personal_embedding?: string | null
          personality?: string | null
          personality_embedding?: string | null
          pets?: string | null
          podcasts?: string | null
          shows?: string | null
          travel?: string | null
          travel_embedding?: string | null
          updated_at?: string
          work?: string | null
          work_embedding?: string | null
        }
        Update: {
          age_group?: Database["public"]["Enums"]["age_group"]
          allow_connections?: boolean
          books?: string | null
          content?: string | null
          country?: string | null
          created_at?: string
          embedding?: string | null
          entertainment_embedding?: string | null
          fitness?: string | null
          food?: string | null
          food_embedding?: string | null
          gender?: Database["public"]["Enums"]["gender"]
          hobbies?: string | null
          hobbies_embedding?: string | null
          id?: string
          kids?: boolean | null
          movies?: string | null
          music?: string | null
          name?: string | null
          personal_embedding?: string | null
          personality?: string | null
          personality_embedding?: string | null
          pets?: string | null
          podcasts?: string | null
          shows?: string | null
          travel?: string | null
          travel_embedding?: string | null
          updated_at?: string
          work?: string | null
          work_embedding?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          email: string | null
          id: string
        }
        Insert: {
          email?: string | null
          id: string
        }
        Update: {
          email?: string | null
          id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      binary_quantize:
        | {
            Args: {
              "": string
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      get_random_profile: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          content: string
          embedding: string
        }[]
      }
      halfvec_avg: {
        Args: {
          "": number[]
        }
        Returns: unknown
      }
      halfvec_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      halfvec_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
      hnsw_bit_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnswhandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflat_bit_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflathandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      l2_norm:
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
      l2_normalize:
        | {
            Args: {
              "": string
            }
            Returns: string
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      match_profiles: {
        Args: {
          user_id: string
          personal_query_embedding: string
          work_query_embedding: string
          hobbies_query_embedding: string
          entertainment_query_embedding: string
          personality_query_embedding: string
          travel_query_embedding: string
          food_query_embedding: string
          match_threshold: number
          match_count: number
          filter_gender?: Database["public"]["Enums"]["gender"][]
          filter_age_group?: Database["public"]["Enums"]["age_group"][]
        }
        Returns: {
          id: string
          allow_connections: boolean
          name: string
          content: string
          gender: Database["public"]["Enums"]["gender"]
          age_group: Database["public"]["Enums"]["age_group"]
          kids: boolean
          pets: string
          work: string
          hobbies: string
          shows: string
          movies: string
          music: string
          books: string
          podcasts: string
          travel: string
          fitness: string
          food: string
          personality: string
          personal_similarity: number
          work_similarity: number
          hobbies_similarity: number
          entertainment_similarity: number
          personality_similarity: number
          travel_similarity: number
          food_similarity: number
          created_at: string
          updated_at: string
        }[]
      }
      sparsevec_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      sparsevec_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
      vector_avg: {
        Args: {
          "": number[]
        }
        Returns: string
      }
      vector_dims:
        | {
            Args: {
              "": string
            }
            Returns: number
          }
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
      vector_norm: {
        Args: {
          "": string
        }
        Returns: number
      }
      vector_out: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      vector_send: {
        Args: {
          "": string
        }
        Returns: string
      }
      vector_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
    }
    Enums: {
      age_group:
        | "late teens"
        | "20s"
        | "30s"
        | "40s"
        | "50s"
        | "60s"
        | "70s"
        | "80s"
        | "90s"
        | "100s"
      gender: "male" | "female" | "non-binary" | "other" | "prefer not to say"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
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
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
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
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
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
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
