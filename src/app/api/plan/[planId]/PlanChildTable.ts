import { PlanChildType } from "@/types/plan";
import { Tables } from "@/types/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

interface DataManager<T> {
  insert: (data: T) => Promise<T | null>
}

export class PlanChild {
  protected client: SupabaseClient;
  protected tableName: string;

  constructor(supabase: SupabaseClient, tableName: string) {
    this.client = supabase
    this.tableName = tableName;
  }
}

class ScheduleManager extends PlanChild implements DataManager<Tables<"schedule">> {
  constructor(supabase: SupabaseClient) {
    super(supabase, "schedule")
  }

  async insert(info: Tables<"schedule">): Promise<Tables<"schedule"> | null> {
    const { data, error } = await this.client
      .from(this.tableName)
      .insert(info)
      .select()
      .returns<Tables<"schedule">>()
      .single();

    if (error) {
      throw new Error("schedule insert 중 에러 발생", { cause: error });
    }

    return data;
  }
}

export function getTableManager(supabase: SupabaseClient, type: PlanChildType) {
  switch (type) {
    case "customePlace": return new ScheduleManager(supabase);
    default: return null;
  }
}