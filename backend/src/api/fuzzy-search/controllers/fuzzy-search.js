// Fuzzy Search Controller with Advanced Typo Tolerance and Semantic Matching

/**
 * Calculate Levenshtein distance between two strings
 * Used for measuring similarity even with typos
 */
function levenshteinDistance(str1, str2) {
  const len1 = str1.length;
  const len2 = str2.length;
  const matrix = Array(len2 + 1)
    .fill(null)
    .map(() => Array(len1 + 1).fill(null));

  for (let i = 0; i <= len1; i++) matrix[0][i] = i;
  for (let j = 0; j <= len2; j++) matrix[j][0] = j;

  for (let j = 1; j <= len2; j++) {
    for (let i = 1; i <= len1; i++) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        matrix[j - 1][i] + 1,
        matrix[j - 1][i - 1] + indicator
      );
    }
  }

  return matrix[len2][len1];
}

/**
 * Check if a term matches with fuzzy logic
 * Allows for typos and partial matches
 */
function fuzzyMatch(searchTerm, targetText) {
  if (!targetText) return false;
  
  const search = searchTerm.toLowerCase();
  const target = targetText.toLowerCase();
  
  // Exact match or containment
  if (target.includes(search)) return true;
  
  // Check for word-level matches with typos
  const searchWords = search.split(/\s+/);
  const targetWords = target.split(/\s+/);
  
  for (const searchWord of searchWords) {
    if (searchWord.length < 3) continue; // Skip very short words
    
    for (const targetWord of targetWords) {
      // Allow 1 character difference for short words, 2 for longer
      const allowedDistance = searchWord.length <= 4 ? 1 : 2;
      const distance = levenshteinDistance(searchWord, targetWord);
      
      if (distance <= allowedDistance) {
        return true;
      }
      
      // Check if search word is a substring (with typo tolerance)
      if (targetWord.includes(searchWord) || searchWord.includes(targetWord)) {
        return true;
      }
    }
  }
  
  return false;
}

/**
 * Search with fuzzy matching and scoring
 */
async function fuzzySearchCollection(model, query, searchFields, limit = 10) {
  try {
    // Get all items (or a reasonable subset)
    const allItems = await strapi.entityService.findMany(model, {
      populate: "*",
      limit: 100, // Get more items for fuzzy matching
    });

    if (!allItems || allItems.length === 0) return [];

    // Score each item based on relevance
    const scoredItems = allItems
      .map((item) => {
        let score = 0;
        let matches = 0;

        // Check each search field
        for (const field of searchFields) {
          const value = item[field.name];
          if (value && fuzzyMatch(query, value)) {
            score += field.weight || 1;
            matches++;
          }
        }

        return { item, score, matches };
      })
      .filter((result) => result.score > 0) // Only items with matches
      .sort((a, b) => b.score - a.score) // Sort by relevance
      .slice(0, limit)
      .map((result) => result.item);

    return scoredItems;
  } catch (error) {
    console.error(`Error searching ${model}:`, error);
    return [];
  }
}

module.exports = {
  async search(ctx) {
    const { query } = ctx.request.query;
    if (!query || typeof query !== "string" || !query.trim()) {
      ctx.throw(400, "A valid search query must be provided.");
    }

    // Search across multiple models with advanced fuzzy matching
    const results = {};

    try {
      // Search People with weighted fields
      const peoples = await fuzzySearchCollection(
        "api::people.people",
        query,
        [
          { name: "Name", weight: 3 },
          { name: "Designation", weight: 2 },
          { name: "Role", weight: 2 },
          { name: "Email", weight: 1 },
          { name: "Domain", weight: 1 },
        ]
      );
      if (peoples.length > 0) {
        results.peoples = peoples;
      }

      // Search News
      const news = await fuzzySearchCollection(
        "api::news.news",
        query,
        [
          { name: "Title", weight: 3 },
          { name: "description", weight: 1 },
        ]
      );
      if (news.length > 0) {
        results.news = news;
      }

      // Search Research Labs
      const researchLabs = await fuzzySearchCollection(
        "api::research-lab.research-lab",
        query,
        [
          { name: "Name", weight: 3 },
          { name: "Type", weight: 2 },
          { name: "description", weight: 1 },
        ]
      );
      if (researchLabs.length > 0) {
        results.research = researchLabs;
      }

      // Search Research Projects
      const researchProjects = await fuzzySearchCollection(
        "api::research-project.research-project",
        query,
        [
          { name: "Title", weight: 3 },
          { name: "Type", weight: 2 },
          { name: "PI", weight: 2 },
          { name: "CoPI", weight: 1 },
        ]
      );
      if (researchProjects.length > 0) {
        results.projects = researchProjects;
      }

      // Search Talk and Events
      const events = await fuzzySearchCollection(
        "api::talk-and-event.talk-and-event",
        query,
        [
          { name: "Title", weight: 3 },
          { name: "Speaker", weight: 2 },
          { name: "description", weight: 1 },
          { name: "venue", weight: 1 },
        ]
      );
      if (events.length > 0) {
        results.events = events;
      }

    } catch (error) {
      console.error("Search error:", error);
      ctx.throw(500, "An error occurred while searching.");
    }

    ctx.send(results);
  },
};
