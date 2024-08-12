import { PlanChildType } from "@/types/plan";
import { Tables } from "@/types/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

interface DataManager<T> {
  insert: (data: T) => Promise<T | null>;
}

export class PlanChild<T> implements DataManager<T> {
  protected client: SupabaseClient;
  protected tableName: string;

  constructor(supabase: SupabaseClient, tableName: string) {
    this.client = supabase;
    this.tableName = tableName;
  }

  async insert(info: T): Promise<T | null> {
    const { data, error } = await this.client
      .from(this.tableName)
      .insert(info)
      .select()
      .single();

    if (error) {
      throw new Error("insert 중 에러 발생", { cause: error });
    }

    return data;
  }
}

class ScheduleManager extends PlanChild<Tables<"schedule">> {
  constructor(supabase: SupabaseClient) {
    super(supabase, "schedule");
  }
}

class MemoManager extends PlanChild<Tables<"memo">> {
  constructor(supabase: SupabaseClient) {
    super(supabase, "memo");
  }
}

class MoveScheduleManager extends PlanChild<Tables<"moveSchedule">> {
  constructor(supabase: SupabaseClient) {
    super(supabase, "moveSchedule");
  }
}

export function getTableManager(supabase: SupabaseClient, type: PlanChildType) {
  switch (type) {
    case "customPlace":
      return new ScheduleManager(supabase);
    default:
      return null;
  }
}
