export interface WebSearchResult {
  title: string;
  url: string;
  snippet: string;
}

export interface WebSearchResponse {
  results: WebSearchResult[];
  query: string;
}

export async function performWebSearch(query: string): Promise<WebSearchResponse> {
  try {
    // Using a simple search API approach - in production, you'd use Tavily, Bing, or similar
    const searchUrl = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`;
    
    const response = await fetch(searchUrl);
    const data = await response.json();
    
    // Transform DuckDuckGo results to our format
    const results: WebSearchResult[] = (data.RelatedTopics || [])
      .slice(0, 5)
      .map((topic: any) => ({
        title: topic.Text?.split(' - ')[0] || 'Search Result',
        url: topic.FirstURL || '',
        snippet: topic.Text || 'No description available'
      }));

    return {
      results,
      query
    };
  } catch (error) {
    console.error("Web search error:", error);
    // Return empty results on error rather than failing
    return {
      results: [],
      query
    };
  }
}

export function formatSearchResultsForAI(searchResponse: WebSearchResponse): string {
  if (searchResponse.results.length === 0) {
    return "No search results found.";
  }

  let formatted = `Search results for "${searchResponse.query}":\n\n`;
  
  searchResponse.results.forEach((result, index) => {
    formatted += `${index + 1}. ${result.title}\n`;
    formatted += `   ${result.snippet}\n`;
    formatted += `   URL: ${result.url}\n\n`;
  });

  return formatted;
}
