export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  audit: {
    Tables: {
      logs: {
        Row: {
          action: string
          id: number
          ip_address: unknown | null
          metadata: Json | null
          occurred_at: string | null
          project_id: string | null
          resource_id: string | null
          resource_type: string
          user_id: string | null
        }
        Insert: {
          action: string
          id?: number
          ip_address?: unknown | null
          metadata?: Json | null
          occurred_at?: string | null
          project_id?: string | null
          resource_id?: string | null
          resource_type: string
          user_id?: string | null
        }
        Update: {
          action?: string
          id?: number
          ip_address?: unknown | null
          metadata?: Json | null
          occurred_at?: string | null
          project_id?: string | null
          resource_id?: string | null
          resource_type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "logs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project_usage_summary"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "logs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
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
  auth_config: {
    Tables: {
      configurations: {
        Row: {
          created_at: string | null
          disable_signup: boolean | null
          id: number
          jwt_exp: number | null
          project_id: string | null
          site_url: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          disable_signup?: boolean | null
          id?: number
          jwt_exp?: number | null
          project_id?: string | null
          site_url?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          disable_signup?: boolean | null
          id?: number
          jwt_exp?: number | null
          project_id?: string | null
          site_url?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "configurations_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: true
            referencedRelation: "project_usage_summary"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "configurations_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: true
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      oauth_providers: {
        Row: {
          client_id: string
          created_at: string | null
          id: number
          project_id: string | null
          provider: string
          secret: string
          updated_at: string | null
        }
        Insert: {
          client_id: string
          created_at?: string | null
          id?: number
          project_id?: string | null
          provider: string
          secret: string
          updated_at?: string | null
        }
        Update: {
          client_id?: string
          created_at?: string | null
          id?: number
          project_id?: string | null
          provider?: string
          secret?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "oauth_providers_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project_usage_summary"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "oauth_providers_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
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
  backups: {
    Tables: {
      configurations: {
        Row: {
          backup_schedule: string | null
          created_at: string | null
          id: number
          pitr_enabled: boolean | null
          project_id: string | null
          retention_period: unknown | null
          updated_at: string | null
        }
        Insert: {
          backup_schedule?: string | null
          created_at?: string | null
          id?: number
          pitr_enabled?: boolean | null
          project_id?: string | null
          retention_period?: unknown | null
          updated_at?: string | null
        }
        Update: {
          backup_schedule?: string | null
          created_at?: string | null
          id?: number
          pitr_enabled?: boolean | null
          project_id?: string | null
          retention_period?: unknown | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "configurations_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: true
            referencedRelation: "project_usage_summary"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "configurations_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: true
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      history: {
        Row: {
          backup_type: string
          completed_at: string | null
          id: number
          project_id: string | null
          size_bytes: number | null
          started_at: string | null
          status: string
        }
        Insert: {
          backup_type: string
          completed_at?: string | null
          id?: number
          project_id?: string | null
          size_bytes?: number | null
          started_at?: string | null
          status: string
        }
        Update: {
          backup_type?: string
          completed_at?: string | null
          id?: number
          project_id?: string | null
          size_bytes?: number | null
          started_at?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "history_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project_usage_summary"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "history_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
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
  billing: {
    Tables: {
      plans: {
        Row: {
          features: Json | null
          id: number
          interval: string
          name: string
          price: number
        }
        Insert: {
          features?: Json | null
          id?: number
          interval: string
          name: string
          price: number
        }
        Update: {
          features?: Json | null
          id?: number
          interval?: string
          name?: string
          price?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
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
  graphql: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      _internal_resolve: {
        Args: {
          query: string
          variables?: Json
          operationName?: string
          extensions?: Json
        }
        Returns: Json
      }
      comment_directive: {
        Args: {
          comment_: string
        }
        Returns: Json
      }
      exception: {
        Args: {
          message: string
        }
        Returns: string
      }
      get_schema_version: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      resolve: {
        Args: {
          query: string
          variables?: Json
          operationName?: string
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  integrations: {
    Tables: {
      github: {
        Row: {
          created_at: string | null
          id: number
          installation_id: number
          project_id: string | null
          repository_id: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          installation_id: number
          project_id?: string | null
          repository_id: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          installation_id?: number
          project_id?: string | null
          repository_id?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "github_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project_usage_summary"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "github_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      vercel: {
        Row: {
          created_at: string | null
          id: number
          project_id: string | null
          updated_at: string | null
          vercel_project_id: string
          vercel_team_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          project_id?: string | null
          updated_at?: string | null
          vercel_project_id: string
          vercel_team_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          project_id?: string | null
          updated_at?: string | null
          vercel_project_id?: string
          vercel_team_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vercel_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project_usage_summary"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "vercel_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
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
  pgsodium: {
    Tables: {
      key: {
        Row: {
          associated_data: string | null
          comment: string | null
          created: string
          expires: string | null
          id: string
          key_context: string | null
          key_id: number | null
          key_type: Database["pgsodium"]["Enums"]["key_type"] | null
          name: string | null
          parent_key: string | null
          raw_key: string | null
          raw_key_nonce: string | null
          status: Database["pgsodium"]["Enums"]["key_status"] | null
          user_data: string | null
        }
        Insert: {
          associated_data?: string | null
          comment?: string | null
          created?: string
          expires?: string | null
          id?: string
          key_context?: string | null
          key_id?: number | null
          key_type?: Database["pgsodium"]["Enums"]["key_type"] | null
          name?: string | null
          parent_key?: string | null
          raw_key?: string | null
          raw_key_nonce?: string | null
          status?: Database["pgsodium"]["Enums"]["key_status"] | null
          user_data?: string | null
        }
        Update: {
          associated_data?: string | null
          comment?: string | null
          created?: string
          expires?: string | null
          id?: string
          key_context?: string | null
          key_id?: number | null
          key_type?: Database["pgsodium"]["Enums"]["key_type"] | null
          name?: string | null
          parent_key?: string | null
          raw_key?: string | null
          raw_key_nonce?: string | null
          status?: Database["pgsodium"]["Enums"]["key_status"] | null
          user_data?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "key_parent_key_fkey"
            columns: ["parent_key"]
            isOneToOne: false
            referencedRelation: "decrypted_key"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "key_parent_key_fkey"
            columns: ["parent_key"]
            isOneToOne: false
            referencedRelation: "key"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "key_parent_key_fkey"
            columns: ["parent_key"]
            isOneToOne: false
            referencedRelation: "valid_key"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      decrypted_key: {
        Row: {
          associated_data: string | null
          comment: string | null
          created: string | null
          decrypted_raw_key: string | null
          expires: string | null
          id: string | null
          key_context: string | null
          key_id: number | null
          key_type: Database["pgsodium"]["Enums"]["key_type"] | null
          name: string | null
          parent_key: string | null
          raw_key: string | null
          raw_key_nonce: string | null
          status: Database["pgsodium"]["Enums"]["key_status"] | null
        }
        Insert: {
          associated_data?: string | null
          comment?: string | null
          created?: string | null
          decrypted_raw_key?: never
          expires?: string | null
          id?: string | null
          key_context?: string | null
          key_id?: number | null
          key_type?: Database["pgsodium"]["Enums"]["key_type"] | null
          name?: string | null
          parent_key?: string | null
          raw_key?: string | null
          raw_key_nonce?: string | null
          status?: Database["pgsodium"]["Enums"]["key_status"] | null
        }
        Update: {
          associated_data?: string | null
          comment?: string | null
          created?: string | null
          decrypted_raw_key?: never
          expires?: string | null
          id?: string | null
          key_context?: string | null
          key_id?: number | null
          key_type?: Database["pgsodium"]["Enums"]["key_type"] | null
          name?: string | null
          parent_key?: string | null
          raw_key?: string | null
          raw_key_nonce?: string | null
          status?: Database["pgsodium"]["Enums"]["key_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "key_parent_key_fkey"
            columns: ["parent_key"]
            isOneToOne: false
            referencedRelation: "key"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "key_parent_key_fkey"
            columns: ["parent_key"]
            isOneToOne: false
            referencedRelation: "decrypted_key"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "key_parent_key_fkey"
            columns: ["parent_key"]
            isOneToOne: false
            referencedRelation: "valid_key"
            referencedColumns: ["id"]
          },
        ]
      }
      mask_columns: {
        Row: {
          associated_columns: string | null
          attname: unknown | null
          attrelid: unknown | null
          format_type: string | null
          key_id: string | null
          key_id_column: string | null
          nonce_column: string | null
        }
        Relationships: []
      }
      masking_rule: {
        Row: {
          associated_columns: string | null
          attname: unknown | null
          attnum: number | null
          attrelid: unknown | null
          col_description: string | null
          format_type: string | null
          key_id: string | null
          key_id_column: string | null
          nonce_column: string | null
          priority: number | null
          relname: unknown | null
          relnamespace: unknown | null
          security_invoker: boolean | null
          view_name: string | null
        }
        Relationships: []
      }
      valid_key: {
        Row: {
          associated_data: string | null
          created: string | null
          expires: string | null
          id: string | null
          key_context: string | null
          key_id: number | null
          key_type: Database["pgsodium"]["Enums"]["key_type"] | null
          name: string | null
          status: Database["pgsodium"]["Enums"]["key_status"] | null
        }
        Insert: {
          associated_data?: string | null
          created?: string | null
          expires?: string | null
          id?: string | null
          key_context?: string | null
          key_id?: number | null
          key_type?: Database["pgsodium"]["Enums"]["key_type"] | null
          name?: string | null
          status?: Database["pgsodium"]["Enums"]["key_status"] | null
        }
        Update: {
          associated_data?: string | null
          created?: string | null
          expires?: string | null
          id?: string | null
          key_context?: string | null
          key_id?: number | null
          key_type?: Database["pgsodium"]["Enums"]["key_type"] | null
          name?: string | null
          status?: Database["pgsodium"]["Enums"]["key_status"] | null
        }
        Relationships: []
      }
    }
    Functions: {
      create_key: {
        Args: {
          key_type?: Database["pgsodium"]["Enums"]["key_type"]
          name?: string
          raw_key?: string
          raw_key_nonce?: string
          parent_key?: string
          key_context?: string
          expires?: string
          associated_data?: string
        }
        Returns: {
          associated_data: string | null
          created: string | null
          expires: string | null
          id: string | null
          key_context: string | null
          key_id: number | null
          key_type: Database["pgsodium"]["Enums"]["key_type"] | null
          name: string | null
          status: Database["pgsodium"]["Enums"]["key_status"] | null
        }
      }
      create_mask_view:
        | {
            Args: {
              relid: unknown
              debug?: boolean
            }
            Returns: undefined
          }
        | {
            Args: {
              relid: unknown
              subid: number
              debug?: boolean
            }
            Returns: undefined
          }
      crypto_aead_det_decrypt:
        | {
            Args: {
              ciphertext: string
              additional: string
              key: string
              nonce?: string
            }
            Returns: string
          }
        | {
            Args: {
              message: string
              additional: string
              key_id: number
              context?: string
              nonce?: string
            }
            Returns: string
          }
        | {
            Args: {
              message: string
              additional: string
              key_uuid: string
            }
            Returns: string
          }
        | {
            Args: {
              message: string
              additional: string
              key_uuid: string
              nonce: string
            }
            Returns: string
          }
      crypto_aead_det_encrypt:
        | {
            Args: {
              message: string
              additional: string
              key: string
              nonce?: string
            }
            Returns: string
          }
        | {
            Args: {
              message: string
              additional: string
              key_id: number
              context?: string
              nonce?: string
            }
            Returns: string
          }
        | {
            Args: {
              message: string
              additional: string
              key_uuid: string
            }
            Returns: string
          }
        | {
            Args: {
              message: string
              additional: string
              key_uuid: string
              nonce: string
            }
            Returns: string
          }
      crypto_aead_det_keygen: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      crypto_aead_det_noncegen: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      crypto_aead_ietf_decrypt:
        | {
            Args: {
              message: string
              additional: string
              nonce: string
              key: string
            }
            Returns: string
          }
        | {
            Args: {
              message: string
              additional: string
              nonce: string
              key_id: number
              context?: string
            }
            Returns: string
          }
        | {
            Args: {
              message: string
              additional: string
              nonce: string
              key_uuid: string
            }
            Returns: string
          }
      crypto_aead_ietf_encrypt:
        | {
            Args: {
              message: string
              additional: string
              nonce: string
              key: string
            }
            Returns: string
          }
        | {
            Args: {
              message: string
              additional: string
              nonce: string
              key_id: number
              context?: string
            }
            Returns: string
          }
        | {
            Args: {
              message: string
              additional: string
              nonce: string
              key_uuid: string
            }
            Returns: string
          }
      crypto_aead_ietf_keygen: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      crypto_aead_ietf_noncegen: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      crypto_auth:
        | {
            Args: {
              message: string
              key: string
            }
            Returns: string
          }
        | {
            Args: {
              message: string
              key_id: number
              context?: string
            }
            Returns: string
          }
        | {
            Args: {
              message: string
              key_uuid: string
            }
            Returns: string
          }
      crypto_auth_hmacsha256:
        | {
            Args: {
              message: string
              key_id: number
              context?: string
            }
            Returns: string
          }
        | {
            Args: {
              message: string
              key_uuid: string
            }
            Returns: string
          }
        | {
            Args: {
              message: string
              secret: string
            }
            Returns: string
          }
      crypto_auth_hmacsha256_keygen: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      crypto_auth_hmacsha256_verify:
        | {
            Args: {
              hash: string
              message: string
              key_id: number
              context?: string
            }
            Returns: boolean
          }
        | {
            Args: {
              hash: string
              message: string
              secret: string
            }
            Returns: boolean
          }
        | {
            Args: {
              signature: string
              message: string
              key_uuid: string
            }
            Returns: boolean
          }
      crypto_auth_hmacsha512:
        | {
            Args: {
              message: string
              key_id: number
              context?: string
            }
            Returns: string
          }
        | {
            Args: {
              message: string
              key_uuid: string
            }
            Returns: string
          }
        | {
            Args: {
              message: string
              secret: string
            }
            Returns: string
          }
      crypto_auth_hmacsha512_keygen: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      crypto_auth_hmacsha512_verify:
        | {
            Args: {
              hash: string
              message: string
              key_id: number
              context?: string
            }
            Returns: boolean
          }
        | {
            Args: {
              hash: string
              message: string
              secret: string
            }
            Returns: boolean
          }
        | {
            Args: {
              signature: string
              message: string
              key_uuid: string
            }
            Returns: boolean
          }
      crypto_auth_keygen: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      crypto_auth_verify:
        | {
            Args: {
              mac: string
              message: string
              key: string
            }
            Returns: boolean
          }
        | {
            Args: {
              mac: string
              message: string
              key_id: number
              context?: string
            }
            Returns: boolean
          }
        | {
            Args: {
              mac: string
              message: string
              key_uuid: string
            }
            Returns: boolean
          }
      crypto_box: {
        Args: {
          message: string
          nonce: string
          public: string
          secret: string
        }
        Returns: string
      }
      crypto_box_new_keypair: {
        Args: Record<PropertyKey, never>
        Returns: Database["pgsodium"]["CompositeTypes"]["crypto_box_keypair"]
      }
      crypto_box_new_seed: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      crypto_box_noncegen: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      crypto_box_open: {
        Args: {
          ciphertext: string
          nonce: string
          public: string
          secret: string
        }
        Returns: string
      }
      crypto_box_seal: {
        Args: {
          message: string
          public_key: string
        }
        Returns: string
      }
      crypto_box_seal_open: {
        Args: {
          ciphertext: string
          public_key: string
          secret_key: string
        }
        Returns: string
      }
      crypto_box_seed_new_keypair: {
        Args: {
          seed: string
        }
        Returns: Database["pgsodium"]["CompositeTypes"]["crypto_box_keypair"]
      }
      crypto_generichash:
        | {
            Args: {
              message: string
              key: number
              context?: string
            }
            Returns: string
          }
        | {
            Args: {
              message: string
              key?: string
            }
            Returns: string
          }
        | {
            Args: {
              message: string
              key_uuid: string
            }
            Returns: string
          }
      crypto_generichash_keygen: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      crypto_hash_sha256: {
        Args: {
          message: string
        }
        Returns: string
      }
      crypto_hash_sha512: {
        Args: {
          message: string
        }
        Returns: string
      }
      crypto_kdf_derive_from_key:
        | {
            Args: {
              subkey_size: number
              subkey_id: number
              context: string
              primary_key: string
            }
            Returns: string
          }
        | {
            Args: {
              subkey_size: number
              subkey_id: number
              context: string
              primary_key: string
            }
            Returns: string
          }
      crypto_kdf_keygen: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      crypto_kx_client_session_keys: {
        Args: {
          client_pk: string
          client_sk: string
          server_pk: string
        }
        Returns: Database["pgsodium"]["CompositeTypes"]["crypto_kx_session"]
      }
      crypto_kx_new_keypair: {
        Args: Record<PropertyKey, never>
        Returns: Database["pgsodium"]["CompositeTypes"]["crypto_kx_keypair"]
      }
      crypto_kx_new_seed: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      crypto_kx_seed_new_keypair: {
        Args: {
          seed: string
        }
        Returns: Database["pgsodium"]["CompositeTypes"]["crypto_kx_keypair"]
      }
      crypto_kx_server_session_keys: {
        Args: {
          server_pk: string
          server_sk: string
          client_pk: string
        }
        Returns: Database["pgsodium"]["CompositeTypes"]["crypto_kx_session"]
      }
      crypto_pwhash: {
        Args: {
          password: string
          salt: string
        }
        Returns: string
      }
      crypto_pwhash_saltgen: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      crypto_pwhash_str: {
        Args: {
          password: string
        }
        Returns: string
      }
      crypto_pwhash_str_verify: {
        Args: {
          hashed_password: string
          password: string
        }
        Returns: boolean
      }
      crypto_secretbox:
        | {
            Args: {
              message: string
              nonce: string
              key: string
            }
            Returns: string
          }
        | {
            Args: {
              message: string
              nonce: string
              key_id: number
              context?: string
            }
            Returns: string
          }
        | {
            Args: {
              message: string
              nonce: string
              key_uuid: string
            }
            Returns: string
          }
      crypto_secretbox_keygen: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      crypto_secretbox_noncegen: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      crypto_secretbox_open:
        | {
            Args: {
              ciphertext: string
              nonce: string
              key: string
            }
            Returns: string
          }
        | {
            Args: {
              message: string
              nonce: string
              key_id: number
              context?: string
            }
            Returns: string
          }
        | {
            Args: {
              message: string
              nonce: string
              key_uuid: string
            }
            Returns: string
          }
      crypto_secretstream_keygen: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      crypto_shorthash:
        | {
            Args: {
              message: string
              key: number
              context?: string
            }
            Returns: string
          }
        | {
            Args: {
              message: string
              key: string
            }
            Returns: string
          }
        | {
            Args: {
              message: string
              key_uuid: string
            }
            Returns: string
          }
      crypto_shorthash_keygen: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      crypto_sign: {
        Args: {
          message: string
          key: string
        }
        Returns: string
      }
      crypto_sign_detached: {
        Args: {
          message: string
          key: string
        }
        Returns: string
      }
      crypto_sign_final_create: {
        Args: {
          state: string
          key: string
        }
        Returns: string
      }
      crypto_sign_final_verify: {
        Args: {
          state: string
          signature: string
          key: string
        }
        Returns: boolean
      }
      crypto_sign_init: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      crypto_sign_new_keypair: {
        Args: Record<PropertyKey, never>
        Returns: Database["pgsodium"]["CompositeTypes"]["crypto_sign_keypair"]
      }
      crypto_sign_new_seed: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      crypto_sign_open: {
        Args: {
          signed_message: string
          key: string
        }
        Returns: string
      }
      crypto_sign_seed_new_keypair: {
        Args: {
          seed: string
        }
        Returns: Database["pgsodium"]["CompositeTypes"]["crypto_sign_keypair"]
      }
      crypto_sign_update: {
        Args: {
          state: string
          message: string
        }
        Returns: string
      }
      crypto_sign_update_agg1: {
        Args: {
          state: string
          message: string
        }
        Returns: string
      }
      crypto_sign_update_agg2: {
        Args: {
          cur_state: string
          initial_state: string
          message: string
        }
        Returns: string
      }
      crypto_sign_verify_detached: {
        Args: {
          sig: string
          message: string
          key: string
        }
        Returns: boolean
      }
      crypto_signcrypt_new_keypair: {
        Args: Record<PropertyKey, never>
        Returns: Database["pgsodium"]["CompositeTypes"]["crypto_signcrypt_keypair"]
      }
      crypto_signcrypt_sign_after: {
        Args: {
          state: string
          sender_sk: string
          ciphertext: string
        }
        Returns: string
      }
      crypto_signcrypt_sign_before: {
        Args: {
          sender: string
          recipient: string
          sender_sk: string
          recipient_pk: string
          additional: string
        }
        Returns: Database["pgsodium"]["CompositeTypes"]["crypto_signcrypt_state_key"]
      }
      crypto_signcrypt_verify_after: {
        Args: {
          state: string
          signature: string
          sender_pk: string
          ciphertext: string
        }
        Returns: boolean
      }
      crypto_signcrypt_verify_before: {
        Args: {
          signature: string
          sender: string
          recipient: string
          additional: string
          sender_pk: string
          recipient_sk: string
        }
        Returns: Database["pgsodium"]["CompositeTypes"]["crypto_signcrypt_state_key"]
      }
      crypto_signcrypt_verify_public: {
        Args: {
          signature: string
          sender: string
          recipient: string
          additional: string
          sender_pk: string
          ciphertext: string
        }
        Returns: boolean
      }
      crypto_stream_xchacha20_keygen: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      crypto_stream_xchacha20_noncegen: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      decrypted_columns: {
        Args: {
          relid: unknown
        }
        Returns: string
      }
      derive_key: {
        Args: {
          key_id: number
          key_len?: number
          context?: string
        }
        Returns: string
      }
      disable_security_label_trigger: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      enable_security_label_trigger: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      encrypted_column: {
        Args: {
          relid: unknown
          m: Record<string, unknown>
        }
        Returns: string
      }
      encrypted_columns: {
        Args: {
          relid: unknown
        }
        Returns: string
      }
      get_key_by_id: {
        Args: {
          "": string
        }
        Returns: {
          associated_data: string | null
          created: string | null
          expires: string | null
          id: string | null
          key_context: string | null
          key_id: number | null
          key_type: Database["pgsodium"]["Enums"]["key_type"] | null
          name: string | null
          status: Database["pgsodium"]["Enums"]["key_status"] | null
        }
      }
      get_key_by_name: {
        Args: {
          "": string
        }
        Returns: {
          associated_data: string | null
          created: string | null
          expires: string | null
          id: string | null
          key_context: string | null
          key_id: number | null
          key_type: Database["pgsodium"]["Enums"]["key_type"] | null
          name: string | null
          status: Database["pgsodium"]["Enums"]["key_status"] | null
        }
      }
      get_named_keys: {
        Args: {
          filter?: string
        }
        Returns: {
          associated_data: string | null
          created: string | null
          expires: string | null
          id: string | null
          key_context: string | null
          key_id: number | null
          key_type: Database["pgsodium"]["Enums"]["key_type"] | null
          name: string | null
          status: Database["pgsodium"]["Enums"]["key_status"] | null
        }[]
      }
      has_mask: {
        Args: {
          role: unknown
          source_name: string
        }
        Returns: boolean
      }
      mask_columns: {
        Args: {
          source_relid: unknown
        }
        Returns: {
          attname: unknown
          key_id: string
          key_id_column: string
          associated_column: string
          nonce_column: string
          format_type: string
        }[]
      }
      mask_role: {
        Args: {
          masked_role: unknown
          source_name: string
          view_name: string
        }
        Returns: undefined
      }
      pgsodium_derive: {
        Args: {
          key_id: number
          key_len?: number
          context?: string
        }
        Returns: string
      }
      randombytes_buf: {
        Args: {
          size: number
        }
        Returns: string
      }
      randombytes_buf_deterministic: {
        Args: {
          size: number
          seed: string
        }
        Returns: string
      }
      randombytes_new_seed: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      randombytes_random: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      randombytes_uniform: {
        Args: {
          upper_bound: number
        }
        Returns: number
      }
      sodium_base642bin: {
        Args: {
          base64: string
        }
        Returns: string
      }
      sodium_bin2base64: {
        Args: {
          bin: string
        }
        Returns: string
      }
      update_mask: {
        Args: {
          target: unknown
          debug?: boolean
        }
        Returns: undefined
      }
      update_masks: {
        Args: {
          debug?: boolean
        }
        Returns: undefined
      }
      version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      key_status: "default" | "valid" | "invalid" | "expired"
      key_type:
        | "aead-ietf"
        | "aead-det"
        | "hmacsha512"
        | "hmacsha256"
        | "auth"
        | "shorthash"
        | "generichash"
        | "kdf"
        | "secretbox"
        | "secretstream"
        | "stream_xchacha20"
    }
    CompositeTypes: {
      _key_id_context: {
        key_id: number | null
        key_context: string | null
      }
      crypto_box_keypair: {
        public: string | null
        secret: string | null
      }
      crypto_kx_keypair: {
        public: string | null
        secret: string | null
      }
      crypto_kx_session: {
        rx: string | null
        tx: string | null
      }
      crypto_sign_keypair: {
        public: string | null
        secret: string | null
      }
      crypto_signcrypt_keypair: {
        public: string | null
        secret: string | null
      }
      crypto_signcrypt_state_key: {
        state: string | null
        shared_key: string | null
      }
    }
  }
  pgsodium_masks: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
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
  postgrest: {
    Tables: {
      configurations: {
        Row: {
          created_at: string | null
          db_extra_search_path: string | null
          db_schema: string
          id: number
          max_rows: number | null
          project_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          db_extra_search_path?: string | null
          db_schema: string
          id?: number
          max_rows?: number | null
          project_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          db_extra_search_path?: string | null
          db_schema?: string
          id?: number
          max_rows?: number | null
          project_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "configurations_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: true
            referencedRelation: "project_usage_summary"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "configurations_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: true
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
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
  realtime: {
    Tables: {
      configurations: {
        Row: {
          created_at: string | null
          id: number
          max_channel_limit: number | null
          max_channels: number | null
          project_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          max_channel_limit?: number | null
          max_channels?: number | null
          project_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          max_channel_limit?: number | null
          max_channels?: number | null
          project_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "configurations_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: true
            referencedRelation: "project_usage_summary"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "configurations_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: true
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          extension: string
          id: number
          inserted_at: string
          topic: string
          updated_at: string
        }
        Insert: {
          extension: string
          id?: number
          inserted_at: string
          topic: string
          updated_at: string
        }
        Update: {
          extension?: string
          id?: number
          inserted_at?: string
          topic?: string
          updated_at?: string
        }
        Relationships: []
      }
      schema_migrations: {
        Row: {
          inserted_at: string | null
          version: number
        }
        Insert: {
          inserted_at?: string | null
          version: number
        }
        Update: {
          inserted_at?: string | null
          version?: number
        }
        Relationships: []
      }
      subscription: {
        Row: {
          claims: Json
          claims_role: unknown
          created_at: string
          entity: unknown
          filters: Database["realtime"]["CompositeTypes"]["user_defined_filter"][]
          id: number
          subscription_id: string
        }
        Insert: {
          claims: Json
          claims_role?: unknown
          created_at?: string
          entity: unknown
          filters?: Database["realtime"]["CompositeTypes"]["user_defined_filter"][]
          id?: never
          subscription_id: string
        }
        Update: {
          claims?: Json
          claims_role?: unknown
          created_at?: string
          entity?: unknown
          filters?: Database["realtime"]["CompositeTypes"]["user_defined_filter"][]
          id?: never
          subscription_id?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          channel: string
          created_at: string | null
          id: number
          project_id: string | null
          user_id: string | null
        }
        Insert: {
          channel: string
          created_at?: string | null
          id?: number
          project_id?: string | null
          user_id?: string | null
        }
        Update: {
          channel?: string
          created_at?: string | null
          id?: number
          project_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project_usage_summary"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "subscriptions_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_user_id_fkey"
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
      apply_rls: {
        Args: {
          wal: Json
          max_record_bytes?: number
        }
        Returns: Database["realtime"]["CompositeTypes"]["wal_rls"][]
      }
      build_prepared_statement_sql: {
        Args: {
          prepared_statement_name: string
          entity: unknown
          columns: Database["realtime"]["CompositeTypes"]["wal_column"][]
        }
        Returns: string
      }
      cast: {
        Args: {
          val: string
          type_: unknown
        }
        Returns: Json
      }
      check_equality_op: {
        Args: {
          op: Database["realtime"]["Enums"]["equality_op"]
          type_: unknown
          val_1: string
          val_2: string
        }
        Returns: boolean
      }
      is_visible_through_filters: {
        Args: {
          columns: Database["realtime"]["CompositeTypes"]["wal_column"][]
          filters: Database["realtime"]["CompositeTypes"]["user_defined_filter"][]
        }
        Returns: boolean
      }
      list_changes: {
        Args: {
          publication: unknown
          slot_name: unknown
          max_changes: number
          max_record_bytes: number
        }
        Returns: Database["realtime"]["CompositeTypes"]["wal_rls"][]
      }
      quote_wal2json: {
        Args: {
          entity: unknown
        }
        Returns: string
      }
      to_regrole: {
        Args: {
          role_name: string
        }
        Returns: unknown
      }
      topic: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      action: "INSERT" | "UPDATE" | "DELETE" | "TRUNCATE" | "ERROR"
      equality_op: "eq" | "neq" | "lt" | "lte" | "gt" | "gte" | "in"
    }
    CompositeTypes: {
      user_defined_filter: {
        column_name: string | null
        op: Database["realtime"]["Enums"]["equality_op"] | null
        value: string | null
      }
      wal_column: {
        name: string | null
        type_name: string | null
        type_oid: unknown | null
        value: Json | null
        is_pkey: boolean | null
        is_selectable: boolean | null
      }
      wal_rls: {
        wal: Json | null
        is_rls_enabled: boolean | null
        subscription_ids: string[] | null
        errors: string[] | null
      }
    }
  }
  snapshots: {
    Tables: {
      database_snapshots: {
        Row: {
          completed_at: string | null
          created_at: string | null
          id: number
          name: string
          project_id: string | null
          size_bytes: number | null
          status: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          id?: number
          name: string
          project_id?: string | null
          size_bytes?: number | null
          status: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          id?: number
          name?: string
          project_id?: string | null
          size_bytes?: number | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "database_snapshots_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project_usage_summary"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "database_snapshots_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
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
  stripe: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
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
  supabase_migrations: {
    Tables: {
      schema_migrations: {
        Row: {
          name: string | null
          statements: string[] | null
          version: string
        }
        Insert: {
          name?: string | null
          statements?: string[] | null
          version: string
        }
        Update: {
          name?: string | null
          statements?: string[] | null
          version?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
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
  supavisor: {
    Tables: {
      configurations: {
        Row: {
          created_at: string | null
          default_pool_size: number | null
          id: number
          max_client_conn: number | null
          pool_mode: string
          project_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          default_pool_size?: number | null
          id?: number
          max_client_conn?: number | null
          pool_mode: string
          project_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          default_pool_size?: number | null
          id?: number
          max_client_conn?: number | null
          pool_mode?: string
          project_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "configurations_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project_usage_summary"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "configurations_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
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
  vanity: {
    Tables: {
      subdomains: {
        Row: {
          created_at: string | null
          id: number
          project_id: string | null
          status: string
          subdomain: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          project_id?: string | null
          status: string
          subdomain: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          project_id?: string | null
          status?: string
          subdomain?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subdomains_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: true
            referencedRelation: "project_usage_summary"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "subdomains_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: true
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
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
  vault: {
    Tables: {
      secrets: {
        Row: {
          created_at: string
          description: string
          id: string
          key_id: string | null
          name: string | null
          nonce: string | null
          secret: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string
          id?: string
          key_id?: string | null
          name?: string | null
          nonce?: string | null
          secret: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          key_id?: string | null
          name?: string | null
          nonce?: string | null
          secret?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "secrets_key_id_fkey"
            columns: ["key_id"]
            isOneToOne: false
            referencedRelation: "decrypted_key"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "secrets_key_id_fkey"
            columns: ["key_id"]
            isOneToOne: false
            referencedRelation: "key"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "secrets_key_id_fkey"
            columns: ["key_id"]
            isOneToOne: false
            referencedRelation: "valid_key"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      decrypted_secrets: {
        Row: {
          created_at: string | null
          decrypted_secret: string | null
          description: string | null
          id: string | null
          key_id: string | null
          name: string | null
          nonce: string | null
          secret: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          decrypted_secret?: never
          description?: string | null
          id?: string | null
          key_id?: string | null
          name?: string | null
          nonce?: string | null
          secret?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          decrypted_secret?: never
          description?: string | null
          id?: string | null
          key_id?: string | null
          name?: string | null
          nonce?: string | null
          secret?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "secrets_key_id_fkey"
            columns: ["key_id"]
            isOneToOne: false
            referencedRelation: "key"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "secrets_key_id_fkey"
            columns: ["key_id"]
            isOneToOne: false
            referencedRelation: "decrypted_key"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "secrets_key_id_fkey"
            columns: ["key_id"]
            isOneToOne: false
            referencedRelation: "valid_key"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      create_secret: {
        Args: {
          new_secret: string
          new_name?: string
          new_description?: string
          new_key_id?: string
        }
        Returns: string
      }
      update_secret: {
        Args: {
          secret_id: string
          new_secret?: string
          new_name?: string
          new_description?: string
          new_key_id?: string
        }
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
