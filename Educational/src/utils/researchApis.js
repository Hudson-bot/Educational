// src/utils/researchApis.js
export const fetchArxivPapers = async (query) => {
  try {
    const response = await fetch(`https://export.arxiv.org/api/query?search_query=all:${query}&start=0&max_results=10`);
    const text = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, "text/xml");
    
    const entries = xmlDoc.getElementsByTagName('entry');
    return Array.from(entries).map(entry => ({
      id: entry.getElementsByTagName('id')[0]?.textContent,
      title: entry.getElementsByTagName('title')[0]?.textContent,
      summary: entry.getElementsByTagName('summary')[0]?.textContent,
      authors: Array.from(entry.getElementsByTagName('author')).map(a => a.getElementsByTagName('name')[0]?.textContent),
      published: entry.getElementsByTagName('published')[0]?.textContent,
      link: entry.getElementsByTagName('link')[0]?.getAttribute('href'),
      pdf: Array.from(entry.getElementsByTagName('link')).find(l => l.getAttribute('title') === 'pdf')?.getAttribute('href')
    }));
  } catch (error) {
    console.error('Error fetching ArXiv papers:', error);
    return [];
  }
};

export const fetchCrossrefPapers = async (query) => {
  try {
    const response = await fetch(`https://api.crossref.org/works?query=${query}&rows=10`);
    const data = await response.json();
    return data.message.items.map(item => ({
      id: item.DOI,
      title: item.title?.[0],
      abstract: item.abstract,
      authors: item.author?.map(a => `${a.given} ${a.family}`),
      published: item.created?.['date-parts']?.[0]?.join('-'),
      link: item.URL,
      pdf: item.link?.find(l => l['content-type'] === 'application/pdf')?.URL
    }));
  } catch (error) {
    console.error('Error fetching Crossref papers:', error);
    return [];
  }
};