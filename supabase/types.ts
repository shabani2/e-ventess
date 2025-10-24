export type Json =
  | string           // Texte simple
  | number          // Chiffres
  | boolean         // Vrai/Faux
  | null            // Valeur vide
  | { [key: string]: Json | undefined }  // Objets avec clés dynamiques
  | Json[]          // Tableaux de n'importe quel type JSON


export type Database = {
  public: {
    Tables: {
      // 📁 CATÉGORIES DE PRODUITS
      category: {
        Row: {           // Structure quand on LIT une catégorie
          created_at: string    // Date de création automatique
          id: number           // Identifiant unique (généré automatiquement)
          imageUrl: string     // URL de l'image de la catégorie
          name: string         // Nom affiché (ex: "Électronique")
          products: number[] | null  // Liste des IDs des produits associés
          slug: string         // Version URL (ex: "electronique")
        }
        Insert: {       //  Structure pour CRÉER une catégorie
          created_at?: string  // Optionnel - rempli automatiquement
          id?: number         // Optionnel - généré automatiquement
          imageUrl: string    // REQUIS
          name: string        // REQUIS
          products?: number[] | null  // Optionnel
          slug: string        // REQUIS
        }
        Update: {       //  Structure pour MODIFIER une catégorie
          created_at?: string  // Tous les champs sont optionnels en update
          id?: number
          imageUrl?: string
          name?: string
          products?: number[] | null
          slug?: string
        }
        Relationships: []  // ⛓️ Aucune relation étrangère
      }

      // 🛒 COMMANDES
      order: {
        Row: {
          created_at: string
          description: string | null  // Notes optionnelles
          id: number
          slug: string                // Référence unique (ex: "CMD-123")
          status: string              // "pending", "paid", "shipped"
          totalPrice: number          // Prix total en euros
          user: string                // ⛓️ ID de l'utilisateur
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          slug: string
          status: string
          totalPrice: number
          user: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          slug?: string
          status?: string
          totalPrice?: number
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "order_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
            // 🔗 Une commande appartient à un utilisateur
          },
        ]
      }

      //  ARTICLES DANS LES COMMANDES
      order_item: {
        Row: {
          created_at: string
          id: number
          order: number        // ⛓️ ID de la commande
          product: number      // ⛓️ ID du produit
          quantity: number     // Quantité commandée
        }
        Relationships: [
          {
            foreignKeyName: "order_item_order_fkey"
            columns: ["order"]
            referencedRelation: "order"
            referencedColumns: ["id"]
            // 🔗 Un article appartient à une commande
          },
          {
            foreignKeyName: "order_item_product_fkey" 
            columns: ["product"]
            referencedRelation: "product"
            referencedColumns: ["id"]
            // 🔗 Un article référence un produit
          },
        ]
      }

      //  PRODUITS
      product: {
        Row: {
          category: number           // ⛓️ ID de la catégorie
          created_at: string
          heroImage: string          // Image principale
          id: number
          imagesUrl: string[]        // Galerie d'images
          maxQuantity: number        // Stock maximum
          price: number              // Prix en euros
          slug: string               // URL (ex: "iphone-14")
          title: string              // Nom du produit
        }
        Relationships: [
          {
            foreignKeyName: "product_category_fkey"
            columns: ["category"]
            referencedRelation: "category" 
            referencedColumns: ["id"]
            // 🔗 Un produit appartient à une catégorie
          },
        ]
      }

      // 👥 UTILISATEURS
      users: {
        Row: {
          avatar_url: string
          created_at: string | null
          email: string
          expo_notification_token: string | null  // Pour les notifications mobile
          id: string                              // ID auth Supabase
          stripe_customer_id: string | null       // ID client Stripe (paiements)
          type: string | null                     // Type d'utilisateur
        }
      }
    }

    //  VUES (actuellement aucune)
    Views: {
      [_ in never]: never
    }

    //  FONCTIONS PERSONNALISÉES
    Functions: {
      // DIMINUER LA QUANTITÉ D'UN PRODUIT
      decrement_product_quantity: {
        Args: {
          product_id: number    // ID du produit à mettre à jour
          quantity: number      // Quantité à soustraire
        }
        Returns: undefined      // Pas de retour
      }
    }

    //  ENUMS (actuellement aucun)
    Enums: {
      [_ in never]: never
    }

    // 🧩 TYPES COMPOSITES (actuellement aucun)
    CompositeTypes: {
      [_ in never]: never
    }
  }
}