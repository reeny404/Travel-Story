export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      accountBook: {
        Row: {
          amount: number;
          areaId: number | null;
          areaName: string;
          areaType: string;
          createdAt: string;
          desc: string;
          id: number;
          payType: string;
          planId: string;
          scheduleId: string;
          type: string;
          userId: string;
        };
        Insert: {
          amount?: number;
          areaId?: number | null;
          areaName?: string;
          areaType?: string;
          createdAt?: string;
          desc?: string;
          id?: number;
          payType?: string;
          planId: string;
          scheduleId: string;
          type?: string;
          userId: string;
        };
        Update: {
          amount?: number;
          areaId?: number | null;
          areaName?: string;
          areaType?: string;
          createdAt?: string;
          desc?: string;
          id?: number;
          payType?: string;
          planId?: string;
          scheduleId?: string;
          type?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "acouuntBook_planId_fkey";
            columns: ["planId"];
            isOneToOne: false;
            referencedRelation: "plan";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "acouuntBook_schduleId_fkey";
            columns: ["scheduleId"];
            isOneToOne: false;
            referencedRelation: "schedule";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "acouuntBook_userId_fkey1";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      area: {
        Row: {
          cityId: number;
          countryId: number | null;
          createdAt: string;
          description: string;
          id: number;
          imageUrl: string | null;
          info: Json | null;
          krName: string | null;
          lat: number | null;
          latlng: Json;
          lng: number | null;
          name: string;
          title: string;
          type: string | null;
        };
        Insert: {
          cityId: number;
          countryId?: number | null;
          createdAt?: string;
          description?: string;
          id?: number;
          imageUrl?: string | null;
          info?: Json | null;
          krName?: string | null;
          lat?: number | null;
          latlng?: Json;
          lng?: number | null;
          name?: string;
          title?: string;
          type?: string | null;
        };
        Update: {
          cityId?: number;
          countryId?: number | null;
          createdAt?: string;
          description?: string;
          id?: number;
          imageUrl?: string | null;
          info?: Json | null;
          krName?: string | null;
          lat?: number | null;
          latlng?: Json;
          lng?: number | null;
          name?: string;
          title?: string;
          type?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "area_cityId_fkey";
            columns: ["cityId"];
            isOneToOne: false;
            referencedRelation: "city";
            referencedColumns: ["id"];
          },
        ];
      };
      areaBookmark: {
        Row: {
          areaId: number | null;
          createdAt: string;
          id: number;
          lat: number | null;
          lng: number | null;
          userId: string;
        };
        Insert: {
          areaId?: number | null;
          createdAt?: string;
          id?: number;
          lat?: number | null;
          lng?: number | null;
          userId: string;
        };
        Update: {
          areaId?: number | null;
          createdAt?: string;
          id?: number;
          lat?: number | null;
          lng?: number | null;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "areaBookmark_areaId_fkey";
            columns: ["areaId"];
            isOneToOne: false;
            referencedRelation: "area";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "areaBookmark_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      areaReview: {
        Row: {
          areaId: number | null;
          areaName: string;
          content: string | null;
          createdAt: string;
          id: number;
          imageUrls: Json | null;
          rating: number;
          userId: string;
        };
        Insert: {
          areaId?: number | null;
          areaName: string;
          content?: string | null;
          createdAt?: string;
          id?: number;
          imageUrls?: Json | null;
          rating: number;
          userId: string;
        };
        Update: {
          areaId?: number | null;
          areaName?: string;
          content?: string | null;
          createdAt?: string;
          id?: number;
          imageUrls?: Json | null;
          rating?: number;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "areaReview_areaId_fkey";
            columns: ["areaId"];
            isOneToOne: false;
            referencedRelation: "area";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "areaReview_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      city: {
        Row: {
          countryId: number;
          created_at: string;
          description: string;
          id: number;
          imageUrl: string | null;
          krName: string | null;
          lat: number;
          lng: number;
          name: string;
          title: string;
        };
        Insert: {
          countryId: number;
          created_at?: string;
          description: string;
          id?: number;
          imageUrl?: string | null;
          krName?: string | null;
          lat: number;
          lng: number;
          name: string;
          title: string;
        };
        Update: {
          countryId?: number;
          created_at?: string;
          description?: string;
          id?: number;
          imageUrl?: string | null;
          krName?: string | null;
          lat?: number;
          lng?: number;
          name?: string;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "area_countryId_fkey";
            columns: ["countryId"];
            isOneToOne: false;
            referencedRelation: "country";
            referencedColumns: ["id"];
          },
        ];
      };
      country: {
        Row: {
          continent: string | null;
          createdAt: string;
          description: string | null;
          flagImageUrl: string | null;
          id: number;
          imageUrl: string | null;
          krName: string | null;
          name: string;
          title: string | null;
        };
        Insert: {
          continent?: string | null;
          createdAt?: string;
          description?: string | null;
          flagImageUrl?: string | null;
          id?: number;
          imageUrl?: string | null;
          krName?: string | null;
          name: string;
          title?: string | null;
        };
        Update: {
          continent?: string | null;
          createdAt?: string;
          description?: string | null;
          flagImageUrl?: string | null;
          id?: number;
          imageUrl?: string | null;
          krName?: string | null;
          name?: string;
          title?: string | null;
        };
        Relationships: [];
      };
      memo: {
        Row: {
          check: Json | null;
          content: string | null;
          createdAt: string;
          id: string;
          imagesUrl: Json | null;
          planId: string | null;
          title: string | null;
        };
        Insert: {
          check?: Json | null;
          content?: string | null;
          createdAt?: string;
          id?: string;
          imagesUrl?: Json | null;
          planId?: string | null;
          title?: string | null;
        };
        Update: {
          check?: Json | null;
          content?: string | null;
          createdAt?: string;
          id?: string;
          imagesUrl?: Json | null;
          planId?: string | null;
          title?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "memo_planId_fkey";
            columns: ["planId"];
            isOneToOne: false;
            referencedRelation: "plan";
            referencedColumns: ["id"];
          },
        ];
      };
      moveSchedule: {
        Row: {
          createdAt: string;
          endTime: string | null;
          id: string;
          imagesUrl: Json | null;
          memo: string | null;
          planId: string | null;
          startTime: string | null;
          type: string | null;
        };
        Insert: {
          createdAt?: string;
          endTime?: string | null;
          id?: string;
          imagesUrl?: Json | null;
          memo?: string | null;
          planId?: string | null;
          startTime?: string | null;
          type?: string | null;
        };
        Update: {
          createdAt?: string;
          endTime?: string | null;
          id?: string;
          imagesUrl?: Json | null;
          memo?: string | null;
          planId?: string | null;
          startTime?: string | null;
          type?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "moveSchedule_planId_fkey";
            columns: ["planId"];
            isOneToOne: false;
            referencedRelation: "plan";
            referencedColumns: ["id"];
          },
        ];
      };
      plan: {
        Row: {
          country: string | null;
          createdAt: string;
          endDate: string | null;
          id: string;
          imagesUrl: string | null;
          orderList: Json | null;
          startDate: string | null;
          title: string | null;
          userId: string | null;
        };
        Insert: {
          country?: string | null;
          createdAt?: string;
          endDate?: string | null;
          id?: string;
          imagesUrl?: string | null;
          orderList?: Json | null;
          startDate?: string | null;
          title?: string | null;
          userId?: string | null;
        };
        Update: {
          country?: string | null;
          createdAt?: string;
          endDate?: string | null;
          id?: string;
          imagesUrl?: string | null;
          orderList?: Json | null;
          startDate?: string | null;
          title?: string | null;
          userId?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "plan_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      schedule: {
        Row: {
          createdAt: string;
          endTime: string | null;
          id: string;
          imagesUrl: Json | null;
          latlng: Json;
          memo: string | null;
          place: string | null;
          planId: string | null;
          startTime: string | null;
          title: string | null;
          type: string | null;
        };
        Insert: {
          createdAt?: string;
          endTime?: string | null;
          id?: string;
          imagesUrl?: Json | null;
          latlng?: Json;
          memo?: string | null;
          place?: string | null;
          planId?: string | null;
          startTime?: string | null;
          title?: string | null;
          type?: string | null;
        };
        Update: {
          createdAt?: string;
          endTime?: string | null;
          id?: string;
          imagesUrl?: Json | null;
          latlng?: Json;
          memo?: string | null;
          place?: string | null;
          planId?: string | null;
          startTime?: string | null;
          title?: string | null;
          type?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "schedule_planId_fkey";
            columns: ["planId"];
            isOneToOne: false;
            referencedRelation: "plan";
            referencedColumns: ["id"];
          },
        ];
      };
      users: {
        Row: {
          created_at: string;
          email: string | null;
          id: string;
          image_url: string | null;
          nickname: string | null;
        };
        Insert: {
          created_at?: string;
          email?: string | null;
          id?: string;
          image_url?: string | null;
          nickname?: string | null;
        };
        Update: {
          created_at?: string;
          email?: string | null;
          id?: string;
          image_url?: string | null;
          nickname?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_total_rating: {
        Args: {
          area_id: number;
        };
        Returns: number;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

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
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

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
    : never;
