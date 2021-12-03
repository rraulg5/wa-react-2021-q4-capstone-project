export interface APIResponse {
  page: number;
  results_per_page: number;
  results_size: number;
  total_results_size: number;
  total_pages: number;
  next_page: null;
  prev_page: null;
  results: any[];
  version: string;
  license: string;
}
